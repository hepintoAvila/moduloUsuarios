/* eslint-disable no-undef */
import React,{useState,memo} from 'react';
import { Alert, Button,Form } from 'react-bootstrap';
import classnames from 'classnames';
import FormInput from '../../../components/FormInput';
import { useReportes } from '../../../../../hooks/useReportes';
import Swal from 'sweetalert2';
import Spinner from '../../../../../components/Spinner';
//import Swal from 'sweetalert2';
// components

const BuscadorFecha = (props) => {
  const [validated, setValidated] = useState(false);
  const [items, setItems] = useState([]);
  const {queryReporte,isLoading} = useReportes();
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

  const arrSolicitud = [{
    value: '1',
    label: 'Agendada'
  }, {
    value: '2',
    label: 'Sin Agendar'
  }, {
    value: '3',
    label: 'En comite'
  }]


  return (
    <>
    <Alert variant={'success'}>
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className={classnames("mh-100 d-flex flex-row")}>
        <Form.Group className={classnames("w-65 p-0")}>
                <FormInput
                    type="select"
                    label="Estado"
                    name="estado"
                    className="form-control"
                    containerClass={'w-65  p-0'}
                    key="estado"
                    id="estado"
                    required
                    onChange={(e) => {
                      onItemSelect(e,'estado');
                    }}
                    >
                    <option value='0'>Estado de la solicitud</option>
                    {
                    arrSolicitud?.map((p, i) => {
                      return(
                      <option value={p.label} key={i+1}>{p.label}</option>
                      )
                       })}
                </FormInput>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group >
            <Form.Group className={classnames("w-15 p-0")}>
                <Form.Group className="form-group mb-3">
                    <label className="form-label">Fecha Inicial</label> <br />
                      <Form.Control type="date"
                         label="FechaInicial"
                          defaultValue={''}
                           onChange={(e) => {(onItemSelect(e,'FechaInicial'))}}
                             required
                             name="FechaInicial"
                            key="FechaInicial"
                            id="FechaInicial"
                      placeholder="FechaInicial"
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid Fecha Inicial.
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
                        Please provide a valid Final.
                    </Form.Control.Feedback>
                </Form.Group>
            </Form.Group>
            <Form.Group className="w-15 p-1">
                <div className="form-group mb-3">
                    <label className="form-label">{''}</label> <br />
                    {
                      isLoading ? <Button type="submit" variant="success">
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
