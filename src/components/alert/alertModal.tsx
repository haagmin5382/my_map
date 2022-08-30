import React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { reduxStateType } from "components/Main";

const AlertModalConatiner = styled.div`
  position: "fixed";
  width: "100%";
  animation: pade 4s;
  opacity: 0;
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
  const errorMessage = useSelector(
    (state: reduxStateType) => state.modal.value.alertModal
  );
  return (
    <AlertModalConatiner>
      <Stack sx={{ width: "100%", position: "fixed" }} spacing={2}>
        <Alert severity="error">{errorMessage}</Alert>
        {/* <Alert severity="warning">This is a warning alert — check it out!</Alert>
      <Alert severity="info">This is an info alert — check it out!</Alert>
      <Alert severity="success">This is a success alert — check it out!</Alert> */}
      </Stack>
    </AlertModalConatiner>
  );
};

export default AlertModal;
