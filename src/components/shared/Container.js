import React, { Fragment } from "react";

function Container({ children }) {
  return (
    <Fragment>
      <div className="container">{children}</div>
    </Fragment>
  );
}

export default Container;
