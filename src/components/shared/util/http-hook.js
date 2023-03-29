import { useCallback, useState } from "react";

export function useHttp() {
  const [errorValidate, setErrorValidate] = useState(false);
  const [errorPesan, setErorrPesan] = useState("");
  const [pesanVerify, setPesanVerify] = useState("");
  const sendRequest = useCallback(
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
        setPesanVerify(err.message);
        throw err.message;
      }
    },
    [],
  );
  return {
    pesanVerify,
    errorValidate,
    sendRequest,
    setErrorValidate,
    errorPesan,
    setErorrPesan,
  };
}
