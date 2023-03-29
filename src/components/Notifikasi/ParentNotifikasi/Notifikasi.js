import React from "react";
import classes from "../../produk/cart/carts.module.css";
import Container from "../../shared/Container";
import ListNotif from "../Components/ListNotif";
function Notifikasi() {
  return (
    <Container>
      <h1 className={classes.marginTop}>NOTIFIKASI</h1>
      <ListNotif />
    </Container>
  );
}

export default Notifikasi;
