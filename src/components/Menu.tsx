import React from "react";
import styled from "styled-components";
import SearchBar from "./SearchBar";

const MenuContainer = styled.div`
  position: static;
  z-index: 999;
  width: 20vw;
  height: 100vh;
`;

const Menu = () => {
  return (
    <MenuContainer>
      <SearchBar />
    </MenuContainer>
  );
};

export default Menu;
