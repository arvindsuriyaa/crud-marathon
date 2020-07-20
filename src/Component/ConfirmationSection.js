import React from "react";
import { connect } from "react-redux";
import InputTypes from "../common/InputTypes";
import * as styles from "../styles/ConfirmationSection.module.scss";
import { withRouter, useHistory } from "react-router-dom";
import { createSelector } from "reselect";
import bindDispatch from "../utils/bindDispatch";

const ConfirmationSection = (props) => {
  let history = useHistory();
  return (
    <div id={styles.confirmSection}>
      <div id={styles.pincode}>
        <div>Pincode</div>
        <InputTypes
          type="number"
          id={styles.pincodeField}
          name="pincode"
          onChange={props.collectInfo}
          value={props.userDetails.pincode}
        />
        <div className={styles.error}>
          {props.errors.pincode ? props.errors.pincode : null}
        </div>
      </div>
      <div id={styles.submitSection}>
        <button
          id={styles.update}
          onClick={() => {
            props.actions.submitHandler(history);
          }}
          className={props.reducer.isEdit ? styles.show : styles.hide}
        >
          Update
        </button>
        <button
          id={styles.register}
          className={props.reducer.isEdit ? styles.hide : styles.show}
          onClick={() => {
            props.actions.submitHandler(history);
          }}
        >
          Register
        </button>
        <button id={styles.cancel} onClick={props.actions.cancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};
const mapStateToProps = createSelector(
  (state) => state.reducer,
  (reducer) => ({ reducer })
);

export default connect(
  mapStateToProps,
  bindDispatch
)(withRouter(ConfirmationSection));
