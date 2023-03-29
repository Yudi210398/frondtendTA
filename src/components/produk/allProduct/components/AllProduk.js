import React, { Fragment } from "react";
import Container from "../../../shared/Container";

import "./allProduk.css";
import ListProduct from "./ListProduct.js";

function AllProduk(props) {
  return (
    <Fragment>
      <Container>
        <div className="row justify-content-center">
          {props.items.length === 0 && (
            <h1 className="text-center">Data Tidak Ada</h1>
          )}
          {props.items.length > 0 &&
            props.items?.map((data) => (
              <ListProduct
                _id={data._id}
                key={data._id}
                jenisPakaian={data.jenisPakaian}
                namaPakian={data.namaPakian}
                stock={data.stock}
                deskripsi={data.deskripsi}
                harga={data.harga}
                ukuran={data.ukuran}
                reviewProduct={data.reviewProduct}
                gambar={data.gambar}
                idProduct={data.idProduct}
              />
            ))}
        </div>
      </Container>
      <br />
    </Fragment>
  );
}

export default AllProduk;
