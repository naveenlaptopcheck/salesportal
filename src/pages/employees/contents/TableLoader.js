import React from "react";
import Loader from "react-loader-spinner";
import SVGB from "../../../components/SVGs/SVGB";

const TableLoader = () => {
  return (
    <div
      style={{
        padding: "3rem",
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <SVGB />
    </div>
  );
};

export default TableLoader;
