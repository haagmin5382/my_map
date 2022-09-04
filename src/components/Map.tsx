import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import LoadingSpinner from "./LoadingSpinner/LoadingSpinner";
import { useSelector, useDispatch } from "react-redux";
import { reduxStateType } from "./Main";
import Menu from "./Menu";
import { FlexContainer } from "./Main";
import SuccessModal from "./alert/SuccessModal";
import { getPlace } from "redux/getLocation";

export interface locationInfo {
  y: number;
  x: number;
}

export interface mapProps {
  locationName: {
    current: Array<string>;
  };
}
const Map = ({ locationName }: mapProps) => {
  const { kakao }: any = window;
  // window 객체로부터 스크립트에서 로드한 kakao api를 가져와야 하기 때문에 리액트 컴포넌트 상단에 작성

  const [retrievingLocation, setRetrievingLocation] = useState(false);
  const dispatch = useDispatch();
  const modalState = useSelector((state: reduxStateType) => state.modal.value);
  const locationState = useSelector(
    (state: reduxStateType) => state.location.value.location
  );

  useEffect(() => {
    if (!retrievingLocation) {
      // console.log("locationState 34 : ", locationState);
      navigator.geolocation.getCurrentPosition((position) => {
        dispatch(
          getPlace({
            location: [
              { y: position.coords.latitude, x: position.coords.longitude },
            ],
          })
        );

        setRetrievingLocation(true);
      });
    }
  }, []);

  useEffect(() => {
    if (retrievingLocation) {
      // 현재 위치 정보를 불러와야 지도를 그린다.
      // console.log("locationState 52 : ", locationState);
      let container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
      let options = {
        //지도를 생성할 때 필요한 기본 옵션

        center: new kakao.maps.LatLng(locationState[0].y, locationState[0].x), //지도의 중심좌표.
        // 현재 자신의 위치를 중심으로 한다.
        level: locationState.length > 1 ? 5 : 3, //지도의 레벨(확대, 축소 정도)
      };

      let map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

      for (let i = 0; i < locationState.length; i++) {
        let marker = new kakao.maps.Marker({
          // 지도 중심좌표에 마커를 생성합니다
          position: new kakao.maps.LatLng(
            locationState[i].y,
            locationState[i].x
          ),
        });
        marker.setMap(map);
      }
    }
  }, [retrievingLocation]);

  const clickLocation = (idx: number) => {
    let container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
    let options = {
      //지도를 생성할 때 필요한 기본 옵션

      center: new kakao.maps.LatLng(locationState[idx].y, locationState[idx].x), //지도의 중심좌표.
      // 현재 자신의 위치를 중심으로 한다.
      level: locationState.length > 1 ? 5 : 3, //지도의 레벨(확대, 축소 정도)
    };

    let map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
    let marker = new kakao.maps.Marker({
      // 지도 중심좌표에 마커를 생성합니다
      position: new kakao.maps.LatLng(
        locationState[idx].y,
        locationState[idx].x
      ),
    });

    marker.setMap(map);
  };

  return (
    <main>
      {modalState.successModal && <SuccessModal />}

      <FlexContainer modalState={modalState.menuModal}>
        {modalState.menuModal && (
          <Menu locationName={locationName} clickLocation={clickLocation} />
        )}
        {retrievingLocation ? (
          <div>
            <SearchBar locationName={locationName} />
            <div
              id="map"
              style={{
                position: "relative",
                height: "92vh",
              }}
            ></div>
          </div>
        ) : (
          <LoadingSpinner />
        )}
      </FlexContainer>
    </main>
  );
};

export default Map;
