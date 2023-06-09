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
            <div className="d-flex     justify-content-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
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
