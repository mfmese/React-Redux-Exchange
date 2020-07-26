import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { saveCustomer } from "../../redux/actions/customerActions";
import CustomerSaveDetail from "./CustomerSaveDetail";
import Helper from "../common/Helper";

function CustomerSave({
  customers,
  getCategories,
  saveCustomer,
  history,
  ...props
}) {
  const [customer, setCustomer] = useState({ ...props.customer });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setCustomer({ ...props.customer });
  }, [props.customer]);

  function handleChange(event) {
    const { name, value } = event.target;

    setCustomer((previousCustomer) => ({
      ...previousCustomer,
      [name]: name === "id" ? parseInt(value, 10) : value,
    }));

    validate(name, value);
  }

  function validate(name, value) {
    Helper.validate(
      name,
      value === "",
      "name",
      "Please enter a Customer Name!",
      setErrors
    );

    Helper.validate(
      name,
      value === "",
      "surname",
      "Please enter a Customer Surname!",
      setErrors
    );

    Helper.validate(
      name,
      value === "" || !Helper.isNumeric(value),
      "age",
      "Please enter a Customer Age!",
      setErrors
    );

    Helper.validate(
      name,
      value === "",
      "phones",
      "Please enter Phones with ',' seperator!",
      setErrors
    );

    Helper.validate(
      name,
      value === "",
      "emails",
      "Please enter Emails with ',' seperator!",
      setErrors
    );

    Helper.validate(
      name,
      value === "" || !Helper.isNumeric(value),
      "taxNo",
      "Please enter a valid Tax No!",
      setErrors
    );

    Helper.validate(
      name,
      value === "" || !Helper.isNumeric(value),
      "tcNo",
      "Please enter a valid TC No!",
      setErrors
    );
  }

  function handleSave(event) {
    event.preventDefault();

    if (customer.phones && typeof customer.phones === "string") {
      customer.phones = customer.phones.split(",");
    }
    if (customer.emails && typeof customer.emails === "string") {
      customer.emails = customer.emails.split(",");
    }

    saveCustomer(customer).then(() => {
      history.push("/customers");
    });
  }
  return (
    <CustomerSaveDetail
      customer={customer}
      onChange={handleChange}
      onSave={handleSave}
      errors={errors}
    />
  );
}

export function getCustomerById(customers, customerId) {
  let customer =
    customers.find((customer) => customer.id === Number(customerId)) || null;
  return customer;
}

//ownProps query string okumak için kullanılıyor
function mapStateToProps(state, ownProps) {
  const customerId = ownProps.match.params.customerId;
  const customer =
    customerId && state.customerListReducer.length > 0
      ? getCustomerById(state.customerListReducer, customerId)
      : {};

  return {
    customer,
    customers: state.customerListReducer,
  };
}

const mapDispatchToProps = {
  saveCustomer,
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerSave);
