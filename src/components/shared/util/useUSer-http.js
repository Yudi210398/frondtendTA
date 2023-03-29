import { useState, useEffect } from "react";
import { useHttp } from "./http-hook";
import { useSelector } from "react-redux";
export function useUSerhttp() {
  const token = useSelector((state) => state.login);
  const { sendRequest } = useHttp();
  const [getData, setGetData] = useState([]);
  const [getCarts, setGetCart] = useState([]);
  const [getCartsOrder, setGetCartOrder] = useState([]);
  const [getalamat, setAlamats] = useState([]);
  try {
    useEffect(() => {
      const fetch = async () => {
        const hasil = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL_API}/getaIdUsers`,
          "GET",
          null,
          {
            "Content-Type": "application/json",
            Authorization: `Dog ${token.tokenLogin}`,
          }
        );
        setGetCart(hasil.dataIdUser[0].keranjang.item);
        setGetCartOrder(hasil.dataIdUser[0].keranjangOrder.item);
        setAlamats(hasil.dataIdUser[0].alamat.rumah);
        await setGetData(hasil || []);
        return hasil;
      };
      fetch();
    }, [sendRequest, token.tokenLogin]);
  } catch (err) {
    console.log(err.message);
  }
  return {
    getData,
    getCarts,
    getalamat,
    getCartsOrder,
  };
}
