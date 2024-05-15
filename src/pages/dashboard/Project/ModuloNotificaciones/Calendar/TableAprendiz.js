// TableAprendiz.js
import React, { useState, useEffect, useCallback } from 'react';
import { Card, Table } from 'react-bootstrap';
import classNames from 'classnames';

import { extraerNumero } from './funtions';
import BtnEnviarEmail from './BtnEnviarEmail';




const TableAprendiz = ({ miembros, setIdDirectivos, setIdSolicitud, events,enviarEmailAprendiz}) => {
  const [checkedState, setCheckedState] = useState(new Array(miembros.length).fill(false));

  const handleOnChange = useCallback((position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
      const dataInLocalStorage = localStorage.getItem('idsIncidentes');
      const data = dataInLocalStorage ? JSON.parse(dataInLocalStorage) : [];
      setIdSolicitud(data[position]?.id);
      return (window.location.hash = `/dashboard/ModuloNotificaciones/AgendarCitas?p=${data[position]?.id}`);
  }, [checkedState, setIdSolicitud]);

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
              <th>{'Listado de Aprendices'}</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {
              miembros?.map(({ name, id }, index) => {
                const filtered = events?.filter((item) => extraerNumero(item.title) === parseInt(id, 10));
                const classBg = filtered?.length > 0 ? 'bg-warning' : 'bg-info';
                return (
                  <tr key={index} className={classNames('text-white', [`${classBg}`])}>
                    <th scope="row">{id}</th>
                    <td>{name}<br /></td>
                    <td>
                      {classBg === 'bg-info' ? (
                        <input
                          type="checkbox"
                          id={`custom-checkbox-${index}`}
                          name={name}
                          value={name}
                          checked={checkedState[index]}
                          onChange={() => handleOnChange(index)}
                        />
                      ) : (
                        <BtnEnviarEmail
                          url={`/dashboard/ModuloNotificaciones/AgendarCitas?p=${id}`}
                          key={`${name}`}
                          row={id}
                          titulo={'ENVIAR CORREO'}
                          descripcion={`Haga clic en este boton para enviar la notificación al Aprendiz`}
                          icon={'mdi mdi-email-receive-outline'}
                          enviarEmailAprendiz={enviarEmailAprendiz}
                        />
                      )}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default TableAprendiz;
