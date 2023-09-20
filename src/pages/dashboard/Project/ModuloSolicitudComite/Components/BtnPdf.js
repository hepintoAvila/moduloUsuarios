// @flow
import React from 'react';
const BtnPdf = (props) => {
  const url = `https://api.compucel.co/ecrire/exec/model/sena/ModuloIncidentes/pdf/${props?.codigoFicha}.pdf`;
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

export default BtnPdf;
