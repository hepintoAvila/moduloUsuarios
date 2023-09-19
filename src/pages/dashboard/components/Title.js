// @flow
import React, { useContext } from 'react';
import { Row, Col, Breadcrumb } from 'react-bootstrap';
import { DashboardContext } from '../../../layouts/context/DashboardContext';


/**
 * PageTitle
 */
const Title = ()=> {
  const {itemUrl,tipo} = useContext(DashboardContext)
  console.log('tipo',tipo.length);
      const breadCrumbItems=
        [
          // eslint-disable-next-line no-undef
          { label: tipo.length===11 ?'Bienvenidos':itemUrl.toUpperCase()+' / '+tipo.toUpperCase(), path: '/'+tipo.toUpperCase()+'/'+itemUrl.toUpperCase().replace('/', '')+ '/', active: true },
         ]
    return (
        <Row>
            <Col>
                <div className="page-title-box text-black">
                    <div className="page-title-right">
                        <Breadcrumb className="m-0">
                            <Breadcrumb.Item href="/" className="text-black">Inicio</Breadcrumb.Item>
                                    <Breadcrumb.Item active key='1' className="text-black">
                                            {breadCrumbItems[0]?.label}
                                    </Breadcrumb.Item>

                        </Breadcrumb>
                    </div>

                </div>
            </Col>
        </Row>
    );
};

export default Title;
