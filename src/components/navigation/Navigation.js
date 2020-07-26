import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  // UncontrolledDropdown,
  // DropdownToggle,
  // DropdownMenu,
  // DropdownItem,
  // NavbarText,
} from "reactstrap";

const Navigation = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="dark" light expand="md">
        <div className="container">
          <Link to="/">Exchange Profit</Link>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar id="navbar">
            <Nav className="mr-auto" navbar>
              {/* <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Option 1</DropdownItem>
                <DropdownItem>Option 2</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Reset</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown> */}
            </Nav>
            {/* <NavbarText>Simple Text</NavbarText> */}
            <NavItem>
              <Link to="/products">Products</Link>
            </NavItem>
            <NavItem>
              <Link to="/categories">Categories</Link>
            </NavItem>
            <NavItem>
              <Link to="/stocks">Stock</Link>
            </NavItem>
            <NavItem>
              <Link to="/stores">Store</Link>
            </NavItem>
            <NavItem>
              <Link to="/customers">Customers</Link>
            </NavItem>
            <NavItem>
              <Link to="/orders">Order</Link>
            </NavItem>
          </Collapse>
        </div>
      </Navbar>
    </div>
  );
};

export default Navigation;
