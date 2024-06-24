import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div data-testId="counter">
      <div data-testId="counter-description">
        The value of counter is <span data-testId="counter-value">{count}</span>
      </div>
      <div>
        <button
          data-testId="button-increase"
          onClick={() => setCount(count + 1)}
        >
          Increase
        </button>
        <button
          data-testId="button-decrease"
          onClick={() => setCount(count - 1)}
        >
          Decrease
        </button>
      </div>
    </div>
  );
}

export default Counter;
