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
              Congreso UTL
            </h1>

            <p className="inicio-subtitle mb-4">
              Te invitamos a ser parte del Congreso de Tecnologías de la Información 2026 en la Universidad Tecnológica de León.
              Regístrate ahora y asegura tu lugar en este evento único.
            </p>

            <div className="d-flex flex-wrap gap-3 align-items-center">
              <Button
                className="inicio-cta-btn"
                size="lg"
                onClick={irRegistro}
              >
                Registro
              </Button>
            </div>

          </Col>

          <Col md={5} className="mt-4 mt-md-0">
            <div className="inicio-card">
              <div className="inicio-card-circle inicio-card-circle-1" />
              <div className="inicio-card-circle inicio-card-circle-2" />
              <div className="inicio-card-content">
                <h2>Congreso Diciembre 2026</h2>
                <p>Universidad Tecnológica de León</p>
                <ul>
                  <p>Universidad Tecnológica de León, Campus 1</p>
                  <p>Blvd. Universidad Tecnológica 225, Universidad Tecnologica</p>
                  <p> San Carlos la Roncha, 37670 León de los Aldama, Gto.</p>
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
