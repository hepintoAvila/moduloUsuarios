import { Link } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

type LeftSideProps = {
    totalUnreadEmails: number;
    showAllEmails?: () => void;
    showStarredEmails?: () => void;
};
const LeftSide = ({ totalUnreadEmails, showAllEmails, showStarredEmails }: LeftSideProps) => {
    return (
        <>
            <div className="email-menu-list mt-3">
                <Link to="/apps/email/inbox" className="text-danger fw-bold" onClick={showAllEmails}>
                    <i className="dripicons-inbox me-2"></i>Notificaciones
                    <span className="badge badge-danger-lighten float-end ms-2">{totalUnreadEmails}</span>
                </Link>
                <Link to="/apps/email/inbox" onClick={showStarredEmails}>
                    <i className="dripicons-star me-2"></i>Solicitudes
                </Link>
                <Link to="/apps/email/inbox">
                    <i className="dripicons-clock me-2"></i>Agendadas
                </Link>
                <Link to="/apps/email/inbox">
                    <i className="dripicons-document me-2"></i>En Comite
                    <span className="badge badge-info-lighten float-end ms-2">32</span>
                </Link>
            </div>
        </>
    );
};

export default LeftSide;
