import React, { Fragment } from "react";
import "./allProduk.css";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
function ListProduct(props) {
  const curenncy = new Intl.NumberFormat("id", {
    style: "currency",
    currency: "IDR",
    maximumSignificantDigits: 3,
  }).format(props.harga);
  return (
    <Fragment>
      <div className="margins col-3">
        <Card className="cardss">
          <Link
            style={{ textDecoration: "none" }}
            to={`/chooseProductId/${props.idProduct}`}
          >
            <Card.Img variant="top" src={props.gambar[0].url} />
            <br />
            <p className="list">{props.jenisPakaian}</p>

            <Card.Body>
              <Card.Title className="datapakian">{props.namaPakian}</Card.Title>

              <br />
              <Button className="harga" variant="primary">
                {curenncy}
              </Button>
            </Card.Body>
          </Link>
        </Card>
      </div>
    </Fragment>
  );
}

export default ListProduct;
