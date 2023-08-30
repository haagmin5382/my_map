import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { authService } from "fbase";
import { updateProfile } from "firebase/auth";
import { userReducer } from "redux/user";
import { openAndClose } from "redux/modal";
import AlertModal from "components/modal/AlertModal";
import { reduxType } from "Type";

const ProfileContainer = styled.div`
  width: 30vw;
  margin: 0 auto;
  text-align: center;

  @media screen and (max-width: 500px) {
    font-size: 10px;
  }

  Button {
    @media screen and (max-width: 500px) {
      font-size: 10px;
    }
  }
`;

const ProfileImg = styled.img`
  width: 15vw;
  border-radius: 50%;
  @media screen and (max-width: 500px) {
    width: 30vw;
  }
`;

const Profile = () => {
  const userProfile = useSelector(
    (state: reduxType.reduxStateType) => state.user.value
  );
  // console.log(userProfile);

  const [newDisplayName, setNewDisplayName] = useState(userProfile.displayName);

  const dispatch = useDispatch();

  const changeDisplayName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setNewDisplayName(value);
  };
  const refreshUser = () => {
    // 회원정보 수정했을 때 유저정보 업데이트
    const user = authService.currentUser;

    dispatch(
      userReducer({
        email: user?.email,
        displayName: user?.displayName,
        photoURL: user?.photoURL,
        uid: user?.uid,
      })
    );
  };
  const modalState = useSelector(
    (state: reduxType.reduxStateType) => state.modal.value
  );

  const editProfile = async () => {
    if (newDisplayName && authService.currentUser !== null) {
      await updateProfile(authService.currentUser, {
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };
  useEffect(() => {
    if (modalState.alertModal) {
      // modalState.alertModal이 null이 아닌 경우에만 실행시켜야한다.
      setTimeout(() => {
        dispatch(openAndClose({ ...modalState, alertModal: null }));
      }, 5000);
    }
  }, [modalState.alertModal]);

  return (
    <>
      {modalState.alertModal && <AlertModal />}
      <ProfileContainer>
        <h1>My Profile</h1>
        {userProfile.photoURL && <ProfileImg src={userProfile.photoURL} />}
        {/* 프로필 사진이 있으면 띄우고 없으면 띄우지 않는다. */}

        <TextField
          margin="normal"
          required
          fullWidth
          id="displayName"
          label="닉네임"
          name="displayName"
          autoComplete="displayName"
          autoFocus
          onChange={changeDisplayName}
          sx={{ fontSize: "small" }}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={editProfile}
        >
          회원정보 수정
        </Button>
      </ProfileContainer>
    </>
  );
};

export default Profile;
