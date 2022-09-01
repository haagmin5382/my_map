import React from "react";
import { useSelector } from "react-redux";

interface userType {
  user: {
    value: {
      email: string;
      displayName: string;
      photoURL: string;
      uid: string;
    };
  };
}

const Profile = () => {
  const userProfile = useSelector((state: userType) => state.user.value);
  console.log(userProfile);
  return (
    <>
      <h1>내 프로필</h1>
    </>
  );
};

export default Profile;
