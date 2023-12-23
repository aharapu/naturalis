import React from "react";

interface SillyTestButtonProps {
  text?: string;
}

const SillyTestButton: React.FC<SillyTestButtonProps> = ({ text }) => {
  return (
    <button style={{ width: "50px", height: "50px", backgroundColor: "lightpink", borderRadius: "50%" }}>
      {text ?? "PUSH ME!"}
    </button>
  );
};

export default SillyTestButton;
