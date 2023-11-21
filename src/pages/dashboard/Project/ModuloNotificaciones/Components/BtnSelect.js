/* eslint-disable react-hooks/exhaustive-deps */

import { useCallback, useEffect, useState } from 'react';
import { Popover, OverlayTrigger } from 'react-bootstrap';

const BtnSelect = (props) => {
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    const dataInLocalStorage = localStorage.getItem('idsIncidentes');
    const data = dataInLocalStorage ? JSON.parse(dataInLocalStorage) : [];
    const filtered = data.some((item) => item.id === props.row);
    setIsSelected(filtered);
  }, [props?.row]);

  const handleCheckboxChange = useCallback((position) => {

    const { row, handleOnChange,name,email } = props;
    setIsSelected(!isSelected);

    handleOnChange(row,name,email);
  }, [isSelected]);

  const popover = (
    <Popover id={props.key}>
      <Popover.Header as="h3">{props.titulo}</Popover.Header>
      <Popover.Body>{props.descripcion}</Popover.Body>
    </Popover>
  );
  return (
    <OverlayTrigger trigger={['hover', 'focus']} placement="left" overlay={popover} key={props.key}>
      <div className="form-check" key={`${props.key}`}>
        <input
          type="checkbox"
          className="form-check-input"
          id={`custom-checkbox-${props.row}`}
          value={props.row}
          name={props.row}
          onClick={handleCheckboxChange}
          checked={isSelected}
        />
        <label htmlFor={`custom-checkbox-${props.row}`} className="form-check-label"></label>
      </div>
    </OverlayTrigger>
  );
};

export default BtnSelect;

