// @flow
import { Row, Col, Card } from 'react-bootstrap';
import React from 'react';

const CardDatoEvidencias = (): React$Element<React$FragmentType> => {
    const datos = [
        { id: 1, name: 'Hyper-admin-design.zip', size: '2.3MB', ext: '.zip' },
        { id: 2, name: 'Dashboard-design.jpg', size: '0.3MB', ext: '.jpg' },
        { id: 3, name: 'Admin-bug-report.mp4', size: '4.1MB', ext: '.mp4' },
    ];
    console.log('f,idx',datos);
    return (
     <React.Fragment>
       
       <Col xl={4} key={1}>
            <Card className="mb-1 shadow-none border">
                <div className="p-2">
                    <Row className="align-items-center">
                        <Col className="col-auto">
                            <div className="avatar-sm">
                                <span className="avatar-title bg-primary-lighten text-primary rounded">
                               {'4.1MB'}   
                                </span>
                            </div>
                        </Col>
                        <Col className="col ps-0">
                            <a href="/" className="text-muted font-weight-bold">
                            {'COD001-Evidencia-2023-08-31-10-55.zip'} 
                            </a>
                            <p className="mb-0"> </p>
                        </Col>
                        <Col className="col-auto">
                            <a
                                href="/"
                                className="btn btn-link btn-lg text-muted">
                                <i className="dripicons-download"></i>
                            </a>
                        </Col>
                    </Row>
                </div>
            </Card>
        </Col>
        </React.Fragment>
    )

}
export default CardDatoEvidencias;