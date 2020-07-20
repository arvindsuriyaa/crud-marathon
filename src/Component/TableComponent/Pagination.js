import React from "react";
import * as styles from "../../styles/TableElements.module.scss";

export const Pagination = (props) => {
  return (
    <div className={styles.pagination}>
      <select
        id="select"
        name="group"
        className={styles.paginationDropDown}
        size="1"
        onChange={(option) => {
          if (props.data.length > Number(option.target.value)) {
            props.onPageSizeChange(Number(option.target.value));
          } else if (props.data.length <= Number(option.target.value)) {
            props.onPageSizeChange(Number(props.data.length));
          }
        }}
      >
        {props.pageSizeOptions.map((value, index) => (
          <option key={index} value={value}>
            Show {value}
          </option>
        ))}
      </select>
      <button
        className={styles.prevPage}
        onClick={() => {
          props.onPageChange(props.page - 1);
        }}
        disabled={props.page === 0}
      >
        {"<"}
      </button>

      <button
        className={styles.nextPage}
        onClick={() => {
          props.onPageChange(props.page + 1);
        }}
        disabled={props.page === props.pages - 1}
      >
        {">"}
      </button>
    </div>
  );
};
