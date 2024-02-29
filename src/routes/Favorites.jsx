import { useEffect } from "react";

import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";
import { initializeEvents } from "../store/eventsSlice";
import { Button } from "react-bootstrap";
import { clearFavorites, removeOneFavorite } from "../store/favoriteSlice";

const Favorites = () => {
    const dispatch = useDispatch();

    const favorites = useSelector((state) => state.favorites.favorites);

    useEffect(() => {
        dispatch(initializeEvents());
    }, [dispatch]);

    return (
        <Container fluid>
            <Button style={{ marginTop: "4rem" }} onClick={() => dispatch(clearFavorites(favorites))} variant="dark">Remove all</Button>
            <Row xs={2} md={3} lg={4} className=" g-3">
                {favorites.map((event) => (
                    <Col key={event.name.official} className="mt-5">
                        <Card style={{ marginTop: "3rem" }} className="h-100">
                            <Card.Img
                                variant="top"
                                className="rounded h-50"
                                src={event.flags.svg}
                                style={{
                                    objectFit: "cover",
                                    minHeight: "200px",
                                    maxHeight: "200px"
                                }}
                            />
                            <Card.Body className="d-flex flex-column">
                                <Card.Title>{event.name.common}</Card.Title>
                                <Card.Subtitle className="mb-5 text-muted">
                                    {event.name.official}
                                </Card.Subtitle>
                                <ListGroup
                                    variant="flush"
                                    className="flex-grow-1 justify-content-end"
                                >
                                    <ListGroup.Item>
                                        <i className="bi bi-translate me-2"></i>
                                        {Object.values(event.languages ?? {}).join(", ")}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <i className="bi bi-cash-coin me-2"></i>
                                        {Object.values(event.currencies || {})
                                            .map((currency) => currency.name)
                                            .join(", ")}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        {event.population.toLocaleString()}
                                    </ListGroup.Item>
                                </ListGroup>
                                <Button style={{ marginTop: "1rem" }} onClick={() => dispatch(removeOneFavorite(event))} variant="dark">Remove</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container >
    );
};

export default Favorites;