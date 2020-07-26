import React from "react";
import { Switch, Route } from "react-router-dom";
import ProductList from "../product/ProductList";
import CategoryList from "../category/CategoryList";
import Navigation from "../navigation/Navigation";
import StockList from "../stock/StockList";
import StoreList from "../store/StoreList";
import CustomerList from "../customer/CustomerList";
import ProductSave from "../product/ProductSave";
import NotFound from "../common/NotFound";
import Dashboard from "./Dashboard";
import CategorySave from "../category/CategorySave";
import StockSave from "../stock/StockSave";
import StoreSave from "../store/StoreSave";
import OrderList from "../order/OrderList";
import OrderSave from "../order/OrderSave";
import CustomerSave from "../customer/CustomerSave";

function App() {
  return (
    <div>
      <Navigation />
      <div className="mainContainer">
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/products" exact component={ProductList} />
          <Route path="/categories" exact component={CategoryList} />
          <Route path="/stocks" exact component={StockList} />
          <Route path="/stores" exact component={StoreList} />
          <Route path="/orders" exact component={OrderList} />
          <Route path="/customers" exact component={CustomerList} />
          <Route path="/saveproduct/:productId" component={ProductSave} />
          <Route path="/saveproduct" component={ProductSave} />
          <Route path="/savecategory/:categoryId" component={CategorySave} />
          <Route path="/savecategory" component={CategorySave} />
          <Route path="/savestock/:stockId" component={StockSave} />
          <Route path="/savestock" component={StockSave} />
          <Route path="/savestore/:storeId" component={StoreSave} />
          <Route path="/savestore" component={StoreSave} />
          <Route path="/saveorder/:orderId" component={OrderSave} />
          <Route path="/saveorder" component={OrderSave} />
          <Route path="/savecustomer/:customerId" component={CustomerSave} />
          <Route path="/savecustomer" component={CustomerSave} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
