import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import classes from "../../produk/cart/carts.module.css";
import { useHttp } from "../../shared/util/http-hook";
import AlamatField from "../components/AlamatField";

function AlamatUser() {
  const token = useSelector((state) => state.login);
  const { sendRequest } = useHttp();
  const [getAlamat, setGetAlamat] = useState([]);
  useEffect(() => {
    try {
      const fetchdata = async () => {
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
        await setGetAlamat(hasil[0].dataIdUser[0].alamat.rumah);
      };
      fetchdata();
    } catch (err) {
      console.log(err);
    }
  }, [sendRequest, token.tokenLogin]);

  return (
    <Container>
      <h1 className={classes.marginTop}>ALAMAT USER</h1>

      <AlamatField dataAlamat={getAlamat} />
    </Container>
  );
}

export default AlamatUser;
