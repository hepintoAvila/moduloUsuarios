
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
 	   
	 
	   $login = $GLOBALS['visiteur_session']['login'];
		$session_password = $GLOBALS['visiteur_session']['pass'];
		include_spip('inc/auth');
		$aut = auth_informer_login($login);
		
		switch ($_POST['opcion']) {
		case 'consultar':
			$menus=array();
			$IdMenu = base64_decode($_POST['IdMenu']);
				$res = sql_select("*", "sena_roles", "tipo=" . sql_quote($IdMenu));
				while ($r = sql_fetch($res)) {
					$idTipo=$r['idRol'];
					$entidad=$r['entidad'];
				}	
			$perm = sql_select("A.c AS APIS_QUERY,A.a AS APIS_ADD,A.u AS APIS_UPDATE,A.d AS APIS_DELETE, R.tipo as Rol,M.key AS opcion",
				"apis_menu AS M,apis_submenus AS S, apis_autorizaciones AS A,apis_roles as R",
				"R.idRol='".$idTipo."' 
				AND A.idRol= R.idRol 
				AND M.idMenu= A.idMenu 
				AND A.entidad='".$entidad."'
				AND S.entidad='".$entidad."'
				AND R.entidad='".$entidad."'
				AND A.idSubmenu=S.idSubmenu 
				AND  S.status='Active' ORDER BY S.idSubmenu ASC");
				while ($row = sql_fetch($perm)) {
					$menus['Permisos'][] = array('query'=>$row['APIS_QUERY'],'add'=>$row['APIS_ADD'],'update'=>$row['APIS_UPDATE'],'delete'=>$row['APIS_DELETE'],'opcion'=>$row['opcion']);					
				}				
				 
				if($aut['id_auteur']==1){
					$ouput = var2js($menus);
					echo $ouput; 
				}else{
					$records['status'] = array('status'=>'404');
					$var = var2js($records);	
					echo $var;	 
				}
				break;
 			case 'configurar':
			echo 'No registrado';
			break;
			
		}	
			
										
?>







