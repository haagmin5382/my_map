import React from "react";
import styled from "styled-components";
import { locationInfo } from "./Map";
import Location from "./Location";
import Paper from "@mui/material/Paper";
import EmptyPlace from "./Loading/EmptyPlace";

const MenuContainer = styled.div`
  position: static;
  z-index: 999;
  text-align: center;
  /* text-align: right; */
`;

interface menuProps {
  locationName: {
    current: Array<string>;
  };
  clickLocation: (idx: number) => void;
}

const Menu = ({ locationName, clickLocation }: menuProps) => {
  return (
    <MenuContainer>
      {locationName.current.length > 0 ? (
        <Location locationName={locationName} clickLocation={clickLocation} />
      ) : (
        <EmptyPlace />
      )}
    </MenuContainer>
  );
};

export default Menu;
