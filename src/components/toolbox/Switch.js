import React from "react";
import { CustomInput, FormGroup } from "reactstrap";

const Switch = ({ name, label, onChange, value, error }) => {
  return (
    <FormGroup>
      <div>
        <CustomInput
          type="switch"
          id={name}
          name={name}
          label={label}
          onChange={onChange}
          checked={value}
          error={error}
        />
      </div>
    </FormGroup>
  );
};

export default Switch;
