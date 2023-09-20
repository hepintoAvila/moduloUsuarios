/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
// @flow
import React from 'react';
import avatar1 from '../../../../assets/images/8.png';
import avatar2 from '../../../../assets/images/16.png';
import avatar3 from '../../../../assets/images/12.png';
import MenuBtn from '../../components/BtnMenu/MenuBtn';
import logo_comite from '../../../../assets/images/logo_comite.png';
import { Col, Row } from 'react-bootstrap';

const BtnNivelI = (props) => {

  return (
    <>

          <Row >
          <div className="grid_contenedor ">
            <Col lg={12}>
            <div className="grid_btn1 col-xl-3 col-lg-4 col-sm-6"></div>
            <div className="grid_btn2 col-xl-3 col-lg-4 col-sm-6 logo_comite_inicio">
            <div className="logo_comite_inicio">
              <img src={logo_comite} height="200"/>
              </div>
              </div>
            <div className="grid_btn3 col-xl-3 col-lg-4 col-sm-6"></div>
                
            </Col>
            </div>
          </Row>
           
      
        <Row className="justify-content-center">
        <Col lg={12}>
        <div className="grid_contenedor">
        <div className="grid_btn1 col-xl-3 col-lg-4 col-sm-6">
         
            <div className="grid_contenedor">
              <div className="grid_btn1 col-xl-3 col-lg-4 col-sm-6">
                <MenuBtn texto='Módulo Solicitud Comité' image={avatar3} handleClick={props.handleClick} menuRef={'ModuloSolicitudComite'} nivel={1} />
              </div>
              <div className="grid_btn2 col-xl-3 col-lg-4 col-sm-6" >
                <MenuBtn texto='Consulta Notificaciones' image={avatar2} handleClick={props.handleClick} menuRef={'ModuloNotificaciones/ConsultaNotificaciones'} nivel={2} />
              </div>
              <div className="grid_btn3 col-xl-3 col-lg-4 col-sm-6">
                <MenuBtn texto='Módulo Aprendiz' image={avatar1} handleClick={props.handleClick} menuRef={'ModuloSolicitudComite/ConsultarAprendiz'} nivel={1} />
              </div>
            </div>
            </div>
            </div>
          </Col>
        </Row>
       
      </> );
}
      export default BtnNivelI;
