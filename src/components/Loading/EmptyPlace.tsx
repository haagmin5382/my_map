import React from "react";
import FmdBadTwoToneIcon from "@mui/icons-material/FmdBadTwoTone";
const EmptyPlace = () => {
  return (
    <div>
      <FmdBadTwoToneIcon
        // fontSize="large"
        sx={{ color: "gray", marginTop: "10vw", fontSize: "10vw" }}
      />
      <div style={{ color: "gray", fontSize: "2vw" }}>
        아직 장소를 검색하지 않았어요
      </div>
    </div>
  );
};

export default EmptyPlace;
