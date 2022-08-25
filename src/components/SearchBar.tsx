import React from "react";
import styled from "styled-components";
import { BsSearch } from "react-icons/bs";

import { useState } from "react";
import { locationInfo } from "./Map";

const SearchBarContainer = styled.div`
  position: absolute;
  /* top: -98vh; */
  text-align: center;
  z-index: 9999;
  left: 40vw;
  top: 10vh;
  > form {
    > input {
      width: 15vw;
      padding: 10px;
      border-radius: 20px;
    }

    > button {
      width: 5vw;
      font-size: 2vw;

      border: none;
      background: none;
      color: gray;
      cursor: pointer;
    }
  }
`;

interface searchBarProps {
  locationName: {
    current: Array<string>;
  };
  setLocation: (value: Array<locationInfo>) => void;
}

const SearchBar = ({ locationName, setLocation }: searchBarProps) => {
  const [searchingWord, setSearchingWord] = useState("");
  const changeSearchingWord = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchingWord(e.target.value);
  };

  const searchPlace = () => {
    const { kakao }: any = window;
    let geocoder = new kakao.maps.services.Geocoder();

    let places = new kakao.maps.services.Places();

    interface resultType {
      address_name: string;
      x: number;
      y: number;
    }
    if (searchingWord) {
      let callback = function (result: Array<resultType>, status: string) {
        if (status === kakao.maps.services.Status.OK) {
          locationName.current = result.map(
            (obj: resultType) => obj.address_name
          );

          setLocation(
            result.map((obj: resultType) => {
              return { y: obj.y, x: obj.x };
            })
          );
        } else {
          // 주소 검색이 안되면 키워드 검색 시작
          places.keywordSearch(searchingWord, callback); // 키워드 검색 (2순위)
        }
      };

      geocoder.addressSearch(searchingWord, callback); // 주소 검색 (1순위)
    }
  };
  window.onkeydown = (e) => {
    if (e.key === "Enter") {
      searchPlace();
    }
  };
  return (
    <SearchBarContainer>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          placeholder="장소 검색"
          onChange={changeSearchingWord}
          required
        />
        <button>
          <BsSearch onClick={searchPlace} />
        </button>
      </form>
    </SearchBarContainer>
  );
};

export default SearchBar;
