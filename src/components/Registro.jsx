import { API_BASE_URL } from "../apiConfig";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import usuario1 from "../static/usuario1.png";
import usuario2 from "../static/usuario2.png";
import usuario3 from "../static/usuario3.png";

const initialForm = {
  nombre: "",
  apellidos: "",
  correo: "",
  twitter: "",
  ocupacion: "",
  tipo_imagen: "1",
  terminos: false,
};

function Registro({ onRegistrado }) {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    setError("");
  };

  const validarCampos = () => {
    const errores = {};
    if (!form.nombre.trim()) errores.nombre = "El nombre es obligatorio";
    if (!form.apellidos.trim()) errores.apellidos = "Los apellidos son obligatorios";
    if (!form.correo.trim()) {
      errores.correo = "El correo es obligatorio";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo)) {
      errores.correo = "Ingresa un correo electrónico válido";
    }
    if (!form.twitter.trim()) errores.twitter = "El usuario de Twitter es obligatorio";
    if (!form.ocupacion.trim()) errores.ocupacion = "La ocupación es obligatoria";
    if (!["1", "2", "3"].includes(form.tipo_imagen)) {
      errores.tipo_imagen = "Selecciona un avatar";
    }
    if (!form.terminos) {
      errores.terminos = "Debes aceptar los términos y condiciones";
    }
    return errores;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const errores = validarCampos();
    if (Object.keys(errores).length > 0) {
      setFieldErrors(errores);
      setError("Corrige los campos marcados en rojo.");
      return;
    }

    const payload = {
      nombre: form.nombre.trim(),
      apellidos: form.apellidos.trim(),
      correo: form.correo.trim(),
      twitter: form.twitter.trim(),
      ocupacion: form.ocupacion.trim(),
      tipo_imagen: form.tipo_imagen,
    };

    try {
const res = await fetch(`${API_BASE_URL}/api/registro/`, {        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        let backendMsg = "No se pudo registrar el participante";
        if (data) {
          if (data.correo) {
            backendMsg =
              "Ya existe un participante registrado con ese correo electrónico.";
          } else if (data.non_field_errors) {
            backendMsg = data.non_field_errors.join(" ");
          } else {
            const firstKey = Object.keys(data)[0];
            if (firstKey && Array.isArray(data[firstKey])) {
              backendMsg = data[firstKey].join(" ");
            }
          }
        }
        setError(backendMsg);
        return;
      }

      onRegistrado(data);
      navigate("/participantes");
    } catch {
      setError("Ocurrió un error de conexión. Intenta de nuevo más tarde.");
    }
  };

  const handleCancel = () => {
    navigate("/participantes");
  };

  return (
    <div className="registro-page">
      <Container className="registro-container">
        <Row className="justify-content-center">
          <Col lg={8} xl={7}>
            <Card className="registro-card">
              <Card.Body>
                <div className="registro-header">
                  <div className="registro-logo-circle" />
                  <div>
                    <h2 className="registro-title">Registro de participante</h2>
                    <p className="registro-subtitle">
                      Ingresa tus datos para generar tu gafete del congreso.
                    </p>
                  </div>
                </div>

                <Form onSubmit={handleSubmit} className="mt-3" noValidate>
                  <Row className="gy-3">
                    <Col md={6}>
                      <Form.Group controlId="nombre">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                          type="text"
                          name="nombre"
                          value={form.nombre}
                          onChange={handleChange}
                          placeholder="Ingresa tu nombre"
                          isInvalid={!!fieldErrors.nombre}
                        />
                        <Form.Control.Feedback type="invalid">
                          {fieldErrors.nombre}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="apellidos">
                        <Form.Label>Apellidos</Form.Label>
                        <Form.Control
                          type="text"
                          name="apellidos"
                          value={form.apellidos}
                          onChange={handleChange}
                          placeholder="Ingresa tus apellidos"
                          isInvalid={!!fieldErrors.apellidos}
                        />
                        <Form.Control.Feedback type="invalid">
                          {fieldErrors.apellidos}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="correo">
                        <Form.Label>Correo electrónico</Form.Label>
                        <Form.Control
                          type="email"
                          name="correo"
                          value={form.correo}
                          onChange={handleChange}
                          placeholder="ejemplo@correo.com"
                          isInvalid={!!fieldErrors.correo}
                        />
                        <Form.Control.Feedback type="invalid">
                          {fieldErrors.correo}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="twitter">
                        <Form.Label>Usuario de Twitter</Form.Label>
                        <Form.Control
                          type="text"
                          name="twitter"
                          value={form.twitter}
                          onChange={handleChange}
                          placeholder="@usuario"
                          isInvalid={!!fieldErrors.twitter}
                        />
                        <Form.Control.Feedback type="invalid">
                          {fieldErrors.twitter}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="ocupacion">
                        <Form.Label>Ocupación</Form.Label>
                        <Form.Control
                          type="text"
                          name="ocupacion"
                          value={form.ocupacion}
                          onChange={handleChange}
                          placeholder="Estudiante, ponente, etc."
                          isInvalid={!!fieldErrors.ocupacion}
                        />
                        <Form.Control.Feedback type="invalid">
                          {fieldErrors.ocupacion}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={12} className="mt-2">
                      <Form.Label>Selecciona tu avatar</Form.Label>
                      <div className="registro-avatars">
                        <label
                          className={`registro-avatar ${
                            form.tipo_imagen === "1"
                              ? "registro-avatar-active"
                              : ""
                          }`}
                        >
                          <input
                            type="radio"
                            name="tipo_imagen"
                            value="1"
                            checked={form.tipo_imagen === "1"}
                            onChange={handleChange}
                          />
                          <img src={usuario1} alt="Avatar 1" />
                          <span>Avatar 1</span>
                        </label>
                        <label
                          className={`registro-avatar ${
                            form.tipo_imagen === "2"
                              ? "registro-avatar-active"
                              : ""
                          }`}
                        >
                          <input
                            type="radio"
                            name="tipo_imagen"
                            value="2"
                            checked={form.tipo_imagen === "2"}
                            onChange={handleChange}
                          />
                          <img src={usuario2} alt="Avatar 2" />
                          <span>Avatar 2</span>
                        </label>
                        <label
                          className={`registro-avatar ${
                            form.tipo_imagen === "3"
                              ? "registro-avatar-active"
                              : ""
                          }`}
                        >
                          <input
                            type="radio"
                            name="tipo_imagen"
                            value="3"
                            checked={form.tipo_imagen === "3"}
                            onChange={handleChange}
                          />
                          <img src={usuario3} alt="Avatar 3" />
                          <span>Avatar 3</span>
                        </label>
                      </div>
                      {fieldErrors.tipo_imagen && (
                        <div className="text-danger small mt-1">
                          {fieldErrors.tipo_imagen}
                        </div>
                      )}
                    </Col>
                    <Col md={12}>
                      <Form.Check
                        type="checkbox"
                        id="terminos"
                        name="terminos"
                        checked={form.terminos}
                        onChange={handleChange}
                        label="He leído y acepto los términos y condiciones del congreso."
                        isInvalid={!!fieldErrors.terminos}
                      />
                      {fieldErrors.terminos && (
                        <div className="text-danger small mt-1">
                          {fieldErrors.terminos}
                        </div>
                      )}
                    </Col>
                  </Row>

                  {error && (
                    <div className="mt-3 text-danger small">{error}</div>
                  )}

                  <div className="registro-actions mt-4">
                    <Button
                      variant="outline-secondary"
                      type="button"
                      onClick={handleCancel}
                    >
                      Cancelar
                    </Button>
                    <Button className="registro-next-btn" type="submit">
                      Guardar registro
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Registro;
