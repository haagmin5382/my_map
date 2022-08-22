import React from "react";
import styled from "styled-components";
import { BsSearch } from "react-icons/bs";

const SearchBarContainer = styled.div`
  position: absoulte;
  top: 0;
  left: 0;
  text-align: center;
  > input {
    width: 200px;
    padding: 10px;
    border-radius: 20px;
  }

  > button {
    width: 50px;
    font-size: 20px;

    border: none;
    background-color: #ffffff;
    cursor: pointer;
  }
`;

interface searchBarProps {
  changeSearchingWord: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchPlace: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const SearchBar = () => {
  return (
    <SearchBarContainer>
      <input placeholder="장소 검색" />
      <button>
        <BsSearch />
      </button>
    </SearchBarContainer>
  );
};

export default SearchBar;
