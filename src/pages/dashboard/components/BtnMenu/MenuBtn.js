/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
// @flow
import React from 'react';
import { Button,  Row, Col } from 'react-bootstrap';

const MenuBtn = (props) => {
  return (
    <>
      <Row className="justify-content-center">
        <Col lg={7} md={10} sm={11}>
          <div className="horizontal-steps mt-2 mb-2 pb-3">
            <div className="horizontal-steps-content">
              <div className={`step-item`}>
                <Button variant="outline-secondary" type="submit" className="btnInicio1" onClick={() => props.handleClick(props.menuRef,props.nivel)}>
                  <Row className="justify-content-center">
                    <div class="col-xl-3 col-lg-4 col-sm-6"><img src={props.image} height="64" alt="" className="btn-menu" /></div>
                    <div class="col-xl-3 col-lg-4 col-sm-6 text-btn">{props.texto}</div>
                  </Row>
                </Button>
              </div>
            </div>
          </div>
        </Col>
      </Row>
  </>
  );
}
export default MenuBtn;
