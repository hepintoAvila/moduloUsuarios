/* eslint-disable jsx-a11y/alt-text */
// eslint-disable-next-line no-lone-blocks

import React, { useEffect, useState } from 'react';

const ViewPdf = (props) => {
  const [url, setUrl] = useState('');
  const [pdf, setPdf] = useState(false);

  useEffect(() => {

    // eslint-disable-next-line no-lone-blocks
    {(() => {
      switch (props?.tipo) {
        case 'actas':
         setUrl(`http://localhost/sicesv.1/apis.sena/ecrire/exec/model/sena/ModuloActas/pdf/sc/Actas_${props?.idActa}.pdf`) ;
        break
        case 'aprendices':
          setUrl(`http://localhost/sicesv.1/apis.sena/ecrire/exec/model/sena/ModuloActas/pdf/sc/listaAprendiz${props?.idActa}.pdf`) ;
         break
         case 'asistencia':
          setUrl(`http://localhost/sicesv.1/apis.sena/ecrire/exec/model/sena/ModuloActas/pdf/sc/${props?.idActa}.pdf`) ;
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
