
//import { useContext } from "react";
import { Button, Col, Row } from "react-bootstrap";
//import { DashboardContext } from "../../../layouts/context/DashboardContext";
 


const NavbarMenuPrincipal = (props) => {
    //const {setitemsMenuPrincipal } = useContext(DashboardContext)
    /*
    const handleClick = (url) => {
        setitemsMenuPrincipal('/ModuloIncidentes');
            const menuitems = window.location.hash.split('#/')[1];
            const [seccion] = menuitems?.split('/');
            const obj = {principal:seccion.length===0 ? 'dashboard/ModuloIncidentes':seccion, seccion: url}
             console.log('obj',obj);
            sessionStorage.setItem('ITEM_SELECT', JSON.stringify({ tipo: obj.principal, menu: obj.seccion }));
           // setLoading(true)
         const urls = seccion.length===0 ? 'dashboard/ModuloIncidentes/'+seccion+''+url:'/'+seccion+'/'+url
         console.log('window',window)
          return window.location.hash = urls;
    
      };
      */
    return (
        <Row>
            <div className={`navbar-custom`}>
                <Row>
                    <Col xl={4}><div className="mb-3 mb-0 text-center"></div></Col>
                    <Col xl={4}><div className="mb-3 mb-0 text-center btnhistorial">
                    </div></Col>
                    <Col xl={4}><div className="mb-0 mb-0 text-center btnregresar"><Button variant="primary" type="submit" onClick={() => props.handleClick('')}>{'Regresar'} </Button> </div></Col>
                </Row>
            </div>
        </Row>
    );
};
export default NavbarMenuPrincipal;