import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Location from "./Location";
import EmptyPlace from "../Loading/EmptyPlace";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import { reduxStateType } from "components/Main";

interface Props {
  menuModal: boolean;
}
const MenuContainer = styled.div<Props>`
  /* display: ${(props) => (props.menuModal ? "inline" : "none")}; */
  position: fixed;
  z-index: 99999;
  text-align: center;
  background-color: #026bab;
  width: 30vw;
  animation: ${(props) =>
    props.menuModal ? "slide-right 1s " : "slide-left 1s"};
  animation-fill-mode: forwards;
  @keyframes slide-left {
    0% {
      width: 30vw;
    }

    100% {
      width: 0vw;
      opacity: 0;
      display: none;
    }
  }

  @keyframes slide-right {
    from {
      width: 0vw;
      opacity: 0;
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
  const modalState = useSelector((state: reduxStateType) => state.modal.value);

  return (
    <MenuContainer menuModal={modalState.menuModal}>
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
