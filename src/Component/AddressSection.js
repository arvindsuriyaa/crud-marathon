import React from "react";
import { connect } from "react-redux";
import * as styles from "../styles/AddressSection.module.scss";
import { createSelector } from "reselect";
import bindDispatch from "../utils/bindDispatch";

const AddressSection = (props) => {
  let { reducer } = props;
  let { userDetails } = reducer;

  return (
    <div id={styles.addressSection}>
      <div id={styles.address}>
        <div className={styles.presentAddress}>
          <div>Communication Address:</div>
          <textarea
            id={styles.communicationAddress}
            name="communicationAddress"
            onChange={props.collectInfo}
            value={userDetails.communicationAddress}
          />
          <div className={styles.error}>
            {props.errors.communicationAddress
              ? props.errors.communicationAddress
              : null}
          </div>
        </div>
        <div className={styles.addressOfStay}>
          <div>Permanent Address</div>
          <textarea
            id={styles.permanentAddress}
            name="permanentAddress"
            onChange={props.collectInfo}
            value={
              reducer.isChecked
                ? userDetails.communicationAddress
                : userDetails.permanentAddress
            }
          />
          <div className={styles.error}>
            {props.errors.permanentAddress
              ? props.errors.permanentAddress
              : null}
          </div>
        </div>
      </div>
      <div className={styles.checkBox}>
        <input
          type="checkbox"
          id={styles.copy}
          checked={props.reducer.isChecked}
          onChange={(event) => props.actions.toggleChange(event)}
        />
        <div>Permanent Address same as communication address</div>
      </div>
    </div>
  );
};
const mapStateToProps = createSelector(
  (state) => state.reducer,
  (reducer) => ({ reducer })
);

export default connect(mapStateToProps, bindDispatch)(AddressSection);
