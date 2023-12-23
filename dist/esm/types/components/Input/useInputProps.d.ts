import { ChangeEvent } from "react";
import { InputVariant } from "./Input.types";
type useInputOptions = {
    saveChanges: (e: ChangeEvent) => Promise<unknown>;
};
export declare function useInputProps({ saveChanges }: useInputOptions): {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    variant: InputVariant;
    loading: boolean;
};
export {};
