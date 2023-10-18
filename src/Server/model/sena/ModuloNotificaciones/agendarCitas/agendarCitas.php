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

if (!defined('_ECRIRE_INC_VERSION')) {
	return;
}
		include_spip('base/connect_sql');
		include_spip('inc/filtres_ecrire');
		include_spip('inc/filtres');
		include_spip('inc/utils');
		include_spip('inc/json');
		include_spip('exec/model/sena/claseapi');
		 
		
		$opcion = base64_decode($_POST['opcion']);	

		switch($opcion) {
			case 'consultar':
				include_spip('exec/model/sena/ModuloSolicitudComite/consultarsolicitud');
			break;
			case 'AgendarCitas':
				include_spip('exec/model/sena/ModuloNotificaciones/agendarCitas/addCitas');
			break;
		}

													
?>
