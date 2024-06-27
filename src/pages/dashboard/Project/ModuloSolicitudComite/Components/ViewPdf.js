/* eslint-disable jsx-a11y/alt-text */
// @flow
import React, { useEffect, useState } from 'react';
import { environments } from '../../../../../environments/environments';
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
    // eslint-disable-next-line no-lone-blocks
    {(() => {
      const URL = `${environments.URL}`;
      switch (props?.titulo) {
        case 'EVIDENCIAS':
          setUrl( `${URL}ModuloIncidentes/pdf/${props?.codigoFicha}.pdf`);
        break
        case 'FORMATO':
         setUrl(`${URL}ModuloSolicitudComite/pdf/sc/${props?.codigoFicha}.pdf`) ;
        break
        default:
          setUrl('');
        break
      }
    })()
    }
  }, [props]);

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

 return pdf && (
    <div style={{  position: 'relative', width: '100%', height: '80em'}}>
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
