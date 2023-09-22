// @flow
import React, { useEffect, useState } from 'react';
//import { NotificacionesContext } from '../../../../../layouts/context/NotificacionesProvider';
//import encodeBasicUrl from '../../../../../utils/encodeBasicUrl';
const ViewPdf = (props) => {
  const [url, setUrl] = useState('');
//const {query} = useContext(NotificacionesContext)
 


  
  useEffect(() => {
    {(() => {
      switch (props?.titulo) {
        case 'CONCEPTO':
          setUrl( `https://api.compucel.co/ecrire/exec/model/sena/ModuloIncidentes/pdf/${props?.codigoFicha}.pdf`);
        break
        case 'CRITERIO':
         setTimeout(function () {
          //query('ModuloSolicitudComite','ConsultarPdf',[{opcion:encodeBasicUrl('ConsultarPdf'),obj:'ConsultarPdf',codigoFicha:props?.codigoFicha}]);
        }, 2000);
         setUrl(`https://api.compucel.co/ecrire/exec/model/sena/ModuloSolicitudComite/pdf/sc/${props?.codigoFicha}.pdf`) ;
                  
        break
        case 'MEJORAMIENTO':
          setUrl(`https://api.compucel.co/ecrire/exec/model/sena/ModuloIncidentes/pdf/${props?.codigoFicha}.pdf`);
        break      
        default:
          setUrl('');
        break
      }
    })()
    }
  }, [props?.codigoFicha]);
  
 // console.log(url)
  return (
    <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
      <object
        data={`${url}`}
        type="application/pdf"
        width='100%'
        height='100%'
      ></object>
    </div>
  );
};

export default ViewPdf;
