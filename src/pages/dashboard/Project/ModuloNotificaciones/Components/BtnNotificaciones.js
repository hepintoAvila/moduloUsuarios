// @flow
import { Popover, OverlayTrigger } from 'react-bootstrap';
import { Link } from 'react-router-dom';
 import { useContext } from 'react';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
 
const BtnNotificaciones = (props) => {
    const { itemUrl } = useContext(DashboardContext);
    const popover = (
        <Popover id={props.key}>
            <Popover.Header as="h3">{props.titulo}</Popover.Header>
            <Popover.Body>{props.descripcion}</Popover.Body>
        </Popover>
    );
    let Ids = localStorage.getItem('Ids'),
    ITEM_SELECT = sessionStorage.getItem('ITEM_SELECT'),
    tipo = JSON.parse(ITEM_SELECT),
    idUrls = JSON.parse(Ids);
    let q = Number(idUrls?.q) === 0 ? props?.row : idUrls?.q;
    const url = `?p=${idUrls?.p}&q=${q}`;
    const urlb = `/dashboard/${itemUrl}/${tipo?.tipo}`;
    return (
        <OverlayTrigger trigger={['hover', 'focus']} placement="left" overlay={popover} key={props.key}>
 
                <Link
                    key={props.key}
                    to={Number(idUrls?.p) > 0 ? url : urlb}
                    className="action-icon "
                    onClick={() => props?.toggleActions(props.row, props.titulo)}>
                    <i className={`${props?.icon} pt-2`}></i>
                </Link>
         
        </OverlayTrigger>
    );
};
export default BtnNotificaciones;
