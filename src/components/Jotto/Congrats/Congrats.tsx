import { useThemeCtx } from "../../../context/themeContext";

interface CongratsProps {
  success: boolean;
}

const Congrats = ({ success }: CongratsProps) => {
  const { theme } = useThemeCtx();
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
