import React from "react";
import * as toolBox from "../toolbox/index";
import Helper from "../common/Helper";

const ProductSaveDetail = ({
  categories,
  product,
  onSave,
  onChange,
  errors,
  unitTypes,
}) => {
  return (
    <form onSubmit={onSave}>
      <div className="heading-medium detail-main">
        <toolBox.Button icon="back" linkTo={"/products"} />
        <h2 className="heading-medium detail text-center">
          {product.id ? "Product Update" : "New Product"}
        </h2>
      </div>

      <toolBox.TextInput
        name="productCode"
        label="Product Code"
        value={product.productCode}
        onChange={onChange}
        error={errors.productCode}
      />
      <toolBox.TextInput
        name="productName"
        label="Product Name"
        value={product.productName}
        onChange={onChange}
        error={errors.productName}
      />
      <toolBox.SelectInput
        name="category"
        label="Category"
        value={product.category?.id}
        defaultOption={Helper.getChooseItem()}
        options={categories.map((category) => ({
          value: category?.id,
          text: category?.categoryName,
        }))}
        onChange={onChange}
        error={errors.category}
      />
      <toolBox.SelectInput
        name="unitType"
        label="Unit Type"
        value={product.unitType?.id}
        defaultOption={Helper.getChooseItem()}
        options={unitTypes.map((unitType) => ({
          value: unitType.id,
          text: unitType.name,
        }))}
        onChange={onChange}
        error={errors.unitType}
      />
      <toolBox.TextInput
        name="buyPrice"
        label="Buy Price"
        value={product.buyPrice}
        onChange={onChange}
        error={errors.buyPrice}
      />
      <toolBox.TextInput
        name="sellPrice"
        label="Sell Price"
        value={product.sellPrice}
        onChange={onChange}
        error={errors.sellPrice}
      />
      <toolBox.TextInput
        name="properties"
        label="Properties"
        value={product.properties}
        onChange={onChange}
        error={errors.properties}
      />
      <toolBox.TextInput
        name="minStockAmount"
        label="Min Stock Amount"
        value={product.minStockAmount}
        onChange={onChange}
        error={errors.minStockAmount}
      />
      <toolBox.TextInput
        name="maxStockAmount"
        label="Max Stock Amount"
        value={product.maxStockAmount}
        onChange={onChange}
        error={errors.maxStockAmount}
      />
      <toolBox.Switch
        name="isDefault"
        label="isDefault"
        value={product.isDefault}
        onChange={onChange}
        error={errors.isDefault}
      />
      <toolBox.Button label="Save" buttonType="btn-success" />

      <toolBox.Button
        label="Cancel"
        buttonType="btn-danger"
        linkTo={"/products"}
      />
    </form>
  );
};

export default ProductSaveDetail;
