
import { Popover, OverlayTrigger } from 'react-bootstrap';
const BtnSelect = (props) => {
  const popover = (
    <Popover id={props.key}>
      <Popover.Header as="h3">{props.titulo}</Popover.Header>
      <Popover.Body>{props.descripcion}</Popover.Body>
    </Popover>
  );
  return (
        <OverlayTrigger trigger={['hover', 'focus']} placement="left" overlay={popover} key={props.key}>
          {
              <div className="form-check" key={`${props.key}`}>
              <input type="checkbox"
              className="form-check-input"
              id={`custom-checkbox-${props.key}`}
              value={props.row}
              name={props.row}
              onClick={() => props.handleOnChange(props.row,props.opcion)}
              checked={props.isCheckedItem=== props.row? !props.key:false}/>
              <label htmlFor="form-check-input" className="form-check-label"></label>
          </div>
          }
        </OverlayTrigger>
  );
};

export default BtnSelect;
