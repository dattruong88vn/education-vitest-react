import React from "react";
import ThemeContext from "../../../context/themeContext";

interface CongratsProps {
  success: boolean;
}

const Congrats = ({ success }: CongratsProps) => {
  const { theme } = React.useContext(ThemeContext);
  return (
    <div
      data-testid="congrats"
      style={{ color: theme === "light" ? "red" : "yellow" }}
    >
      {success ? "You guessed correctly!" : ""}
    </div>
  );
};

export default Congrats;
