import { Alert, Card } from "react-bootstrap";
import Spinner from "../../../../components/Spinner";
import { Suspense } from "react";
const loading = () => <div className="text-center"></div>;
const Spinners = () => {
  const sizes = ['sm'];
  return (
      <Card>
          <Card.Body>
              <div className="row" style={{ maxHeight: '200px', marginLeft: '800px' }}>
                  {sizes.map((size, index) => {
                      return (
                          <div key={index} className="col-lg-6">
                              <Spinner  className="spinner-border"   size={size}  />
                          </div>
                      );
                  })}
              </div>
          </Card.Body>
      </Card>
  );
};

const PermisoAlert =(props) => {
  return (
  <Suspense fallback={loading()}><Spinners />
    <Alert  style={{ background: '#5eb319' }} variant="success" className="my-2">
    
      <h3>{props.menssage}</h3>
    </Alert>
    </Suspense> )
}
export default PermisoAlert;
