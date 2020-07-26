import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as productActions from "../../redux/actions/productActions";
import * as stockActions from "../../redux/actions/stockActions";
import { showConfirm } from "../common/showConfirm";
import * as toolBox from "../toolbox/index";

class StockList extends Component {
  componentDidMount() {
    this.props.actions.getProducts();
    this.props.actions.getStock();
    this.props.actions.getStockOperations();
  }

  componentDidUpdate(prevProps, prevState) {
    this.dataTable = toolBox.TableExtension("stock-list-table");
  }

  deleteStock = (stockId, event) => {
    let result = showConfirm("Are you sure, you want to delete stock item");
    if (result) {
      this.props.actions.deleteStock(stockId);
      if (this.dataTable !== undefined) this.dataTable.destroy();
    }
  };

  render() {
    return (
      <div>
        <h2 className="heading-medium list text-center">Stocks</h2>

        <table
          size="sm"
          id="stock-list-table"
          className="table table-striped table-hover full-width"
        >
          <thead className="thead-dark">
            <tr>
              <th>
                <toolBox.Button icon="add" linkTo="/savestock" />
              </th>
              <th>#</th>
              <th>Product Code</th>
              <th>Product Name</th>
              <th>Current Buy Price</th>
              <th>Current Sell Price</th>
              <th>Amount</th>
              <th>Unit Price</th>
              <th>Total Cost</th>
              <th>Sell Price</th>
              <th>Profit</th>
              <th>Total Price</th>
              <th>Operation</th>
              <th>Store</th>
              <th>Customer</th>
            </tr>
          </thead>
          <tbody>
            {this.props.stocks.map((stock) => (
              <tr key={stock.id}>
                <td className="table-buttons-container">
                  <toolBox.Button
                    linkTo={"/savestock/" + stock.id}
                    icon="edit"
                  />
                  <toolBox.Button
                    onClick={this.deleteStock.bind(this, stock.id)}
                    icon="delete"
                  />
                </td>
                <th scope="row">{stock.id}</th>
                <td>{stock.product?.productCode}</td>
                <td>{stock.product?.productName}</td>
                <td>{stock.product?.buyPrice}</td>
                <td>{stock.product?.sellPrice}</td>
                <td>{stock.amount}</td>
                <td>{stock.unitPrice}</td>
                <td>{stock.totalCost}</td>
                <td>{stock.sellPrice}</td>
                <td>{stock.profit}</td>
                <td>{stock.totalPrice}</td>
                <td>{stock.stockOperation?.name}</td>
                <td>{stock.store?.name}</td>
                <td>
                  {stock.stockOperation.id === 0 //Giriş
                    ? stock.customer?.name
                    : stock?.customer?.name + " " + stock?.customer?.surname}
                </td>
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
    products: state.productListReducer,
    stocks: state.stockListReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getProducts: bindActionCreators(productActions.getProducts, dispatch),
      getStock: bindActionCreators(stockActions.getStock, dispatch),
      deleteStock: bindActionCreators(stockActions.deleteStock, dispatch),
      getStockOperations: bindActionCreators(
        stockActions.getStockOperations,
        dispatch
      ),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StockList);
