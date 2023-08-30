<?php

/***************************************************************************\
 *  SPIP, Systeme de publication pour l'internet                           *
 *                                                                         *
 *  Copyright (c) 2001-2017                                                *
 *  Arnaud Martin, Antoine Pitrou, Philippe Riviere, Emmanuel Saint-James  *
 *                                                                         *
 *  Ce programme est un logiciel libre distribue sous licence GNU/GPL.     *
 *  Pour plus de details voir le fichier COPYING.txt ou l'aide en ligne.   *
\***************************************************************************/

 use Spip\Chiffrer\SpipCles;

if (!defined('_ECRIRE_INC_VERSION')) {
	return;
}
		include_spip('base/connect_sql');
		include_spip('inc/filtres_ecrire');
		include_spip('inc/filtres');
		include_spip('inc/utils');
		include_spip('inc/json');
		include_spip('exec/model/claseapi');
		
header("Content-Type: application/json");

function exec_apis_dist(){


		switch($_POST['accion']) {	
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
				break;
	
		}
}
?>
  
 