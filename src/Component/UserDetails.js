import React from "react";
import UserInfo from "../Component/UserInfo";
import AboutUser from "../Component/AboutUser";
import ContactUser from "../Component/ContactUser";
import "../common/commonStyle.scss";

function UserDetails(props) {
  return (
    <div id="userDetails">
      <UserInfo
        userDetails={props.userDetails}
        errors={props.errors}
        collectInfo={props.collectInfo}
      />
      <AboutUser
        userDetails={props.userDetails}
        errors={props.errors}
        collectInfo={props.collectInfo}
      />
      <ContactUser
        userDetails={props.userDetails}
        errors={props.errors}
        collectInfo={props.collectInfo}
      />
    </div>
  );
}

export default UserDetails;
