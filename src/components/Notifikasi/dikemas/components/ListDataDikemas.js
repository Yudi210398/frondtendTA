import React, { Fragment } from "react";

import classes from "../../../checkout/components/cheoutdata.module.css";
import { currency } from "../../../produk/cart/components/AllCart.js";
function ListDataDikemas({ produks }) {
  function dataGambar(data, datasingle) {
    const gambarNote = data.gambarDanKeterangan.filter(
      (daGam) => daGam.keterangan === datasingle.noteProduk
    );
    return gambarNote.length === 0 ? data.gambar[0] : gambarNote[0].url;
  }

  const gambarKondisi = dataGambar(produks.produk, produks);
  return (
    <Fragment>
      <div className={`col-2 ${classes.topm}`}>
        <img
          width="100px"
          height="100px"
          src={gambarKondisi?.url ? gambarKondisi.url : gambarKondisi}
          className="rounded float-start"
          alt="gambarcheckout"
        />
      </div>

      <div className="col-2">
        <p className={classes.list}> {produks.produk.namaPakian}</p>
      </div>

      <div className="col-2">
        <p className={classes.list}>ukuran: {produks.ukuran}</p>
      </div>

      <div className="col-2">
        <p className={classes.list}>Note: {produks.noteProduk}</p>
      </div>

      <div className="col-2">
        <p className={classes.list}>Quantity: {produks.quantity}</p>
      </div>

      <div className="col-2">
        <p className={classes.list}> {currency(produks.produk.harga)}</p>
      </div>
    </Fragment>
  );
}

export default ListDataDikemas;
