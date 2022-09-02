import React from "react";
import PlaceButton from "./PlaceButton";
import styled from "styled-components";

const LocationContainer = styled.div`
  height: 92vh;
  width: 20vw;
  overflow: auto;
  overflow-x: hidden;
  position: absolute;
  z-index: 999;
`;

interface LocationProps {
  locationName: { current: Array<string> };
  clickLocation: (idx: number) => void;
}

const Location = ({ locationName, clickLocation }: LocationProps) => {
  return (
    <LocationContainer>
      {locationName.current.map((el: string, idx: number) => {
        return (
          <div key={idx} onClick={() => clickLocation(idx)}>
            <PlaceButton place={el} />
          </div>
        );
      })}
    </LocationContainer>
  );
};

export default Location;
