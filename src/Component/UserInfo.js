import React from "react";
import SelectBox from "../common/SelectBox";
import InputTypes from "../common/InputTypes";
import { Country } from "../Constants/Constant";
import * as styles from "../styles/UserInfo.module.scss";

function UserInfo(props) {
  return (
    <div className={styles.formSection1}>
      <div className={styles.profileSection}>
        <div className={styles.photo}></div>
        <button id={styles.upload}>upload</button>
      </div>
      <div className={styles.dob}>
        <div>Date of Birth:</div>
        <InputTypes
          type="date"
          id={styles.date}
          name="dob"
          onChange={props.collectInfo}
          value={props.userDetails.dob}
        />
        <div className={styles.error}>
          {props.errors.dob ? props.errors.dob : null}
        </div>
      </div>
      <div className={styles.countryOptions}>
        <div>Country:</div>
        <SelectBox
          id={styles.selectCountry}
          name="country"
          onChange={props.collectInfo}
          value={props.userDetails.country}
          elements={Country}
        />
        <div className={styles.error}>
          {props.errors.country ? props.errors.country : null}
        </div>
      </div>
    </div>
  );
}
export default UserInfo;
