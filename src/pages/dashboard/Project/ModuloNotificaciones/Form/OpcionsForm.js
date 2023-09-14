import React from 'react';
import FormVoz from './FormVoz';
import FormComite from './FormComite';
 
const OpcionsForm = () => {
    const options = sessionStorage.getItem('OPTIONS');
    console.log('options',options)
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
                }
            })()
            }
        </React.Fragment>
    );
}
export default OpcionsForm;
