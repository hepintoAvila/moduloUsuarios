/* eslint-disable no-restricted-globals */
/* eslint-disable @typescript-eslint/no-redeclare */
import { useContext, useEffect, useState } from 'react';
import { Row, Col, Card, Dropdown, ButtonGroup, Button, OverlayTrigger,Tooltip} from 'react-bootstrap';
import classNames from 'classnames';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Link, useLocation } from 'react-router-dom';
import { Email } from './types';
import LeftSide from './LeftSide';
import { useInbox } from './hooks';
import encodeBasicUrl from '../../../../utils/encodeBasicUrl';
import { NotificacionesContext } from '../../../../layouts/context/NotificacionesProvider';
import EmailDetail from './Detail';


const EmailsList = () => {

  const { querySolicitudByUser,query } = useContext(NotificacionesContext)
  useEffect(() => {
    query('ModuloSolicitudComite', 'querySolicitudByUser', [{ opcion: encodeBasicUrl('querySolicitudByUser'), obj: 'querySolicitudByUser',tipo:encodeBasicUrl('consultar')}]);
}, [query]);
const emails: Email[] = querySolicitudByUser || [{
  'id':1,
  'from_name' : '',
  'from_email': '',
  'subject' : '',
  'number_of_reply' : '',
  'is_important': '',
  'is_read': '',
  'time': '',
  'date': ''}];



    return (

        <ul className="email-list">
            {emails?.map((email, index) => {
                return (
                    <li className={classNames({ unread: !email.is_read })} key={index.toString()}>
                        <div className="email-sender-info">
                            <div className="checkbox-wrapper-mail">
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id={'mail' + email.id} />
                                    <label className="form-check-label" htmlFor={'mail' + email.id}></label>
                                </div>
                            </div>

                            <span
                                className={classNames('star-toggle', 'mdi', 'mdi-star-outline', {
                                    'text-warning': email.is_important,
                                })}
                            ></span>
                            <Link to={`/ModuloEmail/details/${email.id}`} className="email-title">
                                {email.from_name}
                                {email.number_of_reply > 1 && <span> ({email.number_of_reply})</span>}
                            </Link>
                        </div>
                        <div className="email-content">
                            <Link to={`/ModuloEmail/details/${email.id}`} className="email-subject">
                                {email.subject}
                            </Link>
                            <div className="email-date">{email.time}</div>
                        </div>
                        <div className="email-action-icons">
                            <ul className="list-inline">
                                <li className="list-inline-item">
                                    <Link to="#">
                                        <i className="mdi mdi-archive email-action-icons-item"></i>
                                    </Link>
                                </li>
                                <li className="list-inline-item">
                                    <Link to="#">
                                        <i className="mdi mdi-delete email-action-icons-item"></i>
                                    </Link>
                                </li>
                                <li className="list-inline-item">
                                    <Link to="#">
                                        <i className="mdi mdi-email-open email-action-icons-item"></i>
                                    </Link>
                                </li>
                                <li className="list-inline-item">
                                    <Link to="#">
                                        <i className="mdi mdi-clock email-action-icons-item"></i>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
};

const Inbox = () => {
    // handle compose modal
    const location = useLocation();

    const [rutaBase, setRutaBase] = useState('');


    const {
        totalEmails,
        startIndex,
        endIndex,
        page,
        totalPages,
        totalUnreadEmails,
        getPrevPage,
        getNextPage,
        showAllEmails,
        showStarredEmails,
    } = useInbox();


    useEffect(() => {
       let partes = location.pathname.split('/');
      let partesFiltradas = partes.filter((part: string) => !(/^\d+$/.test(part)));
      let nuevaRutaBase = partesFiltradas.join('/');
      setRutaBase(nuevaRutaBase);
    }, [location.pathname]);

    return (
        <>
            <Row>

                <Col>
                    <Card>
                        <Card.Body>
                            <div className="page-aside-left">
                                <LeftSide
                                    totalUnreadEmails={totalUnreadEmails}
                                    showAllEmails={showAllEmails}
                                    showStarredEmails={showStarredEmails}
                                />
                            </div>
                            <div className="page-aside-right">
                                {(() => {
                              switch (rutaBase) {
                                case '/':
                                  return <>
                                    <div className="mt-3">

                                      <EmailsList/>

                                    </div>

                                    <Row>
                                      <Col sm={7} className="mt-1">
                                        Showing {startIndex} - {endIndex} of {totalEmails}
                                      </Col>
                                      <Col sm={5}>
                                        <ButtonGroup className="float-end">
                                          {page === 1 ? (
                                            <Button variant="light" className="btn-sm" disabled>
                                              <i className="mdi mdi-chevron-left"></i>
                                            </Button>
                                          ) : (
                                            <Button variant="info" className="btn-sm" onClick={getPrevPage}>
                                              <i className="mdi mdi-chevron-left"></i>
                                            </Button>
                                          )}

                                          {page < totalPages ? (
                                            <Button variant="info" className="btn-sm" onClick={getNextPage}>
                                              <i className="mdi mdi-chevron-right"></i>
                                            </Button>
                                          ) : (
                                            <Button variant="light" className="btn-sm" disabled>
                                              <i className="mdi mdi-chevron-right"></i>
                                            </Button>
                                          )}
                                        </ButtonGroup>
                                      </Col>
                                    </Row>
                                  </>
                                  case '/ModuloEmail/details':
                                    return (
                                      <>
                                        <EmailDetail/>
                                      </>)
                                default:
                                  return (
                                    <>
                                      {''}
                                    </>
                                  );
                              }
                            })()
                        }


                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default Inbox;
