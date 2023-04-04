import React, { Fragment } from "react";

const ListProdukOrder = ({ produks }) => {
  return (
    <Fragment>
      <div className="row ">
        <div className="col-3">
          <h1 className="text-center">{produks.namaPakian}</h1>
        </div>
      </div>
    </Fragment>
  );
};

export default ListProdukOrder;
