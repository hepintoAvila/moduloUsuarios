// @flow
import { Popover, OverlayTrigger } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const BtnActions = (props) => {

  const popover = (
    <Popover id={`2_${props?.titulo}_3`}>
      <Popover.Header as="h3">{props?.titulo}</Popover.Header>
      <Popover.Body>{props?.descripcion}</Popover.Body>
    </Popover>
  );
 
 

  return (
        <OverlayTrigger trigger={['hover', 'focus']} placement="left" overlay={popover} key={`t2_${props?.titulo}_t3`}>
          {
            props?.permisos === 'N' ? (
              <Link key={`l2_${props?.titulo}_l3`}to={props?.url} className="action-icon " onClick={() => props?.toggleActions(props?.row, props?.titulo)}>
                <i className={`${props?.icon} pt-2`}></i>
              </Link>) : ''
          }
        </OverlayTrigger>
  );
};

export default BtnActions;
