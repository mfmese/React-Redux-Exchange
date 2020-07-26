import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as orderActions from "../../redux/actions/orderActions";
import * as stockActions from "../../redux/actions/stockActions";
import * as customerActions from "../../redux/actions/customerActions";
import { showConfirm } from "../common/showConfirm";
import * as toolBox from "../toolbox/index";
import Sell from "./Sell";

class OrderList extends Component {
  state = { selectedCustomer: {} };

  componentDidMount() {
    this.props.actions.getOrders();
    this.props.actions.getCustomers();
  }

  componentDidUpdate(prevProps, prevState) {
    this.dataTable = toolBox.TableExtension("order-list-table");
  }

  deleteOrder = (orderId, event) => {
    let result = showConfirm("Are you sure, you want to delete order item");
    if (result) {
      this.props.actions.deleteOrder(orderId);
      if (this.dataTable !== undefined) this.dataTable.destroy();
    }
  };

  customerChange = (event) => {
    let customerSelectedValue =
      event.nativeEvent.target.selectedOptions[0].value;
    let selectedCustomer = this.props.customers.find(
      (x) => x.id == customerSelectedValue
    );
    this.setState({ selectedCustomer: selectedCustomer });
  };

  render() {
    return (
      <div>
        <h2 className="heading-medium list text-center">Orders</h2>

        <toolBox.SelectInput
          options={this.props.customers.map((customer) => ({
            value: customer.id,
            text: customer.name,
          }))}
          name="customers"
          className="filter-table"
          label="Filter Customers"
          onChange={this.customerChange}
        />

        <table
          size="sm"
          id="order-list-table"
          className="table table-striped table-hover full-width"
        >
          <thead className="thead-dark">
            <tr>
              <th>
                <toolBox.Button icon="add" linkTo="/saveorder" />
              </th>
              <th>#</th>
              <th>Product Code</th>
              <th>Product Name</th>
              <th>Amount</th>
              <th>Amount Type</th>
              <th>Unit Price</th>
              <th>Total Price</th>
              <th>Store</th>
              <th>Order Type</th>
              <th>Entry Date</th>
              <th>Modified Date</th>
            </tr>
          </thead>
          <tbody>
            {this.props.orders.map((order) => (
              <tr key={order.id}>
                <td className="table-buttons-container">
                  <toolBox.Button
                    linkTo={"/saveorder/" + order.id}
                    icon="edit"
                  />
                  <toolBox.Button
                    onClick={this.deleteOrder.bind(this, order.id)}
                    icon="delete"
                  />
                </td>
                <th scope="row">{order.id}</th>
                <td>{order.product?.productCode}</td>
                <td>{order.product?.productName}</td>
                <td>{order.amount}</td>
                <td>{order.unitType?.name}</td>
                <td>{order.unitPrice}</td>
                <td>{order.totalPrice}</td>
                <td>{order.store?.name}</td>
                <td>{order.orderType?.name}</td>
                <td>{order.entryDate}</td>
                <td>{order.modifiedDate}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="function-buttons">
          <toolBox.Button
            // onClick={new Sell().handleSaveToStock.bind(
            //   this,
            //   this.props.orders,
            //   this.props.actions.saveStock
            // )}
            label="Alış"
          />
          <toolBox.Button
            onClick={new Sell().handleSaveToStock.bind(
              this,
              this.props.orders,
              this.state.selectedCustomer,
              this.props.actions.saveStock,
              this.props.actions.deleteOrder
            )}
            label="Satış"
          />
          <toolBox.Button
            // onClick={this.deleteOrder.bind(this, order.id)}
            label="Sipariş"
          />
          <toolBox.Button
            // onClick={this.deleteOrder.bind(this, order.id)}
            label="Teklif"
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    orders: state.orderListReducer,
    customers: state.customerListReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      deleteOrder: bindActionCreators(orderActions.deleteOrder, dispatch),
      getOrders: bindActionCreators(orderActions.getOrders, dispatch),
      saveStock: bindActionCreators(stockActions.saveStock, dispatch),
      getCustomers: bindActionCreators(customerActions.getCustomers, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderList);
