import React, { Fragment, useEffect, useCallback } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/auth/login/Login.js";
import Register from "./components/auth/register/Register.js";
import IdProduct from "./components/produk/allProduct/pages/IdProduct.js";

import PagesAllProduk from "./components/produk/allProduct/pages/PagesAllProduk.js";
import Baju from "./components/produk/baju/Baju.js";
import BatikPage from "./components/produk/batik/BatikPage.js";
import CelanaPages from "./components/produk/celana/CelanaPages.js";
import Jaspage from "./components/produk/jas/Jaspage.js";
import Navbar from "./components/shared/navbar/Navbar.js";
import { useDispatch, useSelector } from "react-redux";
import {
  isLogin,
  isTotalHargaKeranjangLength,
  isTransaksi,
} from "./data/AuthSlice.js";
import YourCart from "./components/produk/cart/YourCart.js";
import Profile from "./components/client/account/Profile.js";
import AlamatUser from "./components/client/account/AlamatUser.js";
import CheckoutAlamat from "./components/checkout/parentCheckout/CheckoutAlamat";
import Transaksi from "./components/transaksion/parenttransaction/Transaksi.js";
import Notifikasi from "./components/Notifikasi/ParentNotifikasi/Notifikasi.js";
import { useHttp } from "./components/shared/util/http-hook.js";
import ProdukOrder from "./components/Notifikasi/delivery/ProdukOrder.js";
import { PesananSelesaiDetail } from "./components/Notifikasi/SelesaiProduk/components/PesananSelesaiDetail.js";

// import { useState } from "react";
// import { useHttp } from "./components/shared/util/http-hook.js";

function App() {
  // const [data, setData] = useState();
  // const { sendRequest } = useHttp();
  const { userId, transaksi, tokenLogin } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const { sendRequest } = useHttp();
  const onLogin = useCallback(
    (tokenLogin, userId, keranjang) =>
      dispatch(isLogin({ tokenLogin, userId, keranjang })),
    [dispatch]
  );

  const onData = useCallback(
    (totalhargaKeranjanglength) =>
      dispatch(isTotalHargaKeranjangLength({ totalhargaKeranjanglength })),
    [dispatch]
  );

  const onTransaksi = useCallback(
    (transaksi) => dispatch(isTransaksi({ transaksi })),
    [dispatch]
  );

  // !! Token
  // const token = useSelector((state) => state.login);
  useEffect(() => {
    const dataBrowser = JSON.parse(localStorage.getItem("userData"));
    const transaksis = JSON.parse(localStorage.getItem("transaksi"));

    if (
      dataBrowser?.token &&
      dataBrowser?.userId &&
      dataBrowser?.waktuExpied > new Date().getTime()
    ) {
      setTimeout(() => {
        window.location.reload();
      }, 3600000);
      onLogin(dataBrowser?.token, dataBrowser?.userId, dataBrowser?.keranjang);
      onData(dataBrowser?.totalhargaKeranjanglength);
    } else localStorage.removeItem("userData");

    if (
      transaksis?.transaksi &&
      transaksis?.waktuKadaluarsa > new Date().getTime()
    )
      onTransaksi(transaksis?.transaksi);
    else {
      try {
        const hasil = async () => {
          await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL_API}/limitpembayaran`,
            "PATCH",
            JSON.stringify({}),
            {
              "Content-Type": "application/json",
              Authorization: `Dog ${tokenLogin}`,
            }
          );
        };
        hasil();
      } catch (err) {
        console.log(err);
      }

      localStorage.removeItem("transaksi");
    }
    // const fetch = async () => {
    //   const hasil1 = await sendRequest(
    //     `${process.env.REACT_APP_BACKEND_URL_API}/getaIdUsers`,
    //     "GET",
    //     null,
    //     {
    //       "Content-Type": "application/json",
    //       Authorization: `Dog ${token?.tokenLogin}`,
    //     }
    //   );
    //   console.log(hasil1);
    // };

    // fetch();
  }, [onLogin, onData, onTransaksi, transaksi, sendRequest, tokenLogin]);

  // console.log(data);
  let route;

  if (userId) {
    route = (
      <Fragment>
        <Route path="/allProduct" element={<PagesAllProduk />} />;
        <Route path="/kemejaProduct" element={<Baju />} />;
        <Route path="/alamatuser" element={<AlamatUser />} />;
        <Route path="/yourCart" element={<YourCart />} />;
        <Route path="/celanaProduct" element={<CelanaPages />} />;
        <Route path="/batikProduct" element={<BatikPage />} />;
        <Route path="/jasProduct" element={<Jaspage />} />;
        <Route path="/chooseProductId/:_id" element={<IdProduct />} />;
        <Route path="/profile" element={<Profile />} />;
        <Route path="/checkoutdata" element={<CheckoutAlamat />} />;
        <Route path="/transaksi" element={<Transaksi />} />;
        <Route
          path="/orderprodukdetail/:_idprodukorder"
          element={<ProdukOrder />}
        />
        ;
        <Route
          path="/orderprodukdetailselesai/:_idprodukorderselesai"
          element={<PesananSelesaiDetail />}
        />
        ;
        <Route path="/notif" element={<Notifikasi />} />;
        <Route
          path="*"
          element={
            <Navigate
              to="/orderprodukdetailselesai/:_idprodukorderselesai"
              replace
            />
          }
        />
        ;
      </Fragment>
    );
  } else {
    route = (
      <Fragment>
        <Route path="/allProduct" element={<PagesAllProduk />} />;
        <Route path="/login" element={<Login />} />;
        <Route path="/register" element={<Register />} />;
        <Route path="/kemejaProduct" element={<Baju />} />;
        <Route path="/celanaProduct" element={<CelanaPages />} />;
        <Route path="/checkoutdata" element={<CheckoutAlamat />} />;
        <Route path="/batikProduct" element={<BatikPage />} />;
        <Route path="/jasProduct" element={<Jaspage />} />;
        <Route path="/chooseProductId/:_id" element={<IdProduct />} />;
        <Route
          path="/orderprodukdetail/:_idprodukorder"
          element={<ProdukOrder />}
        />
        <Route
          path="/orderprodukdetailselesai/:_idprodukorderselesai"
          element={<PesananSelesaiDetail />}
        />
        <Route path="/notif" element={<Notifikasi />} />;
        <Route path="*" element={<Navigate to="/allProduct" replace />} />;
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Navbar />
      <Routes>{route}</Routes>
    </Fragment>
  );
}

export default App;
