import { useState, useCallback } from "react";

export function useAxios() {
  const [errorValidate1, setErrorValidate1] = useState(false);
  const [errorPesan1, setErorrPesan1] = useState("");
  const sendReq = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
        });
        const responseData = await response.json();
        if (!response.ok || response.status === 500)
          throw new Error(responseData.error.pesan);
        return responseData;
      } catch (err) {
        console.log(err.message);
        throw err.message;
      }
    },
    []
  );
  return {
    errorValidate1,
    setErrorValidate1,
    errorPesan1,
    setErorrPesan1,
    sendReq,
  };
}
