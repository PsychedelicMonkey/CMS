import React, { useState } from 'react';
import {
  Button,
  Form,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { createUser, selectUsers } from '../../features/users/usersSlice';
import FormInput from '../../components/form/FormInput';

const AddUserModal = () => {
  const [modal, setModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const { errors } = useAppSelector(selectUsers);

  const toggle = () => setModal(!modal);

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(createUser({ name, email, password }));
  };

  return (
    <>
      <Button color="primary" onClick={toggle}>
        Add New User
      </Button>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add New User</ModalHeader>
        <Form onSubmit={onSubmit}>
          <ModalBody>
            <FormInput
              label="Name"
              type="text"
              id="name"
              name="name"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              errors={errors}
            />

            <FormInput
              label="Email Address"
              type="email"
              id="email"
              name="email"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              errors={errors}
            />

            <FormInput
              label="Password"
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              errors={errors}
            />
          </ModalBody>
          <ModalFooter>
            <Button type="submit" color="primary">
              Create User
            </Button>
            <Button type="button" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </>
  );
};

export default AddUserModal;
