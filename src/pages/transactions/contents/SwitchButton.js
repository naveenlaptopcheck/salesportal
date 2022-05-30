import axios from "axios";
import React, {useEffect} from "react";
import { connect } from "react-redux";
import { SWITCH_ERROR, SWITCH_USER } from "../../../redux/actions";

const SwitchButton = ({
  status,
  id,
  handleChangeStatus,

  net_salary,
}) => {
  let status1 = { status: "active", net_salary };
  let status2 = { status: "inactive", net_salary };
  const token = localStorage.getItem("token");
  //console.log("switch", token);
  const config = {
    headers: { Authorization: `${token}` },
  };
  
  return (
    <div className="my-switch-btn">
      <label className="switch">
        <input
          type="checkbox"
          checked={status.toLowerCase() === "active" ? true : false}
          // onChange={console.log('chaging log')}
          onClick={() => {
            if (status.toLowerCase() === "active") {
              handleChangeStatus(id, status2, config);
            } else {
              handleChangeStatus(id, status1, config);
            }
          }}
        ></input>
        <span className="slider round"></span>
      </label>
    </div>
  );
};

//Redux
const mapDispatchToProps = (dispatch) => {
  return {
    handleChangeStatus: (id, statData, config) => {
      //console.log(config);
      axios
        .put(
          `${process.env.REACT_APP_URL}/console/employee/${id}`,
          statData,
          config
        )
        .then((response) => {
          // console.log(response.data);
          axios
            .get(`${process.env.REACT_APP_URL}/console/employee/${id}`, config)
            .then((resp) => {
              // console.log(resp.data);
              return dispatch({
                type: SWITCH_USER,
                payload: { data: resp.data },
              });
            });
        })
        .catch((error) => {
          return dispatch({ type: SWITCH_ERROR });
        });
    },
  };
};

export default connect(null, mapDispatchToProps)(SwitchButton);
