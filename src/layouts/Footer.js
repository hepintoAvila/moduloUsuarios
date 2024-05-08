// @flow
import React from 'react';
import { Row } from 'react-bootstrap';

const Footer = (): React$Element<any> => {
    const currentYear = new Date().getFullYear();
    return (
        <React.Fragment>
            <footer className="footer-dashboard footer-alt-dashboard">
                <div className="container-fluid ">
                      <Row md={6} className="justify-content-center bg-footer-dashboard fw-bold">
                            {' '}
                            {/* Aplicar text-center directamente */}
                            <div className="d-none d-md-block">
                                {currentYear} © SICES v.1 - @2023-Desarrollado Por: Hosmmer Eduardo Pinto Rojas.
                                Celular: 3042172357
                            </div>

                        </Row>
                </div>
            </footer>
        </React.Fragment>
    );
};

export default Footer;
