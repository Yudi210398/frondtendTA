import React, { Fragment, useCallback, useEffect, useState } from "react";
import { isSelekasiCart } from "../../../../data/AuthSlice.js";
import { currency } from "./AllCart.js";
import classes from "../carts.module.css";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBIcon,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";

import { useDispatch, useSelector } from "react-redux";
import { usePatchQty } from "../../../shared/util/usepatch.js";
import { useHttp } from "../../../shared/util/http-hook.js";
import { dataGambar } from "../../../checkout/components/CheckoutDataProduct.js";

function ListCart(props) {
  const { sendRequest } = useHttp();
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(false);
  const { patch } = usePatchQty();
  const [data, setdata] = useState([]);
  const [dataStock, setdataStock] = useState(0);
  const { tokenLogin } = useSelector((state) => state.login);
  const gambarKondisi = dataGambar(props);

  const onAdd = useCallback(async () => {
    try {
      const hasil = await patch("addQyt", props.produkIds, tokenLogin);
      await setdata(hasil.hasilDatas);
      setdataStock(hasil.hasildataStock[0].produkIds.stock);

      await setDisabled(true);
    } catch (err) {
      console.log(err);
    }
  }, [patch, props.produkIds, tokenLogin]);

  const onMin = useCallback(async () => {
    try {
      const hasil = await patch("minQyt", props.produkIds, tokenLogin);
      await setdata(hasil.hasilDatas);
      await setDisabled(true);
    } catch (err) {
      console.log(err);
    }
  }, [patch, props.produkIds, tokenLogin]);

  const onDelete = useCallback(async () => {
    try {
      const hasil = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL_API}/deletecartid`,
        "DELETE",
        JSON.stringify({ idProduct: props.produkIds }),
        {
          "Content-Type": "application/json",
          Authorization: `Dog ${tokenLogin}`,
        }
      );

      await setdata(hasil.hasilDatas);
    } catch (err) {
      console.log(err);
    }
  }, [sendRequest, tokenLogin, props.produkIds]);
  useEffect(() => {
    const onSeleksiCart = (selekasiCartUbah) =>
      dispatch(isSelekasiCart({ selekasiCartUbah }));
    onSeleksiCart(data);
  }, [data, dispatch]);
  return (
    <Fragment>
      <MDBCard className="rounded-3 mb-4">
        <MDBCardBody className="p-4">
          <MDBRow className="justify-content-between align-items-center">
            <MDBCol md="2" lg="2" xl="2">
              <MDBCardImage
                className="rounded-3"
                fluid
                src={gambarKondisi?.url ? props.gambar[0].url : gambarKondisi}
                alt="Cotton T-shirt"
              />
            </MDBCol>
            <MDBCol md="3" lg="3" xl="3">
              <p className="lead fw-normal mb-2">{props.namaPakian}</p>
              <p>
                <span className="text-muted">Size: </span>
                {props.ukuran} <span className="text-muted">Note: </span>
                {props.noteProduct}
              </p>
            </MDBCol>
            <MDBCol
              md="3"
              lg="3"
              xl="2"
              className="d-flex align-items-center justify-content-around"
            >
              <MDBBtn color="link" className="px-2">
                <MDBIcon fas icon="minus" />
              </MDBBtn>

              <button
                onClick={onMin}
                className={`btn btn-warning ${
                  data[0]?.quantity === 1 || (props.quantity === 1 && !disabled)
                    ? "disabled"
                    : ""
                }`}
              >
                -
              </button>
              <h1 className={classes.qtybtn}>
                {data.length === 0 ? props.quantity : data[0]?.quantity}
              </h1>
              <button
                onClick={onAdd}
                className={`btn btn-warning ${
                  data[0]?.quantity >= dataStock ? "disabled" : ""
                }`}
              >
                +
              </button>

              <MDBBtn color="link" className="px-2">
                <MDBIcon fas icon="plus" />
              </MDBBtn>
            </MDBCol>
            <MDBCol md="3" lg="2" xl="2" className="offset-lg-1">
              <MDBTypography tag="h5" className="mb-0">
                {currency(props.harga)}
              </MDBTypography>
            </MDBCol>
            <MDBCol md="1" lg="1" xl="1" className="text-end">
              <button onClick={onDelete} className="btn btn-danger">
                Hapus
              </button>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </Fragment>
  );
}

export default ListCart;
