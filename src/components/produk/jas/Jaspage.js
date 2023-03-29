import React from "react";
import { Fragment } from "react";
import { useEffectProduct } from "../../shared/util/useEffect-http";
import AllProduk from "../allProduct/components/AllProduk";

function Jaspage() {
  const { getData } = useEffectProduct();
  const dataFilterJas = getData.filter((data) => data.jenisPakaian === "jas");

  return (
    <Fragment>
      <br />
      <h1 className="title">JAs Product</h1>
      <AllProduk items={dataFilterJas} />
    </Fragment>
  );
}

export default Jaspage;
