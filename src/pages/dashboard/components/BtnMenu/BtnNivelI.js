/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
// @flow
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import avatar1 from '../../../../assets/images/8.png';
import avatar2 from '../../../../assets/images/16.png';
import avatar3 from '../../../../assets/images/12.png';
import MenuBtn from '../../components/BtnMenu/MenuBtn';

const BtnNivelI = (props) => {

  return (
    <>
      <Row className="justify-content-center">
        <Col lg={7} md={10} sm={11}>
        <div className="grid_contenedor">
                  <div className="grid_btn1 col-xl-3 col-lg-4 col-sm-6">
                    <MenuBtn texto='Módulo Solicitud Comité' image={avatar3} handleClick={props.handleClick} menuRef={'ModuloSolicitudComite'} nivel={1}/>
                  </div>
                  <div className="grid_btn2 col-xl-3 col-lg-4 col-sm-6" >
                    <MenuBtn texto='Consulta Notificaciones' image={avatar2} handleClick={props.handleClick} menuRef={'ModuloNotificaciones/ConsultaNotificaciones'} nivel={1}/>
                  </div>
                  <div className="grid_btn3 col-xl-3 col-lg-4 col-sm-6">
                    <MenuBtn texto='Módulo Aprendiz' image={avatar1} handleClick={props.handleClick} menuRef={'ModuloSolicitudComite/ConsultarAprendiz'} nivel={1}/>
                  </div>
                </div> 
        </Col>
      </Row>
  </>
  );
}
export default BtnNivelI;
