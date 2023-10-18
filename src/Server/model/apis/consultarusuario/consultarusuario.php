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
		include_spip('exec/model/apis/claseapi');
		include_spip('inc/auth');
		$opcion = base64_decode($_POST['opcion']);
		switch ($opcion) {
			case 'consultarusuario':
				//validamos usuarios y contraseña var_login
				$session_login =_request('var_login');
				$session_password = _request('password');
				$row = auth_identifier_login($session_login, $session_password);
				if($row['statut']=='0minirezo'){
					$statut='Administrador';
				}else{
					$statut=$row['statut'];
				}
			$app=new Apis("api_auteurs");
				$valeurs['Auth']= array(
				'status' => '202',
				'Nom' => $row['nom'],
				'Idsuario' => $row['id_auteur'],
				'Usuario' => $row['login'],
				'Email' => $row['email'],
				'Rol' => $row['tipo'],
				'Apikey' =>$row['alea_actuel'],
				'ApiToken' =>$row['alea_futur'],
				'entidad' =>$row['entidad']
				);
							$res = sql_select("*", "apis_roles", "entidad ='".$row['entidad']."' AND tipo=" . sql_quote($row['tipo']));
							while ($r = sql_fetch($res)) {
								$idTipo=$r['idRol'];
							}
								$perm = sql_select("A.c AS API_QUERY,A.a AS API_ADD,A.u AS API_UPDATE,A.d AS API_DELETE, R.Tipo as Rol,S.label AS opcion",
									"apis_menu AS M,apis_submenus AS S, apis_autorizaciones AS A,apis_roles as R",
										"R.idRol='".$idTipo."'  
										AND A.idRol= R.idRol 
										AND M.idMenu= A.idMenu 
										AND A.entidad='".$row['entidad']."' 
										AND S.entidad='".$row['entidad']."' 
										AND R.entidad='".$row['entidad']."'
										AND A.idSubmenu=S.idSubmenu 
										AND  S.status='Active' ORDER BY S.idSubmenu ASC");
									while ($row = sql_fetch($perm)) {
										$menus['Permisos'][] = array('query'=>$row['API_QUERY'],'add'=>$row['API_ADD'],'update'=>$row['API_UPDATE'],'delete'=>$row['API_DELETE'],'opcion'=>$row['opcion']);					
									}				
								 			
							if (!is_null($menus)) {
								$data = array('data'=>array_merge($valeurs,$menus));
								$var = var2js($data);
								echo $var;
							}else{
								$records['data'] = array('status'=>'404');
								$var = var2js($records);	
								echo $var;	                            
							}						 					
			break;
		}
											
?>
