import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getProducts } from "../../redux/actions/productActions";
import { saveOrder, getOrderTypes } from "../../redux/actions/orderActions";
import OrderSaveDetail from "./OrderSaveDetail";
import { getStores } from "../../redux/actions/storeActions";
import { getUnitTypes } from "../../redux/actions/unitTypeActions";
import Helper from "../common/Helper";

function OrderSave({
  orders,
  products,
  stores,
  unitTypes,
  orderTypes,
  getProducts,
  getOrders,
  getOrderTypes,
  getStores,
  getUnitTypes,
  saveOrder,
  history,
  ...props
}) {
  const [order, setOrder] = useState({ ...props.order });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (products.length === 0) {
      getProducts();
    }
    if (stores.length === 0) {
      getStores();
    }
    if (unitTypes.length === 0) {
      getUnitTypes();
    }
    if (orderTypes.length === 0) {
      getOrderTypes();
    }
    setOrder({ ...props.order });
  }, [props.order]);

  function handleChange(event) {
    const { name, value } = event.target;

    setOrder((previousOrder) => ({
      ...previousOrder,
      [name]: name === "orderId" ? parseInt(value, 10) : value,
    }));

    validate(name, value);
  }

  function validate(name, value) {
    Helper.validate(
      name,
      value === "-1",
      "orderType",
      "Please choose an OrderType!",
      setErrors
    );

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
      "unitType",
      "Please choose a UnitType!",
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
      value === "" || !Helper.isNumeric(value),
      "unitPrice",
      "Please enter a UnitPrice!",
      setErrors
    );

    Helper.validate(
      name,
      value === "" || !Helper.isNumeric(value),
      "amount",
      "Please enter a numeric Amount!",
      setErrors
    );

    Helper.validate(
      name,
      value === "" || !Helper.isNumeric(value),
      "totalPrice",
      "Please enter a numeric TotalPrice!",
      setErrors
    );
  }

  function handleSave(event) {
    event.preventDefault();

    if (typeof order.product === "string") {
      let product = products.find(
        (product) => product.id === Number(order.product)
      );
      order.product = product;
    }
    if (typeof order.unitType === "string") {
      let unitType = unitTypes.find(
        (unitType) => unitType.id === Number(order.unitType)
      );
      order.unitType = unitType;
    }
    if (typeof order.store === "string") {
      let store = stores.find((store) => store.id === Number(order.store));
      order.store = store;
    }
    if (typeof order.orderType === "string") {
      let orderType = orderTypes.find(
        (orderType) => orderType.id === Number(order.orderType)
      );
      order.orderType = orderType;
    }

    saveOrder(order).then(() => {
      history.push("/orders");
    });
  }

  return (
    <OrderSaveDetail
      order={order}
      stores={stores}
      orderTypes={orderTypes}
      unitTypes={unitTypes}
      products={products}
      onChange={handleChange}
      onSave={handleSave}
      setOrder={setOrder}
      errors={errors}
    />
  );
}

export function getOrderById(orders, orderId) {
  let order = orders.find((order) => order.id === Number(orderId)) || null;
  return order;
}

//ownProps query string okumak için kullanılıyor
function mapStateToProps(state, ownProps) {
  const orderId = ownProps.match.params.orderId;
  const order =
    orderId && state.orderListReducer.length > 0
      ? getOrderById(state.orderListReducer, orderId)
      : {};

  return {
    order,
    orders: state.orderListReducer,
    products: state.productListReducer,
    stores: state.storeListReducer,
    unitTypes: state.unitTypeListReducer,
    orderTypes: state.orderTypeListReducer,
  };
}

const mapDispatchToProps = {
  saveOrder,
  getProducts,
  getStores,
  getUnitTypes,
  getOrderTypes,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderSave);
