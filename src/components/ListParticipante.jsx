import { useMemo, useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, InputGroup, Button } from "react-bootstrap";
import Participante from "./Participante.jsx";

function ListParticipante({ participantes }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [busqueda, setBusqueda] = useState(searchParams.get("search") || "");
  const navigate = useNavigate();

  useEffect(() => {
    if (busqueda) {
      setSearchParams({ search: busqueda });
    } else {
      setSearchParams({});
    }
  }, [busqueda, setSearchParams]);

  const filtrados = useMemo(() => {
    const q = busqueda.toLowerCase();
    return participantes.filter((p) =>
      `${p.nombre} ${p.apellidos}`.toLowerCase().includes(q)
    );
  }, [busqueda, participantes]);

  return (
    <div className="asistentes-page">
      <Container>
        <div className="asistentes-header">
          <h2 className="asistentes-title">Listado de participantes</h2>
          <p className="asistentes-subtitle">
            Explora a todas las personas registradas en el congreso.
          </p>

          <Form className="asistentes-search-form">
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Buscar por nombre o apellidos..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="asistentes-search-input"
              />
              <Button
                type="button"
                className="asistentes-register-btn"
                onClick={() => navigate("/registro")}
              >
                Registrar participante
              </Button>
            </InputGroup>
          </Form>
        </div>

        <Row className="g-4 mt-2">
          {filtrados.map((p) => (
            <Col key={p.id} xs={12} sm={6} lg={4}>
              <Participante participante={p} />
            </Col>
          ))}
        </Row>

        {filtrados.length === 0 && (
          <p className="text-center mt-4 text-muted">
            No se encontraron participantes con ese nombre.
          </p>
        )}
      </Container>
    </div>
  );
}

export default ListParticipante;
