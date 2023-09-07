import React, { useContext, useEffect } from 'react';
import {Row, Col } from 'react-bootstrap';
import FormDatosAprendiz from './FormDatosAprendiz';
import FormDatosIncidente from './FormDatosIncidente';
import FormDatosEvidencia from './FormDatosEvidencia';
import { SearchContext } from '../../../../../layouts/context/SearchContext';
import TopbarSearch from '../../../../../components/TopbarSearch';
import { useAdminUsuarios } from '../../../../../hooks/useAdminUsuarios';
 

const EnviarSolicitud = (props) => {
    const {itemsOptionAprendiz,descripcion,descripcionError} = useContext(SearchContext)
    const {itemsAprendices,query} = useAdminUsuarios()
    const allApredizDatos = itemsAprendices?.data?.aprencices || [];


    useEffect(() => {
        query('ModuloIncidentes','Aprendiz',[{opcion:'listaAprendices',obj:'aprendices'}]);
      }, [query]);

    return (
        <React.Fragment>
            <Row>
            <Col xl={{ span: 4, order: 1 }} lg={{ order: 2 }}>
              <FormDatosAprendiz handleClick={props.handleClick} datosAprendiz={itemsOptionAprendiz} />
            </Col>
            <Col xl={4} lg={{ span: 6, order: 1 }}>
                <FormDatosIncidente
                idAprendiz={itemsOptionAprendiz?.idAprendiz} 
                itemsDescripcion={descripcion}
                aprendizError={itemsOptionAprendiz?.aprendizError}
                descripcionError={descripcionError}
                children={<TopbarSearch  data={allApredizDatos} 
                selectedOption={`${itemsOptionAprendiz?.Nombres?.toUpperCase()} ${itemsOptionAprendiz?.Apellidos?.toUpperCase()}`}/>}               
                />
                               

                </Col>
            <Col xl={4} lg={{ span: 6, order: 1 }}><FormDatosEvidencia/></Col>
        </Row>
        </React.Fragment>
    );
};
export default EnviarSolicitud;