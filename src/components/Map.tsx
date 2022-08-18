import React, { useEffect } from "react";

const Map = () => {
  const { kakao }: any = window;
  // window 객체로부터 스크립트에서 로드한 kakao api를 가져와야 하기 때문에 리액트 컴포넌트 상단에 작성
  console.log(window);
  useEffect(() => {
    let container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
    let options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
      level: 3, //지도의 레벨(확대, 축소 정도)
    };

    new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
  }, []);

  return (
    <main>
      <div id="map" style={{ width: "500px", height: "500px" }}></div>
    </main>
  );
};

export default Map;
