/* eslint-disable react-hooks/exhaustive-deps */

import { useContext} from 'react';
import { Popover, OverlayTrigger } from 'react-bootstrap';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';

const BtnSelect = (props) => {
  const { selectedItemsConsolidados, toggleItemConsolidados } = useContext(DashboardContext);
  const handleCheckboxConsolidados = () => {
    toggleItemConsolidados(props?.id);
  };
console.log('props',props?.id)

  const popover = (
    <Popover id={props?.obj?.key}>
      <Popover.Header as="h3">{props.titulo}</Popover.Header>
      <Popover.Body>{props.descripcion}</Popover.Body>
    </Popover>
  );
  return (
    <OverlayTrigger trigger={['hover', 'focus']} placement="left" overlay={popover} key={props?.id}>
      <div className="form-check" key={`${props?.id}`}>
      <input
              type="checkbox"
              checked={selectedItemsConsolidados.includes(props?.id)}
              onChange={handleCheckboxConsolidados}
            />
        <label htmlFor={`custom-checkbox-${props?.id}`} className="form-check-label"></label>
      </div>
    </OverlayTrigger>
  );
};

export default BtnSelect;

