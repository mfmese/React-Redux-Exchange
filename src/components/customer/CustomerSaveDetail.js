import React from "react";
import * as toolBox from "../toolbox/index";
import { Card, CardHeader, CardFooter, CardBody } from "reactstrap";

const CustomerSaveDetail = ({ customer, onSave, onChange, errors }) => {
  return (
    <form onSubmit={onSave}>
      <Card>
        <CardHeader>
          <div className="heading-medium detail-main">
            <toolBox.Button icon="back" linkTo={"/customers"} />
            <h2 className="heading-medium detail text-center">
              {customer.id ? "Customer Update" : "New Customer"}
            </h2>
          </div>
        </CardHeader>
        <CardBody>
          <toolBox.TextInput
            name="name"
            label="Customer Name"
            value={customer.name}
            onChange={onChange}
            error={errors.name}
          />
          <toolBox.TextInput
            name="surname"
            label="Customer Surname"
            value={customer.surname}
            onChange={onChange}
            error={errors.surname}
          />
          <toolBox.TextInput
            name="age"
            label="Age"
            value={customer.age}
            onChange={onChange}
            error={errors.age}
          />
          <toolBox.TextInput
            name="phones"
            label="Phones"
            value={customer.phones}
            onChange={onChange}
            error={errors.phones}
          />
          <toolBox.TextInput
            name="emails"
            label="Emails"
            value={customer.emails}
            onChange={onChange}
            error={errors.emails}
          />
          <toolBox.TextInput
            name="taxNo"
            label="Tax No"
            value={customer.taxNo}
            onChange={onChange}
            error={errors.taxNo}
          />
          <toolBox.TextInput
            name="tcNo"
            label="Tc No"
            value={customer.tcNo}
            onChange={onChange}
            error={errors.tcNo}
          />
          <toolBox.TextInput
            name="address"
            label="Address"
            value={customer.address}
            onChange={onChange}
            error={errors.address}
          />
          <toolBox.Button label="Save" buttonType="btn-success" />

          <toolBox.Button
            label="Cancel"
            buttonType="btn-danger"
            linkTo={"/customers"}
          />
        </CardBody>
        <CardFooter></CardFooter>
      </Card>
    </form>
  );
};

export default CustomerSaveDetail;
