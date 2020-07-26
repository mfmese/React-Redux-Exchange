import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getCategories } from "../../redux/actions/categoryActions";
import { saveProduct } from "../../redux/actions/productActions";
import ProductSaveDetail from "./ProductSaveDetail";
import { getUnitTypes } from "../../redux/actions/unitTypeActions";
import Helper from "../common/Helper";

function ProductSave({
  products,
  categories,
  getProducts,
  getCategories,
  saveProduct,
  unitTypes,
  getUnitTypes,
  history,
  ...props
}) {
  const [product, setProduct] = useState({ ...props.product });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (categories.length === 0) {
      getCategories();
    }
    if (unitTypes.length === 0) {
      getUnitTypes();
    }

    setProduct({ ...props.product });
  }, [props.product]);

  function handleChange(event) {
    const { name, value } = event.target;

    setProduct((previousProduct) => ({
      ...previousProduct,
      [name]: name === "categoryId" ? parseInt(value, 10) : value,
    }));

    validate(name, value);
  }

  function validate(name, value) {
    Helper.validate(
      name,
      value === "",
      "productCode",
      "Please enter a Product Code!",
      setErrors
    );

    Helper.validate(
      name,
      value === "",
      "productName",
      "Please enter a Product Name!",
      setErrors
    );

    Helper.validate(
      name,
      value === "",
      "category",
      "Please select a Category!",
      setErrors
    );

    Helper.validate(
      name,
      value === "" || !Helper.isNumeric(value),
      "buyPrice",
      "Please select a numeric Buy Price!",
      setErrors
    );

    Helper.validate(
      name,
      value === "" || !Helper.isNumeric(value),
      "sellPrice",
      "Please select a numeric Sell Price!",
      setErrors
    );

    Helper.validate(
      name,
      value === "-1",
      "unitType",
      "Please select a Unit Type!",
      setErrors
    );

    Helper.validate(
      name,
      value === "-1",
      "category",
      "Please select a Category!",
      setErrors
    );
  }

  function handleSave(event) {
    event.preventDefault();

    if (typeof product.category === "string") {
      let category = categories.find(
        (category) => category.id === Number(product.category)
      );
      product.category = category;
    }

    if (typeof product.unitType === "string") {
      let unitType = unitTypes.find(
        (unitType) => unitType.id === Number(product.unitType)
      );
      product.unitType = unitType;
    }

    saveProduct(product).then(() => {
      history.push("/products");
    });
  }

  return (
    <ProductSaveDetail
      product={product}
      categories={categories}
      unitTypes={unitTypes}
      onChange={handleChange}
      onSave={handleSave}
      errors={errors}
    />
  );
}

export function getProductById(products, productId) {
  let product =
    products.find((product) => product.id === Number(productId)) || null;
  return product;
}

//ownProps query string okumak için kullanılıyor
function mapStateToProps(state, ownProps) {
  const productId = ownProps.match.params.productId;
  const product =
    productId && state.productListReducer.length > 0
      ? getProductById(state.productListReducer, productId)
      : {};

  return {
    product,
    products: state.productListReducer,
    unitTypes: state.unitTypeListReducer,
    categories: state.categoryListReducer,
  };
}

const mapDispatchToProps = {
  getCategories,
  saveProduct,
  getUnitTypes,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductSave);
