export default class Sell {
  constructor() {
    this.name = "jlkjlkjkl";
  }

  handleSaveToStock(orders, customer, saveStockList, deleteOrder, event) {
    event.preventDefault();

    let taxFee = 0.1;
    let brokerageFee = 0.1;

    orders.forEach((order) => {
      var stock = {
        product: order.product,
        amount: order.amount,
        unitPrice: order.unitPrice,
        taxFee: taxFee.toFixed(2),
        brokerageFee: brokerageFee.toFixed(2),
        totalCost: (
          taxFee +
          brokerageFee +
          order.amount * order.unitPrice
        ).toFixed(2),
        profit: (order.totalPrice - order.unitPrice).toFixed(2),
        totalPrice: order.totalPrice.toFixed(2),
        store: order.store,
        // stockOperation: order.stockOperation,
        customer: customer,
        stockOperation: {
          id: 1,
          name: "Çıkış",
        },
      };

      saveStockList(stock);
      deleteOrder(order.id);
    });
  }
}
