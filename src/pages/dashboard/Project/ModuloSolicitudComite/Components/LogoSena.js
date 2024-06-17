/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-duplicate-case */
/* eslint-disable no-unreachable */
import React from 'react';
import { Row, Col,Card } from 'react-bootstrap';
import logo_comite from '../../../../../assets/images/logo_comite.png';
const LogoSena = (props) => {

  return (
    <React.Fragment>
      <Row  className="row-btns-nivelI">
      <Card>
          <Card.Body>
          <Row>
          <div className="grid_contenedor_logo">
            <Col lg={12}>
            <div className="logo_contenedor"><img src={`${logo_comite}`} height="150"/></div>
            </Col>
            </div>
          </Row>
          </Card.Body>
        </Card>
        </Row>
    </React.Fragment>
  );
};
LogoSena.defaultProps = {
  itemsmenu: '/dashboard/LogoSena/',
};
export default LogoSena;
