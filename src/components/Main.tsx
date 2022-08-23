import React from "react";
import Map from "components/Map";
import styled from "styled-components";
import Menu from "./Menu";
import { useSelector } from "react-redux";

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

const FlexContainer = styled.div<ModalProps>`
  display: grid;
  grid-template-columns: ${(props) => (props.modalState ? "20% 80%" : "1fr")};
`;
const Main = () => {
  const modalState = useSelector(
    (state: reduxStateType) => state.modal.value.menuModal
  );

  return (
    <FlexContainer modalState={modalState}>
      {modalState && <Menu />}
      <Map />
    </FlexContainer>
  );
};

export default Main;
