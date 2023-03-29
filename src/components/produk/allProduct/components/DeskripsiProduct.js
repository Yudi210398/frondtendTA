import React, { Fragment } from "react";
import "./deskripsiallProduk.css";
function DeskripsiProduct(props) {
  const hasilSplit = props?.dataProduct.deskripsi?.split("\n");
  return (
    <Fragment>
      <div className="row justify-content-center">
        <h1 className="text-center">Deskripsi Produk</h1>
        <div className="col-10">
          {hasilSplit?.map((data, i) => (
            <h1 key={i}>{data}</h1>
          ))}
        </div>
      </div>
    </Fragment>
  );
}

export default DeskripsiProduct;
