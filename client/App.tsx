import React, { useEffect, useState } from 'react';

const App = () => {
  const [msg, setMsg] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/')
      .then((res) => res.json())
      .then((data) => setMsg(data.msg));
  }, []);

  return (
    <div>
      <h1>React App</h1>
      {msg ? <h3>{msg}</h3> : null}
    </div>
  );
};

export default App;
