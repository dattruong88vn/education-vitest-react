interface CongratsProps {
  success: boolean;
}

const Congrats = ({ success }: CongratsProps) => {
  return (
    <div data-testId="congrats">{success ? "You guessed correctly!" : ""}</div>
  );
};

export default Congrats;
