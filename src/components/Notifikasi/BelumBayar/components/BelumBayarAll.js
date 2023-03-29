import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { currency } from "../../../produk/cart/components/AllCart";
import ListBelumBayar from "./ListBelumBayar";
import classes from "./belumbayar.module.css";
function BelumBayarAll({ cartOrder, limit }) {
  const totalhargaProducts = cartOrder
    ?.map((datac) => datac?.produkIds.harga * datac?.quantity)
    ?.reduce((a, b) => a + b, 20000);

  return (
    <Fragment>
      <div className="row">
        <div className="col-12">
          {cartOrder?.length === 0 && (
            <h1 className="text-center">Belum Ada Pembayaran</h1>
          )}
        </div>
        {cartOrder?.length > 0 &&
          cartOrder?.map((data, i) => (
            <ListBelumBayar
              produkIds={data._id}
              gambar={data.produkIds.gambar}
              namaPakian={data.produkIds.namaPakian}
              key={i}
              gambarDanKeterangan={data?.produkIds?.gambarDanKeterangan}
              quantity={data.quantity}
              noteProduct={data.noteProduk}
              ukuran={data.ukuran}
              harga={data?.produkIds?.harga}
              stock={data?.produkIds?.stock}
              idProduct={data?.produkIds?.idProduct}
            />
          ))}
      </div>
      <br />
      <br />
      <br />
      <br />
      {cartOrder?.length > 0 && <hr />}

      {cartOrder?.length > 0 && (
        <div className="row">
          <div className="col-5">
            <h1 className={classes.bayarBelum}>
              Total yang harus dibayar :
              <span style={{ color: "red" }}>
                {currency(totalhargaProducts)}
              </span>
            </h1>
          </div>
          <div className="col-4">
            <h1>
              Bayar sebelum : <span style={{ color: "red" }}>{limit}</span>
            </h1>
          </div>

          <div className="col-3">
            <Link to={"/transaksi"} className="btn btn-success btn-md">
              BAYAR PRODUKS
            </Link>
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default BelumBayarAll;
