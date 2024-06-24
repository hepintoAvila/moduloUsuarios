/* eslint-disable no-undef */
import React,{useState,memo,useContext} from 'react';
import { Alert, Button,Form } from 'react-bootstrap';
import classnames from 'classnames';

import Spinner from '../../../../../components/Spinner';
import { SearchContext } from '../../../../../layouts/context/SearchContext';
//import Swal from 'sweetalert2';
// components

const BuscadorFecha = (props) => {
  const [validated, setValidated] = useState(false);
  const [items, setItems] = useState([]);
  const { queryReporte,loading} = useContext(SearchContext)
  /*
   * handle form submission
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      const datosEvent = {
        ...items,
          accion: 'ModuloReportes',
          opcion: 'reportesComite',
          tipo: 'comite',
      };
        setTimeout(function () {
          queryReporte('ModuloReportes', 'reportes', [{obj: 'reportesComite',...datosEvent }]);
      }, 2000);

    }

    setValidated(true);
  };


  const onItemSelect = (event,opcion) => {
  const value = event.target.value;
    setItems(prevState => ({
      ...prevState,
      [opcion]: value
  }));
};


  return (
    <>
    <Alert variant={'success'}>
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className={classnames("mh-100 d-flex flex-row")}>
              <Form.Group className={classnames("w-15 p-0")}>
                <Form.Group className="form-group mb-3">
                    <label className="form-label">Fecha Inicial</label> <br />
                      <Form.Control type="date"
                         label="FechaInicial"
                          defaultValue={''}
                           onChange={(e) => {(onItemSelect(e,'FechaInicial'))}}

                             name="FechaInicial"
                            key="FechaInicial"
                            id="FechaInicial"
                      placeholder="FechaInicial"
                      />
                      <Form.Control.Feedback type="invalid">
                        Por favor asigne la Fecha Inicial.
                    </Form.Control.Feedback>
                </Form.Group>
            </Form.Group>
            <Form.Group className={classnames("w-15 p-0")}>
                <Form.Group className="form-group mb-3">
                    <label className="form-label">Fecha Final</label> <br />
                    <Form.Control type="date"
                                             label="FechaFinal"
                                             defaultValue={''}
                                              onChange={(e) => {onItemSelect(e,'FechaFinal')}}
                                              required
                                              name="FechaFinal"
                                              key="FechaFinal"
                                              id="FechaFinal"
                      placeholder="FechaFinal"
                      />
                      <Form.Control.Feedback type="invalid">
                      Por favor asigne la fecha Final.
                    </Form.Control.Feedback>
                </Form.Group>
            </Form.Group>
            <Form.Group className="w-15 p-1">
                <div className="form-group mb-3">
                    <label className="form-label">{''}</label> <br />
                    {
                      loading ? <Button type="submit" variant="success">
                      <Spinner/>
                  </Button>:<Button type="submit" variant="success">
                      Consultar
                  </Button>
                    }

                </div>
            </Form.Group>
        </Form.Group>
        </Form>
    </Alert>

    </>
    );
};
export default memo(BuscadorFecha);
