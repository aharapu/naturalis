import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import SillyTestButton from "./SillyTestButton";

const meta: Meta<typeof SillyTestButton> = {
  component: SillyTestButton,
  title: "Marbella/SillyTestButton",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof SillyTestButton>;

export const Primary: Story = (args) => <SillyTestButton data-test-id="InputField-id" {...args} />;
Primary.args = {
  text: "whoops",
};
