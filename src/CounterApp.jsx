import React, { useState } from "react";
function CounterApp() {
  const [count, setCount] = useState(0);

  const increment = () => {
    if (count >= 10) {
      alert("jgn banyak-banyak lah bro");
    } else {
      setCount(count + 1);
    }
  };

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    } else {
      alert("aduh gabole 0");
    }
  };

  const reset = () => {
    if (count === 0) {
      alert("udah 0 loh");
    } else {
      setCount(0);
      alert("abeneran mau direset?");
    }
  };

  return (
    <div>
      <p>Count : {count}</p>

      <button onClick={increment}>increment</button>
      <button onClick={decrement}>decrement</button>
      <button onClick={reset}>reset</button>
    </div>
  );
}
export default CounterApp;
