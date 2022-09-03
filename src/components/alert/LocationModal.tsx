import react, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { openAndClose } from "redux/modal";
import { reduxStateType } from "components/Main";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function LocationModal({ location }: { location: string }) {
  const modalState = useSelector((state: reduxStateType) => state.modal.value);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(openAndClose({ ...modalState, locationModal: false }));
  };
  const saveLocation = () => {};

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={modalState.locationModal}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalState.locationModal}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              <div>{location}</div>이 장소를 저장하시겠습니까?
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="location"
              label="장소 이름"
              name="location"
              autoComplete="location"
              autoFocus
            />
            <Typography
              id="transition-modal-description"
              sx={{ mt: 2 }}
            ></Typography>
            <div style={{ textAlign: "center" }}>
              <Button variant="contained" onClick={saveLocation}>
                저장
              </Button>
              <Button
                variant="contained"
                sx={{ margin: "1vw" }}
                style={{ backgroundColor: "red" }}
                onClick={handleClose}
              >
                취소
              </Button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
