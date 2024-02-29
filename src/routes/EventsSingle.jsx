import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { format, parseISO } from "date-fns";
import { Button, Col, Container, Image, Row, Spinner } from "react-bootstrap";

const EventsSingle = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const event = location.state.event;

  const [loading, setLoading] = useState(false);

  console.log(event);

  if (loading) {
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
    <Container style={{ marginTop: '5rem' }}>
      <Row className="m-4">
        <Col>
          {" "}
          <Image
            thumbnail
            src={event.images[0].url}
            style={{ maxHeight: "400px" }}
          />
        </Col>
        <Col>
          <h2 className="display-6">{event.name.fi}</h2>
          <p>{format(parseISO(event.start_time), 'dd MMMM yyyy, EEEE, HH:mm')}</p>
          <p>{event.short_description.fi}</p>
          {/* <h3>Description {event.description}</h3> */}
        </Col>
      </Row>
      <Row>
        <Col>
          <Button variant="light" onClick={() => navigate("/events")}>
            Back to Events
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default EventsSingle;
