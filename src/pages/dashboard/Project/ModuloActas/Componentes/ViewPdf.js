/* eslint-disable jsx-a11y/alt-text */
// eslint-disable-next-line no-lone-blocks

import React from 'react';

const ViewPdf = (props) => {
 return (
    <div style={{ position: 'relative', width: '100%', height: '80em' }}>
      <object
        data={`${props?.url}`}
        type="application/pdf"
        width='100%'
        height='100%'
      ></object>
    </div>
  );
};

export default ViewPdf;
