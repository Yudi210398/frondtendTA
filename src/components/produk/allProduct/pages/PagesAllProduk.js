import React, { Fragment, useState, useEffect } from "react";
import AllProduk from "../components/AllProduk";
import Slider from "../../BannerSlider/Slider.js";
import { useHttp } from "../../../shared/util/http-hook";
// import { confirmAlert } from "react-confirm-alert";
function PagesAllProduk() {
  const { sendRequest } = useHttp();
  const [getData, setGetData] = useState([]);
  try {
    useEffect(() => {
      // let tidakBalik = false;

      // if (!tidakBalik) {
      const fetch = async () => {
        const hasil = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL_API}/allproduct`
        );
        await setGetData(hasil.dataReal || []);
        return hasil;
      };
      fetch();
      // }
      // return () => {
      //   tidakBalik = true;
      // };
    }, [sendRequest]);
  } catch (err) {
    console.log(err.message);
  }
  return (
    <Fragment>
      <Slider />
      <AllProduk items={getData} />
    </Fragment>
  );
}

export default PagesAllProduk;
