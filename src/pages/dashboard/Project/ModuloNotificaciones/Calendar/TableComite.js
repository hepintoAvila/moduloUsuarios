// TableComite.js
import React, { useState, useEffect, useCallback } from 'react';
import { Card, Table } from 'react-bootstrap';
import classNames from 'classnames';

const TableComite = ({ miembros, setIdDirectivos}) => {
  const [checkedState, setCheckedState] = useState(new Array(miembros.length).fill(false));

  const handleOnChange = useCallback((position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);

    localStorage.setItem('comiteSelect', JSON.stringify(updatedCheckedState));
  }, [checkedState]);

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
            {
              miembros?.map(({ correo, nombres, apellidos, idDirectivo }, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{idDirectivo}</th>
                    <td>{nombres} {apellidos}<br />{correo}</td>
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
      </Card.Body>
    </Card>
  );
};

export default TableComite;
