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

// todo -> create a custom hook that exposes an 'onDebouncedChange' function
//    and returns the input variants as well as the loading state
//    ? the hook should also handle the request cancellation
export const Primary: Story = (args) => {
  // todo -> rename to dirty
  const [isLoading, setIsLoading] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const isTyping = useRef(false);
  let timeout = useRef<ReturnType<typeof setTimeout>>();

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
