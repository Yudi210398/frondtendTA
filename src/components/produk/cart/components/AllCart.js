import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  isTotalHargaKeranjang,
  isTotalHargaKeranjangLength,
} from "../../../../data/AuthSlice";
import { Link } from "react-router-dom";

import Container from "../../../shared/Container";
import { useHttp } from "../../../shared/util/http-hook";
import { updateQuantityFungsi } from "../../allProduct/components/SingleProcuctId";
import classes from "../carts.module.css";
import ListCart from "./ListCart";
export const currency = (daTa) =>
  new Intl.NumberFormat("id", {
    style: "currency",
    currency: "IDR",
    maximumSignificantDigits: 3,
  }).format(daTa);

function AllCart(props) {
  const navigate = useNavigate();
  const [dataQty, setDataQty] = useState([]);
  const { tokenLogin } = useSelector((state) => state.login);
  const { sendRequest } = useHttp();
  const { selekasiCartUbah } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  const addorMinLength = useCallback(
    (totalhargaKeranjanglength) =>
      dispatch(isTotalHargaKeranjangLength({ totalhargaKeranjanglength })),
    [dispatch]
  );

  const totalhargaOri = props.itemCart
    ?.map((datas) => datas.produkIds.harga * datas.quantity)
    .reduce((a, b) => a + b, 0);
  // const totalHargaUbah = props.itemCart?.filter((dats) => {
  //   return dats;
  // });
  useEffect(() => {
    const onHargaTotalKeranjang = (totalhargaKeranjang) =>
      dispatch(isTotalHargaKeranjang({ totalhargaKeranjang }));
    onHargaTotalKeranjang(totalhargaOri);
    try {
      const getchDataQtyUpdate = async () => {
        const hasil = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL_API}/getaIdcart`,
          "GET",
          null,
          {
            "Content-Type": "application/json",
            Authorization: `Dog ${tokenLogin}`,
          }
        );
        await setDataQty(hasil.dataIdCart.item);
        return hasil;
      };
      getchDataQtyUpdate();
      addorMinLength(dataQty.length);
      updateQuantityFungsi(dataQty.length);
    } catch (err) {
      console.log(err);
    }
  }, [
    sendRequest,
    tokenLogin,
    dispatch,
    totalhargaOri,
    selekasiCartUbah,
    addorMinLength,
    dataQty.length,
  ]);

  const totalhargaProducts = dataQty
    ?.map((datac) => datac?.produkIds.harga * datac?.quantity)
    ?.reduce((a, b) => a + b, 0);
  return (
    <Container>
      <div className="d-flex justify-content-center row">
        {/* {props?.itemCart.length === 0 && (
            <h1 className="text-center">Data Tidak Ada</h1>
          )} */}
        {dataQty.length === 0 && (
          <div className="row justify-content-center">
            <div className="col-4">
              <button
                onClick={() => navigate("/allProduct", { replace: true })}
                className="btn btn-outline-danger"
              >
                Belanja Dulu, Karena Keranjang Kosong
              </button>
            </div>
          </div>
        )}

        {dataQty.length > 0 &&
          dataQty.map((data, i) => {
            console.log(data);
            return (
              <ListCart
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
            );
          })}

        <hr />

        {dataQty.length > 0 && (
          <div className={`row justify-content-center ${classes.up}`}>
            <div className="col-6">
              <h1 className={classes.totalbarang}>
                Total harga Barang :
                <span className={classes.harga}>
                  {currency(totalhargaProducts)}
                </span>
              </h1>
            </div>

            <div className="col-6">
              <Link
                onClick={() => {
                  if (props?.alamat.length === 0)
                    alert("masukan alamat terlebih dahulu");
                  return;
                }}
                to={props.alamat.length > 0 ? "/checkoutdata" : "/alamatuser"}
                className="btn btn-outline-success"
              >
                CHECK OUT
              </Link>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}

export default AllCart;
