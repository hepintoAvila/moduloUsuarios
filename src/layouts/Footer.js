// @flow
import React from 'react';
import { Row, Col } from 'react-bootstrap';
//import headerGovco from '../assets/images/header_govco.png';
const Footer = (): React$Element<any> => {
    const currentYear = new Date().getFullYear();
    return (
        <React.Fragment>
            <footer className="footer bg-footer  fw-bold">
                <div className="container-fluid ">
                    <Row>
                    <Col md={6}>
                    <span>
                    
                </span>
                                  
                        </Col>
                        <Col md={6}><div className="text-md-end footer-links d-none d-md-block">{currentYear} © GIPNCES - @2023-Desarrollado por: Hosmmer Eduardo Pinto Rojas.  Celular: 3042172357  Email: hosmmereduardo@gmail.com</div></Col>

                    </Row>
                </div>
            </footer>
        </React.Fragment>
    );
};

export default Footer;
