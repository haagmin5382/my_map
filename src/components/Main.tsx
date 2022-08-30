import React, { useState, useRef } from "react";
import Map from "components/Map";
import styled from "styled-components";

export interface reduxStateType {
  modal: {
    value: {
      menuModal: boolean;
    };
  };
}

export interface ModalProps {
  modalState: boolean;
}

export const FlexContainer = styled.div<ModalProps>`
  display: grid;
  grid-template-columns: ${(props) => (props.modalState ? "20% 80%" : "1fr")};
  transition: 0.5s;
`;
const Main = () => {
  const [location, setLocation] = useState([{ y: 33.450701, x: 126.570667 }]);
  const locationName = useRef<Array<string>>([]);
  return (
    <>
      <Map
        setLocation={setLocation}
        location={location}
        locationName={locationName}
      />
    </>
  );
};

export default Main;
