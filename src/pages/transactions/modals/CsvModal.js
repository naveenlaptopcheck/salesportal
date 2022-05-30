import { React, useRef } from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import {
  CLOSE_CSV_MODAL,
  CSV_CLICKED,
  CSV_ERROR,
  CSV_PARSE_SUBMIT,
  UPLOAD_CSV,
} from "../../../redux/actions";
import { parse } from "papaparse";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const customStyles = {
  content: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "38rem",
    height: "18.5rem",
    //background: "lightBlue",
    boxShadow: "0px 10px 5px rgba(0,0,0,0.25)",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    paddingTop: "5.6rem",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
};

const CsvModal = ({
  csvModalOpen,
  csvFile,
  records,
  handleUploadCsv,
  handleSubmitCsv,
  handleCloseCsvModal,
  handleCsvClick,
}) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `${token}` },
  };
  // if (csvFile) {
  //   console.log(csvFile.name);
  // }

  const hiddenFileInput = useRef(null);
  const handleClick = (event) => {
    event.preventDefault();
    hiddenFileInput.current.click();
  };
  return (
    <Modal
      isOpen={csvModalOpen}
      //overlayClassName="Overlay"
      style={customStyles}
    >
      <form className="csv-form">
        <div className="upload-wrap">
          <button onClick={handleClick} className="upload-btn">
            Choose File
          </button>
          {csvFile ? <p>{csvFile.name}</p> : <p>No File Chosen</p>}
        </div>

        <input
          type="file"
          accept=".csv"
          id="csvFile"
          ref={hiddenFileInput}
          style={{ display: "none" }}
          onChange={(e) => {
            handleUploadCsv(e);
          }}
        ></input>
        <div
          className="csv-btns"
          style={{ margin: "2rem", display: "flex", gap: "2rem" }}
        >
          <button
            style={{
              border: "none",
              borderRadius: "2px",
              background: "#00394D",
              padding: "0.5rem 1.5rem",
              fontSize: "1.5rem",
              color: "white",
              fontWeight: "500",
              fontFamily: "'Poppins', sans-serif",
              cursor: "pointer",
            }}
            onClick={(e) => {
              e.preventDefault();
              if (csvFile) {
                handleSubmitCsv(csvFile, token);
                handleCsvClick();
              } else {
                alert("Please select a csv file first !!");
              }
            }}
          >
            Submit
          </button>

          <button
            style={{
              border: "none",
              borderRadius: "2px",
              background: "#00394D",
              padding: "0.5rem 1.5rem",
              fontSize: "1.5rem",
              color: "white",
              fontWeight: "500",
              fontFamily: "'Poppins', sans-serif",
              cursor: "pointer",
            }}
            onClick={(e) => {
              e.preventDefault();
              handleCloseCsvModal();
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};
//Redux

const mapStateToProps = (state) => {
  const { csvModalOpen, csvFile, records } = state.recordReducer;
  return { csvModalOpen, csvFile, records };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleUploadCsv: (e) => {
      console.log(e.target.files[0]);
      dispatch({ type: UPLOAD_CSV, payload: { csv: e.target.files[0] } });
    },
    handleCsvClick: () => {
      dispatch({ type: CSV_CLICKED });
    },
    handleSubmitCsv: (csvFile, token) => {
      const file = csvFile;

      let formData = new FormData();
      formData.append("file", file);

      axios({
        url: `${process.env.REACT_APP_URL}/console/csv_upload`,
        method: "POST",
        headers: { Authorization: `${token}` },
        data: formData,
      })
        .then((resp) => {
          //console.log(resp.data);
          axios({
            url: `${process.env.REACT_APP_URL}/console/employee`,
            method: "GET",
            headers: { Authorization: `${token}` },
          }).then((respo) => {
            console.log(respo.data);
            return dispatch({ type: CSV_PARSE_SUBMIT, payload: respo.data });
          });
        })
        .catch((error) => {
          return dispatch({ type: CSV_ERROR });
        });
    },

    handleCloseCsvModal: () => {
      dispatch({ type: CLOSE_CSV_MODAL });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CsvModal);
