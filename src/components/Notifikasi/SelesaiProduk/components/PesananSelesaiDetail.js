import React from "react";
import Container from "../../../shared/Container";
// import classes from "../../produk/cart/carts.module.css";
import classes from "../../../produk/cart/carts.module.css";
import { useParams } from "react-router-dom";
import { useOrderProdukId } from "../../../shared/util/useOrderProdukId";
import ListDataDikemas from "../../dikemas/components/ListDataDikemas";
import { currency } from "../../../produk/cart/components/AllCart";

export const PesananSelesaiDetail = () => {
  const { _idprodukorderselesai } = useParams();
  const { getData } = useOrderProdukId(_idprodukorderselesai);
  const fixProduk = getData?.detailProduk;
  const orderShemas = getData?.orderShemas;
  const datess = orderShemas?.tanggal.split("GMT")[0].trim();
  return (
    <Container>
      <h1 className={classes.marginTop}>DETAIL PESANAN SELESAI</h1>

      <br />
      <br />
      {fixProduk?.map((data, i) => {
        return (
          <div className="row" key={i}>
            <ListDataDikemas produks={data} />;
          </div>
        );
      })}

      <br />
      <br />

      <hr />
      <br />
      <div className="row">
        <div className="col-6">
          <h1>
            Tanggal Order Barang :{" "}
            <span style={{ color: "red" }}>{datess}</span>
          </h1>
        </div>
        <div className="col-3">
          <h1>
            Total bayar :{" "}
            <span style={{ color: "green" }}>
              {currency(orderShemas?.totalHarga)}
            </span>
          </h1>
        </div>
        <div className="col-3">
          <h1 style={{ color: "green" }}>Barang Sudah Diterima</h1>
        </div>
      </div>
    </Container>
  );
};
