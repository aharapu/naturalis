import { ChangeEventHandler } from "react";
export declare enum InputVariant {
    IDLE = "idle",
    DIRTY = "dirty",
    SUCCESS = "success",
    ERROR = "error"
}
export interface InputProps {
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
