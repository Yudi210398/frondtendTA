import React, { Fragment } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isLogout } from "../../../data/AuthSlice";
import "./Logout.css";
function Logout(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submit = () => {
    confirmAlert({
      title: props.title,
      message: props.pesanbody,
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            dispatch(isLogout());
            localStorage.removeItem("userData");
            navigate("/login", { replace: true });
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };
  return (
    <Fragment>
      <button className="nav-link bg-transparent" onClick={submit}>
        <p className="activeds">{props.keluar}</p>
      </button>
    </Fragment>
  );
}

export default Logout;
