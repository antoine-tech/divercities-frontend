import React, { useState, useContext } from "react";
import { Container, Card, Row, Button, Modal } from "react-bootstrap";
import Thermometer from "react-thermometer-chart";
import QuadrantGrey from "../../../components/icons/Quadrant/Quadrant";
import SliderInput from "../../../components/SliderInput/index";
import { getForecast } from "../../../API_CLIENT";
import { intervalToDuration } from "date-fns";
import currentInformationsContext from '../../../context/index';

const Forecast = () => {
  const { setCurrentInformations } = useContext(currentInformationsContext);
  setCurrentInformations("/ports/forecast")
  const [forecast, setForecast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setForecast(null);
  };
  const generateMarks = (max) => {
    let marks = {};
    let generated_marks = Array.from(Array(max).keys());
    generated_marks.map((e) => (marks[e] = e));
    return marks;
  };
  const [inputs, setInputs] = useState({
    temperature: 20,
    wind_speed: 20,
    visibility: 20,
    snow_height: 20,
    pressure: 20,
  });

  const handleForecast = async ({
    temperature,
    wind_speed,
    visibility,
    snow_height,
    pressure,
  }) => {
    setIsLoading(true);
    const prediction = await getForecast(
      temperature,
      wind_speed,
      visibility,
      pressure,
      snow_height
    );
    const formatted_prediction = intervalToDuration({
      start: 0,
      end: prediction.forecast * 1000,
    });
    setForecast(formatted_prediction);
    setIsLoading(false);
    setShow(true);
  };
  return (
    <>
      <Container
        fluid
        className="bg-light d-flex flex-column justify-content-around align-items-center flex-wrap"
        style={{ minHeight: "95vh", marginTop: "3rem" }}
      >
        <h2 className="text-center my-4">
          Prédire le temps de retard par les conditions météorologiques
        </h2>
        <Row
          className="d-flex align-items-center justify-content-center flex-wrap"
          style={forecast && { opacity: 0.2 }}
        >
          <Card
            style={{
              width: "20rem",
              height: "30rem",
            }}
            className="m-2 shadow"
          >
            <Card.Header>
              <p className="text-center">Vitesse du vent m/s</p>
            </Card.Header>
            <Card.Body className="p-4 d-flex align-items-center justify-content-center">
              <QuadrantGrey label={inputs.wind_speed + " m/s"} />
            </Card.Body>
            <Card.Footer
              style={{ height: "5rem" }}
              className="d-flex align-items-center"
            >
              <SliderInput
                marks={generateMarks(300)}
                min={0}
                max={300}
                defaultValue={10}
                onChange={(value) =>
                  setInputs({ ...inputs, wind_speed: value })
                }
              />
            </Card.Footer>
          </Card>

          <Card
            style={{
              width: "20rem",
              height: "30rem",
            }}
            className="m-2 shadow"
          >
            <Card.Header>
              <p className=" text-center">Pression</p>
            </Card.Header>

            <Card.Body className="p-4 d-flex align-items-center justify-content-center">
              <QuadrantGrey label={inputs.pressure + " Bar"} />
            </Card.Body>
            <Card.Footer
              style={{ height: "5rem" }}
              className="d-flex align-items-center"
            >
              <SliderInput
                marks={generateMarks(200)}
                defaultValue={20}
                min={0}
                max={200}
                onChange={(value) => setInputs({ ...inputs, pressure: value })}
              />
            </Card.Footer>
          </Card>

          <Card
            style={{
              width: "20rem",
              height: "30rem",
            }}
            className="m-2 shadow"
          >
            <Card.Header>
              <p className=" text-center">Visibilité horizontale</p>
            </Card.Header>

            <Card.Body className="p-4 d-flex align-items-center justify-content-center">
              <QuadrantGrey label={inputs.visibility + " m"} />
            </Card.Body>
            <Card.Footer
              style={{ height: "5rem" }}
              className="d-flex align-items-center"
            >
              <SliderInput
                marks={generateMarks(500)}
                defaultValue={250}
                min={0}
                max={500}
                onChange={(value) =>
                  setInputs({ ...inputs, visibility: value })
                }
              />
            </Card.Footer>
          </Card>

          <Card
            style={{
              width: "20rem",
              height: "30rem",
            }}
            className="m-2 shadow"
          >
            <Card.Header>
              <p className=" text-center">hauteur de neige</p>
            </Card.Header>

            <Card.Body className="p-4 d-flex align-items-center justify-content-center">
              <QuadrantGrey label={inputs.snow_height + " mm"} />
            </Card.Body>
            <Card.Footer
              style={{ height: "5rem" }}
              className="d-flex align-items-center"
            >
              <SliderInput
                marks={generateMarks(400)}
                min={0}
                max={400}
                defaultValue={100}
                onChange={(value) =>
                  setInputs({ ...inputs, snow_height: value })
                }
              />
            </Card.Footer>
          </Card>
          <Card
            style={{
              width: "20rem",
              height: "30rem",
            }}
            className="m-2 shadow"
          >
            <Card.Header>
              <p className=" text-center">Température</p>
            </Card.Header>

            <Card.Body className="p-4 d-flex flex-column align-items-center justify-content-center">
              <Thermometer
                width="100%"
                height="12rem"
                steps={1}
                minValue={0}
                maxValue={100}
                currentValue={inputs.temperature}
              />
              <p className="my-2 font-weight-bold">{inputs.temperature} °C</p>
            </Card.Body>
            <Card.Footer
              style={{ height: "5rem" }}
              className="d-flex align-items-center"
            >
              <SliderInput
                min={0}
                max={100}
                marks={generateMarks(100)}
                defaultValue={20}
                onChange={(value) =>
                  setInputs({ ...inputs, temperature: value })
                }
              />
            </Card.Footer>
          </Card>
        </Row>

        <Button
          className="rounded-pill my-4 col-12 col-md-6 col-xl-3"
          variant="success"
          size="lg"
          onClick={() => handleForecast(inputs)}
        >
          {isLoading ? "CALCUL EN COURS ..." : "PREDIRE LE TEMPS DE RETARD"}
        </Button>
      </Container>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Temps de retard estimé à :</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="font-weight-bold">
            {forecast?.hours} heures {forecast?.minutes} minutes {forecast?.seconds} secondes
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            FERMER
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Forecast;
