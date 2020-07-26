import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { saveCategory } from "../../redux/actions/categoryActions";
import CategorySaveDetail from "./CategorySaveDetail";
import Helper from "../common/Helper";

function CategorySave({
  categories,
  getCategories,
  saveCategory,
  history,
  ...props
}) {
  const [category, setCategory] = useState({ ...props.category });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setCategory({ ...props.category });
  }, [props.category]);

  function handleChange(event) {
    const { name, value } = event.target;

    setCategory((previousCategory) => ({
      ...previousCategory,
      [name]: name === "categoryId" ? parseInt(value, 10) : value,
    }));

    validate(name, value);
  }

  function validate(name, value) {
    Helper.validate(
      name,
      value === "",
      "categoryCode",
      "Please enter a CategoryCode!",
      setErrors
    );

    Helper.validate(
      name,
      value === "",
      "categoryName",
      "Please enter a CategoryName!",
      setErrors
    );

    Helper.validate(
      name,
      value === "",
      "properties",
      "Please enter a Properties!",
      setErrors
    );
  }

  function handleSave(event) {
    event.preventDefault();

    saveCategory(category).then(() => {
      history.push("/categories");
    });
  }
  return (
    <CategorySaveDetail
      category={category}
      onChange={handleChange}
      onSave={handleSave}
      errors={errors}
    />
  );
}

export function getCategoryById(categories, categoryId) {
  let category =
    categories.find((category) => category.id === Number(categoryId)) || null;
  return category;
}

//ownProps query string okumak için kullanılıyor
function mapStateToProps(state, ownProps) {
  const categoryId = ownProps.match.params.categoryId;
  const category =
    categoryId && state.categoryListReducer.length > 0
      ? getCategoryById(state.categoryListReducer, categoryId)
      : {};

  return {
    category,
    categories: state.categoryListReducer,
  };
}

const mapDispatchToProps = {
  saveCategory,
};

export default connect(mapStateToProps, mapDispatchToProps)(CategorySave);
