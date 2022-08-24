import React from "react";
import styled from "styled-components";

const PlaceContainer = styled.div`
  /* width: 100%; */
  /* max-width: 200px; */

  padding: 1vw;
  text-align: center;
  border-bottom: 1px solid black;

  /* border-radius: 20px; */
  margin: 0.5vw;
  color: black;

  cursor: pointer;
`;

const PlaceButton = ({ place }: { place: string }) => {
  return <PlaceContainer>{place}</PlaceContainer>;
};

export default PlaceButton;