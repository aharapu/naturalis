import React, { FC, Fragment } from "react";
import styled from "styled-components";
import { InputProps } from "./Input.types";

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

const StyledText = styled.p<InputProps>`
  margin: 0px;
  color: ${(props) =>
    props.disabled ? "#e4e3ea" : props.error ? "#a9150b" : "#080808"};
`;

const Input: FC<InputProps> = ({
  id,
  disabled,
  label,
  message,
  error = false,
  success = false,
  onChange,
  placeholder,
  isLoading = false,
  isDirty = false,
  ...props
}) => {
  const borderColor = getBorderColor({ isDirty, error, success });

  return (
    <Fragment>
      <StyledLabel>
        <StyledText disabled={disabled} error={error}>
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
        error={error}
        success={success}
        placeholder={placeholder}
        {...props}
      ></StyledInput>
      <StyledMessage>
        <StyledText error={error}>{message}</StyledText>
      </StyledMessage>
      {isLoading && (
        <StyledMessage>
          <StyledText>Loading...</StyledText>
        </StyledMessage>
      )}
    </Fragment>
  );
};

export default Input;

function getBorderColor({
  isDirty,
  error,
  success,
}: {
  isDirty: boolean;
  error: boolean;
  success: boolean;
}) {
  if (success) {
    return "#0a7023"; // green
  }

  if (isDirty) {
    if (error) {
      return "#a9150b"; // red
    } else {
      //yellow
      return "#f5a623";
    }
  } else {
    return "#353637"; //
  }
}
