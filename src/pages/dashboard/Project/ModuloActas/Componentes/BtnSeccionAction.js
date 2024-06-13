/* eslint-disable react/jsx-no-duplicate-props */
// BtnSeccionAction.js
import React, { useContext } from 'react';
import { Pagination, Row } from "react-bootstrap";
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
import BtnActions from "../../../components/BtnActions";

const BtnSeccionAction = ({ obj }) => {
  const { selectedItems, toggleItemSelection } = useContext(DashboardContext);

  const handleCheckboxChange = () => {
    toggleItemSelection(obj.key);
  };

  return (
    <React.Fragment>
      <Row>
        <Pagination className="pagination-rounded mx-auto" size="sm">
          <Pagination.Item>
            {
            obj?.opcionBusqueda !=='ASIGNAR' ?
            <BtnActions
              permisos={'S'}
              key={`EDITAR_${obj?.key}`}
              toggleActions={obj?.toggleSignUp}
              row={obj?.row}
              titulo={'EDITAR'}
              descripcion={`Editar`}
              icon={'mdi mdi-square-edit-outline'}
            />:''
            }
          </Pagination.Item>
          <Pagination.Item>
            <input
              type="checkbox"
              checked={selectedItems.includes(obj.key)}
              onChange={handleCheckboxChange}
            />
          </Pagination.Item>
        </Pagination>
      </Row>

    </React.Fragment>

  );
};

export default BtnSeccionAction;
