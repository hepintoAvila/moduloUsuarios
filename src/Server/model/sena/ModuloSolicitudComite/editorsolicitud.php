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
  
		include_spip('inc/autoriser');	
		include_spip('base/connect_sql');
		include_spip('inc/filtres_ecrire');
		include_spip('inc/filtres');
		include_spip('inc/texte_mini');
		include_spip('inc/utils');
		include_spip('inc/json');
		include_spip('exec/model/sena/claseapi');	
		include_spip('exec/model/sena/email');	
		//include_spip('fpdf.php');	
		include_spip('inc/charsets');
		include_spip('inc/actions');
		include_spip('inc/editer');
		include_spip('inc/notifications');
		
		$opcion = base64_decode($_POST['tipo']);	

		switch($opcion) {
			

				case "EnviarSolicitud":
				
				$tbls='sena_solicitudComite';
				$apps=new Apis($tbls);
				$chartic=array();
				$chactualiza=array();
				
				$idAprendiz     = base64_decode($_POST["idAprendiz"]);
				$ApiToken     = base64_decode($_POST["ApiToken"]);
				$Apikey     = base64_decode($_POST["Apikey"]);
				$tipoComite     = base64_decode($_POST["tipoComite"]);
				$tipoAtencion    = base64_decode($_POST["tipoAtencion"]);
				$fechaIncidentes = base64_decode($_POST["fechaIncidente"]);
				$nombrePrograma = base64_decode($_POST["nombrePrograma"]);
				$fechaPropuestas = base64_decode($_POST["fechaPropuesta"]);
				$hechos = base64_decode($_POST["descripcion"]);
				$idUsuario = base64_decode($_POST["idUsuario"]);
				$entidad = base64_decode($_POST["entidad"]);
				$selectedFile = base64_decode($_POST["selectedFile"]);
				$fileAtribute = json_decode($selectedFile, true);	
				$fechaIncidente= date_ical($fechaIncidentes);
				$fechaPropuesta= date_ical($fechaPropuestas);
				$descripcion= corriger_caracteres(htmlspecialchars($hechos));
				$descripcionHechos= corriger_caracteres(htmlspecialchars('Atentamente le informamos que de conformidad con el Procedimiento Ejecución de la Formación Profesional en su etapa electiva y/o el Reglamento para Aprendices del SENA, se le hace este llamado de Atención por el siguiente motivo: '));

						// Crea un array con las variables que deseas verificar
						$variablesAVerificar = [
							'idAprendiz' => $idAprendiz,
							'tipoComite' => $tipoComite,
							'tipoAtencion' => $tipoAtencion,
							'fechaIncidente' => $fechaIncidente,
							'fechaPropuesta' => $fechaPropuesta,
							'descripcion' => $descripcion,
							'nombrePrograma' => $nombrePrograma,
							'idUsuario' => $idUsuario,
							'entidad' => $entidad,
							'selectedFile' => $fileAtribute,
							'ApiToken' => $ApiToken,
							'Apikey' => $Apikey,
						];
						//print_r($variablesAVerificar);
						// Llama a la función para verificar las variables
						$mensajeError = $apps->verificarVariables($variablesAVerificar);
						$validarTokes = $apps->verificarApikeyApiToken($Apikey,$ApiToken,$idUsuario);
						if (($mensajeError !== null) OR (!$validarTokes)){
						 $mensajeErrors = $mensajeError == '' ? 'Error del Token':$mensajeError;
							$arrayMensage[]=array('id'=>1,'message'=>'::ERROR-001:: '.$mensajeErrors.'','status'=>'404');
							
						} else {
						//GUARDAR SOLICITUD
								$chartic = array();
								$chartic['idInstructor'] = $idUsuario;
								$chartic['idAprendiz'] =$idAprendiz;
								$chartic['tipoSolicitud'] =$tipoComite;
								$chartic['tipoAtencion'] =$tipoAtencion;
								$chartic['codigoFicha'] ='000';
								$chartic['fechaIncidente'] =$fechaIncidente;
								$chartic['fechaPropuesta'] =$fechaPropuesta;
								$chartic['fechaHoraAgendada'] ='0000-00-00: 00:00';
								$chartic['description'] ="".$descripcionHechos.":".$descripcion."";
								$chartic['nombrePrograma'] =$nombrePrograma;
								$chartic['estado'] ='SIN AGENDAR';
								$chartic['entidad'] =$entidad;
								$chartic['statut'] = '1';
								$chartic = pipeline('pre_insertion',
										array(
											'args' => array(
											'table' => 'sena_solicitudComite',
										),
										'data' => $chartic
										)
									);							
									$idSolicitud=@sql_insertq("sena_solicitudComite", $chartic);
									pipeline('post_insertion',
									array(
										'args' => array(
										'table' =>'sena_solicitudComite',
										'id_objet' => $idSolicitud
										),
										'data' => $chartic
										)
									);
						//CREAR EL CODIGO
								if ($idSolicitud  < 10) {
									 $codigo='SC00-'.$fechaIncidente.'-'.$idUsuario.'-'.$idSolicitud ;
									} else {
									$codigo='SC-'.$fechaIncidente.'-'.$idUsuario.'-'.$idSolicitud ;
								}
							//ACTULIZO EL CODIGO
							if ($idSolicitud)
										{
											sql_updateq('sena_solicitudComite', array('codigoFicha' => $codigo),
												"idSolicitud=" . intval($idSolicitud) . "");
										}
						//FIN CREAR EL CODIGO		
						
						//GUARDAMOS EL ARCHIVO EN EL SERVIDOR
						$decodedImage = base64_decode($_POST['fileContent']);
						$dir_doc='../ecrire/exec/model/sena/ModuloIncidentes/';
						$path=$dir_doc.'pdf';
						$destino=$dir_doc.'pdf/';
						if (!is_dir($path)) {
										mkdir($path, 0777, true);
										closedir($destino);
						}
						$ubicacionPermanente = $destino.''.$codigo.'.pdf';
						file_put_contents($ubicacionPermanente, $decodedImage);						 
						//FIN GUARDAR  PDF	
						
						//ENVIAR CORREO
						$corps = $apps->headersEmail($idAprendiz,$idUsuario,$descripcion,$tipoComite);
						$corps['pieces_jointes'] =['holmespinto.avila@gmail.com,hosmmer.eduardo@gmail.com'];
						$destinatario =$corps['destinatario'];
						$asunto = "".$corps['asunto']."";
						$headers = "".$corps['headers']."";
						$from = "".$corps['from']."";
						//@mail('hosmmer.eduardo@gmail.com', ',hosmmer.eduardo@gmail.com', 'SADDASDASDA', $headers);
						//envoyerMail(''.$destinatario.'', $asunto, $corps, $from = '', $headers = '');
						spip_log("mail $destinatario\n$asunto\n$headers", 'mails');
						//FIN
						
					
								//GENERA LA FICHA
							$arrayMensage[]=array(
							'id'=>1,
							'message'=>'::OK:: Registro guardado correctamente!',
							'status'=>'202');
						}
						echo var2js($arrayMensage);
			break;
	}
?>
  
 