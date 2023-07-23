import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import Input from "./Input";
import { useInputProps } from "./useInputProps";

const meta: Meta<typeof Input> = {
  component: Input,
  title: "Marbella/InputField",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Input>;

function pretendMakeSaveChangesRequest(changeEvent) {
  const val = changeEvent.target.value;
  console.log("saving value...", val);

  return new Promise<string>((resolve, reject) => {
    setTimeout(() => {
      console.log("saved value", val);
      resolve(val);
      // reject(new Error("i hate you"));
    }, 3000);
  });
}

export const Primary: Story = (args) => {
  const { loading, onChange, value, variant } = useInputProps({
    saveChanges: pretendMakeSaveChangesRequest,
  });

  return (
    <>
      <Input
        data-test-id="InputField-id"
        {...args}
        gigi="becali"
        value={value}
        onChange={onChange}
        loading={loading}
        variant={variant}
      />
      <h5>Input events:</h5>
      <ol>
        <li>type something</li>
      </ol>
    </>
  );
};

Primary.args = {
  disabled: false,
  label: "Primary",
};

export const Success: Story = (args) => <Input data-test-id="InputField-id" {...args} />;
Success.args = {
  disabled: false,
  label: "Success",
};

export const ErrorInput: Story = (args) => <Input data-test-id="InputField-id" {...args} />;
ErrorInput.args = {
  disabled: false,
  message: "ErrorInput",
};

export const Disabled: Story = (args) => <Input data-test-id="InputField-id" {...args} />;
Disabled.args = {
  disabled: true,
  label: "Disabled",
};
