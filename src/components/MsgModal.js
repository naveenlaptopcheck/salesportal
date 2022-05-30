import React, { useEffect } from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import { CLOSE_MSG_MODAL } from "../redux/actions";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
};

const MsgModal = ({ msgModalOpen, handleCloseMsgModal, modalMsg }) => {
  useEffect(() => {
    setTimeout(() => {
      handleCloseMsgModal();
    }, 2000);
  });
  return (
    <Modal style={customStyles} isOpen={msgModalOpen} className="msg-modal">
      <p>{modalMsg}</p>
    </Modal>
  );
};

//Redux
const mapStateToProps = (state) => {
  const { msgModalOpen, modalMsg } = state.recordReducer;
  return { msgModalOpen, modalMsg };
};
const mapDispatchToProps = (dispatch) => {
  return {
    handleCloseMsgModal: () => {
      dispatch({ type: CLOSE_MSG_MODAL });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MsgModal);
