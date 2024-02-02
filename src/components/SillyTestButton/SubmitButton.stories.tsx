
import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { SubmitButton } from "./SubmitButton";

const meta: Meta<typeof SubmitButton> = {
    component: SubmitButton,
    title: "Marbella/SubmitButton",
    argTypes: {},
};
export default meta;

type Story = StoryObj<typeof SubmitButton>;

export const Ana: Story = (args) => <SubmitButton {...args} />;
Ana.args = {
    text: "SUBMIT"
}
