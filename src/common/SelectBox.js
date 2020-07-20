import React from "react";

const SelectBox = (props) => {
  return (
    <select
      id={props.id}
      onChange={props.onChange}
      name={props.name}
      value={props.value}
    >
      {<option value="" disabled>Select Field</option>}
      {props.elements.map((item,index) => (
        <option key={index} value={item.name}>
          {item.name}
        </option>
      ))}
    </select>
  );
};

export default SelectBox;
