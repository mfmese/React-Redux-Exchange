import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as storeActions from "../../redux/actions/storeActions";
import * as toolBox from "../toolbox/index";
import { showConfirm } from "../common/showConfirm";

class StoreList extends Component {
  componentDidMount() {
    this.props.actions.getStores();
  }

  componentDidUpdate(prevProps, prevState) {
    this.dataTable = toolBox.TableExtension("store-list-table");
  }

  deleteStore = (storeId, event) => {
    let result = showConfirm("Are you sure, you want to delete store item");
    if (result) {
      this.props.actions.deleteStore(storeId);
      if (this.dataTable !== undefined) this.dataTable.destroy();
    }
  };

  render() {
    return (
      <div>
        <h2 className="heading-medium list text-center">Stores</h2>

        <table
          size="sm"
          id="store-list-table"
          className="table table-striped table-hover full-width"
        >
          <thead className="thead-dark">
            <tr>
              <th>
                <toolBox.Button icon="add" linkTo="/savestore" />
              </th>
              <th>#</th>
              <th>Store Name</th>
            </tr>
          </thead>
          <tbody>
            {this.props.stores.map((store) => (
              <tr key={store.id}>
                <td className="table-buttons-container">
                  <toolBox.Button
                    linkTo={"/savestore/" + store.id}
                    icon="edit"
                  />
                  <toolBox.Button
                    onClick={this.deleteStore.bind(this, store.id)}
                    icon="delete"
                  />
                </td>
                <th scope="row">{store.id}</th>
                <td>{store.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { stores: state.storeListReducer };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getStores: bindActionCreators(storeActions.getStores, dispatch),
      deleteStore: bindActionCreators(storeActions.deleteStore, dispatch),
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(StoreList);
