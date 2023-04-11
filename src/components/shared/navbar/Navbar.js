import React, { Fragment, useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Keranjang from "../keranjang/Keranjang";
import logo from "../logo/logo.png";
import { useSelector } from "react-redux";
import "./navbar.css";
import Logout from "../../auth/logout/Logout";
import { FaSearch } from "react-icons/fa";
import { Formik, Form } from "formik";
import FormikControl from "../FormikUseable/FormikControl";
import * as Yup from "yup";
function Navbars() {
  const initialValues = {
    dataPencarian: "",
  };

  const validationSchema = Yup.object({
    dataPencarian: Yup.string().required("Penting Harus di isi"),
  });
  const onSubmit = async (values) => {
    console.log(values);
  };

  const dataId = useSelector((state) => state.login.userId);
  const [show, setShow] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [profile, setProfile] = useState(false);

  const showDropdown = (e) => setShow(!show);

  const hideDropdown = (e) => setShow(false);

  const showDropdownAuth = (e) => setShowAuth(!showAuth);

  const hideDropdownAuth = (e) => setShowAuth(false);

  const showDropdownProfile = (e) => setProfile(!showAuth);

  const hideDropdownProfile = (e) => setProfile(false);

  let navbarss;

  if (dataId) {
    navbarss = (
      <Fragment>
        <Navbar bg="light" expand="lg" className="fixed-top">
          <Container>
            <Navbar.Brand>
              <img
                src={logo}
                width="60"
                height="50"
                className="d-inline-block align-top"
                alt="logo"
              ></img>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <NavLink className="nav-link" to="/allProduct">
                  All Product
                </NavLink>
                <NavDropdown
                  show={show}
                  onMouseEnter={showDropdown}
                  onMouseLeave={hideDropdown}
                  title="category"
                  id="collasible-nav-dropdown"
                >
                  <NavLink
                    className={(navData) =>
                      (navData.isActive ? "actives" : "") + " nav-link activeds"
                    }
                    to="/kemejaProduct"
                  >
                    Kemeja
                  </NavLink>
                  <NavLink
                    className={(navData) =>
                      (navData.isActive ? "actives" : "") + " nav-link activeds"
                    }
                    to="/batikProduct"
                  >
                    Batik
                  </NavLink>
                  <NavLink
                    className={(navData) =>
                      (navData.isActive ? "actives" : "") + " nav-link activeds"
                    }
                    to="/celanaProduct"
                  >
                    Celana
                  </NavLink>
                  <NavLink
                    className={(navData) =>
                      (navData.isActive ? "actives" : "") + " nav-link activeds"
                    }
                    to="/jasProduct"
                  >
                    Jas
                  </NavLink>
                </NavDropdown>
                <div style={{ display: "flex", flexDirection: "row" }}>
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
                            placeholder="Pencarian Barang"
                            toucheds={formik.touched.dataPencarian?.toString()}
                            pencarian="cari"
                            error={formik.errors.dataPencarian}
                          />
                          <div class="button-container">
                            <button className="tombol-transparant">
                              <FaSearch
                                type="submit"
                                className="seach-icon"
                                id="seach-icon"
                              />
                            </button>
                          </div>
                        </Form>
                      );
                    }}
                  </Formik>
                </div>

                {/* <div className="form-outline">
                  <input
                    type="search"
                    id="form1"
                    className="form-control icon-data"
                    placeholder="Pencarian Barang"
                  />
                </div>

                <FaSearch
                  className="seach-icon"
                  id="seach-icon"
                  onClick={() => alert("dat")}
                /> */}
              </Nav>

              <Nav>
                <NavLink to={"/yourCart"} className="nav-link">
                  <Keranjang />
                </NavLink>
              </Nav>
              <Nav>
                <NavDropdown
                  show={profile}
                  onMouseEnter={showDropdownProfile}
                  onMouseLeave={hideDropdownProfile}
                  title="PROFILE"
                  id="collasible-nav-dropdown"
                >
                  <NavLink
                    className={(navData) =>
                      (navData.isActive ? "actives" : "") + " nav-link activeds"
                    }
                    to="/profile"
                  >
                    ACCOUNT
                  </NavLink>

                  <NavLink
                    className={(navData) =>
                      (navData.isActive ? "actives" : "") + " nav-link activeds"
                    }
                    to="/notif"
                  >
                    NOTIFIKASI
                  </NavLink>

                  <NavLink
                    className={(navData) =>
                      (navData.isActive ? "actives" : "") + " nav-link activeds"
                    }
                    to="/alamatuser"
                  >
                    TAMBAH / EDIT ALAMAT
                  </NavLink>

                  <Logout
                    title="Exit Alert"
                    pesanbody="Yakin untuk keluar ?"
                    keluar="LOGOUT"
                  />
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Fragment>
    );
  } else {
    navbarss = (
      <Fragment>
        <Navbar bg="light" expand="lg" className="fixed-top">
          <Container>
            <Navbar.Brand>
              <img
                src={logo}
                width="60"
                height="50"
                className="d-inline-block align-top"
                alt="logo"
              ></img>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <NavLink className="nav-link" to="/allProduct">
                  All Product
                </NavLink>
                <NavDropdown
                  show={show}
                  onMouseEnter={showDropdown}
                  onMouseLeave={hideDropdown}
                  title="category"
                  id="collasible-nav-dropdown"
                >
                  <NavLink
                    className={(navData) =>
                      (navData.isActive ? "actives" : "") + " nav-link activeds"
                    }
                    to="/kemejaProduct"
                  >
                    Kemeja
                  </NavLink>
                  <NavLink
                    className={(navData) =>
                      (navData.isActive ? "actives" : "") + " nav-link activeds"
                    }
                    to="/batikProduct"
                  >
                    Batik
                  </NavLink>
                  <NavLink
                    className={(navData) =>
                      (navData.isActive ? "actives" : "") + " nav-link activeds"
                    }
                    to="/celanaProduct"
                  >
                    Celana
                  </NavLink>
                  <NavLink
                    className={(navData) =>
                      (navData.isActive ? "actives" : "") + " nav-link activeds"
                    }
                    to="/jasProduct"
                  >
                    Jas
                  </NavLink>
                </NavDropdown>
              </Nav>

              <Nav>
                <NavDropdown
                  title="AUTH"
                  id="collasible-nav-dropdown"
                  show={showAuth}
                  onMouseEnter={showDropdownAuth}
                  onMouseLeave={hideDropdownAuth}
                >
                  <NavLink
                    className={(navData) =>
                      (navData.isActive ? "actives" : "") + " nav-link activeds"
                    }
                    to="/register"
                  >
                    REGISTER
                  </NavLink>
                  <NavLink
                    className={(navData) =>
                      (navData.isActive ? "actives" : "") + " nav-link activeds"
                    }
                    to="/login"
                  >
                    LOGIN
                  </NavLink>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Fragment>
    );
  }

  return <Fragment>{navbarss}</Fragment>;
}

export default Navbars;
