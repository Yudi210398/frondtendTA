import { useCallback } from "react";
import { useHttp } from "./http-hook";

export function usePatchQty() {
  const { sendRequest } = useHttp();
  const patch = useCallback(
    async (url, propss, token) => {
      try {
        let hasil = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL_API}/${url}`,
          "PATCH",
          JSON.stringify({
            produkIds: propss,
          }),
          {
            "Content-Type": "application/json",
            Authorization: `Dog ${token}`,
          }
        );

        return hasil;
      } catch (err) {
        console.log(err);
        throw err.message;
      }
    },
    [sendRequest]
  );

  return { patch };
}
