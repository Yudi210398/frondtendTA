import { useState } from "react";
import { useSelector } from "react-redux";
import { useHttp } from "./http-hook";

export function useProdukOrderHttp() {
  const { sendRequest } = useHttp();
  const [data, setData] = useState([]);
  const token = useSelector((state) => state.login);
  const fetch = async (idOrderselesai) => {
    const hasil = await sendRequest(
      `${process.env.REACT_APP_BACKEND_URL_API}/postdatasuksesorder/${idOrderselesai}`,
      "POST",
      null,
      {
        "Content-Type": "application/json",
        Authorization: `Dog ${token.tokenLogin}`,
      }
    );

    setData(hasil || []);
  };

  return {
    fetch,
    data,
  };
}
