/* eslint-disable no-lone-blocks */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
// @flow
import React, { useContext, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';
import Table from '../../../../../components/Table';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
import encodeBasicUrl from '../../../../../utils/encodeBasicUrl';
import { NotificacionesContext } from '../../../../../layouts/context/NotificacionesProvider';
import BtnSeccionAction from './BtnSeccionAction';
import PermisoAlert from '../../../components/PermisoAlert/PermisoAlert';

const ActionColumnAgendada = ({ row }) => {


  const {
    isChecked, isCheckedItem,
    validated,opcionBusqueda,
    setIdSolicitud,setOpen,open,setSignUpModalAdd,
    setOpcion,setObjAprendiz
  } = useContext(DashboardContext);

  const toggleSignUp = (id) => {
     const objDatosAprendiz = {aprendiz:row.cells[0].row.values.aprendiz }
    let permiso = sessionStorage.getItem('PERMISO');

    const localPermiso = JSON.parse(permiso);
    if (localPermiso?.update === 'S') {

      if (row.cells[0].row.values.id === id)
      setIdSolicitud(id);
      setOpen(!open);
      setSignUpModalAdd(true);
      setOpcion('Actas');
      setObjAprendiz(objDatosAprendiz);
    } else {
      Swal.fire('USTED NO TIENE PERMISOS HABILITADOS PARA ESTA OPCION');
    }
  };
  let permiso = sessionStorage.getItem('PERMISO');
  const localPermiso = JSON.parse(permiso);
  const obj = {
    toggleSignUp,
    isChecked,
    isCheckedItem,
    localPermiso,
    validated,
    key: row.cells[0].value,
    row: row.cells[0].value,
    name: row.cells[1].value,
    email: row.cells[2].value,
    opcionBusqueda
  }

  return (
    <React.Fragment>
      <BtnSeccionAction obj={obj}>
      </BtnSeccionAction>
    </React.Fragment>
  );
};
const ListSolicitudes = (props): React$Element<React$FragmentType> => {
  const {itemsSolicitudes, query } = useContext(NotificacionesContext)
  const {
    sizePerPageList,
  } = useContext(DashboardContext);

  const colAgendar = [
    {
      Header: 'No',
      accessor: 'id',
      sort: true,
    },
    {
      Header: 'Aprendiz',
      accessor: 'aprendiz',
      sort: true,
    },
    {
      Header: 'Tipo Solicitud',
      accessor: 'tipoSolicitud',
      sort: true,
    }
    , {
      Header: 'Tipo de Atención',
      accessor: 'tipoAtencion',
      sort: false,
    },
    {
      Header: 'Fecha Solicitud',
      accessor: 'fechaSolicitud',
      sort: false,
    },
    {
      Header: 'Fecha Hora Agendada',
      accessor: 'fechaHoraAgendada',
      sort: false,
    },
    {
      Header: 'Acciones',
      accessor: 'action',
      sort: false,
      classes: 'table-action',
      Cell: ActionColumnAgendada,
    },

  ];



  const datos = itemsSolicitudes?.data?.Solicitudes || [
    {
        "id": "1",
        "idAprendiz": "0",
        "aprendiz": "SIN REGISTROS",
        "email": "",
        "instructor": "",
        "tipoSolicitud": "",
        "codigoFicha": "",
        "tipoAtencion": "",
        "fechaSolicitud": "",
        "fechaIncidente": "",
        "hechos": "",
        "nombrePrograma": "",
        "fechaHoraAgendada": "",
        "estado": "",
        "attachments": [
            {
                "id": 1,
                "name": "#Evidencias: 1",
                "size": "1",
                "ext": ".pdf"
            }
        ],
        "sancionesAprendiz": {
            "disciplinaria": "9",
            "academica": "2",
            "inasistencias": "3",
            "verbal": "1",
            "escrito": "1"
        }
    }
];

  useEffect(() => {
          if(props.opcionBusqueda==='ASIGNAR'){
            query('ModuloSolicitudComite', 'EnviarSolicitud', [{ opcion: encodeBasicUrl('ConsultarSolicitud'), obj: 'ConsultarSolicitud', sw: '8', idActa:btoa(props.idActa)}]);
          }else{
            query('ModuloSolicitudComite', 'EnviarSolicitud', [{ opcion: encodeBasicUrl('ConsultarSolicitud'), obj: 'ConsultarSolicitud', sw: '9', idActa:btoa(props.idActa)}]);
          }

  }, [query,props.opcionBusqueda])


//onsole.log('datos',datos)
  return (
    <>
      <Row>
        <Col sm="12">
          {datos?.length > 0 ? <Table
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
            titleTable={'LISTADO DE NOTIFICACIONES'}
          />:<PermisoAlert/>}
        </Col>
      </Row>

    </>
  );
};

export default ListSolicitudes;
