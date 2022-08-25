import React from "react";
import "./LoadingSpinner.css";

const LoadingSpinner = () => {
  return (
    <div>
      <div className="lds-ring" style={{ fontSize: "2vw" }}>
        <div> </div>
        <div></div>
        <div></div>
        <div> </div>
      </div>
      <div className="lds-message">위치 정보를 불러오는 중...</div>
    </div>
  );
};

export default LoadingSpinner;
