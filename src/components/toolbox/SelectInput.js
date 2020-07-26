import React from "react";

const SelectInput = ({
  name,
  label,
  onChange,
  defaultOption,
  value,
  error,
  options,
  className,
}) => {
  var optionsWithoutDefault = options;

  if (defaultOption !== undefined) {
    optionsWithoutDefault = options.filter(
      (x) => x.value !== defaultOption.value
    );
  }

  return (
    <div
      className={
        "form-group " +
        (className !== undefined ? "form-group-" + className : "")
      }
    >
      {label !== undefined ? <label htmlFor={name}>{label}</label> : ""}
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={"form-control " + className}
      >
        {defaultOption !== undefined ? (
          <option value={defaultOption.value}>{defaultOption.text}</option>
        ) : (
          ""
        )}

        {optionsWithoutDefault.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.text}
            </option>
          );
        })}
      </select>
      {error && <div className="alert alert-danger">{error} </div>}
    </div>
  );
};

export default SelectInput;
