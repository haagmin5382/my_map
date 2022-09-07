import React, { useRef } from "react";
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
