
// @flow
import { Card } from 'react-bootstrap';
import classnames from 'classnames';
import profileImg from '../../../../../assets/images/users/avatar-2.jpg';
const CardDatosPersonales = () => {
    const profileStats = [
        { label: 'Identificación', value: '12344555666' },
        { label: 'Programa de Formación', value: 'Análisis y Desarrollo de Software' },
        { label: 'Proyecto Formativo', value: 'Construcción de software Empresarial' },
        
    ];
    
    return (
        <Card className={classnames('widget-flat')}>
            <Card.Body>
                <span className="float-start m-2 me-4">
                    <img src={profileImg} style={{ height: '100px' }} alt="" className="rounded-circle img-thumbnail" />
                </span>

                <div>
                    <h4 className="mt-1 mb-1">Hosmmer Eduardo Pinto Rojas</h4>
                    <p className="font-13">Aprendiz</p>

                    <ul className="mb-0 list-inline">
                        {profileStats.map((stat, i) => {
                            return (
                                <li className="list-inline-item me-3" key={i + '-stat'}>
                                    <h5 className="mb-1">{stat.label}</h5>
                                    <p className="mb-0 font-13">{stat.value}</p>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </Card.Body>
        </Card>
    );
};
export default CardDatosPersonales;
