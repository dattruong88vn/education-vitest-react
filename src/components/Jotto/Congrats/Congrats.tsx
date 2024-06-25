interface CongratsProps {
  success: boolean;
}

const Congrats = ({ success }: CongratsProps) => {
  return (
    <div data-testid="congrats">{success ? "You guessed correctly!" : ""}</div>
  );
};

export default Congrats;
