/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-duplicate-case */
/* eslint-disable no-unreachable */
import React from 'react';
import { Row, Col,Card } from 'react-bootstrap';

import avatar1 from '../../../../../assets/images/17.png';
import avatar2 from '../../../../../assets/images/5.png';
import avatar3 from '../../../../../assets/images/9.png';
import MenuBtn from '../../../components/BtnMenu/MenuBtn';
import logo_comite from '../../../../../assets/images/logo_comite.png';
const MenuSegundo = (props) => {

  return (
    <React.Fragment>

      <Row  className="row-btns-nivelI">
      <Card>
          <Card.Body>
          <Row>
          <div className="grid_contenedor ">
            <Col lg={12}>
            <div className="grid_btn1 col-xl-3 col-lg-4 col-sm-6"></div>
              <div className="grid_btn2 col-xl-3 col-lg-4 col-sm-6 logo_comite_inicio">
                  <div className="logo_comite_inicio"><img src={`${logo_comite}`} height="150"/></div>
              </div>
            <div className="grid_btn3 col-xl-3 col-lg-4 col-sm-6"></div>
            </Col>
            </div>
          </Row>
        <Row className="justify-content-center">
          <br/>
        <Col lg={12}>
        <div className="grid_contenedor">
        <div className="grid_btn1 col-xl-3 col-lg-4 col-sm-6 row-btns-nivelI">

            <div className="grid_contenedor">
              <div className="grid_btn1 col-xl-3 col-lg-4 col-sm-6">
                 <MenuBtn texto='Enviar Solicitud' image={avatar3} handleClick={props.handleClick} menuRef={'ModuloSolicitudComite/EnviarSolicitud'} nivel={2}/>
                 </div>
              <div className="grid_btn2 col-xl-3 col-lg-4 col-sm-6" >
                 <MenuBtn texto='Consulta de incidente' image={avatar2} handleClick={props.handleClick} menuRef={'ModuloSolicitudComite/ConsultaIncidente'} nivel={2}/>
				</div>
              <div className="grid_btn2 col-xl-3 col-lg-4 col-sm-6">
                <MenuBtn texto='Reportes' image={avatar1} handleClick={props.handleClick} menuRef={'ModuloReportes/ReportesComite'} nivel={2}/>
              </div>
              <br/>

            </div>
            </div>
            </div>
          </Col>
        </Row>
        </Card.Body>
        </Card>
        </Row>
    </React.Fragment>
  );
};
MenuSegundo.defaultProps = {
  itemsmenu: '/dashboard/ModuloSolicitudComite/',
};
export default MenuSegundo;
