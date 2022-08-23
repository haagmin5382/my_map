import React from "react";
import styled from "styled-components";

const PlaceContainer = styled.div`
  width: 100%;
  padding: 1vw;
  text-align: center;
  background-color: #ffffff;
  border: 1px solid black;
  border-radius: 20px;
  margin: 0.5vw;
  color: black;

  cursor: pointer;
`;

const PlaceButton = ({ place }: { place: string }) => {
  return <PlaceContainer>{place}</PlaceContainer>;
};

export default PlaceButton;
