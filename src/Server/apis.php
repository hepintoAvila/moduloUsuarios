<?php
/***************************************************************************\
 *  SPIP, Système de publication pour l'internet                           *
 *                                                                         *
 *  Copyright © avec tendresse depuis 2001                                 *
 *  Arnaud Martin, Antoine Pitrou, Philippe Rivière, Emmanuel Saint-James  *
 *                                                                         *
 *  Ce programme est un logiciel libre distribué sous licence GNU/GPL.     *
 *  Pour plus de détails voir le fichier COPYING.txt ou l'aide en ligne.   *
\***************************************************************************/

/**
 * Gestion de la recherche ajax du mini navigateur de rubriques
 *
 * Cette possibilité de recherche apparaît s'il y a beaucoup de rubriques dans le site.
 *
 * @package SPIP\Core\Rechercher
 **/
if (!defined('_ECRIRE_INC_VERSION')) {
	return;
}
		include_spip('base/connect_sql');
		include_spip('exec/model/claseapi');	
		include_spip('fpdf.php');	


function exec_apis_dist(){
	
		$accion = base64_decode($_POST['accion']);
		
		switch($accion) {	
				case "registrarse":
					include_spip('exec/model/apis/registrarse/registrarse');		    	    
				break;
				case "auteur":
					include_spip('exec/model/apis/consultarusuario/consultarusuario');		    
				break;
				case "menu":
					include_spip('exec/model/apis/menu/menu');		    
				break;
				case "AdminUsuarios":
				 
					include_spip('exec/model/apis/adminusuarios/adminusuarios');	
				break;
				case "AdminRoles":
					include_spip('exec/model/apis/adminroles/adminroles'); 	
				break;
				case "GestionMenu":
					include_spip('exec/model/apis/gestionmenu/gestionmenu');	
				break;
				case "permisos":
					include_spip('exec/model/apis/permisos/permisos');
			    case "ModuloNotificaciones":
				
					include_spip('exec/model/sena/ModuloNotificaciones/agendarCitas/agendarCitas');		        
				break;
			    case "ModuloHistorial":
					/*
					require('fpdf.php');
					$pdf = new FPDF();
					$pdf->AddPage();
					$pdf->SetFont('Arial','B',16);
					$pdf->Cell(40,10,'¡Hola, Mundo!');
					$pdf->Output('F','sena.pdf');
					*/
					include_spip('exec/model/sena/ModuloHistorial/historial');		        
				break;	
				case "ModuloSolicitudComite":
					include_spip('exec/model/sena/ModuloSolicitudComite/ModuloSolicitudComite');	
				break;
		}
}
?>