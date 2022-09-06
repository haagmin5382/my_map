import React from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { openAndClose } from "redux/modal";
import { reduxStateType } from "./Main";
import { useNavigate } from "react-router-dom";
const PlaceContainer = styled.div`
  /* width: 100%; */
  /* max-width: 200px; */

  padding: 1vw;
  text-align: left;
  border-bottom: 1px solid black;

  /* border-radius: 20px; */
  margin: 0.5vw;
  color: black;

  cursor: pointer;
  @media screen and (max-width: 500px) {
    font-size: 10px;
  }
  Button {
    font-size: 12px;
    @media screen and (max-width: 500px) {
      font-size: 8px;
    }
  }
`;

const PlaceButton = ({ place }: { place: string }) => {
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
      <PlaceContainer>
        {place}
        <Button sx={{ margin: "1vh" }} variant="outlined" onClick={clickSave}>
          저장
        </Button>
      </PlaceContainer>
    </>
  );
};

export default PlaceButton;
