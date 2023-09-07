import React, { useContext } from 'react';
import {Row, Col } from 'react-bootstrap';
import FormDatosAprendiz from './FormDatosAprendiz';
import FormDatosIncidente from './FormDatosIncidente';
import FormDatosEvidencia from './FormDatosEvidencia';
import { SearchContext } from '../../../../../layouts/context/SearchContext';
 

const EnviarSolicitud = (props) => {
    const {itemsOptionAprendiz,itemsDescripcion} = useContext(SearchContext)
    //console.log('itemsOptionAprendiz',itemsOptionAprendiz)
    return (
        <React.Fragment>
            <Row>
            <Col xl={{ span: 4, order: 1 }} lg={{ order: 2 }}>
              <FormDatosAprendiz handleClick={props.handleClick}/>
            </Col>
            <Col xl={4} lg={{ span: 6, order: 1 }}><FormDatosIncidente 
                idAprendiz={itemsOptionAprendiz?.idAprendiz} 
                aprendizError={itemsOptionAprendiz?.aprendizError}
                itemsDescripcion={itemsDescripcion} /></Col>
            <Col xl={4} lg={{ span: 6, order: 1 }}><FormDatosEvidencia/></Col>
        </Row>
        </React.Fragment>
    );
};
export default EnviarSolicitud;