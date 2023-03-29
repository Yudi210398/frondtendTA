import React from "react";
import classes from "./cheoutdata.module.css";
import bca from "../../shared/logo/bca.png";
function TransaksiOrder() {
  return (
    <div className={`row ${classes["margin-bottom"]}`}>
      <div className={`col-2 ${classes.topm}`}>
        <img
          width="80px"
          height="80px"
          src={bca}
          className="rounded float-start"
          alt="logo Bca"
        />
      </div>

      <div className={`col-3 ${classes.topm}`}>
        <p className={classes.list}>Transfer Manual Ke:</p>
      </div>

      <div className={`col-4 ${classes.topm}`}>
        <p className={classes.list}>YUDI RUNAT MASNENO - 3420107144</p>
      </div>
    </div>
  );
}

export default TransaksiOrder;
