// TableAprendiz.js
import React  from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const BtnEnviarEmail = ({titulo,descripcion,name,url,icon,row,enviarEmailAprendiz}) => {


  const popover = (
    <Popover id={`${titulo}`}>
      <Popover.Header as="h3">{titulo}</Popover.Header>
      <Popover.Body>{descripcion}</Popover.Body>
    </Popover>
  );
  return (
        <OverlayTrigger trigger={['hover', 'focus']} placement="left" overlay={popover} key={`t2_${titulo}_t3`}>
          {
              <Link key={`${name}`} to={url} className="action-icon " onClick={() => enviarEmailAprendiz(row)}>
                <i className={`${icon} pt-2`}></i>
              </Link>
          }
        </OverlayTrigger>
  );
};
export default BtnEnviarEmail;
