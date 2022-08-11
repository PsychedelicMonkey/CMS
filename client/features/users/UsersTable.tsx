import React, { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchUsers, selectUsers } from './usersSlice';

interface IUser {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

const UsersTable = () => {
  const dispatch = useAppDispatch();
  const { users, status } = useAppSelector(selectUsers);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  return (
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
  );
};

export default UsersTable;
