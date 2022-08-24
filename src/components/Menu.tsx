import React from "react";
import styled from "styled-components";
import { locationInfo } from "./Map";
import Location from "./Location";
const MenuContainer = styled.div`
  /* position: static; */
  z-index: 999;
  width: 20vw;
  height: 90vh;
`;

const MenuBotton = styled.button`
  width: 20vw;
  padding: 2vw;
  border: none;
`;

interface menuProps {
  setLocation: (value: Array<locationInfo>) => void;
  locationName: {
    current: Array<string>;
  };
  clickLocation: (idx: number) => void;
}

const Menu = ({ setLocation, locationName, clickLocation }: menuProps) => {
  const goToMyLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation([
        { y: position.coords.latitude, x: position.coords.longitude },
      ]);
      locationName.current = [];
    });
  };
  return (
    <MenuContainer>
      {/* <MenuBotton onClick={goToMyLocation}>현재 내 위치</MenuBotton> */}
      <Location locationName={locationName} clickLocation={clickLocation} />
    </MenuContainer>
  );
};

export default Menu;
