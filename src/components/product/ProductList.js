import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as productActions from "../../redux/actions/productActions";
import * as categoryActions from "../../redux/actions/categoryActions";
import { showConfirm } from "../common/showConfirm";
import * as toolBox from "../toolbox/index";

class ProductList extends Component {
  componentDidMount() {
    this.props.actions.getProducts();
    this.props.actions.getCategories();
  }

  componentDidUpdate(prevProps, prevState) {
    this.dataTable = toolBox.TableExtension("product-list-table");
  }

  categoryChange = (event) => {
    let categorySelectedIndex = event.nativeEvent.target.selectedIndex;
    this.props.actions.getProducts(categorySelectedIndex);
    this.dataTable.destroy();
  };

  deleteProduct = (productId, event) => {
    let result = showConfirm("Are you sure, you want to delete product item");
    if (result) {
      this.props.actions.deleteProduct(productId);
      if (this.dataTable !== undefined) this.dataTable.destroy();
    }
  };

  render() {
    return (
      <div>
        <h2 className="heading-medium list text-center">Products</h2>
        <toolBox.SelectInput
          options={this.props.categories.map((category) => ({
            value: category.id,
            text: category.categoryName,
          }))}
          name="categories"
          className="filter-table"
          label="Filter Categories"
          onChange={this.categoryChange}
          defaultOption={{ value: 0, text: "All" }}
        />

        <table
          size="sm"
          id="product-list-table"
          className="table table-striped table-hover full-width"
        >
          <thead className="thead-dark">
            <tr>
              <th>
                <toolBox.Button icon="add" linkTo="/saveProduct" />
              </th>
              <th>#</th>
              <th>Product Code</th>
              <th>Product Name</th>
              <th>Buy Price</th>
              <th>Sell Price</th>
              <th>Unit Type</th>
              <th>Properties</th>
              <th>Min Stock Amount</th>
              <th>Max Stock Amount</th>
              <th>Default</th>
            </tr>
          </thead>
          <tbody>
            {this.props.products.map((product) => (
              <tr key={product.id}>
                <td className="table-buttons-container">
                  <toolBox.Button
                    linkTo={"/saveproduct/" + product.id}
                    icon="edit"
                  />
                  <toolBox.Button
                    onClick={this.deleteProduct.bind(this, product.id)}
                    icon="delete"
                  />
                </td>
                <th scope="row">{product.id}</th>
                <td>{product.productCode}</td>
                <td>{product.productName}</td>
                <td>{product.buyPrice}</td>
                <td>{product.sellPrice}</td>
                <td>{product.unitType?.name}</td>
                <td>{product.properties}</td>
                <td>{product.minStockAmount}</td>
                <td>{product.maxStockAmount}</td>
                <td>
                  <toolBox.Switch value={product.isDefault} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    // currentCategory: currentCategoryReducer,
    products: state.productListReducer,
    categories: state.categoryListReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getProducts: bindActionCreators(productActions.getProducts, dispatch),
      getCategories: bindActionCreators(
        categoryActions.getCategories,
        dispatch
      ),
      deleteProduct: bindActionCreators(productActions.deleteProduct, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
