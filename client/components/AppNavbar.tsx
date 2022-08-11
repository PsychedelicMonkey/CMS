import React, { useState } from 'react';
import {
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  NavbarBrand,
  NavItem,
  NavLink,
  NavbarText,
  NavbarToggler,
  UncontrolledDropdown,
} from 'reactstrap';
import { Link } from 'react-router-dom';

const AppNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar light color="light" expand="md">
      <NavbarBrand to="/" tag={Link}>
        reactstrap
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="me-auto" navbar>
          <NavItem>
            <NavLink to="/users" tag={Link}>
              Users
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/login" tag={Link}>
              Log In
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/register" tag={Link}>
              Register
            </NavLink>
          </NavItem>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Options
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>My Profile</DropdownItem>
              <DropdownItem>Settings</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Log Out</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        <NavbarText>Simple Text</NavbarText>
      </Collapse>
    </Navbar>
  );
};

export default AppNavbar;
