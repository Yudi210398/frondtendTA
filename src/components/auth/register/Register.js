import React, { Fragment, useRef } from "react";
import Container from "../../shared/Container.js";
import FormikControl from "../../shared/FormikUseable/FormikControl.js";
import { Formik, Form, ErrorMessage } from "formik";
import Alert from "react-bootstrap/Alert";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import TextError from "../../shared/FormikUseable/TextError.js";
import ImagePriviewSingleImage from "../../shared/imagePrivew/ImagePriviewSingleImage.js";
import { useHttp } from "../../shared/util/http-hook.js";
export const FORMATIMAGES = ["image/jpg", "image/jpeg", "image/png"];
function Register() {
  const navigate = useNavigate();
  const refs = useRef(null);
  const initialValues = {
    nama: "",
    email: "",
    password: "",
    ulangPassword: "",
    photo: null,
  };
  const {
    errorValidate,
    sendRequest,
    setErorrPesan,
    setErrorValidate,
    errorPesan,
  } = useHttp();

  const validationSchema = Yup.object({
    nama: Yup.string().required("Harus diIsi"),
    email: Yup.string()
      .email("email gk sesuai")
      .required("Penting Harus di isi"),
    password: Yup.string()
      .required("Required")
      .min(5, `minimal password 5 huruf`),
    ulangPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password Harus Sama")
      .required("Isi woy"),
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
    setErrorValidate(false);

    try {
      const formData = new FormData();
      formData.append("namaUser", values.nama);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("passValidasi", values.ulangPassword);
      formData.append("gambar", values.photo);
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL_API}/allregister`,
        "POST",
        formData
      );
      alert("Berhasil Daftar Silahkan Login");
      navigate("/login", { replace: true });
    } catch (err) {
      setErrorValidate(true);
      setErorrPesan(err);
    }
  };

  return (
    <Fragment>
      <Container>
        <h1 className="text-center edith1">REGISTER</h1>
        <div className="row justify-content-center">
          <div className="col-1">
            <hr />
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-6">
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
        <br />
        <div className="row justify-content-center data">
          <div className="col-6">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {(formik) => {
                return (
                  <Form>
                    <FormikControl
                      control="input"
                      type="text"
                      label="Nama"
                      name="nama"
                      placeholder="masukan data"
                      toucheds={formik.touched.nama?.toString()}
                      error={formik.errors.nama}
                    />
                    <br />
                    <FormikControl
                      control="input"
                      type="email"
                      label="Email"
                      name="email"
                      placeholder="masukan data"
                      toucheds={formik.touched.email?.toString()}
                      error={formik.errors.email}
                    />
                    <br />
                    <FormikControl
                      control="input"
                      type="password"
                      label="Password"
                      name="password"
                      autoComplete="on"
                      placeholder="masukan data"
                      toucheds={formik.touched.password?.toString()}
                      error={formik.errors.password}
                    />
                    <br />
                    <FormikControl
                      control="input"
                      type="password"
                      label="Masukan Ulang Password"
                      name="ulangPassword"
                      autoComplete="on"
                      placeholder="masukan data"
                      toucheds={formik.touched.ulangPassword?.toString()}
                      error={formik.errors.ulangPassword}
                    />
                    <br />
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
                    {formik.values.photo && (
                      <ImagePriviewSingleImage gambar={formik.values.photo} />
                    )}
                    <br />
                    <button className="btn btn-primary" type="submit">
                      Submit
                    </button>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </Container>
    </Fragment>
  );
}

export default Register;
