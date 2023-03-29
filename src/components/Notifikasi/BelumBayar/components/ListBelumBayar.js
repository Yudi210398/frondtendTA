import React, { Fragment } from "react";
import { dataGambar } from "../../../checkout/components/CheckoutDataProduct";
import classes from "../../../checkout/components/cheoutdata.module.css";
import { currency } from "../../../produk/cart/components/AllCart";
function ListBelumBayar(props) {
  const gambarKondisi = dataGambar(props);

  return (
    <Fragment>
      <div className={`col-2 ${classes.topm}`}>
        <img
          width="100px"
          height="100px"
          src={gambarKondisi?.url ? props.gambar[0].url : gambarKondisi}
          className="rounded float-start"
          alt="gambarcheckout"
        />
      </div>
      <div className="col-2">
        <p className={classes.list}> {props.namaPakian}</p>
      </div>
      <div className="col-2">
        <p className={classes.list}>ukuran: {props.ukuran}</p>
      </div>

      <div className="col-2">
        <p className={classes.list}>Note: {props.noteProduct}</p>
      </div>

      <div className="col-2">
        <p className={classes.list}>Quantity: {props.quantity}</p>
      </div>

      <div className="col-2">
        <p className={classes.list}> {currency(props.harga)}</p>
      </div>
    </Fragment>
  );
}

export default ListBelumBayar;
