import React from "react";
import * as styles from "../../styles/TableElements.module.scss";

const ToggleButton = (props) => {
  const { toggleIcon, name } = props;
  let sortName = name;
  return (
    <div>
      <button className={!toggleIcon[sortName] ? styles.sort : styles.hide}>
        <i name={sortName} className="fas fa-sort-amount-up"></i>
      </button>
      <button className={!toggleIcon[sortName] ? styles.hide : styles.sort}>
        <i name={sortName} className="fas fa-sort-amount-down"></i>
      </button>
    </div>
  );
};

export default ToggleButton;
