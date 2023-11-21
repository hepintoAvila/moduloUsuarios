// TableComite.js
import React, { useState, useEffect, useCallback } from 'react';
import { Button, Card, Table } from 'react-bootstrap';
import classNames from 'classnames';
import HyperDatepicker from '../../../../../components/Datepicker';
import FormInput from '../../../components/FormInput';

const TableComite = ({ miembros, setIdDirectivos, enviarEmailAprendiz }) => {
    const [checkedState, setCheckedState] = useState(new Array(miembros.length).fill(false));
    const [selectedDate, setfecha] = useState(new Date());
    const [jornada, setJornada] = useState('');

    const handleOnChange = useCallback(
        (position) => {
            const updatedCheckedState = checkedState.map((item, index) => (index === position ? !item : item));
            setCheckedState(updatedCheckedState);

            localStorage.setItem('comiteSelect', JSON.stringify(updatedCheckedState));
        },
        [checkedState]
    );

    useEffect(() => {
        setIdDirectivos(checkedState);
    }, [checkedState, setIdDirectivos]);

    return (
        <Card>
            <Card.Body>
                <Table className="mb-0 tableComite" responsive>
                    <thead className={classNames('text-white')}>
                        <tr className={classNames('text-white', [`bg-light`])}>
                            <th>#</th>
                            <th>{'Miembros del Comité'}</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {miembros?.map(({ correo, nombres, apellidos, idDirectivo }, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{idDirectivo}</th>
                                    <td>
                                        {nombres} {apellidos}
                                        <br />
                                        {correo}
                                    </td>
                                    <td>
                                        <input
                                            type="checkbox"
                                            id={`custom-checkbox-${index}`}
                                            name={nombres}
                                            value={nombres}
                                            checked={checkedState[index]}
                                            onChange={() => handleOnChange(index)}
                                        />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
                <Table className="mb-0 tableComite" responsive>
                    <thead className={classNames('text-white')}>
                        <tr className={classNames('text-white', [`bg-light`])}>
                            <th>{'Enviar correos, por fechas, a miembros del comité'}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className={classNames('text-white', [`bg-light`])}>
                            <td>
                                <HyperDatepicker
                                    label=""
                                    name="fechaIncidente"
                                    hideAddon={true}
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    tI={60}
                                    dateFormat="MMMM d, yyyy h:mm aa"
                                    timeCaption="time"
                                    className="form-control"
                                    value={selectedDate}
                                    onChange={(date) => setfecha(date)}
                                />
                            </td>
                        </tr>
                        <tr className={classNames('text-white', [`bg-light`])}>
                            <td>
                                <FormInput
                                    type="select"
                                    name="tiempoEstipulado"
                                    className="form-control"
                                    containerClass={'mb-3'}
                                    value={jornada}
                                    onChange={(e) => setJornada(e.target.value)}>
                                    <option value="">Seleccione la jornada</option>
                                    <option value="MAÑANA">MAÑANA</option>
                                    <option value="TARDE">TARDE</option>
                                    <option value="CONTINUA">CONTINUA</option>
                                </FormInput>
                            </td>
                        </tr>
                        <tr className={classNames('text-white', [`bg-light`])}>
                            <td>
                                <Button
                                    variant="success"
                                    type="submit"
                                    onClick={enviarEmailAprendiz}
                                    className="btn btn-success">
                                    Enviar Notificaciones al correo del comite
                                </Button>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
};

export default TableComite;
