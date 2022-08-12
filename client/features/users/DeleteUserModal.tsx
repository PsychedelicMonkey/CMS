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
import { deleteUser, selectUsers } from './usersSlice';

type Props = {
  id: string;
};

const DeleteUserModal = ({ id }: Props) => {
  const [modal, setModal] = useState(false);
  const dispatch = useAppDispatch();

  const toggle = () => setModal(!modal);

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(deleteUser({ id }));
  };

  return (
    <>
      <Button color="danger" onClick={toggle}>
        Delete
      </Button>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Delete User</ModalHeader>
        <Form onSubmit={onSubmit}>
          <ModalBody>
            <h5>
              <b>WARNING</b> You cannot undo this action.
            </h5>
            <p>Are you sure you want to delete this user?</p>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" color="danger">
              Delete User
            </Button>

            <Button onClick={toggle}>Cancel</Button>
          </ModalFooter>
        </Form>
      </Modal>
    </>
  );
};

export default DeleteUserModal;
