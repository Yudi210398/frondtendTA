import React from "react";
import { Container } from "react-bootstrap";
import classes from "../../produk/cart/carts.module.css";
import { useOrderProdukId } from "../../shared/util/useOrderProdukId";
import { useParams } from "react-router-dom";
import ListDataDikemas from "../dikemas/components/ListDataDikemas";
import { currency } from "../../produk/cart/components/AllCart";
import AlertModalConfirm from "../../shared/AlertModalConfirm/AlertModalConfirm";
import { useProdukOrderHttp } from "../../shared/util/useProdukOrderHttp";
const ProdukOrder = () => {
  const { fetch } = useProdukOrderHttp();
  const { _idprodukorder } = useParams();
  const { getData } = useOrderProdukId(_idprodukorder);
  const fixProduk = getData?.detailProduk;
  const orderShemas = getData?.orderShemas;
  console.log(orderShemas?._id);
  return (
    <Container>
      <h1 className={classes.marginTop}>DETAIL PRODUK ORDERS</h1>

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
        <div className="col-3">
          <h1>
            Total bayar :{" "}
            <span style={{ color: "red" }}>
              {currency(orderShemas?.totalHarga)}
            </span>
          </h1>
        </div>

        <div className="col-2">
          {/* <button
            onClick={() => fetch(orderShemas?._id)}
            className={`btn btn-danger rounded mx-auto d-block`}
          >
            Pesanan Diterima
          </button> */}

          <AlertModalConfirm
            title={"Confirm terima Pesanan"}
            pesanbody={"Apakah Pesanan barang sudah di terima?"}
            idorder={orderShemas?._id}
            fungsiYes={() => {
              fetch(orderShemas?._id);
            }}
            keluar={"Pesanan Diterima"}
          />
        </div>
      </div>
    </Container>
  );
};

export default ProdukOrder;
