import React, { Fragment } from "react";
import { currency } from "../../produk/cart/components/AllCart";
import classes from "./cheoutdata.module.css";

export function dataGambar(data) {
  const gambarNote = data.gambarDanKeterangan.filter(
    (daGam) => daGam.keterangan === data.noteProduct
  );

  return gambarNote.length === 0 ? data.gambar[0] : gambarNote[0].url;
}
function CheckoutDataProduct(props) {
  const gambarKondisi = dataGambar(props);
  return (
    <Fragment>
      <div className={`col-2 ${classes.topm}`}>
        <img
          width="100px"
          height="100px"
          src={gambarKondisi.url ? gambarKondisi.url : gambarKondisi}
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

export default CheckoutDataProduct;
