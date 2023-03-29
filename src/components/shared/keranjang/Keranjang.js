import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CartIcon from "../CartIcon/CartIcon.js";
import { useHttp } from "../util/http-hook.js";
import classes from "./keranjang.module.css";
function Keranjang() {
  const { sendRequest } = useHttp();
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const token = useSelector((state) => state.login);
  const [clases, setClases] = useState(token.totalhargaKeranjanglength);
  const btnClasses = `${classes.button} ${
    btnIsHighlighted ? classes.bump : ""
  }`;
  try {
    useEffect(() => {
      const fetch = async () => {
        const hasil = await Promise.all([
          await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL_API}/getaIdUsers`,
            "GET",
            null,
            {
              "Content-Type": "application/json",
              Authorization: `Dog ${token.tokenLogin}`,
            }
          ),
          await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL_API}/allproduct`
          ),
        ]);
        return hasil;
      };
      fetch();
      setClases(token.totalhargaKeranjanglength);
    }, [sendRequest, token]);
  } catch (err) {
    console.log(err.message);
  }

  useEffect(() => {
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [token.totalhargaKeranjang]);

  return (
    <button className={classes.button + " " + btnClasses}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span className={classes.linkss}>Cart</span>
      <span className={clases === 0 ? "" : classes.badge}>
        {clases === 0 ? "" : clases}
      </span>
    </button>
  );
}

export default Keranjang;
