import React from "react";
import InputTypes from "../common/InputTypes";
import * as styles from "../styles/ContactUser.module.scss";

function ContactUser(props) {
  return (
    <div className={styles.formSection3}>
      <div className={styles.lastName}>
        <div>Last Name:</div>
        <InputTypes
          type="text"
          id={styles.lastNameField}
          name="lastName"
          onChange={props.collectInfo}
          value={props.userDetails.lastName}
        />
        <div className={styles.error}>
          {props.errors.lastName ? props.errors.lastName : null}
        </div>
      </div>
      <div className={styles.gender}>
        <div>Gender</div>
        <form id="genderCheck">
          <span>Male</span>
          <input
            type="radio"
            name="gender"
            value="male"
            id="male"
            checked={props.userDetails.gender === "male"}
            onChange={props.collectInfo}
          />
          <span>Female</span>
          <input
            type="radio"
            name="gender"
            value="female"
            id="female"
            onChange={props.collectInfo}
            checked={props.userDetails.gender === "female"}
          />
        </form>
        <div className={styles.error}>
          {props.errors.gender ? props.errors.gender : null}
        </div>
      </div>
      <div className={styles.emailID}>
        <div>Email ID:</div>
        <input
          id={styles.emailIdField}
          type="text"
          name="emailId"
          onChange={props.collectInfo}
          value={props.userDetails.emailId}
        />
        <div className={styles.error}>
          {props.errors.emailId ? props.errors.emailId : null}
        </div>
      </div>
      <div className={styles.city}>
        <div>City:</div>
        <InputTypes
          type="text"
          id={styles.cityInput}
          name="city"
          onChange={props.collectInfo}
          value={props.userDetails.city}
        />
        <div className={styles.error}>
          {props.errors.city ? props.errors.city : null}
        </div>
      </div>
    </div>
  );
}
export default ContactUser;
