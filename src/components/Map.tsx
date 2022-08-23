import React, { useEffect, useRef, useState } from "react";
import SearchBar from "./SearchBar";
import Location from "./Location";
const Map = () => {
  const { kakao }: any = window;
  // window 객체로부터 스크립트에서 로드한 kakao api를 가져와야 하기 때문에 리액트 컴포넌트 상단에 작성
  const [location, setLocation] = useState([{ y: 33.450701, x: 126.570667 }]);
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

  const [searchingWord, setSearchingWord] = useState("");
  const changeSearchingWord = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchingWord(e.target.value);
  };

  const locationName = useRef<Array<string>>([]);

  const searchPlace = (e: React.MouseEvent) => {
    let geocoder = new kakao.maps.services.Geocoder();

    let places = new kakao.maps.services.Places();

    interface resultType {
      address_name: string;
      x: number;
      y: number;
    }

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
  };

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

  return (
    <main>
      {retrievingLocation && (
        <div id="map" style={{ position: "static", height: "100vh" }}></div>
      )}
      <SearchBar
        changeSearchingWord={changeSearchingWord}
        searchPlace={searchPlace}
      />

      <Location locationName={locationName} clickLocation={clickLocation} />
    </main>
  );
};

export default Map;
