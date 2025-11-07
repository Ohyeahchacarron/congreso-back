import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import usuario1 from "../static/usuario1.png";
import usuario2 from "../static/usuario2.png";
import usuario3 from "../static/usuario3.png";

const avatarMap = {
  "1": usuario1,
  "2": usuario2,
  "3": usuario3,
};

function Participante({ participante }) {
  const navigate = useNavigate();
  const avatarSrc = avatarMap[participante.tipo_imagen] || usuario1;

  const verGafete = () => {
    navigate(`/gafete/${participante.id}`);
  };

  return (
    <div className="asistente-card">
      <div className="asistente-card-header">
        <img src={avatarSrc} alt="Avatar participante" />
      </div>
      <div className="asistente-card-body">
        <h5 className="asistente-card-name">
          {participante.nombre} {participante.apellidos}
        </h5>
        <p className="asistente-card-ocupacion">{participante.ocupacion}</p>
        <p className="asistente-card-correo">{participante.correo}</p>
        <p className="asistente-card-twitter">@{participante.twitter}</p>
        <Button
          size="sm"
          className="asistente-card-btn"
          onClick={verGafete}
        >
          Ver gafete
        </Button>
      </div>
    </div>
  );
}

export default Participante;
