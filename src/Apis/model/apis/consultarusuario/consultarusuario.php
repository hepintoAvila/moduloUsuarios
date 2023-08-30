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
		
/**
 * Renvoyer des identifiants
 * @param int $id_auteur
 * @param bool $notifier
 * @param array $contexte
 * @return string
 */
function auteur_regenerer_identifiants($id_auteur, $notifier=true, $contexte = array()) {
	if ($id_auteur){
		$set = array();
		include_spip('inc/access');
		$set['pass'] = creer_pass_aleatoire();

		include_spip('action/editer_auteur');
		auteur_modifier($id_auteur,$set);

		$row = sql_fetsel('*','api_auteurs','id_auteur='.intval($id_auteur));
		include_spip('inc/filtres');
		if ($notifier
			and $row['email']
			and email_valide($row['email'])
		  and trouver_fond($fond = 'modeles/mail_nouveaux_identifiants')){
			// envoyer l'email avec login/pass
			$c = array(
				'id_auteur' => $id_auteur,
				'nom' => $row['nom'],
				'mode' => $row['statut'],
				'email' => $row['email'],
				'pass' => $set['pass'],
			);
			// on merge avec les champs fournit en appel, qui sont passes au modele de notification donc
			$contexte = array_merge($contexte, $c);
			// si pas de langue explicitement demandee, prendre celle de l'auteur si on la connait, ou a defaut celle du site
			// plutot que celle de l'admin qui vient de cliquer sur le bouton
			if (!isset($contexte['lang']) or !$contexte['lang']) {
				if (isset($row['lang']) and $row['lang']) {
					$contexte['lang'] = $row['lang'];
				}
				else {
					$contexte['lang'] = $GLOBALS['meta']['langue_site'];
				}
			}
			lang_select($contexte['lang']);
			$message = recuperer_fond($fond, $contexte);
			include_spip("inc/notifications");
			notifications_envoyer_mails($row['email'],$message);
			lang_select();

			return $row['email'];
		}

		return false;

	}

	return '';
}
		 
		switch ($_POST['opcion']) {
			case 'consultarusuario':
			
				//validamos usuarios y contraseña
				$session_login = _request('var_login');
				$session_password = _request('password');
				include_spip('inc/auth');
				$row = auth_identifier_login($session_login, $session_password);
				if($row['statut']=='0minirezo'){
					$statut='Administrador';
				}else{
					$statut=$row['statut'];
				}
				
			$app=new Apis("api_auteurs");
			$rows=$app->buscar_keys();
			
				$valeurs['Auth']= array(
				'status' => '202',
				'Nom' => $row['nom'],
				'Idsuario' => $row['id_auteur'],
				'Usuario' => $row['login'],
				'Email' => $row['email'],
				'Rol' => $row['tipo'],
				'Apikey' =>$rows['Apikey'],
				'ApiToken' =>$rows['ApiToken'],
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

		/* CREAR UN USUARIO
		$id_ou_options=0;
		$nom = 'holmes11';
		$mail_complet ='holmes.pinto@itglobers.com';
		$options='';
		$inscrire_auteur = charger_fonction('inscrire_auteur', 'action');
		$desc = $inscrire_auteur('', $mail_complet, $nom, $options);
		$desc=Array
		(
			['email'] => 'xeee@unicesar.edu.co',
			['nom'] => 'holmes prueba',
			['prefs'] =>'' 
			['login'] => 'holmes_prueba3',
			['statut'] => 'nouveau',
			['lang'] => 'es',
			['id_auteur'] => '9',
			['pass'] => 'uUvkLLDaqjRiiphX',
			['jeton'] => '102092830564420a620825e6.79429982',
		);	
		*/												
?>
