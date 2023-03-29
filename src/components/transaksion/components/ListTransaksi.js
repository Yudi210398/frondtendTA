import React, { Fragment, useRef } from "react";
import { currency } from "../../produk/cart/components/AllCart";
import bca from "../../shared/logo/bca.png";
import classes from "./listCaed.module.css";
import * as Yup from "yup";
import { Formik, Form, ErrorMessage } from "formik";
import { FORMATIMAGES } from "../../auth/register/Register";
import ImagePriviewSingleImage from "../../shared/imagePrivew/ImagePriviewSingleImage";
import TextError from "../../shared/FormikUseable/TextError";
import { useSelector } from "react-redux";
import { useHttp } from "../../shared/util/http-hook";
import { useNavigate } from "react-router-dom";
function ListTransaksi({ data, totalHarga }) {
  const navigate = useNavigate();
  const token = useSelector((state) => state.login);
  const { sendRequest } = useHttp();
  const refs = useRef();
  const initialValues = {
    photo: null,
  };

  const validationSchema = Yup.object({
    photo: Yup.mixed()
      .nullable()
      .required()
      .test(
        "FILE_SIZE",
        "File terlalu besar",
        (value) => !value || (value && value.size <= 1024 * 1024)
      )
      .test(
        "FILE_FORMAT",
        "Format tidak sesuai, harus gambar",
        (value) => !value || (value && FORMATIMAGES.includes(value?.type))
      ),
  });

  const onSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("buktiTranfer", values.photo);

      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL_API}/orders`,
        "POST",
        formData,
        {
          Authorization: `Dog ${token.tokenLogin}`,
        }
      );
      alert("Data Sudah di Upload");
      navigate("/notif", { replace: true });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Fragment>
      <div className={classes.center}>
        <div className="row ">
          <div className="col-3">
            <h1>Transfer Manual</h1>
          </div>
          <div className="col-7">
            <img
              width="80px"
              height="50px"
              src={bca}
              className={`rounded float-start ${classes.rounded}`}
              alt="logo Bca"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <h1>Nomor Rekening</h1>
          </div>
          <div className="col-7">
            <h1 style={{ color: "red" }}>YUDI RUNAT MASNENO - 3420107144</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <h1>Total Pembayaran</h1>
          </div>
          <div className="col-7">
            <h1 style={{ color: "red" }}>{currency(totalHarga)}</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <h1>Pembayaran Dalam</h1>
          </div>
          <div className="col-7">
            <h1 style={{ color: "red" }}>
              {data.keranjangOrder?.waktuBatasPembayaran}
            </h1>
          </div>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => {
            return (
              <Form>
                <input
                  hidden
                  ref={refs}
                  control="input"
                  type="file"
                  label="Image Upload"
                  name="photo"
                  error={formik?.errors.photo}
                  toucheds={formik.touched.photo?.toString()}
                  onBlur={formik.handleBlur}
                  onChange={(e) => {
                    formik.setFieldValue("photo", e.target.files[0]);
                  }}
                  multiple
                />
                <button
                  onClick={() => refs.current.click()}
                  className="btn btn-danger"
                  type="button"
                >
                  Upload Bukti Transaksi
                </button>
                <p className={classes.bukti}>
                  *harus Upload Bukti, tanpa bukti, transaksti dan pengiriman
                  barang tidak bisa diproses
                </p>

                <ErrorMessage component={TextError} name="photo" />

                <br />
                {formik.values.photo && (
                  <ImagePriviewSingleImage gambar={formik.values.photo} />
                )}
                <br />
                <br />
                <button
                  className={`btn btn-primary ${
                    formik.touched.photo && formik.errors.photo && "disabled"
                  }`}
                  type="submit"
                >
                  Submit
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </Fragment>
  );
}

export default ListTransaksi;
