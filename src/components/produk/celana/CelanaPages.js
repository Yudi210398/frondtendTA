import React, { Fragment } from "react";
import { useEffectProduct } from "../../shared/util/useEffect-http.js";
import AllProduk from "../allProduct/components/AllProduk.js";
function CelanaPages() {
  const { getData } = useEffectProduct();
  const dataFilterCelana = getData.filter(
    (data) => data.jenisPakaian === "celana"
  );

  return (
    <Fragment>
      <br />
      <h1 className="title">celana Product</h1>
      <AllProduk items={dataFilterCelana} />
    </Fragment>
  );
}

export default CelanaPages; 
