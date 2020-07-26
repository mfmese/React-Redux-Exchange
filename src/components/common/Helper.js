export default class Helper {
  static getCurrentDateString() {
    var curr = new Date();
    curr.setDate(curr.getDate() + 3);
    return curr.toISOString().substr(0, 10);
  }

  static getChooseItem() {
    return { value: -1, text: "Seçiniz..." };
  }

  static validate(name, condition, property, message, setErrors) {
    if (property === name) {
      if (condition === false) {
        message = "";
      }

      setErrors((errors) => ({
        ...errors,
        [property]: message,
      }));
    }
  }

  static isNumeric(str) {
    return !isNaN(parseFloat(str)) && isFinite(str);
  }
}
