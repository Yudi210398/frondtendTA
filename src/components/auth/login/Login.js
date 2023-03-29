import React, { Fragment } from "react";
import Container from "../../shared/Container.js";
import FormikControl from "../../shared/FormikUseable/FormikControl.js";
import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import Alert from "react-bootstrap/Alert";
import "./Login.css";
import { useHttp } from "../../shared/util/http-hook.js";
import {
  isLogin,
  isTotalHargaKeranjangLength,
} from "../../../data/AuthSlice.js";
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tokenExpirationDate = new Date().getTime() + 3600000;
  const {
    sendRequest,
    setErrorValidate,
    errorPesan,
    errorValidate,
    setErorrPesan,
  } = useHttp();
  const onLogin = (tokenLogin, userId, keranjang) =>
    dispatch(isLogin({ tokenLogin, userId, keranjang }));
  const onTotalKeranjang = (totalhargaKeranjanglength) =>
    dispatch(isTotalHargaKeranjangLength({ totalhargaKeranjanglength }));

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("email gk sesuai")
      .required("Penting Harus di isi"),
    password: Yup.string()
      .required("Required")
      .min(5, `minimal password 5 huruf`),
  });

  const onSubmit = async (values) => {
    try {
      const hasilss = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL_API}/login`,
        "POST",
        JSON.stringify({ email: values.email, password: values.password }),
        {
          "Content-Type": "application/json",
        }
      );
      onLogin(hasilss.token, hasilss.userId, hasilss.keranjang);

      onTotalKeranjang(hasilss.keranjang.length);
      localStorage.setItem(
        "userData",
        JSON.stringify({
          userId: hasilss.userId,
          token: hasilss.token,
          keranjang: hasilss.keranjang,
          waktuExpied: tokenExpirationDate,
          totalhargaKeranjanglength: hasilss.keranjang.length,
        })
      );
      navigate("/allProduct", { replace: true });
    } catch (err) {
      setErrorValidate(true);
      setErorrPesan(err);
    }
  };

  return (
    <Fragment>
      <Container>
        <h1 className="text-center edith1">LOGIN</h1>
        <div className="row justify-content-center">
          <div className="col-1">
            <hr />
          </div>
        </div>

        <div className="row justify-content-center data">
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

            <br />
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
                    <button type="submit" className="btn btn-success">
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

export default Login;
