import React, { Fragment } from "react";
import AllProduk from "../allProduct/components/AllProduk";
import { useEffectProduct } from "../../shared/util/useEffect-http";
function BatikPage() {
  const { getData } = useEffectProduct();
  const dataFilterBatik = getData.filter(
    (data) => data.jenisPakaian === "batik"
  );

  return (
    <Fragment>
      <br />
      <h1 className="title">Batik Product</h1>
      <AllProduk items={dataFilterBatik} />
    </Fragment>
  );
}

export default BatikPage;
