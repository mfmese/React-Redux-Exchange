import React from "react";
import { Input, FormGroup, Label, FormFeedback } from "reactstrap";

const DateTime = ({ name, label, onChange, placeHolder, value, error }) => {
  if (error && error.length > 0) {
    return (
      <FormGroup>
        <Label for={name}>{label}</Label>
        <Input
          Invalid
          type="date"
          name={name}
          id={name}
          placeholder={placeHolder}
          onChange={onChange}
          value={value}
        />
        <FormFeedback>{error}</FormFeedback>
      </FormGroup>
    );
  } else {
    return (
      <FormGroup>
        <Label for={name}>{label}</Label>
        <Input
          type="date"
          name={name}
          id={name}
          placeholder={placeHolder}
          onChange={onChange}
          value={value}
        />
      </FormGroup>
    );
  }
};

export default DateTime;
