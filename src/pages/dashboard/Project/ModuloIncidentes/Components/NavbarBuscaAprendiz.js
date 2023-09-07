
import { Button, Col, Row } from "react-bootstrap";
 
const NavbarBuscaAprendiz = (props) => {
    return (
        <Row>
            <div className={`navbar-custom`}>
                <Row>
                    <Col xl={8}><div className="mb-3 mb-0 text-center col-8"></div></Col>
                    <Col xl={4}><div className="mb-0 mb-0 text-center btnregresar col-4"><Button variant="primary" type="submit" onClick={() => props.handleClick('ModuloIncidentes',props.nivel)}>{'Regresar'} </Button> </div></Col>
                </Row>
            </div>
        </Row>
    );
};
export default NavbarBuscaAprendiz;