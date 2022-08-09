import React from 'react';
import { Button } from 'reactstrap';
import { useAppSelector, useAppDispatch } from '../app/hooks';

import {
  decrement,
  increment,
  selectCount,
} from '../features/counter/counterSlice';

const Home = () => {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();

  return (
    <div className="container">
      <h1>Home Page</h1>

      <div className="d-flex">
        <Button className="mx-2" onClick={() => dispatch(decrement())}>
          -
        </Button>
        <h3>{count}</h3>
        <Button className="mx-2" onClick={() => dispatch(increment())}>
          +
        </Button>
      </div>
    </div>
  );
};

export default Home;
