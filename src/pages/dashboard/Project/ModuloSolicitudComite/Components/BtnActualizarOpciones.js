// @flow
import { Popover, OverlayTrigger } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { DatosSolicitudContext } from '../../../../../layouts/context/DatosComiteContext';
import { useContext } from 'react';
const BtnActualizarOpciones = (props) => {
  const { updateSolicitud} = useContext(DatosSolicitudContext);
  const popover = (
    <Popover id={`2_${props?.titulo}_3`}>
      <Popover.Header as="h3">{props?.titulo}</Popover.Header>
      <Popover.Body>{props?.descripcion}</Popover.Body>
    </Popover>
  );

  return (
        <OverlayTrigger trigger={['hover', 'focus']} placement="left" overlay={popover} key={`${props?.titulo}`}>
          {
            props?.permisos === 'N' ? (
              <Link  key={`${props?.titulo}`}to={'#'} className="action-icon " onClick={() => updateSolicitud(props?.titulo,props?.value,props?.idSolicitud)}>
                <i className={`${props?.icon}`}></i>
              </Link>) : ''
          }
        </OverlayTrigger>
  );
};

export default BtnActualizarOpciones;
