
import React, { useState, MouseEventHandler } from "react";
import styled from "styled-components";

interface SubmitButtonProps {
    text?: string;
    primary?: boolean;
    disabled?: boolean;
    size?: "small" | "medium" | "large";
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

const StyledSubmitButton = styled.button<SubmitButtonProps>`
    width: ${(props) => props.size === "small" ? "180px" 
        : "190px"};
    height: ${(props) => props.size === "small" ? "45px" 
        : props.size === "medium" ? "65px" 
        : "75px"};
    border: 0;
    line-height: 1;
    font-size: 15px;
    cursor: pointer;
    font-weight: 700;
    border-radius: 9px;
    letter-spacing: .1rem;
    display: inline-block;
    padding: ${(props) => 
        props.size === "small" ? "7px 25px 8px"
        : props.size === "medium" ? "9px 30px 11px" 
        : "14px 30px 16px"};
    color: ${(props) => (props.primary ? "#1b116e" : "#ffffff")};
    background-color: ${(props) => (props.primary ? "#6bedb5" : "#1b116e")};
    opacity: ${(props) => (props.disabled ? 0.5 : 1)};

    &:hover {
        background-color: ${(props) => (props.primary ? "#55bd90" : "#6bedb5")};
    }

    &:active {
        border: solid 2px #1b116e;
        padding: ${(props) =>
        props.size === "small"
            ? "5px 23px 6px"
            : props.size === "medium"
            ? "7px 28px 9px"
            : "12px 28px 14px"};
    }`;

export const SubmitButton: React.FC<SubmitButtonProps> = ({ 
    size,
    primary,
    disabled,
    text, 
    onClick,
}) => {

    const [hover, setHover] = useState(false);

    const toggleHover = () => {
        setHover(!hover);
    };

    // const defaultButtonStyle: React.CSSProperties = {
    //     width: "130px",
    //     height: "45px",
    //     borderRadius: "9px",
    //     backgroundColor: "darkblue",
    //     color: "white",
    //     fontWeight: "700",
    //     letterSpacing: ".1rem",
    //     cursor: "pointer",
    // }

    // if (hover) {
    //     defaultButtonStyle.backgroundColor = "lightblue";
    //     defaultButtonStyle.color = "black";
    // }

    return (
        <StyledSubmitButton 
            // style={defaultButtonStyle}
            type="button"
            onMouseEnter={toggleHover}
            onMouseLeave={toggleHover}
            onClick={onClick}
            primary={primary}
            disabled={disabled}
            size={size}

            >
            {text ?? "Done"}
        </StyledSubmitButton>
    )  
}










// const StyledButton = styled.button<ButtonProps>`
//   border: 0;
//   line-height: 1;
//   font-size: 15px;
//   cursor: pointer;
//   font-weight: 700;
//   font-weight: bold;
//   border-radius: 3px;
//   display: inline-block;
//   padding: ${(props) =>
//     props.size === "small"
//       ? "7px 25px 8px"
//       : props.size === "medium"
//       ? "9px 30px 11px"
//       : "14px 30px 16px"};
//   color: ${(props) => (props.primary ? "#1b116e" : "#ffffff")};
//   background-color: ${(props) => (props.primary ? "#6bedb5" : "#1b116e")};
//   opacity: ${(props) => (props.disabled ? 0.5 : 1)};
//   &:hover {
//     background-color: ${(props) => (props.primary ? "#55bd90" : "#6bedb5")};
//   }
//   &:active {
//     border: solid 2px #1b116e;
//     padding: ${(props) =>
//       props.size === "small"
//         ? "5px 23px 6px"
//         : props.size === "medium"
//         ? "7px 28px 9px"
//         : "12px 28px 14px"};
//   }
// `;

// const Button: React.FC<ButtonProps> = ({
//   size,
//   primary,
//   disabled,
//   text,
//   onClick,
//   ...props
// }) => {
//   return (
//     <StyledButton
//       type="button"
//       onClick={onClick}
//       primary={primary}
//       disabled={disabled}
//       size={size}
//       {...props}>
//       {text}
//     </StyledButton>
//   );
// };

// export default Button;
