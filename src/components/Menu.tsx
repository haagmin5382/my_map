import React from "react";
import styled from "styled-components";
import { locationInfo } from "./Map";
import Location from "./Location";
import Paper from "@mui/material/Paper";

const MenuContainer = styled.div`
  position: static;
  z-index: 999;
  text-align: center;
`;

interface menuProps {
  setLocation: (value: Array<locationInfo>) => void;
  locationName: {
    current: Array<string>;
  };
  clickLocation: (idx: number) => void;
}

const Menu = ({ locationName, clickLocation }: menuProps) => {
  return (
    <MenuContainer>
      <Paper elevation={3} style={{ padding: "1vw" }}>
        {locationName.current.length > 0 ? (
          <Location locationName={locationName} clickLocation={clickLocation} />
        ) : (
          "장소를 검색해주세요"
        )}
      </Paper>
    </MenuContainer>
  );
};

export default Menu;
