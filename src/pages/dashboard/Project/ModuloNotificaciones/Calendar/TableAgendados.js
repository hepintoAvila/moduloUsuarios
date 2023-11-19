// TableAgendados.js
import React from 'react';
import { Card, Table } from 'react-bootstrap';
import classNames from 'classnames';
import BtnEnviarEmail from './BtnEnviarEmail';

const TableAgendados = ({aprendicesAgendados,enviarEmailAprendiz }) => {

  return (
    <Card>
      <Card.Body>
        <Table className="mb-0 tableComite" responsive>
          <thead className={classNames('text-white')}>
            <tr className={classNames('text-white', [`bg-light`])}>
              <th>#</th>
              <th>{'Listado de Agendados'}</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {
              (aprendicesAgendados || [])?.map(({ name, id }, index) => {
                return (
                  <tr key={index + 1} className={classNames('text-white', [`bg-warning`])}>
                    <th scope="row">{id}</th>
                    <td>{name}<br /></td>
                    <td>
                    <BtnEnviarEmail
                          url={`/dashboard/ModuloNotificaciones/AgendarCitas?p=${id}`}
                          key={`${name}`}
                          row={id}
                          titulo={'ENVIAR CORREO'}
                          descripcion={`Haga clic en este boton para enviar la notificación al Aprendiz`}
                          icon={'mdi mdi-email-receive-outline'}
                          enviarEmailAprendiz={enviarEmailAprendiz}
                        />
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

export default TableAgendados;
