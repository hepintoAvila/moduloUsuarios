
import { Button, Col, Row } from "react-bootstrap";
import TopbarSearch from "../../../../../components/TopbarSearch";
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
import { useContext } from "react";


const NavbarBuscaAprendiz = (props) => {
    const {setitemsMenuPrincipal } = useContext(DashboardContext)
    const handleClick = (url) => {
        setitemsMenuPrincipal('/ModuloIncidentes');
            const menuitems = window.location.hash.split('#/')[1];
            const [seccion] = menuitems?.split('/');
            const obj = {principal:seccion.length===0 ? 'dashboard/ModuloIncidentes':seccion, seccion: url}
             console.log('obj',obj);
            sessionStorage.setItem('ITEM_SELECT', JSON.stringify({ tipo: obj.principal, menu: obj.seccion }));
           // setLoading(true)
         const urls = seccion.length===0 ? 'dashboard/ModuloIncidentes/'+seccion+''+url:'/'+seccion+'/'+url
          return window.location.hash = urls;
    
      };
    return (
        <Row>
            <div className={`navbar-custom`}>
                <Row>
                    <Col xl={4}><div className="mb-3 mb-0 text-center"><TopbarSearch/></div></Col>
                    <Col xl={4}><div className="mb-3 mb-0 text-center btnhistorial">
                    </div></Col>
                    <Col xl={4}><div className="mb-0 mb-0 text-center btnregresar"><Button variant="primary" type="submit" onClick={() => handleClick('')}>{'Regresar'} </Button> </div></Col>
                </Row>
            </div>
        </Row>
    );
};
export default NavbarBuscaAprendiz;