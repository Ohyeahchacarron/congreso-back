import { useParams, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import usuario1 from "../static/usuario1.png";
import usuario2 from "../static/usuario2.png";
import usuario3 from "../static/usuario3.png";

const avatarMap = {
  "1": usuario1,
  "2": usuario2,
  "3": usuario3,
};

function Gafete({ participantes }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const participante = participantes.find((p) => String(p.id) === id);

  const pageBackground = {
    background:
      "linear-gradient(160deg, rgba(39,144,255,0.45) 0%, rgba(37,168,70,0.45) 45%, rgba(224,242,233,0.45) 100%)",
  };

  if (!participante) {
    return (
      <div className="gafete-page" style={pageBackground}>
        <div className="gafete-inner text-center">
          <p className="mb-3 fs-5">Participante no encontrado</p>
          <Button
            variant="outline-secondary"
            onClick={() => navigate("/participantes")}
          >
            Volver al listado
          </Button>
        </div>
      </div>
    );
  }

  const avatarSrc = avatarMap[participante.tipo_imagen] || usuario1;

  return (
    <div className="gafete-page" style={pageBackground}>
      <div className="gafete-inner">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1
            className="gafete-title mb-0 fw-bold"
            style={{ fontSize: "2.8rem" }}
          >
            Gafete del participante
          </h1>
          <Button
            variant="outline-light"
            size="sm"
            onClick={() => navigate("/participantes")}
          >
            Volver al listado
          </Button>
        </div>

        <div className="gafete-wrapper gafete-wrapper-large">
          <div className="gafete-card gafete-card-front">
            <div className="gafete-card-top">
              <div className="gafete-avatar-wrapper">
                <img src={avatarSrc} alt="Avatar" />
              </div>
            </div>
            <div className="gafete-card-body text-center">
              <h2 className="gafete-name fw-semibold">
                {participante.nombre} {participante.apellidos}
              </h2>
              <p className="gafete-role">{participante.ocupacion}</p>
              <p className="gafete-email text-muted mb-0">
                {participante.correo}
              </p>
            </div>
          </div>

          <div className="gafete-card gafete-card-back">
            <div className="gafete-card-top-back" />
            <div className="gafete-card-body-back">
              <div>
                <div className="gafete-field mb-2">
                  <span className="gafete-field-label fw-bold">Twitter</span>
                  <span className="gafete-field-value">
                    @{participante.twitter}
                  </span>
                </div>
                <div className="gafete-field mb-2">
                  <span className="gafete-field-label fw-bold">Ocupación</span>
                  <span className="gafete-field-value">
                    {participante.ocupacion}
                  </span>
                </div>
              </div>

              <div className="gafete-qr-area mt-3">
                <img
                  className="gafete-qr-img"
                  src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=Congreso%20React"
                  alt="QR del participante"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Gafete;
