import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getPlace } from "redux/getLocation";
import { deleteDoc, doc } from "firebase/firestore";
import { dbService } from "fbase";

interface placeCoordinate {
  x: string;
  y: string;
}
interface placeInfoProps {
  id: string;
  location: string;
  title: string;
  coordinate: placeCoordinate;
  uid: string;
}

export default function PlaceCard({
  placeInfo,
}: {
  placeInfo: placeInfoProps;
}) {
  const dispatch = useDispatch();
  const watchLocation = () => {
    dispatch(
      getPlace({
        location: [placeInfo.coordinate],
      })
    );
  };
  const selectedCard = doc(dbService, "userPlace", placeInfo.id);
  const clickDelete = async () => {
    await deleteDoc(selectedCard);
  };
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <React.Fragment>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            ></Typography>
            <Typography variant="h5" component="div">
              {placeInfo.title}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {placeInfo.location}
            </Typography>
            <Typography variant="body2">
              {/* {placeInfo.id} */}
              <br />
            </Typography>
          </CardContent>
          <CardActions>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Button size="small" onClick={watchLocation}>
                위치 보기
              </Button>
            </Link>
            <Button size="small" sx={{ color: "red" }} onClick={clickDelete}>
              삭제
            </Button>
          </CardActions>
        </React.Fragment>
      </Card>
    </Box>
  );
}
