import React, { Fragment, useState } from "react";
import classes from "./listdatakirim.module.css";
import ModalPopup from "../../shared/Modal/ModalPopup";
import { Link } from "react-router-dom";
import AlertModalConfirm from "../../shared/AlertModalConfirm/AlertModalConfirm";
import { useProdukOrderHttp } from "../../shared/util/useProdukOrderHttp";
const KirimData = ({ file }) => {
  const data = file || [];
  const [modalShow, setModalShow] = useState(false);
  const { fetch } = useProdukOrderHttp();

  return (
    <Fragment>
      <div className={`row ${classes.rowMargin}`}>
        <div className="col-3">
          <h1 className="text-center">Alamat</h1>
          <p
            className={classes.list}
          >{`${data?.userId?.alamat?.rumah[0].alamatLengkap}, ${data?.userId?.alamat?.rumah[0].kecamatan} ${data?.userId?.alamat?.rumah[0].provinsiKota}, Patokan: ${data?.userId?.alamat?.rumah[0].patokan} (Telp: ${data?.userId?.alamat?.rumah[0].handphone}) ${data?.userId?.namaUser}`}</p>
        </div>

        <div className="col-2">
          <h1 className="text-center">RESI</h1>
          <p className={`${classes.list} text-center`}>{data.resiPengiriman}</p>
        </div>

        <div className="col-2">
          <h1 className="text-center">Gambar Resi</h1>
          <img
            onClick={() => setModalShow(true)}
            width="100px"
            height="100px"
            src={data?.gambarResi?.url}
            className={`rounded mx-auto d-block ${classes.gambar}`}
            alt="gambarcheckout"
          />
        </div>

        <div className="col-2">
          <h1 className="text-center">Produk Detail</h1>

          <Link
            to={`/orderprodukdetail/${data?._id}`}
            className={`btn btn-success rounded mx-auto d-block`}
          >
            Lihat Produk
          </Link>
        </div>

        <div className="col-3">
          <h1 className="text-center">Barang Diterima</h1>

          {/* <button
            onClick={() => console.log(data?._id)}
            className={`btn btn-danger rounded mx-auto d-block`}
          >
            Pesanan Diterima
          </button> */}

          <AlertModalConfirm
            title={"Confirm terima Pesanan"}
            pesanbody={"Apakah Pesanan barang sudah di terima?"}
            fungsiYes={() => {
              fetch(data?._id);
            }}
            keluar={"Pesanan Diterima"}
          />
        </div>

        <ModalPopup
          labelmodal={"Gambar Resi"}
          resi={data.gambarResi}
          show={modalShow}
          onHide={() => {
            setModalShow(false);
          }}
        />
      </div>
      <hr />
    </Fragment>
  );
};

export default KirimData;
