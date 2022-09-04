import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import { collection, onSnapshot } from "firebase/firestore";
import PlaceCard from "components/PlaceCard";
import { useSelector } from "react-redux";
import { reduxStateType } from "components/Main";
import EmptyPage from "components/EmptyPage";
const Place = () => {
  const [places, setPlaces] = useState<Array<any>>([]);
  const userState = useSelector((state: reduxStateType) => state.user.value);
  useEffect(() => {
    onSnapshot(collection(dbService, "userPlace"), (snapShot) => {
      const placeArray = snapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPlaces(placeArray);
    });
  }, []);
  const userPlace = places.filter((obj) => obj.uid === userState.uid);

  return (
    <div>
      {userPlace.length > 0 ? (
        userPlace.map((obj) => {
          return <PlaceCard key={obj.id} placeInfo={obj} />;
        })
      ) : (
        <EmptyPage />
      )}
    </div>
  );
};

export default Place;
