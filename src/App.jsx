import { API_BASE_URL } from "./apiConfig";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import Inicio from "./components/Inicio.jsx";
import ListParticipante from "./components/ListParticipante.jsx";
import Registro from "./components/Registro.jsx";
import Gafete from "./components/Gafete.jsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "./main.css";

function App() {
  const [participantes, setParticipantes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchParticipantes = async () => {
      try {
      const res = await fetch(`${API_BASE_URL}/api/listado/`);
        const data = await res.json();
        setParticipantes(data);
      } catch (err) {
        console.error("Error cargando participantes", err);
      } finally {
        setLoading(false);
      }
    };

    fetchParticipantes();
  }, []);

  const agregarParticipante = (nuevo) => {
    setParticipantes((prev) => [...prev, nuevo]);
  };

  if (loading) return <p className="text-center mt-5">Cargando participantes...</p>;

  return (
    <BrowserRouter>
      <Navbar bg="light" expand={false} className="shadow-sm mb-0">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img
              src="data:image/png;base64,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"
              alt="Logo Congreso"
              height="60"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbar-nav" />

          <Navbar.Collapse id="navbar-nav" className="justify-content-end">
            <Nav className="flex-column text-end">
              <Nav.Link as={Link} to="/">
                Inicio
              </Nav.Link>
              <Nav.Link as={Link} to="/participantes">
                Listado de participantes
              </Nav.Link>
              <Nav.Link as={Link} to="/registro">
                Registro
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route
            path="/participantes"
            element={<ListParticipante participantes={participantes} />}
          />
          <Route
            path="/registro"
            element={<Registro onRegistrado={agregarParticipante} />}
          />
          <Route
            path="/gafete/:id"
            element={<Gafete participantes={participantes} />}
          />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
