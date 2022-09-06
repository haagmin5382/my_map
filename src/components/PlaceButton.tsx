import React from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { openAndClose } from "redux/modal";
import { reduxStateType } from "./Main";
import { useNavigate } from "react-router-dom";
const PlaceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1vw;
  border-bottom: 1px solid white;
  margin: 0.5vw;
  color: white;
  font-weight: bold;
  cursor: pointer;
  @media screen and (max-width: 600px) {
    display: inline-block;
    font-size: 10px;
    justify-content: flex-start;
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
  console.log(useSelector((state) => state));
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
