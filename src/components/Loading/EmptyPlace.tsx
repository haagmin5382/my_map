import React from "react";
import FmdBadTwoToneIcon from "@mui/icons-material/FmdBadTwoTone";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { reduxStateType } from "components/Main";

interface Props {
  menuModal: boolean;
}
const EmptyPlaceContainer = styled.div<Props>`
  display: ${(props) => (props.menuModal ? "inline-block" : "none")};
`;

const EmptyPlace = () => {
  const modalState = useSelector((state: reduxStateType) => state.modal.value);
  return (
    <EmptyPlaceContainer menuModal={modalState.menuModal}>
      <FmdBadTwoToneIcon
        // fontSize="large"
        sx={{ color: "white", marginTop: "10vw", fontSize: "10vw" }}
      />
      <div style={{ color: "white", fontSize: "2vw" }}>
        아직 장소를 검색하지 않았어요
      </div>
    </EmptyPlaceContainer>
  );
};

export default EmptyPlace;
