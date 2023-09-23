/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
// @flow
import React, { useContext, useEffect, useState } from 'react';
import avatar1 from '../../../../assets/images/8.png';
import avatar2 from '../../../../assets/images/16.png';
import avatar3 from '../../../../assets/images/12.png';
import MenuBtn from '../../components/BtnMenu/MenuBtn';
import logo_comite from '../../../../assets/images/logo_comite.png';
import { Col, Row } from 'react-bootstrap';
import encodeBasicUrl from '../../../../utils/encodeBasicUrl';
import { NotificacionesContext } from '../../../../layouts/context/NotificacionesProvider';

const BtnNivelI = (props) => {
  const {itemsSinEnviar,query} = useContext(NotificacionesContext)
  const [countNovedades, setSinAgendar] = useState(0);
  useEffect(() => {
    let userInfo = sessionStorage.getItem('hyper_user');
    const user = JSON.parse(userInfo);
    query('ModuloSolicitudComite', 'EnviarSolicitud', [{ opcion: encodeBasicUrl('ConsultarSolicitud'), obj: 'ConsultarSolicitudSinEnviar',sw:'5',rol: encodeBasicUrl(user[0].role)}]);
 
  }, [query])

 
  useEffect(() => {
    if(itemsSinEnviar?.data?.Solicitudes){
      const items = itemsSinEnviar?.data?.Solicitudes?.filter((row) => {
        return row?.estado==='SIN AGENDA';
        });
          setSinAgendar(items?.length)
    }

    }, [itemsSinEnviar?.data?.Solicitudes])
 
 
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
                <MenuBtn texto='Módulo Solicitud Comité' image={avatar3} countNovedades={'0'} handleClick={props.handleClick} menuRef={'ModuloSolicitudComite'} nivel={1} novedades={false}/>
              </div>
              <div className="grid_btn2 col-xl-3 col-lg-4 col-sm-6" >
                <MenuBtn texto='Consulta Notificaciones' image={avatar2} 
                countNovedades={countNovedades} 
                handleClick={props.handleClick} 
                menuRef={'ModuloNotificaciones/ConsultaNotificaciones'} 
                nivel={2} novedades={true}/>
              </div>
              <div className="grid_btn3 col-xl-3 col-lg-4 col-sm-6">
                <MenuBtn texto='Módulo Aprendiz' image={avatar1} countNovedades={'0'} handleClick={props.handleClick} menuRef={'ModuloSolicitudComite/ConsultarAprendiz'} nivel={1} novedades={false}/>
              </div>
            </div>
            </div>
            </div>
          </Col>
        </Row>
       
      </> );
}
      export default BtnNivelI;
