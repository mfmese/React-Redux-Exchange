import React from "react";
import * as toolBox from "../toolbox/index";
import Helper from "../common/Helper";

const OrderSaveDetail = ({
  products,
  order,
  orderTypes,
  stores,
  unitTypes,
  onSave,
  setOrder,
  onChange,
  errors,
}) => {
  let chooseItem = Helper.getChooseItem();

  let header = "";

  if (order.id) {
    header = "Order Update";
  } else {
    header = "New Order";

    let currentDate = Helper.getCurrentDateString();
    if (order.entryDate === undefined) {
      setOrder((order) => ({ ...order, entryDate: currentDate }));
    }

    if (order.modifiedDate === undefined) {
      setOrder((order) => ({ ...order, modifiedDate: currentDate }));
    }
  }

  function onChangeUnitPriceUnitType(e) {
    onChange(e);

    let product = getSelectedProduct();

    if (product === undefined) return;

    let unitPrice = getUnitPrice(product);

    if (unitPrice === null) return;

    setOrder((order) => ({
      ...order,
      unitPrice: unitPrice,
      unitType: product.unitType,
    }));
  }

  function getUnitPrice(product) {
    let orderTypeElement = document.getElementsByName("orderType")[0];

    let orderTypeId =
      orderTypeElement.options[orderTypeElement.selectedIndex].value;

    if (orderTypeId === String(1)) return product.buyPrice;
    else if (orderTypeId === String(2)) return product.sellPrice;

    return null;
  }

  function getSelectedProduct() {
    let productElement = document.getElementsByName("product")[0];

    let productId = productElement.options[productElement.selectedIndex].value;

    return products.find((x) => x.id === Number(productId));
  }

  function onKeyUpTotalPrice(e) {
    // let value = e.target.value;

    let amount = document.getElementsByName("amount")[0].value;
    let unitPrice = document.getElementsByName("unitPrice")[0].value;
    setOrder((order) => ({
      ...order,
      totalPrice: Number(amount) * Number(unitPrice),
    }));
  }

  return (
    <form onSubmit={onSave} id="ordersave">
      <div className="heading-medium detail-main">
        <toolBox.Button icon="back" linkTo={"/orders"} />
        <h2 className="heading-medium detail text-center"> {header}</h2>
      </div>

      <toolBox.SelectInput
        name="orderType"
        label="Order Type"
        value={order.orderType?.id}
        defaultOption={chooseItem}
        options={orderTypes.map((orderType) => ({
          value: orderType.id,
          text: orderType.name,
        }))}
        onChange={onChangeUnitPriceUnitType.bind(this)}
        error={errors.orderType}
      />
      <toolBox.SelectInput
        name="product"
        label="Product"
        value={order.product?.id}
        defaultOption={chooseItem}
        options={products.map((product) => ({
          value: product.id,
          text: product.productName,
        }))}
        onChange={onChangeUnitPriceUnitType.bind(this)}
        error={errors.product}
      />
      <toolBox.TextInput
        name="unitPrice"
        label="Unit Price"
        value={order.unitPrice}
        onChange={onChange}
        error={errors.unitPrice}
        onKeyUp={onKeyUpTotalPrice}
      />
      <toolBox.TextInput
        name="amount"
        label="Amount"
        value={order.amount}
        onChange={onChange}
        error={errors.amount}
        onKeyUp={onKeyUpTotalPrice}
      />
      <toolBox.SelectInput
        name="unitType"
        label="Unit Type"
        value={order.unitType?.id}
        defaultOption={chooseItem}
        options={unitTypes.map((unitType) => ({
          value: unitType.id,
          text: unitType.name,
        }))}
        onChange={onChange}
        error={errors.unitType}
      />
      <toolBox.SelectInput
        name="store"
        label="Store"
        value={order.store?.id}
        defaultOption={chooseItem}
        options={stores.map((store) => ({
          value: store.id,
          text: store.name,
        }))}
        onChange={onChange}
        error={errors.store}
      />
      <toolBox.TextInput
        name="totalPrice"
        label="Total Price"
        value={order.totalPrice}
        onChange={onChange}
        error={errors.totalPrice}
      />
      <toolBox.DateTime
        name="entryDate"
        label="Entry Date"
        value={order.entryDate}
        onChange={onChange}
        error={errors.entryDate}
      />
      <toolBox.DateTime
        name="modifiedDate"
        label="Modified Date"
        value={order.modifiedDate}
        onChange={onChange}
        error={errors.modifiedDate}
      />
      <toolBox.Button label="Save" buttonType="btn-success" />
      <toolBox.Button
        label="Cancel"
        buttonType="btn-danger"
        linkTo={"/orders"}
      />
    </form>
  );
};

export default OrderSaveDetail;
