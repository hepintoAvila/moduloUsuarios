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
		include_spip('inc/autoriser');
		include_spip('exec/model/sena/claseapi');
		switch ($_POST['obj']) {
			case 'aprendices':
			
				$campos = $GLOBALS['tables_principales']['sena_aprendiz']['field'];
				$select = implode(',',array_keys($campos));

				$entidad = base64_decode($_POST['entidad']);
				$Aprendices=array();
				
				$app=new Apis('sena_aprendiz');
				$row=$app->consultadatos('entidad="'.$entidad.'"',$select);				
				foreach($row as $a => $value){
					$Aprendices[] = array(
                    'label'=>$value['nombres'].' '.$value['apellidos'],
					'value'=>'users',
					'type'=>'users',
                    'userDetails'=>array(
					'id'=>$value['idAprendiz'],
					'firstname'=>ucwords(strtolower($value['nombres'])),
					'identificacion'=>$value['identificacion'],
					'telefono'=>$value['telefono'],
					'correo'=>$value['correo'],
					'telefono'=>$value['telefono'],
					'lastname'=>ucwords(strtolower($value['apellidos'])),
					'position'=>'Aprendiz',
					'avatar'=>$value['avatar']
					));
				}
					$data = array("data"=>array('Aprendices'=>$Aprendices));
					$var = var2js($data);
					echo $var;						
			break;
			
		}										
?>
