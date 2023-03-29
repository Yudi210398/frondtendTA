import React, { Fragment } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useNavigate } from "react-router-dom";
const AlertModalConfirm = (props) => {
  const navigate = useNavigate();
  const submit = () => {
    confirmAlert({
      title: props.title,
      message: props.pesanbody,
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            await props.fungsiYes();
            await navigate(`/orderprodukdetailselesai/${props.idorder}`, {
              replace: true,
            });
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
      <button
        className="btn btn-danger rounded mx-auto d-block"
        onClick={submit}
      >
        <p>{props.keluar}</p>
      </button>
    </Fragment>
  );
};

export default AlertModalConfirm;
