import React from "react";
import { Formik, Form } from "formik";
import FormikControl from "../FormikUseable/FormikControl";
import * as Yup from "yup";
const FormikPencarian = () => {
  const initialValues = {
    dataPencarian: "",
  };
  const validationSchema = Yup.object({
    dataPencarian: Yup.string().required("Penting Harus di isi"),
  });
  const onSubmit = async (values) => {
    console.log(values);
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
