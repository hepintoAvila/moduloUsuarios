// @flow
import { Row, Col, Card } from 'react-bootstrap';
import classnames from 'classnames';
import React, { useState } from 'react';

const CardDatoEvidencias = ({f,idx}): React$Element<React$FragmentType> => {

    console.log('f,idx',f,idx);
    return (
     <React.Fragment>
       
       <Col xl={4} key={idx}>
            <Card className="mb-1 shadow-none border">
                <div className="p-2">
                    <Row className="align-items-center">
                        <Col className="col-auto">
                            <div className="avatar-sm">
                                <span className="avatar-title bg-primary-lighten text-primary rounded">
                                    
                                </span>
                            </div>
                        </Col>
                        <Col className="col ps-0">
                            <a href="/" className="text-muted font-weight-bold">
                                {f.name}
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