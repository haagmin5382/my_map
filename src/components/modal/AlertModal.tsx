import React, { useEffect } from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { openAndClose } from "redux/modal";
import { reduxType } from "Type";

export const AlertModalConatiner = styled.div`
  position: "fixed";
  width: "100%";
  animation: pade 4s;
  opacity: 0;
  z-index: 9999999;
  @keyframes pade {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

const AlertModal = () => {
  const modalState = useSelector(
    (state: reduxType.reduxStateType) => state.modal.value
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (modalState.alertModal) {
      // alertModal이 null이나 ''가 아닌 경우에만 밑에 함수가 실행된다.
      setTimeout(() => {
        dispatch(
          openAndClose({ ...modalState, alertModal: null, successModal: null })
        );
      }, 4000);
    }
  }, [modalState.alertModal]);
  return (
    <AlertModalConatiner>
      <Stack sx={{ width: "100%", position: "fixed" }} spacing={2}>
        <Alert severity="error">{modalState.alertModal}</Alert>
        {/* <Alert severity="warning">This is a warning alert — check it out!</Alert>
      <Alert severity="info">This is an info alert — check it out!</Alert>
      <Alert severity="success">This is a success alert — check it out!</Alert> */}
      </Stack>
    </AlertModalConatiner>
  );
};

export default AlertModal;
