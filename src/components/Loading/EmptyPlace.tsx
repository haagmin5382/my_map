import React from "react";
import FmdBadTwoToneIcon from "@mui/icons-material/FmdBadTwoTone";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { reduxType } from "Type";

interface Props {
  menuModal: boolean;
}
const EmptyPlaceContainer = styled.div<Props>`
  display: ${(props) => (props.menuModal ? "inline-block" : "none")};
  animation: opacity 1s;
  animation-fill-mode: forwards;

  @keyframes opacity {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes noOpacity {
    0% {
      opacity: 1;
    }

    100% {
      opacity: 0;
      width: 0;
      display: none;
    }
  }
  div {
    animation: opacity 3.5s;
    animation-fill-mode: forwards;
  }
`;

const EmptyPlace = () => {
  const modalState = useSelector(
    (state: reduxType.reduxStateType) => state.modal.value
  );
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
