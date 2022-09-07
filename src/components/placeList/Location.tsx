import React, { useState } from "react";
import styled from "styled-components";
import LocationModal from "../modal/LocationModal";
import PlaceButton from "./PlaceButton";
const LocationContainer = styled.div`
  height: 90vh;
  width: 30vw;
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
  const [locationIndex, setLocationIndex] = useState(0);
  const getIndexOfLocation = (idx: number) => {
    setLocationIndex(idx);
  };
  const [isClicked, setIsClicked] = useState(NaN);
  return (
    <LocationContainer>
      {locationName.current.map((el: string, idx: number) => {
        return (
          <div
            key={idx}
            onClick={() => {
              clickLocation(idx);
              getIndexOfLocation(idx);
              setIsClicked(idx);
            }}
          >
            <PlaceButton place={el} isClicked={isClicked === idx} />
          </div>
        );
      })}
      <LocationModal
        location={locationName.current[locationIndex]}
        locationIndex={locationIndex}
      />
    </LocationContainer>
  );
};

export default Location;
