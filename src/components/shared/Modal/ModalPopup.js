import React from "react";
import { Button, Modal } from "react-bootstrap";

const ModalPopup = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props?.labelmodal}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row justify-content-center">
          <div className="col-12">
            <img
              width="650px"
              height="650px"
              src={props.resi?.url}
              className={`rounded float-start`}
              alt="gambarTransaksi"
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalPopup;
