import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as categoryActions from "../../redux/actions/categoryActions";
import { showConfirm } from "../common/showConfirm";
import * as toolBox from "../toolbox/index";

class CategoryList extends Component {
  componentDidMount() {
    this.props.actions.getCategories();
  }

  componentDidUpdate(prevProps, prevState) {
    this.dataTable = toolBox.TableExtension("catalog-list-table");
  }

  deleteCategory = (categoryId, event) => {
    let result = showConfirm("Are you sure, you want to delete category item");
    if (result) {
      this.props.actions.deleteCategory(categoryId);
      if (this.dataTable !== undefined) this.dataTable.destroy();
    }
  };

  render() {
    return (
      <div>
        <h2 className="heading-medium list text-center">Categories</h2>

        <table
          size="sm"
          id="catalog-list-table"
          className="table table-striped table-hover full-width"
        >
          <thead className="thead-dark">
            <tr>
              <th>
                <toolBox.Button icon="add" linkTo="/saveCategory" />
              </th>
              <th>#</th>
              <th>Category Code</th>
              <th>Category Name</th>
              <th>Properties</th>
            </tr>
          </thead>
          <tbody>
            {this.props.categories.map((category) => (
              <tr key={category.id}>
                <td className="table-buttons-container">
                  <toolBox.Button
                    linkTo={"/savecategory/" + category.id}
                    icon="edit"
                  />
                  <toolBox.Button
                    onClick={this.deleteCategory.bind(this, category.id)}
                    icon="delete"
                  />
                </td>
                <th scope="row">{category.id}</th>
                <td>{category.categoryCode}</td>
                <td>{category.categoryName}</td>
                <td>{category.properties}</td>
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
    categories: state.categoryListReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getCategories: bindActionCreators(
        categoryActions.getCategories,
        dispatch
      ),
      deleteCategory: bindActionCreators(
        categoryActions.deleteCategory,
        dispatch
      ),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
