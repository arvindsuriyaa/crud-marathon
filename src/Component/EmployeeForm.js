import React, { Fragment } from "react";
import UserDetails from "./UserDetails";
import AddressSection from "./AddressSection";
import ConfirmationSection from "./ConfirmationSection";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import bindDispatch from "../utils/bindDispatch";

const EmployeeForm = (props) => {
  let { reducer } = props;
  let { userDetails, errors } = reducer;
  return (
    <Fragment>
      <UserDetails
        userDetails={userDetails}
        errors={errors}
        collectInfo={props.actions.collectInfo}
      />
      <AddressSection
        userDetails={userDetails}
        errors={errors}
        collectInfo={props.actions.collectInfo}
        reducer={reducer}
      />
      <ConfirmationSection
        userDetails={userDetails}
        errors={errors}
        collectInfo={props.actions.collectInfo}
        reducer={reducer}
      />
    </Fragment>
  );
};
const mapStateToProps = createSelector(
  (state) => state.reducer,
  (reducer) => ({ reducer })
);

export default connect(mapStateToProps, bindDispatch)(EmployeeForm);
