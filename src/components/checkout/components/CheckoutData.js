import React, { Fragment } from "react";
import classes from "./cheoutdata.module.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import CheckoutDataProduct from "./CheckoutDataProduct";
import TransaksiOrder from "./TransaksiOrder";
import { currency } from "../../produk/cart/components/AllCart";
import { iscartOrder, isTransaksi } from "../../../data/AuthSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useHttp } from "../../shared/util/http-hook";
import { useUSerhttp } from "../../shared/util/useUSer-http";

function CheckoutData({ userData, cart }) {
  const { tokenLogin } = useSelector((state) => state.login);
  const { sendRequest } = useHttp();
  const { getCartsOrder } = useUSerhttp();
  const expiedTime = new Date().getTime() + 1 * 24 * 60 * 60 * 1000;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const totalhargaProducts = cart
    ?.map((datac) => datac?.produkIds.harga * datac?.quantity)
    ?.reduce((a, b) => a + b, 20000);

  const totalhargaProductsPakian = cart
    ?.map((datac) => datac?.produkIds.harga * datac?.quantity)
    ?.reduce((a, b) => a + b, 0);

  const onTransaksi = (transaksi) => dispatch(isTransaksi({ transaksi }));
  const onCart = () => dispatch(iscartOrder());
  return (
    <Fragment>
      <div className="row">
        <div className="col-12">
          <h1>Alamat</h1>
        </div>
      </div>

      <div className={`row justify-content-center ${classes["margin-bottom"]}`}>
        <div className="col-2">
          <p className={classes.dataNama}>{userData[0]?.namaCustomer}</p>
          <p className={classes.dataNama}>{userData[0]?.handphone}</p>
        </div>
        <div className="col-8">
          <p className={classes.alamat}>
            {userData[0]?.provinsiKota}, {userData[0]?.alamatLengkap},
            {userData[0]?.kecamatan}, Patokan {userData[0]?.patokan}
          </p>
        </div>

        <div className="col-2">
          <Link to={"/alamatuser"} className="btn btn-danger">
            ubah alamat
          </Link>
        </div>
      </div>
      <br />
      <br />

      <div className="row">
        <div className="col-12">
          <h1>Transaksi</h1>
        </div>
      </div>
      <TransaksiOrder />
      <br />
      <br />
      <div className="row">
        <div className="col-12">
          <h1>Produk Order</h1>
        </div>

        <div
          className={`row justify-content-center ${classes["margin-bottom"]}`}
        >
          {cart.length === 0 && (
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

          {cart?.length > 0 &&
            cart?.map((data, i) => (
              <CheckoutDataProduct
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
            ))}
        </div>
        <hr className={classes.hr} />
      </div>

      <div className="row">
        <div className="col-4">
          <h1>Biaya Aplikasi dan Pengiriman: {currency(20000)}</h1>
        </div>

        <div className="col-4">
          <h1>Total Harga Pakaian: {currency(totalhargaProductsPakian)}</h1>
        </div>

        <div className="col-3">
          <h1 style={{ color: "red" }}>
            Total Pembayaran: {currency(totalhargaProducts)}
          </h1>
        </div>

        <div className="col-1">
          <button
            onClick={async () => {
              if (getCartsOrder.length > 0) {
                alert(
                  "Kamu dalam proses pembayaran produk, selesaikan pembayaran terlebih dahulu atau batalkan pembayaran agar bisa membeli produk selanjutnya"
                );
                navigate("/notif", { replace: true });
              } else
                try {
                  await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL_API}/keranjangorder`,
                    "POST",
                    JSON.stringify({}),
                    {
                      "Content-Type": "application/json",
                      Authorization: `Dog ${tokenLogin}`,
                    }
                  );
                  onTransaksi(true);
                  onCart();
                  localStorage.setItem(
                    "transaksi",
                    JSON.stringify({
                      waktuKadaluarsa: expiedTime,
                      transaksi: true,
                    })
                  );

                  navigate("/transaksi", { replace: true });
                } catch (err) {
                  console.log(err);
                }
            }}
            className="btn btn-success"
          >
            Order
          </button>
        </div>
      </div>
    </Fragment>
  );
}

export default CheckoutData;
