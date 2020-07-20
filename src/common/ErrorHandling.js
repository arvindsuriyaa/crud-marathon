import React,{Fragment} from "react";

const ErrorHandling = (props) => {
  return (
    <Fragment>
      {props.condition ? null : props.errors}
    </Fragment>
  );
};

export default ErrorHandling;
