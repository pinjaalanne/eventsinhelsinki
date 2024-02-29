import { useEffect, useState } from "react";

import { Spinner } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import { useDispatch } from "react-redux";
import { initializeEvents } from "../store/eventsSlice";
import { useSelector } from "react-redux";
import { addFavorite } from "../store/favoriteSlice";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { format, parseISO } from 'date-fns';
// import axios from "axios";

const Events = () => {
  const dispatch = useDispatch();

  const eventsList = useSelector((state) => state.events.events);
  const isLoading = useSelector((state) => state.events.isLoading);
  const [searchInput, setSearchInput] = useState('');
  const [location, setLocation] = useState('');

  console.log(eventsList.data);

  useEffect(() => {
    dispatch(initializeEvents());
  }, [dispatch]);

  // useEffect(() => {
  //   axios.get('https://api.hel.fi/linkedevents/v1/place/')
  //     .then((res) => {
  //       setLocation(res.data.data)
  //       console.log(res.data.data)
  //     }).catch((error) => console.log(error))
  // }, []);

  if (isLoading) {
    return (
      <Col className="text-center m-5">
        <Spinner
          animation="border"
          role="status"
          className="center"
          variant="info"
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Col>
    );
  }

  return (
    <Container fluid>
      <TextField sx={{ mb: 1, mt: 10, width: "350px" }}
        id='outlined-basic'
        label='Search by name or date YYYY-MM-DD'
        variant='outlined'
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}></TextField>
      <Row xs={2} md={3} lg={4} className="g-3">
        {eventsList.data
          .filter((event) => (
            event.name.fi.toLowerCase().includes(searchInput.toLowerCase()) ||
            event.start_time.toLowerCase().includes(searchInput.toLowerCase()))
          )
          .map((event) => (
            <Col key={event.id} className="mt-5">
              <Card className="h-100" style={{ backgroundColor: "#dacfe3" }}>
                <FavoriteIcon
                  sx={{ color: "black", m: 0.9, height: "30px", width: "30px", cursor: "pointer", hover: "red", "&:hover": { color: "#de517e" } }}
                  onClick={() => dispatch(addFavorite(event))}
                />
                <Link to={`/events/${event.id}`}
                  state={{ event: event }}>
                  <Card.Img
                    variant="top"
                    className="rounded h-10"
                    src={event.images[0]?.url}
                    style={{
                      objectFit: "cover",
                      minHeight: "200px",
                      maxHeight: "200px"
                    }}
                  />
                </Link>
                <Card.Body className="d-flex flex-column">
                  <Card.Title style={{ textAlign: "center" }}>{event.name.fi}</Card.Title>
                  <ListGroup
                    variant="flush">
                    <ListGroup.Item style={{ textAlign: "center", backgroundColor: "#dacfe3" }}>
                      <i className="bi bi-translate me-2"></i>
                      {format(parseISO(event.start_time), 'dd MMMM yyyy, EEEE, HH:mm')}
                    </ListGroup.Item>
                    {Array.isArray(location) && location.map((location) => {
                      < ListGroup.Item key={location.id} style={{ textAlign: "center" }}>
                        <i className="bi bi-cash-coin me-2"></i>
                        {location.name.fi}
                      </ListGroup.Item>
                    })}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </Container >
  );
};

export default Events;
