import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as customerActions from "../../redux/actions/customerActions";
import { showConfirm } from "../common/showConfirm";
import * as toolBox from "../toolbox/index";

class CustomerList extends Component {
  componentDidMount() {
    this.props.actions.getCustomers();
  }

  componentDidUpdate(prevProps, prevState) {
    this.dataTable = toolBox.TableExtension("customer-list-table");
  }

  deleteCustomer = (customerId, event) => {
    let result = showConfirm("Are you sure, you want to delete customer item");
    if (result) {
      this.props.actions.deleteCustomer(customerId);
      if (this.dataTable !== undefined) this.dataTable.destroy();
    }
  };

  render() {
    return (
      <div>
        <h2 className="heading-medium list text-center">Customers</h2>

        <table
          size="sm"
          id="customer-list-table"
          className="table table-striped table-hover full-width"
        >
          <thead className="thead-dark">
            <tr>
              <th>
                <toolBox.Button icon="add" linkTo="/saveCustomer" />
              </th>
              <th>#</th>
              <th>Customer Name</th>
              <th>Surname</th>
              <th>Age</th>
              <th>Phones</th>
              <th>Emails</th>
              <th>Tax No</th>
              <th>Tc No</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {this.props.customers.map((customer) => (
              <tr key={customer.id}>
                <td className="table-buttons-container">
                  <toolBox.Button
                    linkTo={"/savecustomer/" + customer.id}
                    icon="edit"
                  />
                  <toolBox.Button
                    onClick={this.deleteCustomer.bind(this, customer.id)}
                    icon="delete"
                  />
                </td>
                <th scope="row">{customer.id}</th>
                <td>{customer.name}</td>
                <td>{customer.surname}</td>
                <td>{customer.age}</td>
                <td>
                  <toolBox.SelectInput
                    options={customer.phones?.map((phone) => ({
                      value: phone,
                      text: phone,
                    }))}
                    name="phones"
                    defaultOption={{
                      value: customer.phones[0],
                      text: customer.phones[0],
                    }}
                  />
                </td>
                <td>
                  <toolBox.SelectInput
                    options={customer.emails?.map((email) => ({
                      value: email,
                      text: email,
                    }))}
                    name="emails"
                    defaultOption={{
                      value: customer.emails[0],
                      text: customer.emails[0],
                    }}
                  />
                </td>
                <td>{customer.taxNo}</td>
                <td>{customer.tcNo}</td>
                <td>{customer.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    customers: state.customerListReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getCustomers: bindActionCreators(customerActions.getCustomers, dispatch),
      deleteCustomer: bindActionCreators(
        customerActions.deleteCustomer,
        dispatch
      ),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerList);
