import React from 'react';
import FormVoz from './FormVoz';
import FormComite from './FormComite';
 
const OpcionsForm = () => {
    return (
        <React.Fragment>
            {(() => {
                switch (sessionStorage.getItem('OPTIONS')) {
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
                }
            })()
            }
        </React.Fragment>
    );
}
export default OpcionsForm;
