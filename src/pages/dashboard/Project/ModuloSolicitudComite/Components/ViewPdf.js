// @flow
import React, { useEffect, useState } from 'react';
//import { NotificacionesContext } from '../../../../../layouts/context/NotificacionesProvider';
//import encodeBasicUrl from '../../../../../utils/encodeBasicUrl';
/*
function generarCodigoAleatorio(longitud) {
  const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let codigo = "";

  for (let i = 0; i < longitud; i++) {
      const indice = Math.floor(Math.random() * caracteres.length);
      codigo += caracteres.charAt(indice);
  }

  return codigo;
}
*/
const ViewPdf = (props) => {
  //const codigoAleatorio = generarCodigoAleatorio(8);
  const [url, setUrl] = useState('');
  const [pdf, setPdf] = useState(false);
//const {query} = useContext(NotificacionesContext)
 

  useEffect(() => {
    {(() => {
      switch (props?.titulo) {
        case 'EVIDENCIAS':
          setUrl( `https://api.compucel.co/ecrire/exec/model/sena/ModuloIncidentes/pdf/${props?.codigoFicha}.pdf`);
        break
        case 'FORMATO':
         setUrl(`https://api.compucel.co/ecrire/exec/model/sena/ModuloSolicitudComite/pdf/sc/${props?.codigoFicha}.pdf`) ;
        break
        default:
          setUrl('');
        break
      }
    })()
    }
  }, [props?.codigoFicha]);
 
  useEffect(() => {
  fetch(url)
        .then(response => {
          if (response.status === 200) {
            setPdf(true)
          } else {
            setPdf(false)
          }
        })
        .catch(error => {
          console.error("Error al verificar la URL del PDF:", error);
        });
}, [url]);
console.log('url',url)
 return pdf && (
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
