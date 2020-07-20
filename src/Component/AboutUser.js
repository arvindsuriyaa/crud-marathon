import React from "react";
import * as styles from "../styles/AboutUser.module.scss";
import { OrgName } from "../Constants/Constant";
import { State } from "../Constants/Constant";
import SelectBox from "../common/SelectBox";
import InputTypes from "../common/InputTypes";

function AboutUser(props) {
  return (
    <div className={styles.formSection2}>
      <div className={styles.organisation}>
        <div>Organisation Name:</div>
        <SelectBox
          id={styles.selectOrganisation}
          onChange={props.collectInfo}
          name="orgName"
          value={props.userDetails.orgName}
          elements={OrgName}
        />
        <div className={styles.error}>
          {props.errors.orgName ? props.errors.orgName : null}
        </div>
      </div>
      <div className="firstName">
        <div>First Name:</div>
        <InputTypes
          type="text"
          id={styles.firstNameField}
          name="firstName"
          onChange={props.collectInfo}
          value={props.userDetails.firstName}
        />
        <div className={styles.error}>
          {props.errors.firstName ? props.errors.firstName : null}
        </div>
      </div>
      <div className="mobileNumber">
        <div>Mobile Number:</div>
        <InputTypes
          type="number"
          id={styles.mobileField}
          name="mobileNumber"
          onChange={props.collectInfo}
          value={props.userDetails.mobileNumber}
        />
        <div className={styles.error}>
          {props.errors.mobileNumber ? props.errors.mobileNumber : null}
        </div>
      </div>
      <div className="state">
        <div>State:</div>
        <SelectBox
          id={styles.selectState}
          name="state"
          onChange={props.collectInfo}
          value={props.userDetails.state}
          elements={State}
        />
        <div className={styles.error}>
          {props.errors.state ? props.errors.state : null}
        </div>
      </div>
    </div>
  );
}

export default AboutUser;
