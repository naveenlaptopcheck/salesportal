import React from "react";
import Modal from "react-modal";
import * as Loader from "react-loader-spinner";
import { connect } from "react-redux";

const customStyles = {
  content: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "30vw",
    height: "28vh",
    background: "none",
    //boxShadow: "0px 10px 5px rgba(0,0,0,0.25)",
    border: "none",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
};

const LocalLoader = ({ localLoaderOpen }) => {
  return (
    <Modal isOpen={localLoaderOpen}>
      <Loader.Oval type="Oval" color="#8aff58" height={50} width={50} />
    </Modal>
  );
};
//Redux

const mapStateToProps = (state) => {
  const { localLoaderOpen } = state.recordReducer;
  return { localLoaderOpen };
};

export default connect(mapStateToProps)(LocalLoader);
