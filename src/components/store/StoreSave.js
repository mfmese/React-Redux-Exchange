import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { saveStore } from "../../redux/actions/storeActions";
import StoreSaveDetail from "./StoreSaveDetail";
import Helper from "../common/Helper";

function StoreSave({ stores, getStores, saveStore, history, ...props }) {
  const [store, setStore] = useState({ ...props.store });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setStore({ ...props.store });
  }, [props.store]);

  function handleChange(event) {
    const { name, value } = event.target;

    setStore((previousStore) => ({
      ...previousStore,
      [name]: name === "storeId" ? parseInt(value, 10) : value,
    }));

    validate(name, value);
  }

  function validate(name, value) {
    Helper.validate(
      name,
      value === "",
      "name",
      "Please enter a Store Name!",
      setErrors
    );
  }

  function handleSave(event) {
    event.preventDefault();

    saveStore(store).then(() => {
      history.push("/stores");
    });
  }

  return (
    <StoreSaveDetail
      store={store}
      onChange={handleChange}
      onSave={handleSave}
      errors={errors}
    />
  );
}

export function getStoreById(stores, storeId) {
  let store = stores.find((store) => store.id === Number(storeId)) || null;
  return store;
}

//ownProps query string okumak için kullanılıyor
function mapStateToProps(state, ownProps) {
  const storeId = ownProps.match.params.storeId;
  const store =
    storeId && state.storeListReducer.length > 0
      ? getStoreById(state.storeListReducer, storeId)
      : {};

  return {
    store,
    stores: state.storeListReducer,
  };
}

const mapDispatchToProps = {
  saveStore,
};

export default connect(mapStateToProps, mapDispatchToProps)(StoreSave);
