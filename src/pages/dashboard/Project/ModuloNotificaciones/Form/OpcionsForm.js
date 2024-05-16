import React from 'react';
import FormVoz from './FormVoz';
import FormComite from './FormComite';

const OpcionsForm = () => {
<<<<<<< HEAD
=======
    const options = sessionStorage.getItem('OPTIONS');
    //console.log('options',options)
>>>>>>> prod
    return (
        <React.Fragment>
            {(() => {
                // eslint-disable-next-line no-undef
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
