import React from "react";
import * as Loader  from "react-loader-spinner";

const LoadingPage = () => {
 
  return (
    <div className="main-loading">
      <div className="loading-page">
        <h1>Finsire</h1>
        <Loader.Oval type="Oval" color="#8aff58" height={50} width={50} />
      </div>
    </div>
  );
};

export default LoadingPage;
