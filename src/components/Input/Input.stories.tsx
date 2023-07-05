import React, { useRef, useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import Input from "./Input";

const meta: Meta<typeof Input> = {
  component: Input,
  title: "Marbella/InputField",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Input>;

function pretendMakeRequest() {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve("done");
    }, 3000);
  });
}

// TODO -> test changing color in the middle of another color change

// todo -> create a custom hook that exposes an 'onDebouncedChange' function
//    and returns the input variants as well as the loading state
//    ? the hook should also handle the request cancellation
//    IDEA -> it should require a function that returns a promise -> so it can be wrapped in a cancellation promise
//            and if an additional abort controller is passed in, it can be used to cancel the request
//    ? how to handle cancelaltions for websockets?
export const Primary: Story = (args) => {
  // todo -> rename to dirty
  const [isLoading, setIsLoading] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const isTyping = useRef(false);
  let timeout = useRef<ReturnType<typeof setTimeout>>();

  // TODO -> create a queue of variants to show,
  // to make sure they stay displayed for a certain minimum amount of time
  // and to make sure they don't overlap
  // ! different variants could have different minimum display times
  const showSuccess = () => {
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsDirty(true);

    // todo -> if a request is already in flight, cancel it

    if (isTyping.current) {
      console.log("clearing timeout");
      clearTimeout(timeout.current);
    }

    timeout.current = setTimeout(() => {
      isTyping.current = false;
      setIsLoading(true);

      pretendMakeRequest()
        .then(() => {
          setIsLoading(false);
          setIsDirty(false);
          showSuccess();
        })
        .catch(() => {
          // todo -> if it's an abort error, do nothing
          // otherwise, set error state
        });
    }, 3000);

    isTyping.current = true;
  };

  React.useEffect(() => {
    if (isTyping.current) {
      return;
    }
    if (!isLoading) {
      return;
    }
    pretendMakeRequest().then(() => {
      setIsLoading(false);
    });
  }, [isLoading]);

  return (
    <Input
      data-test-id="InputField-id"
      {...args}
      onChange={handleChange}
      isLoading={isLoading}
      // todo -> repalce dirty with a variant selection 'idle' | 'dirty' | 'success' | 'error'
      //    variants equating border colors of black, yellow, green, red
      isDirty={isDirty}
      success={isSuccess}
    />
  );
};

Primary.args = {
  error: false,
  disabled: false,
  label: "Primary",
};

export const Success: Story = (args) => (
  <Input data-test-id="InputField-id" {...args} />
);
Success.args = {
  error: false,
  success: true,
  disabled: false,
  label: "Success",
};

export const Error: Story = (args) => (
  <Input data-test-id="InputField-id" {...args} />
);
Error.args = {
  error: true,
  disabled: false,
  message: "Error",
};

export const Disabled: Story = (args) => (
  <Input data-test-id="InputField-id" {...args} />
);
Disabled.args = {
  disabled: true,
  label: "Disabled",
};
