/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
// @flow
import React, { useContext, useEffect, useState } from 'react';
import avatar1 from '../../../../assets/images/8.png';
import avatar2 from '../../../../assets/images/16.png';
import avatar3 from '../../../../assets/images/12.png';
import avatar4 from '../../../../assets/images/9.png';
import MenuBtn from '../../components/BtnMenu/MenuBtn';
import logo_comite from '../../../../assets/images/logo_comite.png';
import { Col, Row,Card } from 'react-bootstrap';
import encodeBasicUrl from '../../../../utils/encodeBasicUrl';
import { NotificacionesContext } from '../../../../layouts/context/NotificacionesProvider';

const BtnNivelI = (props) => {
  const {itemsSinEnviar,query} = useContext(NotificacionesContext)
  const [countNovedades, setSinAgendar] = useState(0);
  useEffect(() => {
    let userInfo = sessionStorage.getItem('hyper_user');
    try {
        const user = JSON.parse(userInfo);
        if (user && user.length > 0 && user[0].role) {
            query('ModuloSolicitudComite', 'EnviarSolicitud', [{
                opcion: encodeBasicUrl('ConsultarSolicitud'),
                obj: 'ConsultarSolicitudSinEnviar',
                sw: '5',
                rol: encodeBasicUrl(user[0].role)
            }]);
        }
    } catch (error) {
        console.error('Failed to parse user info:', error);
    }

}, [query]);

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

      <Row  className="row-btns-nivelI justify-content-center">
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
                <MenuBtn texto='Módulo Aprendiz' image={avatar1} countNovedades={'0'} handleClick={props.handleClick} menuRef={'ModuloAprendiz/Aprendiz'} nivel={1} novedades={false}/>
              </div>
              <br/>
              <div className="grid_btn4 col-xl-3 col-lg-4 col-sm-6 ">
                <MenuBtn texto='Módulo Actas' image={avatar4} countNovedades={'0'} handleClick={props.handleClick} menuRef={'ModuloActas/Actas'} nivel={1} novedades={false}/>
              </div>
            </div>
            </div>
            </div>
          </Col>
        </Row>
        </Card.Body>
        </Card>

        </Row>

      </> );
}
      export default BtnNivelI;
