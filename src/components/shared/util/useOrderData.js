import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHttp } from "./http-hook";

export function useOrderData(urllink) {
  const token = useSelector((state) => state.login);
  const { sendRequest, pesanVerify } = useHttp();

  const [data, setData] = useState([]);

  try {
    useEffect(() => {
      const fetch = async () => {
        const hasil = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL_API}/${urllink}`,
          "GET",
          null,
          {
            "Content-Type": "application/json",
            Authorization: `Dog ${token.tokenLogin}`,
          }
        );
        setData(hasil || []);
        return hasil;
      };
      fetch();
    }, [sendRequest, token.tokenLogin, urllink]);
  } catch (err) {
    console.log(err);
  }

  return {
    pesanVerify,
    data,
  };
}
