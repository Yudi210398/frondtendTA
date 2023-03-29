import { useState, useEffect } from "react";
import { useHttp } from "./http-hook.js";
import { useSelector } from "react-redux";
export const useOrderProdukId = (idProdukOrder) => {
  const token = useSelector((state) => state.login);
  const { sendRequest, pesanVerify } = useHttp();
  const [getData, setGetData] = useState([]);
  try {
    useEffect(() => {
      const fetch = async () => {
        const hasil = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL_API}/detailprodukorder/${idProdukOrder}`,
          "GET",
          null,
          {
            "Content-Type": "application/json",
            Authorization: `Dog ${token.tokenLogin}`,
          },
        );
        await setGetData(hasil || []);
        return hasil;
      };
      fetch();
    }, [sendRequest, idProdukOrder, token]);
  } catch (err) {
    console.log(err.message);
    throw err.message;
  }
  return {
    getData,
    pesanVerify,
  };
};
