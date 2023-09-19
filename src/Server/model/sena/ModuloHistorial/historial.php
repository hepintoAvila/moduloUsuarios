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
		include_spip('exec/model/sena/fpdf');
		
		$login = $GLOBALS['visiteur_session']['login'];
		include_spip('inc/auth');
		$row = auth_informer_login($login);
		 
		 
	 
		$opcion = base64_decode($_POST['opcion']);
		switch($opcion) {
			case 'consultar':
				$entidad = base64_decode($_POST['entidad']);
				$table='sena_modelo_historial_incidencias';
				$app=new Apis($table);
				$select='*';
				$query='';
				
				$rows=$app->consultadatos($query,$select,$table);
			
					if (!is_null($rows)) {
						$data = array("Historial"=>$rows);
						$var = var2js($data);
					echo $var;	
					}else{
						$records['status'] = array('status'=>'404');
						$var = var2js($records);	
					echo $var;	 						
					}
										
			break;
			case 'update':
		
			break;
		}

													
?>
