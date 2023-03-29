import React, { Fragment } from "react";
import { useEffectProduct } from "../../shared/util/useEffect-http.js";
import AllProduk from "../allProduct/components/AllProduk.js";

/* 

const data = [4, 5, 6];
const data1 = [7, 8, 9];
const data2 = [1, 2, 3];

const merge = data.concat(data1, data2);



const acak = merge
  .map((value) => ({ value, sort: Math.random() }))
  .sort((a, b) => a.sort - b.sort)
  .map(({ value }) => value);
 

*/

function Baju() {
  const { getData } = useEffectProduct();

  const dataFilterKemeja = getData.filter(
    (data) => data.jenisPakaian === "kemeja"
  );

  return (
    <Fragment>
      <br />
      <h1 className="title">Kemeja Product</h1>
      <AllProduk items={dataFilterKemeja} />
    </Fragment>
  );
}

export default Baju;
