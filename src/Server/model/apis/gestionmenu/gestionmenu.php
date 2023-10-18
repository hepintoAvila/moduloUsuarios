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
		
		switch ($_POST['opcion']) {
			case 'consultar':
				$entidad = base64_decode($_POST['entidad']);
				$DatosAuteurs=array();
				$select='*';
				$set = array();	
				
				$app=new Apis('apis_menu');
				$menus=$app->consultadatos('entidad="'.$entidad.'" AND isTitle<>"1"',$select);				
				foreach($menus as $a => $value){
					$DatosMenus['Menus'][] = array(
                    'id'=>$value['id'],
					'key'=>$value['key'],
                    'label'=>$value['label'],
                    'icon'=>$value['icon'],
                    'status'=>$value['status']
					);
					}		
					$data = array("data"=>$DatosMenus);
					$var = var2js($data);
					echo $var;						
			break;
			case 'add':
					$entidad = base64_decode($_POST['entidad']);
					$desc=array();
					$id_ou_options=0;
					$login = trim(corriger_caracteres($_POST['login']));
					$mail =$_POST['email'];
					$res = sql_select("statut, id_auteur, login, email", "api_auteurs", "entidad='".$entidad."' AND email=" . sql_quote($mail));
					if (!$r = email_valide($mail)or!$res) {
						$msg[] = array('menssage'=>'ERROR. El email ya existe');
						$var = var2js($msg);	
						echo $var;
						//break;
					}else{
						$options['tipo']=$_POST['rol'];
						$inscrire_auteur = charger_fonction('inscrire_auteur', 'action');
						$desc = $inscrire_auteur('', $mail, $login, $options);
						
						if (!is_null($desc)) {
							if($desc['pass']=='I'){$msg[] = array('menssage'=>'ERROR. El Usuario no se pudo guardar!');}else{$msg[] = array('id'=>1,'menssage'=>'Usuario guardado con exito! Su password es:'.$desc['pass'].', y el usuario: '.$desc['login'].'');};
						  }else{
							$msg[] = array('menssage'=>'¡ERROR!. El Usuario no se pudo guardar!','status' => '200');
						}	
							$var = var2js($msg);	
							echo $var;						
						
					}					
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
