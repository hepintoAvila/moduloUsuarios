import React from 'react';
import FormVoz from './FormVoz';
import FormComite from './FormComite';
 const options = JSON.parse(sessionStorage.getItem('OPTIONS'));
const OpcionsForm = () => {
    return (
        <React.Fragment>
            {(() => {
                switch (options) {
                    case 'COMITE':
                        return (
                            <React.Fragment>
                               <FormComite accion={'ModuloNotificaciones'} tipo={'ConsultaNotificaciones'}/>
                            </React.Fragment>
                        );
                        
                        case 'VOZ':
                        return (
                            <React.Fragment>
                                <FormVoz accion={'ModuloNotificaciones'} tipo={'ConsultaNotificaciones'}/>
                            </React.Fragment>
                        );
                        default:
                            return (
                              <React.Fragment>
                                {''}
                               </React.Fragment>
                    );                    
                }
            })()
            }
        </React.Fragment>
    );
}
export default OpcionsForm;
