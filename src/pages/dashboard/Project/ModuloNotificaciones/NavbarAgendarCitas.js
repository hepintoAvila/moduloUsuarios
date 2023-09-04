
//import { useContext } from "react";
import { Button, Col, Row } from "react-bootstrap";
const NavbarAgendarCitas = (props) => {
      return (
        <Row>
            <div className={`navbar-custom`}>
                <Row>
                    <Col xl={4}><div className="mb-3 mb-0 text-center"></div></Col>
                    <Col xl={4}><div className="mb-3 mb-0 text-center btnhistorial">
                    </div></Col>
                    <Col xl={4}><div className="mb-0 mb-0 text-center btnregresar"><Button variant="primary" type="submit" onClick={() => props.handleClick('ModuloNotificaciones/ConsultaNotificaciones',props.nivel)}>{'Regresar'} </Button> </div></Col>
                </Row>
            </div>
        </Row>
    );
};
export default NavbarAgendarCitas;