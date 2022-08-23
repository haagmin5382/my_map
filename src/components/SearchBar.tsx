import React from "react";
import styled from "styled-components";
import { BsSearch } from "react-icons/bs";
import { useSelector } from "react-redux";
import { reduxStateType } from "./Main";

const SearchBarContainer = styled.div`
  position: relative;
  top: -98vh;

  text-align: center;
  z-index: 999;
  > input {
    width: 200px;
    padding: 10px;
    border-radius: 20px;
  }

  > button {
    width: 50px;
    font-size: 20px;

    border: none;
    background: none;
    color: gray;
    cursor: pointer;
  }
`;

interface searchBarProps {
  changeSearchingWord: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchPlace: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const SearchBar = ({ changeSearchingWord, searchPlace }: searchBarProps) => {
  const modalState = useSelector(
    (state: reduxStateType) => state.modal.value.menuModal
  );

  return (
    <SearchBarContainer>
      <input placeholder="장소 검색" onChange={changeSearchingWord} />
      <button onClick={searchPlace}>
        <BsSearch />
      </button>
    </SearchBarContainer>
  );
};

export default SearchBar;
