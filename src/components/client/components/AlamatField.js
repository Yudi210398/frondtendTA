import React, { Fragment } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import "./Alamat.css";
import FormikControl from "../../shared/FormikUseable/FormikControl";
import Alert from "react-bootstrap/Alert";
import { useHttp } from "../../shared/util/http-hook";
import { useSelector } from "react-redux";
function AlamatField(props) {
  const token = useSelector((state) => state.login);
  const {
    sendRequest,
    setErrorValidate,
    errorPesan,
    errorValidate,
    setErorrPesan,
  } = useHttp();
  const initialValues = {
    nama: props.dataAlamat.length >= 1 ? props.dataAlamat[0].namaCustomer : "",
    phone: props.dataAlamat.length >= 1 ? props.dataAlamat[0].handphone : "",
    provinsiKota:
      props.dataAlamat.length >= 1 ? props.dataAlamat[0].provinsiKota : "",
    kecamatan:
      props.dataAlamat.length >= 1 ? props.dataAlamat[0].kecamatan : "",
    alamatLengkap:
      props.dataAlamat.length >= 1 ? props.dataAlamat[0].alamatLengkap : "",
    patokan: props.dataAlamat.length >= 1 ? props.dataAlamat[0].patokan : "",
  };
  const validationSchema = Yup.object({
    nama: Yup.string().required("Harus diIsi"),
    phone: Yup.string()
      .min(10, "Must be more than 10 characters")
      .required("isi"),
    provinsiKota: Yup.string().required("perlu"),
    kecamatan: Yup.string().required("Harus diIsi"),
    alamatLengkap: Yup.string().required(
      "Harus diIsi, Supaya Barang anda sampai ditempat seharunya"
    ),
    patokan: Yup.string().required(
      "Harus diIsi, Supaya Barang anda sampai ditempat seharunya"
    ),
  });
  const onSubmit = async (values) => {
    setErrorValidate(false);
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL_API}/addAlamat`,
        "POST",
        JSON.stringify({
          provinsiKota: values.provinsiKota,
          kecamatan: values.kecamatan,
          alamatLengkap: values.alamatLengkap,
          patokan: values.patokan,
          namaCustomer: values.nama,
          handphone: values.phone,
        }),
        {
          "Content-Type": "application/json",
          Authorization: `Dog ${token.tokenLogin}`,
        }
      );
      alert("Data disimpan");
    } catch (err) {
      setErrorValidate(true);
      setErorrPesan(err);
    }
  };

  return (
    <Fragment>
      <div className="row justify-content-center">
        <div className="col-4">
          {errorValidate && (
            <Alert
              variant="danger"
              onClose={() => setErrorValidate(false)}
              dismissible
            >
              <Alert.Heading>{errorPesan}</Alert.Heading>
            </Alert>
          )}
        </div>
      </div>
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

                <div className="col-5">
                  <FormikControl
                    control="input"
                    type="text"
                    label="Phone"
                    name="phone"
                    placeholder="masukan data"
                    toucheds={formik.touched.phone?.toString()}
                    error={formik.errors.phone}
                  />
                </div>

                <div className="col-5">
                  <FormikControl
                    control="input"
                    type="text"
                    label="Provinsi / Kota"
                    name="provinsiKota"
                    placeholder="masukan data"
                    toucheds={formik.touched.provinsiKota?.toString()}
                    error={formik.errors.provinsiKota}
                  />
                </div>

                <div className="col-5">
                  <FormikControl
                    control="input"
                    type="text"
                    label="Kecamatan"
                    name="kecamatan"
                    placeholder="masukan data"
                    toucheds={formik.touched.kecamatan?.toString()}
                    error={formik.errors.kecamatan}
                  />
                </div>
                <div className="col-5">
                  <FormikControl
                    control="textarea"
                    label="Alamat Lengkap Beserta Kode Pos"
                    name="alamatLengkap"
                    placeholder="masukan data"
                    toucheds={formik.touched.alamatLengkap?.toString()}
                    error={formik.errors.alamatLengkap}
                  />
                </div>

                <div className="col-5">
                  <FormikControl
                    control="input"
                    type="text"
                    label="Patokan"
                    name="patokan"
                    placeholder="masukan data"
                    toucheds={formik.touched.patokan?.toString()}
                    error={formik.errors.patokan}
                  />
                </div>
                <div className="col-5">
                  <button type="submit" className="btn btn-danger">
                    {props.dataAlamat.length >= 1 ? "Edit Data" : "Submit"}
                  </button>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </Fragment>
  );
}

export default AlamatField;
