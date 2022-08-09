import React, { useEffect, useState } from 'react';
import api from './lib/api';

const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get('/users').then((res) => setUsers(res.data));
  }, []);

  interface IUser {
    _id: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  }

  return (
    <div>
      <h1>Users</h1>

      {users.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Created At</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: IUser) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.createdAt}</td>
                <td>{user.updatedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </div>
  );
};

export default App;
