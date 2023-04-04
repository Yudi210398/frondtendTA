import React, { Fragment } from "react";
import { currency } from "../../../produk/cart/components/AllCart";
import ListDataDikemas from "./ListDataDikemas";
import classes from "../../../checkout/components/cheoutdata.module.css";
import { useNavigate } from "react-router-dom";
function Dikemasdata({ file, dataAsli, selesaiData }) {
  const navigate = useNavigate();
  const listproduks = dataAsli?.ordersData
    ? dataAsli.ordersData
    : dataAsli.filterData;
  const data = file || [];
  return (
    <Fragment>
      <div className="row">
        {data?.produks?.map((listData, i) => (
          <ListDataDikemas key={i} produks={listData} />
        ))}
      </div>

      {listproduks.length > 0 && (
        <div className="row">
          <div className={`col-4 ${classes.marginLists}`}>
            <h1>
              Total bayar :
              <span style={{ color: "red" }}>{currency(file.totalHarga)}</span>
            </h1>
          </div>
          {!selesaiData && (
            <div className={`col-4 ${classes.marginLists}`}>
              <h1>Pesanan sedang diproses, mohon menunggu</h1>
            </div>
          )}

          {selesaiData && (
            <div className={`col-4 ${classes.marginLists}`}>
              <button
                onClick={() => {
                  navigate(`/orderprodukdetailselesai/${data._id}`, {
                    replace: true,
                  });
                }}
                className="btn btn-danger"
              >
                Lihat Detail Pesanan
              </button>
            </div>
          )}
          <br />
          <hr />
        </div>
      )}
    </Fragment>
  );
}

export default Dikemasdata;
