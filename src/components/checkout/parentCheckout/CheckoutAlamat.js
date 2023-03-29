import React, { Fragment } from "react";
import classes from "../../produk/cart/carts.module.css";
import Container from "../../shared/Container";
import { useUSerhttp } from "../../shared/util/useUSer-http";
import CheckoutData from "../components/CheckoutData";

function CheckoutAlamat() {
  const { getalamat, getCarts } = useUSerhttp();

  return (
    <Fragment>
      <Container>
        <h1 className={classes.marginTop}>CHECKOUT</h1>
        <br />
        <CheckoutData userData={getalamat} cart={getCarts} />
      </Container>
    </Fragment>
  );
}

export default CheckoutAlamat;
