import React, { useState } from 'react';
import {
  Button,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { createUser, selectUsers } from '../../features/users/usersSlice';

interface IError {
  msg: string;
  param: string;
}

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

  const errorExists = (param: string): IError => {
    const errorObj: any = errors?.find((e: any) => e.param === param);
    return errorObj;
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
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                id="name"
                name="name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                invalid={errorExists('name') ? true : false}
              />

              {errorExists('name') ? (
                <FormFeedback>{errorExists('name').msg}</FormFeedback>
              ) : null}
            </FormGroup>

            <FormGroup>
              <Label for="email">Email Address</Label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                invalid={errorExists('email') ? true : false}
              />

              {errorExists('email') ? (
                <FormFeedback>{errorExists('email').msg}</FormFeedback>
              ) : null}
            </FormGroup>

            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                invalid={errorExists('password') ? true : false}
              />

              {errorExists('password') ? (
                <FormFeedback>{errorExists('password').msg}</FormFeedback>
              ) : null}
            </FormGroup>
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
