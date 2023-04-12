import React from "react";
import { Formik, Form } from "formik";
import FormikControl from "../FormikUseable/FormikControl";
import * as Yup from "yup";
import { useHttp } from "../util/http-hook";
import { useDispatch } from "react-redux";
import { isDataPencarian } from "../../../data/AuthSlice";
import { useNavigate } from "react-router-dom";
const FormikPencarian = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onDataCari = (dataPencarian) =>
    dispatch(isDataPencarian({ dataPencarian }));

  const { sendRequest } = useHttp();
  const initialValues = {
    dataPencarian: "",
  };
  const validationSchema = Yup.object({
    dataPencarian: Yup.string().required("Penting Harus di isi"),
  });
  const onSubmit = async (values) => {
    try {
      const hasilss = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL_API}/caridata`,
        "POST",
        JSON.stringify({ datanya: values.dataPencarian }),
        {
          "Content-Type": "application/json",
        }
      );
      props.onDataCari(hasilss);
      onDataCari(hasilss.dataBarang);
      navigate("/produkCari", { replace: true });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <Form className="pencari-data">
            <FormikControl
              control="input"
              type="text"
              name="dataPencarian"
              placeholder="Pencarian Produk  (Enter)"
              toucheds={formik.touched.dataPencarian?.toString()}
              pencarian="cari"
              error={formik.errors.dataPencarian}
            />
            <div className="button-container">
              {/* <button className="tombol-transparant">
            <FaSearch
              type="submit"
              className="seach-icon"
              id="seach-icon"
            />
          </button> */}
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default FormikPencarian;
