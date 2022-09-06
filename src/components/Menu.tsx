import React from "react";
import styled from "styled-components";
import Location from "./Location";
import EmptyPlace from "./Loading/EmptyPlace";
import Box from "@mui/material/Box";

const MenuContainer = styled.div`
  position: static;
  z-index: 999;
  text-align: center;

  background-color: #026bab;
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
