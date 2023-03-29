import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHttp } from "./http-hook";

export function usePengirimanHttp() {
  const token = useSelector((state) => state.login);
  const { sendRequest, pesanVerify } = useHttp();
  const [data, setData] = useState([]);
}
