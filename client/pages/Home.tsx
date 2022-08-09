import React from 'react';
import { Button } from 'reactstrap';
import { useAppSelector, useAppDispatch } from '../app/hooks';

import { decrement, increment } from '../features/counter/counterSlice';

const Home = () => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div>
      <h1>Home Page</h1>

      <Button onClick={() => dispatch(decrement())}>-</Button>
      <h3>{count}</h3>
      <Button onClick={() => dispatch(increment())}>+</Button>
    </div>
  );
};

export default Home;
