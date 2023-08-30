import React, { useState } from "react";
import styled from "styled-components";
import LocationModal from "../modal/LocationModal";
import { useSelector } from "react-redux";
import PlaceButton from "./PlaceButton";
import { reduxType } from "Type";
interface Props {
  menuModal: boolean;
}
const LocationContainer = styled.div<Props>`
  display: ${(props) => (props.menuModal ? "block" : "none")};
  height: 90vh;
  width: 30vw;
  overflow: auto;
  overflow-x: hidden;
  position: absolute;
  z-index: 999;
  animation: ${(props) => (props.menuModal ? "opacity 2s" : "noOpacity 1s")};
  animation-fill-mode: forwards;
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
  const modalState = useSelector(
    (state: reduxType.reduxStateType) => state.modal.value
  );
  return (
    <LocationContainer menuModal={modalState.menuModal}>
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
