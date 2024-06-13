import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Col, Container, Card } from 'react-bootstrap';
import avatar1 from '../../../../../assets/images/users/avatar-1.jpg';
import logo_comite_white from '../../../../../assets/images/logo_comite_white.png';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
import Swal from 'sweetalert2';

const FormInput = ({ label, type, name, value, onChange, placeholder, containerClass }) => (
  <div className={containerClass}>
    <label>{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="form-control"
    />
  </div>
);

const CambiarPassword = () => {
  const { query } = useContext(DashboardContext);
  const [items, setItems] = useState({ password: '' });

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    // Actualizar el valor real de la contraseña
    setItems({
      ...items,
      [name]: value,
    });


  };

  const onSubmitPassword = () => {
    Swal.fire({
      position: 'top-center',
      icon: 'success',
      title: 'Password Enviado',
      showConfirmButton: false,
      timer: 1500,
  });
    setTimeout(() => {
      // Desenmascarar la contraseña antes de usarla
      query('AdminUsuarios', 'Usuarios', [{ opcion: btoa('changePassword'), obj: 'changePassword', palabraclave: btoa(items.password) }]);
    }, 2000);
    return (window.location.hash = '#/dashboard/CambiarPassword');
  };

  useEffect(() => {
    if (document.body) document.body.classList.add('authentication-bg');
    return () => {
      if (document.body) document.body.classList.remove('authentication-bg');
    };
  }, []);

  return (
    <div className="account-pages pt-2 pt-sm-1 pb-1 pb-sm-1 form-actualizar-pass">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6} xl={5} xxl={4}>
            <Card>
              <Card.Header className="pt-4 pb-4 text-center bg-primary">
                <Link to="/">
                  <span>
                    <img src={logo_comite_white} alt="" height="69" />
                  </span>
                </Link>
              </Card.Header>
              <Card.Body className="p-4">
                <div className="text-center w-75 m-auto">
                  <img src={avatar1} height="64" alt="" className="rounded-circle shadow" />
                   <p className="text-muted mb-4">
                    {'Digite la nueva contraseña'}
                  </p>
                </div>
                <form>
                  <div className="mb-3">
                    <FormInput
                      label={'Nuevo Password'}
                      type="password"
                      name="password"
                      value={items.password}
                      onChange={handleOnChange}
                      placeholder={'Enter your password'}
                      containerClass={'mb-3'}
                    />
                    <div className="invalid-feedback"></div>
                  </div>
                </form>
                <div className="mb-0 text-center">
                  <Button variant="primary" type="submit" onClick={onSubmitPassword}>
                    {'Actualizar contraseña'}
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CambiarPassword;
