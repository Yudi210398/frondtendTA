import React from "react";
import Container from "../../shared/Container";
import AllCart from "./components/AllCart";
import classes from "./carts.module.css";
import { Formik } from "formik";
import { useUSerhttp } from "../../shared/util/useUSer-http";

function YourCart() {
  const { getalamat, getCarts } = useUSerhttp();

  return (
    <Container>
      <div className={classes["marginTop"]}>
        <h1 className={classes.cart}>Your Cart</h1>
        <br />

        <Formik>
          <AllCart alamat={getalamat} itemCart={getCarts} />
        </Formik>
      </div>
    </Container>
  );
}

export default YourCart;
