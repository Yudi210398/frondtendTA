import { useState, useEffect } from "react";
import { useHttp } from "./http-hook";
export function useEffectProduct() {
  const { sendRequest } = useHttp();
  const [getData, setGetData] = useState([]);

  try {
    useEffect(() => {
      const fetch = async () => {
        const hasil = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL_API}/allproduct`
        );
        await setGetData(hasil.dataReal || []);
        return hasil;
      };
      fetch();
    }, [sendRequest]);
    console.log(getData);
  } catch (err) {
    console.log(err.message);
    throw err.message;
  }
  return {
    getData,
  };
}
