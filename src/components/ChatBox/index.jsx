import React, { useContext, useState } from "react";
import { Col } from "react-bootstrap";
import { InfoCircle, X } from "react-bootstrap-icons";
import currentInformationsContext from "../../context/index";

const ChatBox = () => {
  const [isToogled, setToogled] = useState(false);

  const { informations, currentInformations } = useContext(
    currentInformationsContext
  );

  return (
    <>
      <InfoCircle
        onClick={() => setToogled(!isToogled)}
        style={{
          right: "2rem",
          bottom: "2rem",
          position: "fixed",
          zIndex: 100000,
          color: "#282828",
          height: "4rem",
          width: "4rem",
          cursor: "pointer",
        }}
      />

      {isToogled && (
        <Col
          xs={10}
          md={6}
          lg={3}
          className="d-flex flex-column align-items-center justify-content-center rounded shadow bg-white p-4"
          style={{
            height: "75vh",
            right: "2rem",
            bottom: "2rem",
            position: "absolute",
            zIndex: 100000
          }}
        >
          <X
            onClick={() => setToogled(!isToogled)}
            style={{
              height: "2rem",
              position: "absolute",
              top: ".5rem",
              left: ".5rem",
              cursor: "pointer",
              width: "2rem",
            }}
          />
           <InfoCircle
              className="my-4"
              style={{
                right: "2rem",
                bottom: "2rem",
                color: "#282828",
                height: "4rem",
                width: "4rem",
                cursor: "pointer",
              }}
            />
          <div className="d-block overflow-auto">
            <p className="my-auto" style={{ fontSize: "1.5rem" }}>
              {informations[currentInformations]}
            </p>
          </div>
        </Col>
      )}
    </>
  );
};

export default ChatBox;
