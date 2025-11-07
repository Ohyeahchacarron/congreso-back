import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";

function Inicio() {
  const navigate = useNavigate();

  const irRegistro = () => navigate("/registro");

  return (
    <div className="inicio-hero">
      <Container>
        <Row className="align-items-center">
          <Col md={7}>
            <div className="inicio-badge mb-3">
              Congreso de Tecnologías de la Información
            </div>

            <h1 className="inicio-title mb-3">
              Congreso React UTL
            </h1>

            <p className="inicio-subtitle mb-4">
              Regístrate, personaliza tu gafete y consulta a todos los participantes
              del congreso en un solo lugar.
            </p>

            <div className="d-flex flex-wrap gap-3 align-items-center">
              <Button
                className="inicio-cta-btn"
                size="lg"
                onClick={irRegistro}
              >
                Registrarme ahora
              </Button>
            </div>

            <p className="inicio-note mt-3">
              No necesitas nada más que tus datos básicos. <br />
              Toma menos de 1 minuto completar tu registro.
            </p>
          </Col>

          <Col md={5} className="mt-4 mt-md-0">
            <div className="inicio-card">
              <div className="inicio-card-circle inicio-card-circle-1" />
              <div className="inicio-card-circle inicio-card-circle-2" />
              <div className="inicio-card-content">
                <h2>Congreso 2024</h2>
                <p>Universidad Tecnológica de León</p>
                <ul>
                  <li>Gafete digital personalizado</li>
                  <li>Control de participantes en tiempo real</li>
                  <li>Interfaz inspirada en Spotify</li>
                </ul>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Inicio;
