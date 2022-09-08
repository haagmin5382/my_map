import React from "react";
import styled from "styled-components";

const SpinnerContainer = styled.div`
  .lds-ring {
    display: inline-block;
    position: fixed;
    font-size: "2vw";
    top: 45vh;
    left: 45vw;
    width: 80px;
    height: 80px;
  }
  .lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 6vw;
    height: 6vw;
    margin: 8px;
    border: 8px solid black;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: black transparent transparent transparent;
  }
  .lds-message {
    position: fixed;
    text-align: center;
    top: 60vh;
    font-size: 3vw;
    left: 25vw;
    width: 50vw;
    height: 80px;
  }

  .lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
  }
  .lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
  }
  .lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
  }

  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
const LoadingSpinner = () => {
  return (
    <SpinnerContainer>
      <div className="lds-ring">
        <div> </div>
        <div></div>
        <div></div>
        <div> </div>
      </div>
      <div className="lds-message">위치 정보를 불러오는 중...</div>
    </SpinnerContainer>
  );
};

export default LoadingSpinner;
