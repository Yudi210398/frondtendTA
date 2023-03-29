import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { Carousel, Tooltip, OverlayTrigger } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import "./singleProduct.css";
import * as Yup from "yup";
import { useHttp } from "../../../shared/util/http-hook.js";
import DeskripsiProduct from "./DeskripsiProduct";
import { Formik, Form } from "formik";
import FormikControl from "../../../shared/FormikUseable/FormikControl.js";
import { useDispatch, useSelector } from "react-redux";
import {
  isLogin,
  isTotalHargaKeranjang,
  isTotalHargaKeranjangLength,
} from "../../../../data/AuthSlice";
import { useAxios } from "../../../shared/util/use-axioshttp";
import { currency } from "../../cart/components/AllCart";

export const updateQuantityFungsi = (tambah) => {
  const updateQuantity = localStorage.getItem("userData");
  const updateQuantityParse = JSON.parse(updateQuantity);

  if (tambah === "tambah")
    updateQuantityParse.totalhargaKeranjanglength =
      updateQuantityParse.totalhargaKeranjanglength + 1;
  else updateQuantityParse.totalhargaKeranjanglength = tambah;

  localStorage.setItem("userData", JSON.stringify(updateQuantityParse));
};

function SingleProcuctId() {
  const { sendReq } = useAxios();
  const {
    tokenLogin,
    userId,
    keranjang,
    totalhargaKeranjang,
    totalhargaKeranjanglength,
  } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const onAddQuantity = (tokenLogin, userId, keranjang) =>
    dispatch(isLogin({ tokenLogin, userId, keranjang }));
  const onAddTotalKeranjangDummy = (totalhargaKeranjang) =>
    dispatch(isTotalHargaKeranjang({ totalhargaKeranjang }));

  const addorMinLength = (totalhargaKeranjanglength) =>
    dispatch(isTotalHargaKeranjangLength({ totalhargaKeranjanglength }));
  const navigate = useNavigate();
  const { sendRequest } = useHttp();
  const [getData, setGetData] = useState(null);
  const [getDataIf, setGetDataIf] = useState([""]);
  const { _id } = useParams();
  const token = useSelector((state) => state.login);

  try {
    useEffect(() => {
      const fetch = async () => {
        const hasil = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL_API}/allproduct/${_id}`
        );
        await setGetData(hasil?.dataAmbil);
        await setGetDataIf(hasil?.dataAmbil);
        return hasil;
      };
      fetch();

      // if (getData === "Data Kosong") throw new Error("Data Gk ada");
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }, [_id, sendRequest, sendReq, token.tokenLogin]);
  } catch (err) {
    console.log(err.message);
  }

  const curenncy = currency(getData ? getData[0].harga : 0);

  const seleksiGambar = !getData
    ? ""
    : getData[0].gambarDanKeterangan?.map((data) => {
        return data;
      });
  const allGambar = !getData ? "" : getData[0].gambar?.concat(seleksiGambar);
  const [dataWarna, setWarna] = useState(null);
  const backimage = () => setWarna(null);
  const [dataWarnaClick, setDataWarnaClick] = useState(null);
  const [dataUkuranClick, setDataUkuranClick] = useState(null);
  let dataKeranjang;
  if (getData !== "data Kosong") {
    dataKeranjang = {
      idProduct: !getData ? "" : getData[0]._id,
      jenisPakian: !getData ? "" : getData[0].jenisPakaian,
      stock: !getData ? "" : getData[0].stock,
      namaPakian: !getData ? "" : getData[0].namaPakian,
      harga: !getData ? "" : getData[0].harga,
      ukuran: !getData ? "" : dataUkuranClick,
      notePakian: !getData ? "" : dataWarnaClick,
      gambarNote: !getData ? "" : getData[0]?.gambarDanKeterangan[0]?.gambar,
      keteranganNote: !getData
        ? ""
        : getData[0]?.gambarDanKeterangan[0]?.keterangan,
    };
  }
  const renderTootip = (props) => {
    let kataTooltip;
    if (!getData ? "" : getData[0]?.gambarDanKeterangan.length > 0) {
      kataTooltip = `Tolong Isi variasi/warna dan ukuran ${
        !getData ? "" : getData[0].jenisPakaian
      }`;
    } else kataTooltip = `Tolong Isi ukuran ${getData[0].jenisPakaian}`;
    return (
      <Tooltip id="button-tooltip" {...props}>
        {kataTooltip}
      </Tooltip>
    );
  };
  let dataWarnaTombolDisabled;
  if (
    (!dataWarnaClick &&
      getDataIf[0]?.gambarDanKeterangan?.length > 0 &&
      !dataUkuranClick) ||
    !dataUkuranClick ||
    (!dataWarnaClick && getDataIf[0]?.gambarDanKeterangan?.length > 0)
  ) {
    dataWarnaTombolDisabled = (
      <div className="row margins-tombol-order">
        <OverlayTrigger
          placement="top"
          delay={{ show: 250, hide: 400 }}
          overlay={renderTootip}
        >
          <div className="col-6">
            <button className="disabled btn btn-danger btn-sm">
              Langsung Beli
            </button>
          </div>
        </OverlayTrigger>
        <OverlayTrigger
          placement="top"
          delay={{ show: 250, hide: 400 }}
          overlay={renderTootip}
        >
          <div className="col-6">
            <button className="disabled btn btn-primary btn-sm buttonkeranjang">
              Masukan Kerajang
            </button>
          </div>
        </OverlayTrigger>
      </div>
    );
  }

  let dataPil = !getData ? [] : getData[0];
  let hasilArrayUkuran = [];
  if (!getData ? "" : dataPil?.ukuran?.kemBatJas.length > 0) {
    for (const data in dataPil.ukuran.kemBatJas[0]) {
      if (dataPil.ukuran.kemBatJas[0][data])
        hasilArrayUkuran.push(dataPil.ukuran.kemBatJas[0][data]);
    }
  } else if (!getData ? "" : dataPil?.ukuran?.celana.length > 0) {
    for (const data in dataPil.ukuran.celana[0]) {
      if (dataPil.ukuran.celana[0][data])
        hasilArrayUkuran.push(dataPil.ukuran.celana[0][data]);
    }
  }
  const initialValues = {
    quantity: 1,
  };

  const validationSchema = Yup.object({
    quantity: Yup.number()
      .max(!getData ? "" : getData[0].stock, `Pesanan Melebihi Batas`)
      .required("Required"),
  });

  const handleSave = async (values) => {
    if (!getData ? "" : getData[0].stock >= values) {
      if (!userId) {
        alert("anda harus login terlebih dahulu");
        navigate("/login", { replace: true });
      } else {
        try {
          await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL_API}/addcart`,
            "POST",
            JSON.stringify({
              produkIds: dataKeranjang.idProduct,
              quantity: values,
              noteProduk:
                dataKeranjang.notePakian === null
                  ? "Tidak Ada Note"
                  : dataKeranjang.notePakian,
              ukuran: dataKeranjang.ukuran,
            }),
            {
              "Content-Type": "application/json",
              Authorization: `Dog ${tokenLogin}`,
            }
          );
        } catch (err) {
          console.log(err);
        }

        // navigate("/yourCart", { replace: true });
      }
    }
  };

  const onSubmit = async (values) => {
    if (!userId) {
      alert("anda harus login terlebih dahulu");
      navigate("/login", { replace: true });
    }
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL_API}/addcart`,
        "POST",
        JSON.stringify({
          produkIds: dataKeranjang.idProduct,
          quantity: values.quantity,
          noteProduk:
            dataKeranjang.notePakian === null
              ? "Tidak Ada Note"
              : dataKeranjang.notePakian,
          ukuran: dataKeranjang.ukuran,
        }),
        {
          "Content-Type": "application/json",
          Authorization: `Dog ${tokenLogin}`,
        }
      );

      onAddQuantity(tokenLogin, userId, keranjang + values.quantity);
      onAddTotalKeranjangDummy(totalhargaKeranjang + 1);
      addorMinLength(totalhargaKeranjanglength + 1);
      // const updateQuantity = localStorage.getItem("userData");
      // const updateQuantityParse = JSON.parse(updateQuantity);

      // updateQuantityParse.keranjang = keranjang + values.quantity;

      // localStorage.setItem("userData", JSON.stringify(updateQuantityParse));
      // alert("Pakian Sudah dimasukan keranjang");

      updateQuantityFungsi("tambah");
    } catch (err) {
      console.log(err);
    }
  };

  hasilArrayUkuran.pop();

  return (
    <Container>
      {getData === "data Kosong" && (
        <Navigate to="/allProduct" replace={true} />
      )}
      <div className="row">
        <div className="col-lg-7 col-md-12 col-sm-12 gambar-margin">
          <Carousel
            fade
            interval={null}
            indicators={false}
            nextIcon={
              <span
                onClick={backimage}
                aria-hidden="true"
                className="carousel-control-next-icon"
              />
            }
            prevIcon={
              <span
                onClick={backimage}
                aria-hidden="true"
                className="carousel-control-prev-icon"
              />
            }
          >
            {getData &&
              allGambar?.map((image, i) => {
                return (
                  <Carousel.Item key={i}>
                    <img
                      className="d-block w-100"
                      src={dataWarna || image?.url}
                      alt="First slide"
                    />
                  </Carousel.Item>
                );
              })}
          </Carousel>
        </div>

        <div className="col-lg-5 col-md-12 col-sm-12 text-data">
          <div className="texts">
            <h1>{!getData ? "" : getData[0].namaPakian}</h1>
            <p className="rupiah">{curenncy}</p>
            <div className="row">
              <div className="col-3">
                {!getData
                  ? ""
                  : getData[0].gambarDanKeterangan?.length > 0 && (
                      <p className="warna-text">Warna :</p>
                    )}
              </div>
              <div className="col-9">
                {!getData
                  ? ""
                  : getData[0].gambarDanKeterangan?.map((data, i) => (
                      <span key={i}>
                        <button
                          onClick={() => setDataWarnaClick(data.keterangan)}
                          onMouseEnter={() => setWarna(data.url)}
                          className={`btn btn-outline-secondary  btn-sm ${
                            dataWarnaClick === data.keterangan
                              ? "clickWarna"
                              : ""
                          } `}
                        >
                          {data.keterangan}
                        </button>
                      </span>
                    ))}
              </div>
              <div className="col-3">
                <p className="warna-text">Ukuran :</p>
              </div>

              <div className="col-9">
                {hasilArrayUkuran.map((data, i) => {
                  return (
                    <button
                      onClick={() => setDataUkuranClick(data)}
                      key={i}
                      className={`btn btn-outline-secondary  btn-sm ${
                        dataUkuranClick === data ? "clickWarna" : ""
                      } `}
                    >
                      {data}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="col-9">
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
                        // control='chakraInput'
                        type="number"
                        label="Quantity: "
                        name="quantity"
                        classnew="inputs"
                      />

                      {dataWarnaTombolDisabled}
                      {!dataWarnaTombolDisabled && (
                        <div className="row margins-tombol-order">
                          <div className="col-6">
                            <button
                              type="button"
                              onClick={() => {
                                handleSave(formik.values.quantity);
                                if (userId) {
                                  setTimeout(() => {
                                    navigate("/yourCart", { replace: true });
                                  }, 100);
                                }
                              }}
                              className="btn btn-danger btn-sm"
                            >
                              Langsung Beli
                            </button>
                          </div>

                          <div className="col-6">
                            <button
                              className="btn btn-primary btn-sm buttonkeranjang"
                              type="submit"
                            >
                              Masukan Kerajang
                            </button>
                          </div>
                        </div>
                      )}
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      </div>
      <DeskripsiProduct dataProduct={getDataIf[0]} />
    </Container>
  );
}

export default SingleProcuctId;
