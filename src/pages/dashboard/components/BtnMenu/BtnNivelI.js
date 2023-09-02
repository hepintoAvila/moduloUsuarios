/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
// @flow
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import avatar1 from '../../../../assets/images/1.png';
import avatar2 from '../../../../assets/images/2.png';
import avatar3 from '../../../../assets/images/3.png';
import MenuBtn from '../../components/BtnMenu/MenuBtn';

const BtnNivelI = (props) => {
  return (
    <>
      <Row className="justify-content-center">
        <Col lg={7} md={10} sm={11}>
        <div class="grid_contenedor">
                  <div class="grid_btn1 col-xl-3 col-lg-4 col-sm-6">
                    <MenuBtn texto='Módulo Incidentes' image={avatar3} handleClick={props.handleClick} menuRef={'ModuloIncidentes'}/>
                  </div>
                  <div class="grid_btn2 col-xl-3 col-lg-4 col-sm-6" >
                    <MenuBtn texto='Consulta Notificaciones' image={avatar2} handleClick={props.handleClick} menuRef={'ModuloNotificaciones/ConsultaNotificaciones'}/>

                  </div>
                  <div class="grid_btn3 col-xl-3 col-lg-4 col-sm-6">
                    <MenuBtn texto='Módulo de Reportes' image={avatar1} handleClick={props.handleClick} menuRef={'ModuloReportes'}/>
                  </div>
                </div> 
        </Col>
      </Row>
  </>
  );
}
export default BtnNivelI;
