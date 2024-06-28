/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-duplicate-case */
/* eslint-disable no-unreachable */
import React from 'react';
import { Row, Col,Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
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
              <Link to={`/dashboard/ModuloSolicitudComite/EnviarSolicitud`} className="btn btn-link p-0 text-secondary shadow-none px-0 py-2">
                 <MenuBtn texto='Enviar Solicitud' image={avatar3}/>
                 </Link>
                 </div>
              <div className="grid_btn2 col-xl-3 col-lg-4 col-sm-6" >
              <Link to={`/dashboard/ModuloSolicitudComite/ConsultaIncidente`} className="btn btn-link p-0 text-secondary shadow-none px-0 py-2">
                 <MenuBtn texto='Consulta de incidente' image={avatar2}/>
                 </Link>
				</div>
              <div className="grid_btn2 col-xl-3 col-lg-4 col-sm-6">
              <Link to={`/dashboard/ModuloReportes/ReportesComite`} className="btn btn-link p-0 text-secondary shadow-none px-0 py-2">
                <MenuBtn texto='Reportes' image={avatar1}/>
                </Link>
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
