import React, { Fragment, Component } from "react";
import "react-table-v6/react-table.css";
import "../styles/Table.scss";
import ReactDOM from "react-dom";
import * as styles from "../styles/TableStyles.module.scss";
import ReactTable from "react-table-v6";
import ColumnData from "./TableComponent/ColumnData";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import bindDispatch from "../utils/bindDispatch";
import _ from "lodash";
import { Pagination } from "./TableComponent/Pagination";

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userCollection: [],
      column: [],
      showAction: false,
      rowIndex: null,
      searchInput: "",
    };
    this.checkboxRef = React.createRef();
  }

  editData = (index) => {
    const { reducer, actions, history } = this.props;
    let { userDetails, userHistory, isEdit } = reducer;
    let userIndex = 0;
    userHistory.map((user, indexValue) => {
      if (user.id === index) {
        userIndex = indexValue;
      }
    });
    userDetails = userHistory[userIndex];
    actions.assignData("userDetails", { ...userDetails });
    isEdit = true;
    actions.assignData("index", index);
    actions.assignData("isEdit", isEdit);
    history.push("/Form");
  };

  deleteRow = (row) => {
    const { actions, reducer } = this.props;
    const { checkBoxFlag } = reducer;

    let { userCollection } = this.state;
    let userInfo = _.cloneDeep(userCollection);
    let checkedCopy = [...checkBoxFlag];
    userInfo.splice(row.index, 1);
    checkedCopy.splice(row.original["id"] - 1, 1);
    let idCheck;
    let idDeleted = [];
    userInfo.map((user, index) => {
      idCheck = 0;
      userInfo.map((item, itemIndex) => {
        if (index + 1 !== userInfo[itemIndex].id) {
          idCheck += 1;
          if (idCheck === userInfo.length) {
            idDeleted.push(index);
          }
        }
      });
    });
    if (idDeleted) {
      idDeleted.map((number, index) => {
        userInfo.map((user, itemIndex) => {
          if (idDeleted[index] < userInfo[itemIndex].id) {
            userInfo[itemIndex].id = userInfo[itemIndex].id - 1;
          }
        });
      });
    }
    let isFalseCount = 0;
    checkedCopy.map((flag) => {
      if (!flag) {
        isFalseCount += 1;
      }
    });
    if (isFalseCount === checkedCopy.length) {
      ReactDOM.findDOMNode(this.checkboxRef.current).indeterminate = false;
    }
    this.setState(
      {
        userCollection: userInfo,
        rowIndex: null,
      },
      this.updateComp
    );
    actions.assignData("checkBoxFlag", checkedCopy);
    actions.assignData("userHistory", userInfo);
  };

  filteredData = () => {
    let { searchInput } = this.state;
    let { reducer } = this.props;
    let { checkBoxFlag, userHistory } = reducer;
    let clonedArray = JSON.parse(JSON.stringify(userHistory));
    // let isIndetermined = 0
    let dataFilter = clonedArray.filter((value) => {
      if (!searchInput) {
        return value;
      }
      let record = Object.entries(value);
      let isLetter = false;
      record.map((details) => {
        if (
          details[0] === "name" ||
          details[0] === "gender" ||
          details[0] === "emailId" ||
          details[0] === "dob" ||
          details[0] === "mobileNumber"
        ) {
          if (
            (details[1].toLowerCase().includes(searchInput.toLowerCase()) ||
              details[1]
                .toString()
                .toLowerCase()
                .includes(searchInput.toLowerCase()) ||
              details[1]
                .toString()
                .toLowerCase()
                .includes(searchInput.toLowerCase())) &&
            searchInput.length
          ) {
            let index = details[1].indexOf(searchInput);
            let newText = [
              details[1].substring(0, index),
              <span className={styles.highlight}>
                {details[1].substring(index, index + searchInput.length)}
              </span>,
              details[1].substring(index + searchInput.length),
            ];
            isLetter = true;
            return (value[details[0]] = newText);
          }
        }
      });
      if (isLetter) {
        return value;
      }
    });
    this.setState(
      {
        userCollection: dataFilter,
        pageSize: dataFilter.length,
        showAction: false,
      },
      () => {
        this.updateColumn();
      }
    );
  };
  handleSearchFilter = (event) => {
    this.setState({ searchInput: event.target.value }, () => {
      this.filteredData();
    });
  };

  handleChange = async () => {
    const { userCollection } = this.state;
    const { reducer, actions } = this.props;
    const { selectAll } = reducer;
    let selectAllCheckBox = !selectAll;
    await actions.assignData("selectAll", selectAllCheckBox);
    let checkedCopy = [];
    userCollection.map(() => {
      return checkedCopy.push(selectAllCheckBox);
    });
    await actions.assignData("checkBoxFlag", checkedCopy);
    this.updateColumn();
  };

  handleSingleCheckboxChange = async (row) => {
    const { reducer, actions } = this.props;
    const { checkBoxFlag } = reducer;
    const { userCollection } = this.state;
    let checkedCopy = [...checkBoxFlag];
    checkedCopy[row.original["id"] - 1] = !checkBoxFlag[row.original["id"] - 1];
    let user = [...userCollection];
    user[row.original["id"] - 1].isChecked =
      checkedCopy[row.original["id"] - 1];
    this.setState({ userCollection: user });
    let checkBoxCount = 0;
    checkedCopy.map((flag) => {
      if (flag) {
        checkBoxCount += 1;
      }
    });
    if (checkedCopy.length !== userCollection.length) {
      if (!checkBoxCount) {
        ReactDOM.findDOMNode(this.checkboxRef.current).indeterminate = false;
      } else {
        ReactDOM.findDOMNode(this.checkboxRef.current).indeterminate = true;
      }
    }
    if (checkedCopy.length === userCollection.length) {
      if (checkBoxCount === userCollection.length) {
        ReactDOM.findDOMNode(this.checkboxRef.current).indeterminate = false;
        await actions.assignData("selectAll", true);
      } else {
        if (!checkBoxCount) {
          if (checkedCopy.length === 1) {
            await actions.assignData("selectAll", false);
          }
          ReactDOM.findDOMNode(this.checkboxRef.current).indeterminate = false;
        } else {
          ReactDOM.findDOMNode(this.checkboxRef.current).indeterminate = true;
          await actions.assignData("selectAll", false);
        }
      }
    }
    await actions.assignData("checkBoxFlag", checkedCopy);
    this.updateColumn();
  };

  handleSort = async (props) => {
    const { reducer, actions } = this.props;
    const { toggleIcon } = reducer;
    const toggle = { ...toggleIcon };
    let toggleFlag = Object.entries(toggle);
    toggleFlag.map((flag) => {
      flag[1] = false;
    });
    let toggleSort = Object.fromEntries(toggleFlag);
    toggleSort[`${props[0].id}Sort`] = !props[0].desc;
    await actions.assignData("toggleIcon", toggleSort);
    this.setState({ showAction: false });
    this.updateColumn();
  };

  toggleColumns = (event) => {
    let name = event.target.name;
    let column = this.state.column;
    let clonedColumn = _.cloneDeep(column);
    clonedColumn.map((column) => {
      if (column.accessor === name) {
        column.show = !column.show;
        return column;
      }
    });
    this.setState({ column: clonedColumn });
  };

  updateColumn = () => {
    const { reducer } = this.props;
    const { checkBoxFlag, toggleIcon, selectAll, isEdit } = reducer;
    const { userCollection, showAction } = this.state;
    const columnDetails = {
      toggleIcon: toggleIcon,
      ref: this.checkboxRef,
      selectAll: selectAll,
      showAction: showAction,
      checkBoxFlag: checkBoxFlag,
      handleChange: this.handleChange,
      handleSingleCheckboxChange: this.handleSingleCheckboxChange,
      rowIndex: this.state.rowIndex,
      setToggleActions: (action) => {
        this.setState({ ...this.state, showAction: !columnDetails.showAction });
        columnDetails.showAction = !columnDetails.showAction;
      },
      editFlag: isEdit,
      editData: this.editData,
      deleteRow: this.deleteRow,
      setStateRowNull: () => {
        this.setState({ rowIndex: null });
        columnDetails.rowIndex = null;
      },
      setStateRow: (row) => {
        this.setState({ rowIndex: row.original["id"] - 1 });
        columnDetails.rowIndex = row.original["id"] - 1;
      },
      stateSet: (userArray) => {
        this.setState({ userCollection: userArray });
      },
    };
    this.setState({ column: ColumnData(columnDetails) }, () => {
      let flagCount = 0;
      checkBoxFlag.map((flag) => {
        if (flag) {
          flagCount += 1;
        }
      });
      if (flagCount < userCollection.length && flagCount > 0) {
        ReactDOM.findDOMNode(this.checkboxRef.current).indeterminate = true;
      }
    });
  };

  componentDidMount() {
    const { reducer, actions } = this.props;
    const { checkBoxFlag, selectAll, userHistory } = reducer;
    if (checkBoxFlag.length !== userHistory.length) {
      userHistory.map(() => {
        return checkBoxFlag.push(selectAll);
      });
      actions.assignData("checkBoxFlag", checkBoxFlag);
    }
    this.setState(
      {
        userCollection: userHistory,
      },
      () => this.updateColumn()
    );
  }

  render() {
    const { userCollection, column } = this.state;
    const { reducer, history } = this.props;
    const { userHistory } = reducer;
    return (
      <Fragment>
        <div className={styles.tableTitle}>
          <h1>Employee Details</h1>
        </div>
        {userHistory.length ? (
          <div>
            <div className={styles.title}>
              <h2>Employee Details</h2>
              <div className={styles.filterSection}>
                <span className={styles.search}>
                  <i className="fas fa-search"></i>
                </span>
                <input
                  type="text"
                  name="searchInput"
                  value={this.state.searchInput || ""}
                  className={styles.searchFilter}
                  onChange={this.handleSearchFilter}
                  placeholder="Search...."
                />
                <button
                  className={styles.addNew}
                  onClick={() => history.push("/Form")}
                >
                  <i className="fas fa-plus-square"></i>Add New
                </button>
              </div>
            </div>
            {userCollection.length ? (
              <div>
                <ReactTable
                  data={userCollection}
                  columns={column}
                  onSortedChange={(props) => this.handleSort(props)}
                  minRows={0}
                  PaginationComponent={Pagination}
                />
                <div
                  className={
                    this.state.showAction ? styles.showActions : styles.hide
                  }
                >
                  <ul className={styles.actionlist}>
                    {column.map((column) => {
                      if (column.accessor) {
                        return (
                          <li>
                            <input
                              type="checkbox"
                              name={column.accessor}
                              onChange={this.toggleColumns}
                            />
                            {column.accessor}
                          </li>
                        );
                      }
                    })}
                  </ul>
                </div>
              </div>
            ) : (
              <div className={styles.addForm}>
                <h2>DETAILS NOT FOUND.</h2>
              </div>
            )}
          </div>
        ) : (
          <div className={styles.addForm}>
            <h2>
              No Empolyee Record Found. Kindly click here to{" "}
              <a href="/Form" className={styles.addForm}>
                Add Employee
              </a>
            </h2>
          </div>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = createSelector(
  (state) => state.reducer,
  (reducer) => ({ reducer })
);

export default connect(mapStateToProps, bindDispatch)(Table);
