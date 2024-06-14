/* eslint-disable no-lone-blocks */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
// @flow
import React, { useContext, useEffect,useCallback } from 'react';
import { Row, Col } from 'react-bootstrap';
import Table from '../../../../../components/Table';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
import encodeBasicUrl from '../../../../../utils/encodeBasicUrl';
import { NotificacionesContext } from '../../../../../layouts/context/NotificacionesProvider';
import { Pagination } from "react-bootstrap";
import BtnActions from "../../../components/BtnActions";
import Swal from 'sweetalert2';
import ConfirmacionEliminacionStrategy from './../../../../../layouts/context/ConfirmacionEliminacionStrategy';
import { APICore } from '../../../../../helpers/api/apiCore';
const api = new APICore();


const ActionColAsistentes = ({ row }) => {

  const eliminar = useCallback(
    (cel) => {
        let permiso = sessionStorage.getItem('PERMISO');
        const localPermiso = JSON.parse(permiso);
        const infoUsers = sessionStorage.getItem('hyper_user');
        const user = JSON.parse(infoUsers);

        if (localPermiso.delete) {
            const estrategiaConfirmacion = new ConfirmacionEliminacionStrategy();
            estrategiaConfirmacion.confirmar(cel, (cel) => {
                const url = `accion=${btoa('ModuloActas')}&tipo=${btoa('actas')}&opcion=${btoa('deleteAsistente')}'&id=${btoa(cel)}&apiToken=${btoa(user[0]?.ApiToken)}&apikey=${btoa(user[0].Apikey)}`;
                const respuesta = api.sendRequestData(`${url}`);
                respuesta
                    .then(function (resp) {
                        Swal.fire('' + resp[0].menssage + '');
                    })
                    .catch((error) => console.error('Error:', error))
                    .finally(() => {
                        setTimeout(function () {}, 5000);
                    });
            });
        } else {
            Swal.fire('USTED NO TIENE PERMISOS HABILITADOS PARA ESTA OPCION');
        }
    },
    []
);
  return (
    <React.Fragment>
   <Row>
        <Pagination className="pagination-rounded mx-auto" size="sm">
          <Pagination.Item>
             <BtnActions
                  permisos={'S'}
                  key={`ELIMINAR_${row.cells[0].value}`}
                  toggleActions={eliminar}
                  row={row.cells[0].value}
                  titulo={'ELIMINAR'}
                  descripcion={`Eliminar`}
                  icon={'mdi mdi-delete'}
                />
          </Pagination.Item>
      </Pagination>
</Row>
    </React.Fragment>
  );
};
const ListAsistentes = (props): React$Element<React$FragmentType> => {
  const { openFormAsistente, query } = useContext(NotificacionesContext)
  const {
    sizePerPageList,
  } = useContext(DashboardContext);

  const colAgendar = [
    {
      Header: 'No',
      accessor: 'id_asistencia',
      sort: true,
    },
    {
      Header: 'Nombres Apellidos',
      accessor: 'nombresApellidos',
      sort: true,
    },
    {
      Header: 'Documento',
      accessor: 'documento',
      sort: true,
    }
    , {
      Header: 'Dependencia',
      accessor: 'dependencia',
      sort: false,
    },
    {
      Header: 'Email',
      accessor: 'email',
      sort: false,
    },
    {
      Header: 'Telefono',
      accessor: 'telefono',
      sort: false,
    },
    {
      Header: 'Contratista',
      accessor: 'contratista',
      sort: false,
    },{
      Header: 'contratistaOtros',
      accessor: 'contratistaOtros',
      sort: false,
    },
    {
      Header: 'Autorizacion',
      accessor: 'autorizacion',
      sort: false,
    },
    {
      Header: 'firma Digital',
      accessor: 'firmaDigital',
      sort: false,
    },
    {
      Header: 'Acciones',
      accessor: 'action',
      sort: false,
      classes: 'table-action',
      Cell: ActionColAsistentes,
    },

  ];
  const datos = openFormAsistente?.data || [{}];

  useEffect(() => {
    query('ModuloActas', 'actas', [{ opcion: encodeBasicUrl('ConsultarAsistentes'), obj: 'ConsultarAsistentes',idActa:btoa(props?.idActa)}]);
  }, [query])

  return (
    <>
      <Row>
        <Col sm="12">
          {datos?.length > 0 && <Table
            columns={colAgendar}
            data={datos}
            pageSize={5}
            sizePerPageList={sizePerPageList}
            isSortable={true}
            pagination={true}
            theadClass="table-light"
            searchBoxClass="mt-2 mb-3"
            isSearchable={true}
            nametable={'table_1'}
            titleTable={'LISTADO DE ASISTENTES'}
          />}
        </Col>
      </Row>

    </>
  );
};
export default ListAsistentes;
