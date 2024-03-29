import react, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { openAndClose } from "redux/modal";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import React from "react";
import { addDoc, collection } from "firebase/firestore";
import { dbService } from "fbase";
import { reduxType } from "Type";

const detectMobileDevice = (agent: string) => {
  const mobileRegex = [
    /Android/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i,
  ];

  return mobileRegex.some((mobile) => agent.match(mobile));
};

const isMobile = detectMobileDevice(window.navigator.userAgent);

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: isMobile ? "50vw" : "30vw",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function LocationModal({
  location,
  locationIndex,
}: {
  location: string;
  locationIndex: number;
}) {
  const modalState = useSelector(
    (state: reduxType.reduxStateType) => state.modal.value
  );
  const locationState = useSelector(
    (state: reduxType.reduxStateType) => state.location.value
  );
  const userState = useSelector(
    (state: reduxType.reduxStateType) => state.user.value
  );

  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(openAndClose({ ...modalState, locationModal: false }));
  };
  const [inputLocation, setInputLocation] = useState("");
  const inputLocationName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setInputLocation(value);
  };

  const saveLocation = async () => {
    if (inputLocation) {
      const locationContent = {
        uid: userState.uid,
        title: inputLocation,
        location: location,
        coordinate: locationState.location[locationIndex],
      };
      await addDoc(collection(dbService, "userPlace"), locationContent);
      dispatch(
        openAndClose({
          ...modalState,
          successModal: "장소를 저장했습니다.",
        })
      );
      handleClose();
    } else {
      dispatch(
        openAndClose({
          ...modalState,
          alertModal: "제목을 작성해주세요",
        })
      );
    }
  };

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
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              sx={{ fontSize: isMobile ? "small" : "large" }}
            >
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
              onChange={inputLocationName}
            />
            <div style={{ textAlign: "center" }}>
              <Button
                variant="contained"
                onClick={saveLocation}
                sx={{ fontSize: isMobile ? "small" : "large" }}
              >
                저장
              </Button>
              <Button
                variant="contained"
                sx={{ margin: "1vw" }}
                style={{
                  backgroundColor: "red",
                  fontSize: isMobile ? "small" : "large",
                }}
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
