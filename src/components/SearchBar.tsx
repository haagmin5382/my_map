import React from "react";
import styled from "styled-components";
import { BsSearch } from "react-icons/bs";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openAndClose } from "redux/modal";
import { getPlace } from "redux/getLocation";

interface Props {
  menuModal: boolean;
}
const SearchBarContainer = styled.div<Props>`
  position: fixed;
  text-align: center;
  z-index: 9999;
  left: ${(props) => (props.menuModal ? "50%" : "30%")};
  top: 10vh;
  > form {
    > input {
      width: 30vw;
      padding: 10px;
      border-radius: 20px;
    }
  }
  transition: 1s;
`;

interface searchBarProps {
  locationName: {
    current: Array<string>;
  };
}

interface locationCoordinate {
  x: string;
  y: string;
}
interface reduxStateType {
  modal: {
    value: {
      menuModal: boolean;
      alertModal: boolean;
    };
  };
  location: {
    value: {
      location: Array<locationCoordinate>;
    };
  };
}

const SearchBar = ({ locationName }: searchBarProps) => {
  const [searchingWord, setSearchingWord] = useState("");
  const changeSearchingWord = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchingWord(e.target.value);
  };

  const dispatch = useDispatch();

  const modalState = useSelector((state: reduxStateType) => state.modal.value);

  const openMenuModal = () => {
    dispatch(openAndClose({ ...modalState, menuModal: true }));
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
          dispatch(
            getPlace({
              location: result.map((obj: resultType) => {
                return { y: obj.y, x: obj.x };
              }),
            })
          );
        } else {
          // 주소 검색이 안되면 키워드 검색 시작
          places.keywordSearch(searchingWord, callback); // 키워드 검색 (2순위)
        }
      };

      geocoder.addressSearch(searchingWord, callback); // 주소 검색 (1순위)
      openMenuModal();
    }
  };
  window.onkeydown = (e) => {
    if (e.key === "Enter") {
      searchPlace();
    }
  };
  return (
    <SearchBarContainer menuModal={modalState.menuModal}>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          placeholder="장소 검색"
          onChange={changeSearchingWord}
          required
          style={{ marginRight: "10px" }}
        />

        <BsSearch onClick={searchPlace} size="25" cursor="pointer" />
      </form>
    </SearchBarContainer>
  );
};

export default SearchBar;
