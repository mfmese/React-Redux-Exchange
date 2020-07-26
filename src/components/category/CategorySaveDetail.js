import React from "react";
import * as toolBox from "../toolbox/index";

const CategorySaveDetail = ({ category, onSave, onChange, errors }) => {
  return (
    <form onSubmit={onSave}>
      <div className="heading-medium detail-main">
        <toolBox.Button icon="back" linkTo={"/categories"} />
        <h2 className="heading-medium detail text-center">
          {category.id ? "Category Update" : "New Category"}
        </h2>
      </div>
      <toolBox.TextInput
        name="categoryCode"
        label="category Code"
        value={category.categoryCode}
        onChange={onChange}
        error={errors.categoryCode}
      />
      <toolBox.TextInput
        name="categoryName"
        label="category Name"
        value={category.categoryName}
        onChange={onChange}
        error={errors.categoryName}
      />
      <toolBox.TextInput
        name="properties"
        label="Properties"
        value={category.properties}
        onChange={onChange}
        error={errors.properties}
      />
      <toolBox.Button label="Save" buttonType="btn-success" />
      <toolBox.Button
        label="Cancel"
        buttonType="btn-danger"
        linkTo={"/categories"}
      />
    </form>
  );
};

export default CategorySaveDetail;
