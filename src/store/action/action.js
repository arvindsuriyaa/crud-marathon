import EMPLOYEE_DETAILS from "../Types/types";

export const assignData = (name, value) => ({
  type: EMPLOYEE_DETAILS,
  payload: { name: name, value: value },
});

export const collectInfo = (event) => {
  return (dispatch, getState) => {
    let { userDetails, errors } = getState().reducer;
    let name = event.target.name;
    let value = event.target.value;
    userDetails[name] = value;
    errors[name] = "";
    if (name === "firstName") {
      userDetails["name"] = value + " " + userDetails.lastName;
    } else if (name === "lastName") {
      userDetails["name"] = userDetails.firstName + " " + value;
    }
    dispatch(assignData("userDetails", { ...userDetails, [name]: value }));
    dispatch(assignData("errors", errors));
  };
};
export const validation = (formValid, flag, userObj) => {
  return (dispatch, getState) => {
    let { errors } = getState().reducer;
    let validation = Object.entries(userObj);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    validation.forEach((element) => {
      if (!element[1].length && element[0] !== "isChecked") {
        if (element[0] !== "id") {
          formValid = false;
          flag.push(formValid);
          return (errors[element[0]] = "This Field is Mandatory");
        }
      } else if (element[0] === "emailId") {
        if (!reg.test(element[1])) {
          formValid = false;
          flag.push(formValid);
          return (errors[element[0]] = "Enter a Valid Email");
        }
      } else if (element[0] === "pincode") {
        if (element[1].length > 5 || element[1].length < 5) {
          formValid = false;
          flag.push(formValid);
          return (errors[element[0]] = "Invalid Pincode");
        }
      }
      formValid = true;
      flag.push(formValid);
      return (errors[element[0]] = "");
    });
  };
};
export const submitHandler = (history) => {
  return (dispatch, getState) => {
    let { reducer } = getState();
    let { userDetails, errors, userHistory } = getState().reducer;
    let formValid = true;
    let flag = [];
    const userObj = { ...userDetails };
    if (!reducer.isEdit) {
      userObj["id"] = userHistory.length + 1;
    }
    dispatch(validation(formValid, flag, userObj));
    dispatch(assignData("errors", { ...errors }));
    let registerCheck = true;
    flag.find((flag) => {
      if (!flag) {
        return (registerCheck = false);
      }
    });
    if (registerCheck) {
      if (reducer.isEdit) {
        let spliceIndex = 0;
        userHistory.map((user, index) => {
          if (user.id === userObj.id) {
            spliceIndex = index;
          }
        });
        userHistory.splice(spliceIndex, 1, { ...userObj });
        reducer.isEdit = false;
        dispatch(assignData("isEdit", reducer.isEdit));
      } else {
        userHistory.push({ ...userObj });
      }
      dispatch(assignData("userHistory", [...userHistory]));
      dispatch(cancel());
      history.push("/Table");
    }
  };
};

export const cancel = () => {
  return (dispatch, getState) => {
    const { userDetails, errors } = getState().reducer;
    let error = { ...errors };
    let userObj = { ...userDetails };
    Object.keys(userObj).map(function (keys) {
      userObj[keys] = "";
      return userObj;
    });
    let isChecked = false;
    let isEdit = false;
    error = {};
    dispatch(assignData("errors", error));
    dispatch(assignData("userDetails", { ...userObj }));
    dispatch(assignData("isChecked", isChecked));
    dispatch(assignData("isEdit", isEdit));
  };
};

export const toggleChange = (event) => {
  return (dispatch, getState) => {
    let { userDetails, cachedAddress } = getState().reducer;
    const isChecked = !event.target.checked;
    dispatch(assignData("isChecked", !isChecked));
    if (!isChecked) {
      const address = { ...userDetails };
      let addressCopy = { ...cachedAddress };
      addressCopy = address["permanentAddress"];
      address["permanentAddress"] = address["communicationAddress"];
      dispatch(assignData("cachedAddress", addressCopy));
      dispatch(assignData("userDetails", address));
    } else {
      const address = { ...userDetails };
      address["permanentAddress"] = getState().reducer["cachedAddress"];
      dispatch(assignData("userDetails", address));
    }
  };
};
