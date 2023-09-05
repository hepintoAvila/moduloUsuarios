/* eslint-disable no-duplicate-case */
/* eslint-disable no-unreachable */
import React from 'react';
import { Row, Col } from 'react-bootstrap';
 
import avatar1 from '../../../../../assets/images/4.png';
import avatar2 from '../../../../../assets/images/5.png';
import avatar3 from '../../../../../assets/images/9.png';
import MenuBtn from '../../../components/BtnMenu/MenuBtn';
const MenuSegundo = (props) => {
 
  return (
    <React.Fragment>
           <Row className="justify-content-center">
        <Col lg={7} md={10} sm={11}>
        <div class="grid_contenedor">
                  <div class="grid_btn1 col-xl-3 col-lg-4 col-sm-6">
                    <MenuBtn texto='Enviar Solicitud' image={avatar3} handleClick={props.handleClick} menuRef={'ModuloIncidentes/EnviarSolicitud'} nivel={2}/>
                  </div>
                  <div class="grid_btn2 col-xl-3 col-lg-4 col-sm-6" >
                    <MenuBtn texto='Consulta de incidente' image={avatar2} handleClick={props.handleClick} menuRef={'ModuloIncidentes/ConsultaIncidente'} nivel={2}/>

                  </div>
                  <div class="grid_btn3 col-xl-3 col-lg-4 col-sm-6">
                    <MenuBtn texto='Reportes' image={avatar1} handleClick={props.handleClick} menuRef={'ModuloIncidentes/ReporteIncidente'} nivel={2}/>
                  </div>
                </div> 
        </Col>
      </Row>
    </React.Fragment>
  );
};
MenuSegundo.defaultProps = {
  itemsmenu: '/dashboard/ModuloIncidentes/',
};
export default MenuSegundo;
