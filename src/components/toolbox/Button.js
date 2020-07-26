import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPlus,
  faEdit,
  faAngleLeft,
} from "@fortawesome/free-solid-svg-icons";

/* <button type="button" class="btn btn-primary">Primary</button>
<button type="button" class="btn btn-secondary">Secondary</button>
<button type="button" class="btn btn-success">Success</button>
<button type="button" class="btn btn-danger">Danger</button>
<button type="button" class="btn btn-warning">Warning</button>
<button type="button" class="btn btn-info">Info</button>
<button type="button" class="btn btn-light">Light</button>
<button type="button" class="btn btn-dark">Dark</button>

<button type="button" class="btn btn-link">Link</button> */

const Button = ({ label, onClick, buttonType, linkTo = "", icon }) => {
  var iconElement;
  var alignment;
  buttonType = buttonType === undefined ? "btn-primary" : buttonType;
  var buttonClassName = "";
  var buttonSize = "btn-md";

  if (icon === "delete") {
    iconElement = <FontAwesomeIcon icon={faTrash} />;
    buttonType = "btn-danger";
    buttonClassName = "btn-delete-from-table";
    buttonSize = "btn-sm";
  } else if (icon === "add") {
    iconElement = <FontAwesomeIcon icon={faPlus} />;
    alignment = "align-right";
    buttonClassName = "btn-add-to-table";
    buttonSize = "btn-sm";
  } else if (icon === "edit") {
    iconElement = <FontAwesomeIcon icon={faEdit} />;
    buttonClassName = "btn-edit-table";
    buttonSize = "btn-sm";
  } else if (icon === "back") {
    iconElement = <FontAwesomeIcon icon={faAngleLeft} />;
    buttonClassName = "btn-back";
    buttonSize = "btn-sm";
  }

  if (linkTo === "") {
    return (
      <button
        className={
          "btn " +
          buttonSize +
          " " +
          buttonType +
          " " +
          alignment +
          " " +
          buttonClassName
        }
        type="submit"
        onClick={onClick}
      >
        {label}
        {iconElement !== undefined ? iconElement : ""}
      </button>
    );
  } else {
    return (
      <Link to={linkTo}>
        <button
          className={
            "btn " +
            buttonSize +
            " " +
            buttonType +
            " " +
            alignment +
            " " +
            buttonClassName
          }
          type="submit"
        >
          {label}
          {iconElement !== undefined ? iconElement : ""}
        </button>
      </Link>
    );
  }
};

export default Button;
