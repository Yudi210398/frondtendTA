import React, { Fragment } from "react";
import AllProduk from "../allProduct/components/AllProduk";
import { useSelector } from "react-redux";

export const ProdukCari = () => {
  const { dataPencarian } = useSelector((state) => state.login);
  return (
    <Fragment>
      <br />
      <h1 className="title">Pencarian Produk</h1>
      <br />
      <br />
      <div className="row justify-content-center">
        {dataPencarian?.length === 0 && (
          <h1 className="text-center">Data Tidak Ada</h1>
        )}
      </div>
      {dataPencarian?.length > 0 && <AllProduk items={dataPencarian} />}
    </Fragment>
  );
};
