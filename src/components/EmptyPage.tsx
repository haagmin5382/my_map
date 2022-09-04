import React from "react";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import styled from "styled-components";
const EmptyPage = () => {
  const EmptyPageContainer = styled.div`
    position: fixed;
    top: 15vw;
    left: 30vw;
    font-size: 5vw;
    margin: 0 auto;
    text-align: center;
  `;
  return (
    <EmptyPageContainer>
      <AddReactionIcon fontSize="inherit" />
      <div>저장한 목록이 없어요</div>
    </EmptyPageContainer>
  );
};

export default EmptyPage;
