import React, { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const DropDown = ({ header, items, onChange }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret>{header}</DropdownToggle>
      <DropdownMenu onChange={onChange}>
        {items.map((item) => (
          <DropdownItem key={item.id}>{item.name}</DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropDown;
