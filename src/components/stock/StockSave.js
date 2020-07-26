import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  saveStock,
  getStockOperations,
} from "../../redux/actions/stockActions";
import StockSaveDetail from "./StockSaveDetail";
import { getCustomers } from "../../redux/actions/customerActions";
import { getStores } from "../../redux/actions/storeActions";
import { getProducts } from "../../redux/actions/productActions";
import Helper from "../common/Helper";

function StockSave({
  stocks,
  products,
  stores,
  stockOperations,
  getStocks,
  getCustomers,
  getProducts,
  getStores,
  getStockOperations,
  customers,
  saveStock,
  history,
  ...props
}) {
  const [stock, setStock] = useState({ ...props.stock });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (customers.length === 0) {
      getCustomers();
    }
    if (stores.length === 0) {
      getStores();
    }
    if (products.length === 0) {
      getProducts();
    }
    if (stockOperations.length === 0) {
      getStockOperations();
    }

    setStock({ ...props.stock });
  }, [props.stock]);

  function handleChange(event) {
    const { name, value } = event.target;

    setStock((previousStock) => ({
      ...previousStock,
      [name]: name === "stockId" ? parseInt(value, 10) : value,
    }));

    validate(name, value);
  }

  function validate(name, value) {
    Helper.validate(
      name,
      value === "-1",
      "product",
      "Please choose a Product!",
      setErrors
    );

    Helper.validate(
      name,
      value === "-1",
      "store",
      "Please choose a Store!",
      setErrors
    );

    Helper.validate(
      name,
      value === "-1",
      "stockOperation",
      "Please choose a Stock Operation!",
      setErrors
    );

    Helper.validate(
      name,
      value === "-1",
      "customer",
      "Please choose a Customer!",
      setErrors
    );

    Helper.validate(
      name,
      value === "" || !Helper.isNumeric(value),
      "amount",
      "Please enter a valid Amount!",
      setErrors
    );

    Helper.validate(
      name,
      value === "" || !Helper.isNumeric(value),
      "unitPrice",
      "Please enter a valid Unit Price!",
      setErrors
    );

    Helper.validate(
      name,
      value === "" || !Helper.isNumeric(value),
      "taxFee",
      "Please enter a valid Tax Fee!",
      setErrors
    );

    Helper.validate(
      name,
      value === "" || !Helper.isNumeric(value),
      "brokerageFee",
      "Please enter a valid Brokerage Fee!",
      setErrors
    );

    Helper.validate(
      name,
      value === "" || !Helper.isNumeric(value),
      "totalCost",
      "Please enter a valid Total Cost!",
      setErrors
    );

    Helper.validate(
      name,
      value === "" || !Helper.isNumeric(value),
      "sellPrice",
      "Please enter a valid Sell Price!",
      setErrors
    );

    Helper.validate(
      name,
      value === "" || !Helper.isNumeric(value),
      "totalPrice",
      "Please enter a valid Total Price!",
      setErrors
    );
  }

  function handleSave(event) {
    event.preventDefault();

    if (typeof stock.product === "string") {
      let product = products.find(
        (product) => product.id === Number(stock.product)
      );
      stock.product = product;
    }
    if (typeof stock.stockOperation === "string") {
      let stockOperation = stockOperations.find(
        (stockOperation) => stockOperation.id === Number(stock.stockOperation)
      );
      stock.stockOperation = stockOperation;
    }
    if (typeof stock.customer === "string") {
      let customer = customers.find(
        (customer) => customer.id === Number(stock.customer)
      );
      stock.customer = customer;
    }
    if (typeof stock.store === "string") {
      let store = stores.find((store) => store.id === Number(stock.store));
      stock.store = store;
    }

    saveStock(stock).then(() => {
      history.push("/stocks");
    });
  }

  return (
    <StockSaveDetail
      stock={stock}
      products={products}
      stores={stores}
      stockOperations={stockOperations}
      customers={customers}
      onChange={handleChange}
      onSave={handleSave}
      errors={errors}
    />
  );
}

export function getStockById(stocks, stockId) {
  let stock = stocks.find((stock) => stock.id === Number(stockId)) || null;
  return stock;
}

//ownProps query string okumak için kullanılıyor
function mapStateToProps(state, ownProps) {
  const stockId = ownProps.match.params.stockId;
  const stock =
    stockId && state.stockListReducer.length > 0
      ? getStockById(state.stockListReducer, stockId)
      : {};

  return {
    stock,
    stocks: state.stockListReducer,
    products: state.productListReducer,
    stockOperations: state.stockOperationListReducer,
    customers: state.customerListReducer,
    stores: state.storeListReducer,
  };
}

const mapDispatchToProps = {
  saveStock,
  getCustomers,
  getStores,
  getProducts,
  getStockOperations,
};

export default connect(mapStateToProps, mapDispatchToProps)(StockSave);
