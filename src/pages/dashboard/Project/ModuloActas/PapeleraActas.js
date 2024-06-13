/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable default-case */
/* eslint-disable no-lone-blocks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
// @flow
import React, { useContext, useEffect, useState } from 'react';
import { Row, Col, Card, Pagination } from 'react-bootstrap';
import PermisoAlert from '../../components/PermisoAlert/PermisoAlert';
import Table from '../../components/Table';
import { DashboardContext } from '../../../../layouts/context/DashboardContext';
import { useActas } from '../../../../hooks/useActas';
import BtnActions from '../../components/BtnActions';
import Swal from 'sweetalert2';


const ActionColumn = ({ row }) => {
  const {
    setItemsActa
  } = useContext(DashboardContext);

  const handleCheckboxConsolidados = (key) => {
    Swal.fire('Acta recuperada!');
    setItemsActa(key)
    console.log(key);
  };
  //console.log('row',row?.original?.idActa)
  return (
    <React.Fragment>
    <Row>
      <Pagination className="pagination-rounded mx-auto" size="sm" >
        <Pagination.Item>
        <BtnActions
                  permisos={'S'}
                  key={`RECUPERAR_${row.cells[0].value}`}
                  toggleActions={handleCheckboxConsolidados}
                  row={row.cells[0].value}
                  titulo={'RECUPERAR'}
                  descripcion={`Recuperar actas`}
                  icon={'mdi mdi-pail-minus-outline'}
                />

        </Pagination.Item>
    </Pagination>
    </Row>
  </React.Fragment>
  );
};


const PapeleraActas = (props) => {





  const {
    sizePerPageList,itemActa
  } = useContext(DashboardContext);
  const permisos = props?.permisos || {};
  const {itemsActas, query } = useActas()

  const datos = itemsActas?.data || [{
    "idActa": "1",
    "nombre": "SIN REGISTROS",
    "fecha": "",
    "horaInicial": "",
    "horaFinal": "",
    "ciudad": "",
    "lugar": "",
    "direccion": "",
    "casosComite": "",
    "secretario": "C",
    "asistencias": "",
    "presentacion": "",
    "entidad": "",
    "statut": "Activo",
    "maj": "2024-05-16 17:20:58"
}];

  const columns = [
    {
      Header: 'idActa',
      accessor: 'idActa',
      sort: true,
    },
    {
      Header: 'Nombres',
      accessor: 'nombre',
      sort: true,
    },
    {
      Header: 'Fecha',
      accessor: 'fecha',
      sort: true,
    }
    , {
      Header: 'Hora Inicial',
      accessor: 'horaInicial',
      sort: false,
    },

    {
      Header: 'Hora Final',
      accessor: 'horaFinal',
      sort: false,
    },
    {
      Header: 'Acciones',
      accessor: 'action',
      sort: false,
      classes: 'table-action',
      Cell: ActionColumn,
    },
  ];




  useEffect(() => {
    if(itemActa===0){
      query('ModuloActas', 'actas', [{ opcion: btoa('listActasInactivas'), obj: 'actas' }]);
    }else{
      query('ModuloActas', 'actas', [{ opcion: btoa('updateInactivas'), obj: 'actas',idActa:btoa(itemActa)}]);
    }
  }, [itemActa]);

console.log('itemActa',itemActa)
  return (
    <>
              <Row>
                <Col sm={12}>
                  <Card>
                    <Card.Body>

              {datos?.length > 0 ?
                     <Table
                     columns={columns}
                     data={datos}
                     pageSize={25}
                     sizePerPageList={sizePerPageList}
                     isSortable={true}
                     pagination={true}
                     theadClass="table-light"
                     searchBoxClass="mt-0 mb-2"
                     isSearchable={true}
                     isVisible={true}
                     nametable={props.accion}
                     titulo={'LISTADO DE ACTAS REGISTRADAS'}
                     permisos={permisos}
                     icons={'dripicons-user'}
                   />
                : <PermisoAlert/>
                }
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PapeleraActas;
