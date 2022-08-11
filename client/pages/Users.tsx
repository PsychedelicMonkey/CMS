import React from 'react';

import AddUserModal from '../components/modals/AddUserModal';
import UsersTable from '../features/users/UsersTable';

const Users = () => {
  return (
    <div className="container">
      <h1>Users</h1>

      <AddUserModal />
      <UsersTable />
    </div>
  );
};

export default Users;
