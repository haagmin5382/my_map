import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import Location from "./Location";
import LoadingSpinner from "./LoadingSpinner/LoadingSpinner";
import { useSelector } from "react-redux";
import { reduxStateType } from "./Main";
import Menu from "./Menu";
import { FlexContainer } from "./Main";
export interface locationInfo {
  y: number;
  x: number;
}

export interface mapProps {
  location: Array<locationInfo>;
  setLocation: (value: Array<locationInfo>) => void;
  locationName: {
    current: Array<string>;
  };
}
const Map = ({ setLocation, location, locationName }: mapProps) => {
  const { kakao }: any = window;
  // window 객체로부터 스크립트에서 로드한 kakao api를 가져와야 하기 때문에 리액트 컴포넌트 상단에 작성
  // const [location, setLocation] = useState([{ y: 33.450701, x: 126.570667 }]);
  const [retrievingLocation, setRetrievingLocation] = useState(false);

  useEffect(() => {
    if (!retrievingLocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation([
          { y: position.coords.latitude, x: position.coords.longitude },
        ]);

        setRetrievingLocation(true);
      });
    }
  }, []);

  useEffect(() => {
    if (retrievingLocation) {
      // 현재 위치 정보를 불러와야 지도를 그린다.

      let container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
      let options = {
        //지도를 생성할 때 필요한 기본 옵션

        center: new kakao.maps.LatLng(location[0].y, location[0].x), //지도의 중심좌표.
        // 현재 자신의 위치를 중심으로 한다.
        level: location.length > 1 ? 5 : 3, //지도의 레벨(확대, 축소 정도)
      };

      let map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

      for (let i = 0; i < location.length; i++) {
        let marker = new kakao.maps.Marker({
          // 지도 중심좌표에 마커를 생성합니다
          position: new kakao.maps.LatLng(location[i].y, location[i].x),
        });
        marker.setMap(map);
      }
    }
  }, [location]);

  const clickLocation = (idx: number) => {
    let container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
    let options = {
      //지도를 생성할 때 필요한 기본 옵션

      center: new kakao.maps.LatLng(location[idx].y, location[idx].x), //지도의 중심좌표.
      // 현재 자신의 위치를 중심으로 한다.
      level: location.length > 1 ? 5 : 3, //지도의 레벨(확대, 축소 정도)
    };

    let map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
    let marker = new kakao.maps.Marker({
      // 지도 중심좌표에 마커를 생성합니다
      position: new kakao.maps.LatLng(location[idx].y, location[idx].x),
    });

    marker.setMap(map);
  };
  const modalState = useSelector(
    (state: reduxStateType) => state.modal.value.menuModal
  );
  return (
    <main>
      <FlexContainer modalState={modalState}>
        {modalState && (
          <Menu
            setLocation={setLocation}
            locationName={locationName}
            clickLocation={clickLocation}
          />
        )}
        {retrievingLocation ? (
          <div>
            <SearchBar setLocation={setLocation} locationName={locationName} />
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
