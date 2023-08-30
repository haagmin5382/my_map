import React, { useRef } from "react";
import Map from "components/Map";
import styled from "styled-components";

export const FlexContainer = styled.div`
  display: grid;
  transition: 0.5s;
`;
const Main = () => {
  const locationName = useRef<Array<string>>([]);
  return (
    <>
      <Map locationName={locationName} />
    </>
  );
};

export default Main;
