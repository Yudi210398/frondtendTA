import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Container from "../../shared/Container";
import { useHttp } from "../../shared/util/http-hook";
import classes from "./carts.module.css";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
function CartKamu() {
  const { sendRequest } = useHttp();
  const token = useSelector((state) => state.login);
  const [getCart, setGetCart] = useState(null);

  try {
    useEffect(() => {
      const fetch = async () => {
        const hasil = await Promise.all([
          await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL_API}/getaIdUsers`,
            "GET",
            null,
            {
              "Content-Type": "application/json",
              Authorization: `Dog ${token.tokenLogin}`,
            }
          ),
        ]);
        await setGetCart(hasil[0].dataIdUser[0].keranjang.item);

        return hasil;
      };
      fetch();
    }, [sendRequest, token.tokenLogin]);
  } catch (err) {
    console.log(err);
  }

  const gambarNote = getCart?.produkIds?.gambarDanKeterangan.filter((daGam) => {
    return daGam?.keterangan === getCart?.noteProduct;
  });
  return (
    <Container>
      <div className={classes["marginTop"]}>
        <h1 className={classes.cart}>Your Cart</h1>
        <div className="d-flex justify-content-center row">
          {getCart?.length === 0 && (
            <h1 className="text-center">Data Tidak Ada</h1>
          )}
          {getCart?.length > 0 && getCart?.map((data, i) => {})}
        </div>
      </div>
    </Container>
  );
}

export default CartKamu;
