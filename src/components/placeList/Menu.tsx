import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Location from "./Location";
import EmptyPlace from "../Loading/EmptyPlace";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import { reduxType } from "Type";

interface Props {
  menuModal: boolean;
  isRendered: boolean;
}
const MenuContainer = styled.div<Props>`
  /* display: ${(props) => (props.menuModal ? "inline" : "none")}; */
  position: fixed;
  z-index: 99999;
  text-align: center;
  background-color: #026bab;
  /* width: 30vw; */
  animation: ${(props) =>
    props.menuModal
      ? "slide-right 1s "
      : props.isRendered // 처음 렌더링 될 때 애니메이션이 시작하는것을 막는다.
      ? "slide-left 1s"
      : null};
  animation-fill-mode: forwards;
  @keyframes slide-left {
    0% {
      width: 30vw;
    }
    100% {
      width: 0vw;
      display: none;
    }
  }

  @keyframes slide-right {
    from {
      width: 0vw;
    }
    to {
      width: 30vw;
    }
  }
`;

interface menuProps {
  locationName: {
    current: Array<string>;
  };
  clickLocation: (idx: number) => void;
}

const Menu = ({ locationName, clickLocation }: menuProps) => {
  const modalState = useSelector(
    (state: reduxType.reduxStateType) => state.modal.value
  );
  const [isRendered, setIsRendered] = useState(false);
  useEffect(() => {
    if (modalState.menuModal) {
      setIsRendered(true);
    }
  }, [modalState.menuModal]);
  return (
    <MenuContainer menuModal={modalState.menuModal} isRendered={isRendered}>
      <Box sx={{ boxShadow: 10, height: "91.5vh" }}>
        {locationName.current.length > 0 ? (
          <Location locationName={locationName} clickLocation={clickLocation} />
        ) : (
          <EmptyPlace />
        )}
      </Box>
    </MenuContainer>
  );
};

export default Menu;
