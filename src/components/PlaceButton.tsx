import React from "react";
import styled from "styled-components";

const PlaceContainer = styled.div`
  width: 200px;
  height: 20px;
  padding: 10px;
  text-align: center;
  background-color: #b4dcff;
  color: #ffffff;
  border: 2px solid white;
  cursor: pointer;
`;

const PlaceButton = ({ place }: { place: string }) => {
  return <PlaceContainer>{place}</PlaceContainer>;
};

export default PlaceButton;
