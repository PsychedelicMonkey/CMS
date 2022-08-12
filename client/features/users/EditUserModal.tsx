import React, { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Form,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import FormInput from '../../components/form/FormInput';
import { selectUsers, updateUser } from './usersSlice';

type Props = {
  id: string;
};

const EditUserModal = ({ id }: Props) => {
  const [modal, setModal] = useState(false);
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useAppDispatch();
  const { users, status, errors } = useAppSelector(selectUsers);

  const toggle = () => setModal(!modal);
  const onDismiss = () => setVisible(false);

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(updateUser({ id, name, email }));
  };

  useEffect(() => {
    const user = users.find((u) => u._id === id)!;
    setName(user.name);
    setEmail(user.email);
  }, [modal, status, dispatch]);

  return (
    <>
      <Button onClick={() => setModal(true)}>Edit</Button>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Edit User</ModalHeader>
        <Form onSubmit={onSubmit}>
          <ModalBody>
            <Alert color="success" isOpen={visible} toggle={onDismiss}>
              User updated successfully
            </Alert>

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
          </ModalBody>
          <ModalFooter>
            <Button type="submit" color="primary">
              Update User
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

export default EditUserModal;
