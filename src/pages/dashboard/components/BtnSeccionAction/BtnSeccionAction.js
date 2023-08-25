import { Modal, Pagination, Row } from "react-bootstrap";
import BtnActions from "../BtnActions";
import React from "react";
import BtnLink from "../BtnLink";

const BtnSeccionAction = (props,children) => {

  const isbtnLink = props?.obj?.isbtnLink|| 'N';
  const tipo = props?.obj?.tipo || '';
  const descripcionbtnLink = props?.obj?.descripcionbtnLink || '';
  const descripcionbtnaction = props?.obj?.descripcionbtnaction || '';
  const titulobtnLink =props?.obj?.titulobtnLink || '';
  const urlbtnLink =props?.obj?.urlbtnLink || '';

  return (
    <React.Fragment>
      <Modal show={props?.obj?.open} onHide={props?.obj?.toggleSignUp}>
        <Modal.Body>{props?.children ? props?.children : null}
        </Modal.Body>
      </Modal>
      <Row>
        <Pagination className="pagination-rounded mx-auto" size="sm">
          <Pagination.Item>
            {
              (props?.obj?.localPermiso?.update === 'S') ?
                <BtnActions
                  permisos={'S'}
                  key={`EDITAR_${props?.obj?.key}`}
                  toggleActions={props?.obj?.toggleSignUp}
                  row={props?.obj?.row}
                  titulo={'EDITAR'}
                  descripcion={`Editar ${descripcionbtnaction}`}
                  icon={'mdi mdi-square-edit-outline'}
                /> : ''
            }
          </Pagination.Item>
          <Pagination.Item>
            {
              (props?.obj?.localPermiso?.delete === 'S') ?
                <BtnActions
                  permisos={'S'}
                  key={`ELIMINAR_${props?.obj?.key}`}
                  toggleActions={props?.obj?.eliminar}
                  row={props?.obj?.row}
                  titulo={'ELIMINAR'}
                  descripcion={`Eliminar ${descripcionbtnaction}`}
                  icon={'mdi mdi-delete'}

                /> : ''
            }
          </Pagination.Item>
        {
        (isbtnLink==='S' && props?.obj?.localPermiso?.add === 'S') ?
        <Pagination.Item>
        <BtnLink
            permisos={'S'}
            key={`${tipo}_${props?.obj?.row}`}
            row={props?.obj?.row}
            url={urlbtnLink}
            titulo={`${titulobtnLink}`}
            descripcion={`${descripcionbtnLink}`}
            icon={'mdi mdi-account-cash'}
          />
           </Pagination.Item>

        :''
      }
      </Pagination>
      </Row>
    </React.Fragment>
  );
}
export default BtnSeccionAction;
