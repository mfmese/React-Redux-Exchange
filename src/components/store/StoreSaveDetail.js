import React from "react";
import * as toolBox from "../toolbox/index";

const StoreSaveDetail = ({ store, onSave, onChange, errors }) => {
  return (
    <form onSubmit={onSave}>
      <div className="heading-medium detail-main">
        <toolBox.Button icon="back" linkTo={"/stores"} />
        <h2 className="heading-medium detail text-center">
          {store.id ? "Store Update" : "New Store"}
        </h2>
      </div>

      <toolBox.TextInput
        name="name"
        label="Store Name"
        value={store.name}
        onChange={onChange}
        error={errors.name}
      />
      <toolBox.Button label="Save" buttonType="btn-success" />
      <toolBox.Button
        label="Cancel"
        buttonType="btn-danger"
        linkTo={"/stores"}
      />
    </form>
  );
};

export default StoreSaveDetail;
