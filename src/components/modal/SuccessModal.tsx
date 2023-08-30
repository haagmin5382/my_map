import React, { useEffect } from "react";
import { AlertModalConatiner } from "./AlertModal";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { useSelector, useDispatch } from "react-redux";
import { openAndClose } from "redux/modal";
import { reduxType } from "Type";
const SuccessModal = () => {
  const modalState = useSelector(
    (state: reduxType.reduxStateType) => state.modal.value
  );
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(
        openAndClose({ ...modalState, alertModal: null, successModal: null })
      );
    }, 4000);
  }, []);

  return (
    <AlertModalConatiner>
      <Stack sx={{ width: "100%", position: "fixed" }} spacing={2}>
        <Alert severity="success">{modalState.successModal}</Alert>
      </Stack>
    </AlertModalConatiner>
  );
};

export default SuccessModal;
