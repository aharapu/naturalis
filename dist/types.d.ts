import React, { ChangeEventHandler, ChangeEvent } from 'react';

declare enum InputVariant {
    IDLE = "idle",
    DIRTY = "dirty",
    SUCCESS = "success",
    ERROR = "error"
}
interface InputProps {
    id?: string;
    label?: string;
    message?: string;
    value: string;
    disabled?: boolean;
    placeholder?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    loading?: boolean;
    variant?: InputVariant;
}

type useInputOptions = {
    saveChanges: (e: ChangeEvent) => Promise<unknown>;
};
declare function useInputProps({ saveChanges }: useInputOptions): {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    variant: InputVariant;
    loading: boolean;
};

interface SillyTestButtonProps {
    text?: string;
}
declare const SillyTestButton: React.FC<SillyTestButtonProps>;

export { InputProps, InputVariant, SillyTestButton, useInputProps };
