import React from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { openAndClose } from "redux/modal";
import { reduxStateType } from "../Main";
import { useNavigate } from "react-router-dom";

interface Props {
  isClicked: boolean;
  menuModal: boolean;
}
const PlaceContainer = styled.div<Props>`
  display: flex;
  justify-content: space-between;
  padding: 1vw;
  border-bottom: ${(props) =>
    props.isClicked ? "1px solid #C2E7FE" : "1px solid white"};
  margin: 0.5vw;
  color: ${(props) => (props.isClicked ? "#026bab" : "white")};
  background-color: ${(props) => (props.isClicked ? "white" : null)};
  font-weight: bold;
  cursor: pointer;
  @media screen and (max-width: 600px) {
    display: inline-block;
    font-size: 10px;
    justify-content: flex-start;
  }
  Button {
    font-size: 12px;
    @media screen and (max-width: 600px) {
      font-size: 8px;
    }
  }
  animation: ${(props) => (props.menuModal ? "opacity 2s" : "noOpacity 1s")};
  animation-fill-mode: forwards;
`;

const PlaceButton = ({
  place,
  isClicked,
}: {
  place: string;
  isClicked: boolean;
}) => {
  const dispatch = useDispatch();
  const modalState = useSelector((state: reduxStateType) => state.modal.value);
  const userState = useSelector((state: reduxStateType) => state.user.value);

  const navigate = useNavigate();
  const clickSave = () => {
    if (userState.email) {
      dispatch(openAndClose({ ...modalState, locationModal: true }));
    } else {
      navigate("/login");
    }
  };
  return (
    <>
      <PlaceContainer isClicked={isClicked} menuModal={modalState.menuModal}>
        <span>{place}</span>
        <Button
          sx={{
            background: "white",
            ":hover": {
              background: "#026BAB",
              border: "1px solid white",
              color: "white",
            },
          }}
          variant="outlined"
          onClick={clickSave}
        >
          저장
        </Button>
      </PlaceContainer>
    </>
  );
};

export default PlaceButton;
