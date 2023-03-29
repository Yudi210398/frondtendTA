import React, { Fragment } from "react";
import classes from "../../produk/cart/carts.module.css";
import Container from "../../shared/Container";
import { useUSerhttp } from "../../shared/util/useUSer-http";
import ListTransaksi from "../components/ListTransaksi";
function Transaksi() {
  const { getData, getCartsOrder } = useUSerhttp();
  const { dataIdUser } = getData;
  const hasil = getCartsOrder
    .map((data) => data.produkIds.harga * data.quantity)
    .reduce((a, b) => a + b, 20000);
  return (
    <Fragment>
      <Container>
        <h1 className={classes.marginTop}>Transaksi</h1>
        <br />

        <ListTransaksi
          totalHarga={hasil}
          data={!dataIdUser ? [] : dataIdUser[0]}
        />
      </Container>
    </Fragment>
  );
}

export default Transaksi;
