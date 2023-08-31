import { Card, Col, Row } from "react-bootstrap";
import classNames from 'classnames';
const HeaderForm = (props) => {
    const colors = ['secondary'];

    return (
        <Row>
            {colors.map((color, index) => {
                return (
                    <Col md={12} key={index}>
                        <Card className={classNames('text-white', [`bg-${color}`])}>
                            <Card.Body>
                                <Card.Title as="h5">{props.title}</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                );
            })}
        </Row>
    );
};
export default HeaderForm;