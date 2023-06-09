import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <section>
        <h1>Amazing scientists</h1>
        <Profile />
        <Profile />
        <Profile />
      </section>

      <h1>Katherine Johnson</h1>
      <img src="https://i.imgur.com/MK3eW3Am.jpg" alt="Katherine Johnson" />
    </div>
  );
}

export default App;
function Profile() {
  return (
    <img
      src="https://i.imgur.com/MK3eW3Am.jpg"
      alt="Katherine Johnson"
    />
  )
}

