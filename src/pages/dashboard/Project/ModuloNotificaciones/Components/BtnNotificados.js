import { Pagination, Row } from "react-bootstrap";
import React, { useContext, useEffect, useState } from "react";
import { DashboardContext } from "../../../../../layouts/context/DashboardContext";

const BtnNotificados = (props) => {

  const { selectedItemsConsolidados, handleCheckboxNotificaciones,handleOnChange } = useContext(DashboardContext);
  const [checked, setChecked] = useState(selectedItemsConsolidados.includes(props?.obj?.key));

  useEffect(() => {
    setChecked(selectedItemsConsolidados.includes(props?.obj?.key));
  }, [selectedItemsConsolidados, props?.obj?.key]);

  const handleChangeCkeck = () => {
    const { key, name,email } = props?.obj;
    const newChecked = !checked;
    setChecked(newChecked);
    handleCheckboxNotificaciones(props?.obj?.key);
    handleOnChange(key,name,email);
  };

  return (
    <React.Fragment>
      <Row>
        <Pagination className="pagination-rounded mx-auto btnsul" size="sm">
          <Pagination.Item>
            <input
              type="checkbox"
              checked={checked}
              onChange={handleChangeCkeck}
            />
          </Pagination.Item>
        </Pagination>
      </Row>
    </React.Fragment>
  );
};

export default BtnNotificados;
