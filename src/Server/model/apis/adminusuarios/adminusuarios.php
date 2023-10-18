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
		
		$opcion = base64_decode($_POST['opcion']);
		
		switch ($opcion) {
			case 'listaUsuarios':
				$entidad = base64_decode($_POST['entidad']);
				$DatosAuteurs=array();
				$select='*';
				$set = array();	
				
				$app=new Apis('api_auteurs');
				$auteurs=$app->consultadatos('entidad="'.$entidad.'" AND id_auteur NOT IN (1,3)',$select);				
				foreach($auteurs as $a => $value){
					$DatosAuteurs['auteurs'][] = array(
                    'id'=>$value['id_auteur'],
					'login'=>$value['login'],
                    'email'=>$value['email'],
                    'rol'=>$value['tipo']
					);
					}
					
				//ROLES
				$app_roles=new Apis('apis_roles');
				$roles=$app_roles->consultadatos('entidad="'.$entidad.'"',$select);				
				foreach($roles as $a => $val){
					$DatosRoles['roles'][] = array(
                    'value'=>$val['tipo'],
                    'label'=>$val['tipo']
					);
					}				
					$data = array("data"=>array_merge($DatosAuteurs,$DatosRoles));
					$var = var2js($data);
					echo $var;						
			break;
			
			case 'add':
					$app=new Apis('api_auteurs');
					$variablesAVerificar=array();
					$desc=array();
					$id_ou_options=0;
				
				 	$email = base64_decode($_POST['email']);
				 	$login = base64_decode($_POST['login']);
				 	$rol = base64_decode($_POST['rol']);
				 	$entidad = base64_decode($_POST['entidad']);
					$ApiToken     = base64_decode($_POST["ApiToken"]);
					$Apikey     = base64_decode($_POST["Apikey"]);	
					$idUsuario = base64_decode($_POST["idUsuario"]);					
 						// Crea un array con las variables que deseas verificar
						$variablesAVerificar = [
							'idUsuario' => $idUsuario,
							'email' => $email,
							'login' => $login,
							'rol' => $rol,
							'entidad' => $entidad,
							'ApiToken' => $ApiToken,
							'Apikey' => $Apikey,
						];
 
						$mensajeError = $app->verificarVariables($variablesAVerificar);
						$validarTokes = $app->verificarApikeyApiToken($Apikey,$ApiToken,$idUsuario);
						if (($mensajeError !== null) OR (!$validarTokes)){
							
						 $mensajeErrors = $mensajeError == '' ? 'Error del Token':$mensajeError;
						 $arrayMensage[]=array('id'=>1,'message'=>'::ERROR-001:: '.$mensajeErrors.'','status'=>'404');
							
						}else{
								//$res = sql_select("statut, id_auteur, login, email", "api_auteurs", "entidad='".$entidad."' AND email=" . sql_quote($email));
								
								 
								if (!$r = email_valide($email)) {
									$msg[] = 'WARNING. email no tiene el formato de correo';
								}else{
									$options=array('tipo'=>$rol,'entidad'=>$entidad);
									$inscrire_auteur = charger_fonction('inscrire_auteur', 'action');
									$desc = $inscrire_auteur('', $email, $login, $options);
									
									if (!is_null($desc)) {
										if($desc['pass']=='I'){
											$msg[] = 'WARNING. El Usuario no se pudo guardar!';
											}
										else{
											$msg[] = 'Usuario guardado con exito! Su password es:'.$desc['pass'].', y el usuario: '.$desc['login'].'';
											};
									  }else{
										     $msg[] ='¡WARNING!. El Usuario no se pudo guardar!';
									}	
								}
								
								 
								$arrayMensage[] = array('message'=>'¡OK!. El Usuario GUARDADO! '.implode(',',$msg).'','status' => '202');
						}	
 
				$var = var2js($arrayMensage);
				echo $var;
			break;
			case 'update':
					$entidad = base64_decode($_POST['entidad']);
					$chartic=array();
			
						$apps=new Apis('api_auteurs','Entidad="'.$entidad.'"');
    					$chartic['login']=$_POST['login'];
    					$chartic['tipo']=$_POST['rol'];
						$apps->actualizar($chartic,'id_auteur',$_POST['id']);
						$msg[] = array('menssage'=>'OK. El Usuarios: '.$_POST['id'].'-'.$_POST['nombres'].' fue actualizado correctamente!','status' => '200');
						$var = var2js($msg);	
						echo $var;				
			
			break;
			case 'delete':
					sql_delete("api_auteurs","id_auteur=" . intval($_POST['id']));
					
					$res = sql_select("statut, id_auteur, login, email", "api_auteurs", "id_auteur=" . intval($_POST['id']));
					if ($res){
					$msg[] = array('menssage'=>'OK. El registro '.$_POST['id'].' fue eliminado correctamente!','status' => '200');
					}	
					
					$var = var2js($msg);	
					echo $var;					
			break;
			
			
		}										
?>
