/* eslint-disable @typescript-eslint/no-redeclare */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card,} from 'react-bootstrap';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EmailDetails } from './types';
import avatarImg from '../../../../assets/images/users/avatar-1.jpg'
import { NotificacionesContext } from '../../../../layouts/context/NotificacionesProvider';
function getIdFromUrl() {
  // Obtener el hash de la URL
  const hash = window.location.hash;

  // Utilizar una expresión regular para extraer el número después de /details/
  const match = hash.match(/\/details\/(\d+)/);

  // Devolver el número si se encuentra, de lo contrario devolver null
  return match ? match[1] : null;
}
interface Attachment {
  id: number;
  name: string;
  size: string;
  ext: string;
}

interface EmailDetails {
  avatar?: string;
  subject?: string;
  from_name?: string;
  from_email?: string;
  recieved_on?: string;
  attachments?: Attachment[];
}
const EmailDetail = () => {

  const [detailsEmails, setDetailsEmails] = useState<EmailDetails | undefined>(undefined);
  const { querySolicitudByUser } = useContext(NotificacionesContext)
    //const [totalUnreadEmails] = useState<number>(emails.filter((e) => e.is_read === false).length);
    const attachments= [
      { id: 1, name: 'Evidencia.pdf', size: '2.3MB', ext: '.pdf' },
      { id: 2, name: 'actaComite.pdf', size: '0.3MB', ext: '.pdf' },
      { id: 3, name: 'Solicitud.pdf', size: '4.1MB', ext: '.pdf' },
  ]

    useEffect(() => {
      const idUrl =getIdFromUrl();
      if (querySolicitudByUser.length > 0) {
        const filteredUsers = querySolicitudByUser.filter((item: any) => item.id === idUrl);

        setDetailsEmails(filteredUsers[0]);
      }
    }, [ querySolicitudByUser]);

    return (
        <>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <div className="page-aside-details ">
                                <div className="mt-3">
                                    <h5 className="font-18">{detailsEmails?.subject}</h5>
                                    <hr />
                                    <div className="d-flex mb-3 mt-1">
                                        <img
                                            className="d-flex me-2 rounded-circle"
                                            src={avatarImg}
                                            alt={detailsEmails?.from_name}
                                            height="32"
                                        />
                                        <div className="w-100 overflow-hidden">
                                            <small className="float-end">{detailsEmails?.recieved_on}</small>
                                            <h6 className="m-0 font-14">{detailsEmails?.from_name}</h6>
                                            <small className="text-muted">From: {detailsEmails?.from_email}</small>
                                        </div>
                                    </div>
                                    <p>
                                        {detailsEmails?.subject}
                                    </p>
                                    <hr />
                                    <h5 className="mb-3">Attachments</h5>
                                    <Row>
                                        {attachments?.map((f, index) => {
                                            return (
                                                <Col xl={4} key={index.toString()}>
                                                    <Card className="mb-1 shadow-none border">
                                                        <div className="p-2">
                                                            <Row className="align-items-center">
                                                                <Col className="col-auto">
                                                                    <div className="avatar-sm">
                                                                        <span className="avatar-title bg-primary-lighten text-primary rounded">
                                                                            {f.ext}
                                                                        </span>
                                                                    </div>
                                                                </Col>
                                                                <Col className="col ps-0">
                                                                    <Link
                                                                        to="#"
                                                                        className="text-muted font-weight-bold"
                                                                    >
                                                                        {f.name}
                                                                    </Link>
                                                                    <p className="mb-0">{f.size}</p>
                                                                </Col>
                                                                <Col className="col-auto">
                                                                    <Link
                                                                        to="#"
                                                                        className="btn btn-link btn-lg text-muted"
                                                                    >
                                                                        <i className="dripicons-download"></i>
                                                                    </Link>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </Card>
                                                </Col>
                                            );
                                        })}
                                    </Row>
                                    <div className="mt-5">
                                        <Link to="#" className="btn btn-secondary me-2">
                                            <i className="mdi mdi-reply me-1"></i> Reply
                                        </Link>
                                        <Link to="#" className="btn btn-light">
                                            Forward <i className="mdi mdi-forward ms-1"></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
           </>
    );
};

export default EmailDetail;
