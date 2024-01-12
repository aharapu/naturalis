
import React, { useState } from "react";

interface SubmitButtonProps {
    text? : string;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({ text }) => {

    const [hover, setHover] = useState(false);

    const toggleHover = () => {
        setHover(!hover);
    };

    const defaultButtonStyle: React.CSSProperties = {
        width: "130px",
        height: "45px",
        borderRadius: "9px",
        backgroundColor: "darkblue",
        color: "white",
        fontWeight: "700",
        letterSpacing: ".1rem",
        cursor: "pointer",
    }

    if (hover) {
        defaultButtonStyle.backgroundColor = "lightblue";
        defaultButtonStyle.color = "black";
    }

    return (
        <button 
            style={defaultButtonStyle}
            onMouseEnter={toggleHover}
            onMouseLeave={toggleHover}
            >
            {text ?? "Done"}
        </button>
    )  
}
