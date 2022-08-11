import React, { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import AddUserModal from '../components/modals/AddUserModal';
import { fetchUsers, selectUsers } from '../features/users/usersSlice';

const Users = () => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector(selectUsers);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  interface IUser {
    _id: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  }

  return (
    <div className="container">
      <h1>Users</h1>

      <AddUserModal />

      <Table striped>
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
          {users.map((user: IUser, index: number) => (
            <tr key={index}>
              <th>{user._id}</th>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.createdAt}</td>
              <td>{user.updatedAt}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Users;
