import React, { FC, Fragment } from "react";
import styled from "styled-components";
import { InputProps, InputVariant } from "./Input.types";

const StyledInput = styled.input<InputProps>`
  height: 40px;
  width: 300px;
  border-style: solid;
  border-width: 2px;
  border-radius: 3px;
  background-color: #fff;
  &:focus {
    border: solid 2px #1b116e;
  }
`;

const StyledLabel = styled.div<InputProps>`
  font-size: 14px;
  color: ${(props) => (props.disabled ? "#e4e3ea" : "#080808")};
  padding-bottom: 6px;
`;

const StyledMessage = styled.div<InputProps>`
  font-size: 14px;
  color: #a9150b8;
  padding-top: 4px;
`;

const StyledText = styled.p<{ disabled?: boolean; error?: boolean }>`
  margin: 0px;
  color: ${(props) => getStyledTextColor({ disabled: !!props.disabled, error: !!props.error })};
`;

const Input: FC<InputProps> = ({
  id,
  disabled,
  label,
  message,
  onChange,
  placeholder,
  loading = false,
  variant = InputVariant.IDLE,
}) => {
  const borderColor = getBorderColor(variant);

  return (
    <Fragment>
      <StyledLabel>
        <StyledText disabled={disabled} error={variant === InputVariant.ERROR}>
          {label}
        </StyledText>
      </StyledLabel>
      <StyledInput
        style={{
          border: `2px solid ${borderColor}`,
          outline: "none",
          transition: "border-color 0.3s ease-in-out",
        }}
        id={id}
        type="text"
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
      />
      <StyledMessage>
        <StyledText error={variant === InputVariant.ERROR}>{message}</StyledText>
      </StyledMessage>
      {loading && (
        <StyledMessage>
          <StyledText>Loading...</StyledText>
        </StyledMessage>
      )}
    </Fragment>
  );
};

export default Input;

function getBorderColor(variant: InputVariant) {
  switch (variant) {
    case InputVariant.SUCCESS:
      return "#0a7023"; // green
    case InputVariant.ERROR:
      return "#a9150b"; // red
    case InputVariant.IDLE:
      return "#353637"; // black
    case InputVariant.DIRTY:
      return "#f5a623"; // yellow
    default:
      return "#353637";
  }
}

function getStyledTextColor({ disabled, error }: { disabled: boolean; error: boolean }) {
  if (disabled) {
    return "#e4e3ea";
  }
  if (error) {
    return "#a9150b";
  }
  return "#080808";
}
