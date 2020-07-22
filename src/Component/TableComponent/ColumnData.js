import React from "react";
import * as styles from "../../styles/TableElements.module.scss";
import ToggleButton from "./ToggleButton";

function ColumnData(props) {
  const {
    toggleIcon,
    ref,
    checkBoxFlag,
    handleSingleCheckboxChange,
    selectAll,
    handleChange,
    showAction,
    setToggleActions,
  } = props;
  return [
    {
      Header: () => {
        return (
          <div className={styles.alignCheckBox}>
            <input
              className={styles.allowPointer}
              type="checkbox"
              checked={selectAll}
              onChange={() => {
                handleChange();
              }}
              ref={ref||null}
            />
            <div className={styles.dropDown}>
              <button
                className={styles.sort}
                onClick={() => {
                  setToggleActions(showAction);
                }}
              >
            <i className="fas fa-filter"></i>
              </button>
            </div>
          </div>
        );
      },
      Cell: (row) => {
        return (
          <div className={styles.checkBoxStyling}>
            <input
              type="checkbox"
              checked={checkBoxFlag[row.original["id"] - 1]||false}
              onChange={() => {
                handleSingleCheckboxChange(row);
              }}
            />
          </div>
        );
      },
      width: 90,
      sortable: false,
      resizable: false,
      show:true
    },
    {
      Header: () => {
        return (
          <div className={styles.headerTitle}>
            <span>S.No</span>
            <ToggleButton toggleIcon={toggleIcon} name={"idSort"} />
          </div>
        );
      },
      accessor: "id",
      width: 100,
      show: true,
    },
    {
      Header: () => {
        return (
          <div className={styles.headerTitle}>
            <span>Name</span>
            <ToggleButton toggleIcon={toggleIcon} name={"nameSort"} />
          </div>
        );
      },
      accessor: "name",
      show: true,
    },
    {
      Header: () => {
        return (
          <div className={styles.headerTitle}>
            <span>Gender</span>
            <ToggleButton toggleIcon={toggleIcon} name={"genderSort"} />
          </div>
        );
      },
      accessor: "gender",
      show: true,
    },
    {
      Header: () => {
        return (
          <div className={styles.headerTitle}>
            <span>Date Of Birth</span>
            <ToggleButton toggleIcon={toggleIcon} name={"dobSort"} />
          </div>
        );
      },
      accessor: "dob",
      show: true,
    },
    {
      Header: () => {
        return (
          <div className={styles.headerTitle}>
            <span>Mobile Number</span>
            <ToggleButton toggleIcon={toggleIcon} name={"mobileNumberSort"} />
          </div>
        );
      },
      accessor: "mobileNumber",
      show: true,
    },
    {
      Header: () => {
        return (
          <div className={styles.headerTitle}>
            <span>Email ID</span>
            <ToggleButton toggleIcon={toggleIcon} name={"emailIdSort"} />
          </div>
        );
      },
      accessor: "emailId",
      width: 220,
      show: true,
    },
    {
      Header: "Actions",
      accessor: "actions",
      width: 110,
      Cell: (row) => {
        return (
          <div className={props.editFlag ? styles.noEdit : styles.allowEdit}>
            <div>
              <button
                className={
                  props.editFlag ? styles.disableEvents : styles.moreIcon
                }
                onClick={() => {
                  props.rowIndex === null
                    ? props.setStateRow(row)
                    : props.setStateRowNull();
                }}
              >
                <i className="fas fa-ellipsis-v"></i>
              </button>
            </div>
            <div
              className={
                props.rowIndex === row.original["id"] - 1
                  ? styles.show
                  : styles.hide
              }
            >
              <ul className={styles.buttonList}>
                <li>
                  <button
                    className={styles.actionButton}
                    onClick={() => {
                      props.deleteRow(row);
                      props.setStateRowNull();
                    }}
                  >
                    Delete
                  </button>
                </li>
                <li>
                  <button
                    className={styles.actionButton}
                    onClick={() => {
                      props.editData(row.original["id"]);
                    }}
                  >
                    Edit
                  </button>
                </li>
              </ul>
            </div>
          </div>
        );
      },
      show: true,
    },
  ];
}

export default ColumnData;
