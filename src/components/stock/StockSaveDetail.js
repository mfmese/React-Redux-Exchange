import React from "react";
import * as toolBox from "../toolbox/index";
import Helper from "../common/Helper";

const StockSaveDetail = ({
  stock,
  products,
  stockOperations,
  stores,
  operations,
  customers,
  onSave,
  onChange,
  errors,
}) => {
  return (
    <form onSubmit={onSave}>
      <div className="heading-medium detail-main">
        <toolBox.Button icon="back" linkTo={"/stocks"} />
        <h2 className="heading-medium detail text-center">
          {stock.id ? "Stock Update" : "New Stock"}
        </h2>
      </div>

      <toolBox.SelectInput
        name="product"
        label="Product"
        value={stock.product?.id}
        defaultOption={Helper.getChooseItem()}
        options={products.map((product) => ({
          value: product.id,
          text: product.productName,
        }))}
        onChange={onChange}
        error={errors.product}
      />
      <toolBox.TextInput
        name="amount"
        label="Amount"
        value={stock.amount}
        onChange={onChange}
        error={errors.amount}
      />
      <toolBox.TextInput
        name="unitPrice"
        label="Unit Price"
        value={stock.unitPrice}
        onChange={onChange}
        error={errors.unitPrice}
      />
      <toolBox.TextInput
        name="taxFee"
        label="Tax Fee"
        value={stock.taxFee}
        onChange={onChange}
        error={errors.taxFee}
      />
      <toolBox.TextInput
        name="brokerageFee"
        label="Brokerage Fee"
        value={stock.brokerageFee}
        onChange={onChange}
        error={errors.brokerageFee}
      />
      <toolBox.TextInput
        name="totalCost"
        label="Total Cost"
        value={stock.totalCost}
        onChange={onChange}
        error={errors.totalCost}
      />
      <toolBox.TextInput
        name="sellPrice"
        label="Sell Price"
        value={stock.sellPrice}
        onChange={onChange}
        error={errors.sellPrice}
      />
      <toolBox.TextInput
        name="totalPrice"
        label="Total rice"
        value={stock.totalPrice}
        onChange={onChange}
        error={errors.totalPrice}
      />
      <toolBox.SelectInput
        name="store"
        label="Store"
        value={stock.store?.id}
        defaultOption={Helper.getChooseItem()}
        options={stores.map((store) => ({
          value: store.id,
          text: store.name,
        }))}
        onChange={onChange}
        error={errors.store}
      />
      <toolBox.SelectInput
        name="stockOperation"
        label="Operation"
        value={stock.stockOperation?.id}
        defaultOption={Helper.getChooseItem()}
        options={stockOperations.map((operation) => ({
          value: operation.id,
          text: operation.name,
        }))}
        onChange={onChange}
        error={errors.stockOperation}
      />
      <toolBox.SelectInput
        name="customer"
        label="Customer"
        value={stock.customer?.id}
        defaultOption={Helper.getChooseItem()}
        options={customers.map((customer) => ({
          value: customer.id,
          text: customer.name,
        }))}
        onChange={onChange}
        error={errors.customer}
      />

      <toolBox.Button label="Save" buttonType="btn-success" />
      <toolBox.Button
        label="Cancel"
        buttonType="btn-danger"
        linkTo={"/stocks"}
      />
    </form>
  );
};

export default StockSaveDetail;
