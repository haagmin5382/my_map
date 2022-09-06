import React, { useState, useRef } from "react";
import Map from "components/Map";
import styled from "styled-components";

interface locationCoordinate {
  x: string;
  y: string;
}
export interface reduxStateType {
  modal: {
    value: {
      menuModal: boolean;
      alertModal: string;
      successModal: string;
      locationModal: boolean;
    };
  };
  user: {
    value: {
      email: string;
      displayName: string;
      photoURL: string;
      uid: string;
    };
  };
  location: {
    value: {
      location: Array<locationCoordinate>;
    };
  };
}

export interface ModalProps {
  modalState: boolean;
}

export const FlexContainer = styled.div<ModalProps>`
  display: grid;
  grid-template-columns: ${(props) => (props.modalState ? "30% 70%" : "1fr")};
  transition: 0.5s;
`;
const Main = () => {
  // const [location, setLocation] = useState([{ y: 33.450701, x: 126.570667 }]);
  const locationName = useRef<Array<string>>([]);
  return (
    <>
      <Map locationName={locationName} />
    </>
  );
};

export default Main;
