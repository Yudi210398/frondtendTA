import React, { Fragment, useState, useRef } from "react";
import * as Yup from "yup";
import Container from "../../shared/Container";
import classes from "../../produk/cart/carts.module.css";
import { Formik, Form, ErrorMessage } from "formik";
import FormikControl from "../../shared/FormikUseable/FormikControl";
import TextError from "../../shared/FormikUseable/TextError";

import ImagePriviewSingleImage from "../../shared/imagePrivew/ImagePriviewSingleImage";
import { useHttp } from "../../shared/util/http-hook";
import { useSelector } from "react-redux";
export const FORMATIMAGES = ["image/jpg", "image/jpeg", "image/png"];
function DataDiri(props) {
  const token = useSelector((state) => state.login);
  const { sendRequest } = useHttp();
  const [edit, setEdit] = useState(false);
  const [foto, setFoto] = useState(false);
  const refs = useRef(null);
  const dropDownGender = [
    { key: "", value: "Pilih Gender" },
    { key: "Pria", value: "Pria" },
    { key: "Wanita", value: "Wanita" },
  ];

  const initialValues = {
    nama: props.dataUser?.namaUser,
    gender:
      props.dataUser?.gender === "  `Belum isi, harap diisi`"
        ? ""
        : props.dataUser?.gender,
    photo: null,
  };
  const validationSchema = Yup.object({
    nama: Yup.string().required("Harus diIsi"),
    gender: Yup.string().required("Harus diIsi"),
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
      formData.append("namaUser", values.nama);
      formData.append("gender", values.gender);
      formData.append("gambar", values.photo);
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL_API}/editdata`,
        "PATCH",
        formData,
        {
          Authorization: `Dog ${token.tokenLogin}`,
        }
      );
      window.location.reload();
      setEdit(false);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Fragment>
      <h1 className={classes.marginTop}>
        {edit === false ? "DATA PROFILE" : "EDIT PROFILE"}
      </h1>
      {!edit && (
        <div className="row justify-content-center">
          <div className="col-4">
            <img
              src={props?.dataUser?.gambar.url}
              className="img-thumbnail rounded float-end"
              alt="saya"
              style={{
                width: "300px",
                height: "200px",
              }}
            />
          </div>
          <div className="col-6">
            <h1>
              Nama : <span>{props?.dataUser?.namaUser}</span>
            </h1>
            <h1>
              Email : <span>{props?.dataUser?.email}</span>
            </h1>
            <h1>
              Gender : <span>{props?.dataUser?.gender}</span>
            </h1>

            <button onClick={() => setEdit(true)} className="btn btn-warning">
              Edit Data
            </button>
          </div>
        </div>
      )}
      {edit && (
        <Container>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize={true}
          >
            {(formik) => {
              return (
                <Form>
                  <div className="row">
                    <div className="col-5">
                      <FormikControl
                        control="input"
                        type="text"
                        label="Nama"
                        name="nama"
                        placeholder="masukan data"
                        toucheds={formik.touched.nama?.toString()}
                        error={formik.errors.nama}
                      />
                    </div>
                    <div className={classes.datas + " col-5"}>
                      <FormikControl
                        control="select"
                        name="gender"
                        options={dropDownGender}
                        toucheds={formik.touched.gender?.toString()}
                        error={formik.errors.gender}
                      />
                    </div>
                    <div className={classes.datas + " col-5"}>
                      <input
                        hidden
                        ref={refs}
                        control="input"
                        type="file"
                        name="gender"
                        toucheds={formik.touched.photo?.toString()}
                        onBlur={formik.handleBlur}
                        error={formik.errors.photo}
                        onChange={(e) => {
                          formik.setFieldValue("photo", e.target.files[0]);
                          setFoto(true);
                        }}
                      />
                      <div>
                        <button
                          onClick={() => refs.current.click()}
                          className="btn btn-danger"
                          type="button"
                        >
                          Upload Your Photo
                        </button>
                      </div>
                      <ErrorMessage component={TextError} name="photo" />
                      <br />
                      {foto && formik.values.photo?.lastModified && (
                        <ImagePriviewSingleImage gambar={formik.values.photo} />
                      )}
                    </div>
                  </div>
                  <div className="row justify-content-center">
                    <div className="col-12">
                      <button className="btn btn-primary" type="submit">
                        Submit
                      </button>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </Container>
      )}
    </Fragment>
  );
}

export default DataDiri;
