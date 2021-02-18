import React, { useState, useEffect } from "react";
import { Form, ListGroup, Col } from "react-bootstrap";
import { searchContainerDetails } from "../../../../API_CLIENT";
import { FlyToInterpolator } from "react-map-gl";

const Autocomplete = ({ setViewState, selectedSensor, setSelectedSensor }) => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [isSearchResultsDisplayed, setSearchResultDisplayed] = useState(false)

  const handleFlyTo = (destination) => {
    setViewState({
      ...destination,
      transitionDuration: 1500,
      transitionInterpolator: new FlyToInterpolator(),
    });
  };

  const handleInput = (event) => {
    setSearchInput(event.target.value);
    setSearchResultDisplayed(true)
  };

  const handleSelectSensor = (_id) => {
    setSearchInput(_id);
    setSearchResultDisplayed(false)
    setSelectedSensor(
      searchResults.find(
        (searchResult) => searchResult._id === _id
      )
    );
  };

  const getAndSetSearchResults = async (_id) => {
    const containers_details = await searchContainerDetails(_id);
    setSearchResults(containers_details);
  };

  useEffect(() => {
    selectedSensor?.gps &&
      handleFlyTo({
        zoom: 9,
        pitch: 50,
        latitude: selectedSensor.gps.lat,
        longitude: selectedSensor.gps.lon,
      });
  }, [selectedSensor]);

  useEffect(() => {
    getAndSetSearchResults(searchInput);
  }, [searchInput]);

  return (
    <Col xs={12} lg={6} className="p-4" style={{ position: "absolute", zIndex: 2000000000 }}>
      <Form className="w-100">
        <Form.Group controlId="containerSearchForm">
          <Form.Control
            onInput={handleInput}
            type="text"
            size="lg"
            placeholder="Entrer l'identifiant du capteur recherché, ex: 13e3ea59fae73bdfb1b005a58bae637e"
            className="rounded-pill"
            value={searchInput}
          />
        </Form.Group>

        {isSearchResultsDisplayed && (
          <ListGroup
            style={{ maxHeight: "80vh" }}
            className="d-block overflow-auto"
          >
            {searchResults &&
              searchResults.map((searchResult, index) => (
                <ListGroup.Item
                  onClick={() =>
                    handleSelectSensor(searchResult._id)
                  }
                  style={{ cursor: "pointer" }}
                  key={`sensor-${searchResult._id}-${index}`}
                >
                  {searchResult._id}-{searchResult.sensor_name}
                </ListGroup.Item>
              ))}
          </ListGroup>
        )}
      </Form>
    </Col>
  );
};

export default Autocomplete;
