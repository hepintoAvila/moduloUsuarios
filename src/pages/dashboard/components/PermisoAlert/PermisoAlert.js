
import { Modal } from 'react-bootstrap';
import classNames from 'classnames';
import Spinner from '../../../../components/Spinner';
import { Suspense } from 'react';
const loading = () => <div className="text-center"></div>;
const Spinners = () => {
  const sizes = ['xl'];
  return (
    <>
      {sizes.map((size, index) => {
        return (<>

          <Modal show={true} size={'lg'}>
            <Modal.Body>
              <div className={classNames('w-100')}>
                <Spinner className="spinner-border" size={size} />
              </div>
            </Modal.Body>
          </Modal>

        </>);
      })}
    </>);
};

const PermisoAlert = (props) => {
  return (
    <Suspense fallback={loading()}>
      <Spinners />
    </Suspense>
  );
};
export default PermisoAlert;
