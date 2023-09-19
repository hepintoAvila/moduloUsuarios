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
		
function calcularFechaFinal($fechaInicio, $tiempoEstipuladoMinutos) {
  // Convierte la fecha de inicio en un objeto DateTime
  $fechaInicioObjeto = new DateTime($fechaInicio);

  // Suma el tiempo estipulado en minutos
  $fechaInicioObjeto->add(new DateInterval('PT' . $tiempoEstipuladoMinutos . 'M'));

  // Devuelve la fecha final formateada
  return $fechaInicioObjeto->format('Y-m-d H:i:s');
}	
 function formatearFecha($fecha) {
  // Convierte la fecha a un timestamp
  $timestamp = strtotime($fecha);

  // Formatea el timestamp en el formato deseado
  $fechaFormateada = date("Y-m-d H:i:s", $timestamp);

  return $fechaFormateada;
}
		$tipo = base64_decode($_POST['tipo']);	
		switch($tipo) {
			case 'addCitas':
				
				$campos = $GLOBALS['tables_principales']['sena_agenda']['field'];
				$select = implode(',',array_keys($campos));
				$tbls='sena_agenda';
				$apps=new Apis($tbls);
				
				$idSolicitudComite = base64_decode($_POST["idSolicitudComite"]);
				$fechaCita = base64_decode($_POST["fechaCita"]);
				$horaCita = base64_decode($_POST["horaCita"]);
				$tiempoEstipulado = base64_decode($_POST["tiempoEstipulado"]);
				$className = base64_decode($_POST["className"]);
				$title = base64_decode($_POST["title"]);
				$start = base64_decode($_POST["start"]);
				$end = base64_decode($_POST["end"]);
				$idComites = base64_decode($_POST["idComites"]);
				$observaciones = base64_decode($_POST["observaciones"]);
				$entidad = base64_decode($_POST["entidad"]);
				$ApiToken     = base64_decode($_POST["ApiToken"]);
				$Apikey     = base64_decode($_POST["Apikey"]);
				$idUsuario     = base64_decode($_POST["idUsuario"]);
 

				//$fechaIncidente= date_ical($fechaIncidentes);
						
						$variablesAVerificar = [
							'idSolicitudComite' => $idSolicitudComite,
							'fechaCita' => $fechaCita,
							'horaCita' => $horaCita,
							'tiempoEstipulado' => $tiempoEstipulado,
							'MiembrosComites' => $idComites,
							'idUsuario' => $idUsuario,
							'entidad' => $entidad,
							'title' => $title,
							'start' => $start,
							'end' => calcularFechaFinal($fechaCita,$tiempoEstipulado),
							'className' => $className,
						];	
				 
				 
						// Llama a la función para verificar las variables
						$mensajeError = $apps->verificarVariables($variablesAVerificar);
						$validarTokes = $apps->verificarApikeyApiToken($Apikey,$ApiToken,$idUsuario);
						if (($mensajeError !== null) OR (!$validarTokes)){
						 $mensajeErrors = $mensajeError == '' ? 'Error del Token':$mensajeError;
							$arrayMensage[]=array('id'=>1,'message'=>'::ERROR-001:: '.$mensajeErrors.'','status'=>'404');
							
						} else {
							 
							  $row=$apps->consultadatos('entidad="'.$entidad.'" AND idSolicitud="'.$idSolicitudComite.'"',$select);
							 foreach($row as $a => $value){
								 $idAgenda = $value['idAgenda'];
							 }
							 if($idAgenda>0){
								$arrayMensage[]=array('id'=>1,'message'=>'::ERROR-002:: No se puede agenda una solicitud más de una vez, actulice la fecha','status'=>'404'); 
							 }else{
								 
							 $chartic = array();
							  $chartic['idApoyo']=$idUsuario;
							  $chartic['idSolicitud']=$idSolicitudComite;
							  $chartic['descripcion']=$observaciones;
							  $chartic['horaMinutoInicial']=$start;
							  $chartic['horaMinutoFinal']=$end;
							  $chartic['tiempoEstipulado']=$tiempoEstipulado;
							  $chartic['idComites']=$idComites;
							  $chartic['estado']='AGENDADO';
							  $chartic['start']=formatearFecha($start);
							  $chartic['end']=calcularFechaFinal($fechaCita,$tiempoEstipulado);
							  $chartic['title']=$title;
							  $chartic['entidad']=$entidad;
							  $chartic['statut']='1';
							  $chartic = pipeline('pre_insertion',
										array(
											'args' => array(
											'table' => 'sena_agenda',
										),
										'data' => $chartic
										)
									);							
									$idAgenda=@sql_insertq("sena_agenda",$chartic);
									pipeline('post_insertion',
									array(
										'args' => array(
										'table' =>'sena_agenda',
										'id_objet' => $idAgenda
										),
										'data' => $chartic
										)
									);
							 			
								//ACTUALIZAR SOLICITUD
								 
								if (intval($idSolicitudComite)) {	
									$schem['fechaHoraAgendada']=formatearFecha($start);
									$schem['estado']='AGENDADA';
									$schem = pipeline('pre_insertion',
											array(
												'args' => array(
												'table' => 'sena_solicitudComite',
											),
											'data' => $schem
											)
										);							
										sql_updateq('sena_solicitudComite',$schem,"idSolicitud=" . intval($idSolicitudComite) . "");
								}else{
								$arrayMensage[]=array(
									'id'=>1,
									'message'=>'::WARNING:: No se pudo actualizar la Solocitud!',
									'status'=>'202');
																
								} 
							 
								$arrayMensage[]=array(
								'id'=>1,
								'message'=>'::OK:: Registro guardado correctamente!',
								'status'=>'202');
							 }
							
						}
				echo var2js($arrayMensage);		
			break;
			case 'updateCitas':
			 $tbls='sena_agenda';
		     $apps=new Apis($tbls);
			$campos = $GLOBALS['tables_principales']['sena_agenda']['field'];
			$select = implode(',',array_keys($campos));	
			
			$fechaCita = base64_decode($_POST["fechaCita"]);
			$tiempoEstipulado = base64_decode($_POST["tiempoEstipulado"]);
			$observaciones = base64_decode($_POST["observaciones"]);
			$idAgenda = base64_decode($_POST["idAgenda"]);
			
				
				$ApiToken     = base64_decode($_POST["ApiToken"]);
				$Apikey     = base64_decode($_POST["Apikey"]);
				$idUsuario     = base64_decode($_POST["idUsuario"]);
				
						$variablesAVerificar = [
							'idAgenda' => $idAgenda,
							'fechaCita' => $fechaCita,
							'tiempoEstipulado' => $tiempoEstipulado,
						];
	
						// Llama a la función para verificar las variables
						$mensajeError = $apps->verificarVariables($variablesAVerificar);
						$validarTokes = $apps->verificarApikeyApiToken($Apikey,$ApiToken,$idUsuario);
						if (($mensajeError !== null) OR (!$validarTokes)){
							$mensajeErrors = $mensajeError == '' ? 'Error del Token':$mensajeError;
							$arrayMensage[]=array('id'=>1,'message'=>'::ERROR-001:: '.$mensajeErrors.'','status'=>'404');
							
						}else{
							$row=$apps->consultadatos('idAgenda="'.intval($idAgenda).'"',$select);
							foreach($row as $a => $value){
								$idSolicitud = $value['idSolicitud'];
								$horaMinutoInicial = $value['horaMinutoInicial'];
							}
							
							 
							$end = calcularFechaFinal($fechaCita,$tiempoEstipulado);

							$start = substr($horaMinutoInicial, 0, 10).' '.$fechaCita;
							
							sql_updateq('sena_agenda', 
							array('descripcion' => $observaciones,
							'horaMinutoInicial' => $start,
							'horaMinutoFinal' => $end,
							'tiempoEstipulado' => $tiempoEstipulado,
							'start' => $start,
							'end' => $end,
							'title' => $fechaCita),"idAgenda=" . intval($idAgenda) . "");
							
							 //ACTUALIZAR SOLICITUD
						 
							
								if (intval($idSolicitud)) {	
									$schem['fechaHoraAgendada']=formatearFecha($start);
									$schem = pipeline('pre_insertion',
											array(
												'args' => array(
												'table' => 'sena_solicitudComite',
											),
											'data' => $schem
											)
										);							
										sql_updateq('sena_solicitudComite',$schem,"idSolicitud=" . intval($idSolicitud) . "");
								}else{
								$arrayMensage[]=array(
									'id'=>1,
									'message'=>'::WARNING:: No se pudo actualizar la Solocitud!',
									'status'=>'202');
									echo var2js($arrayMensage);									
								} 
							 
							$arrayMensage[]=array(
							'id'=>1,
							'message'=>'::OK:: Registro actualizado correctamente!',
							'status'=>'202');
						
						}
					
			echo var2js($arrayMensage);	 
			break;
			case 'deleteCitas':
			$tbls='sena_agenda';
		     $apps=new Apis($tbls);			
			$idAgenda = base64_decode($_POST["idAgenda"]);
			$ApiToken     = base64_decode($_POST["ApiToken"]);
			$Apikey     = base64_decode($_POST["Apikey"]);
			$idUsuario     = base64_decode($_POST["idUsuario"]);
			$variablesAVerificar = ['idAgenda' => $idAgenda];
			
						// Llama a la función para verificar las variables
						$mensajeError = $apps->verificarVariables($variablesAVerificar);
						$validarTokes = $apps->verificarApikeyApiToken($Apikey,$ApiToken,$idUsuario);
						if (($mensajeError !== null) OR (!$validarTokes)){
							$mensajeErrors = $mensajeError == '' ? 'Error del Token':$mensajeError;
							$arrayMensage[]=array('id'=>1,'message'=>'::ERROR-001:: '.$mensajeErrors.'','status'=>'404');
							
						}else{
							if (intval($idAgenda)) {
							sql_delete("sena_agenda", "idAgenda=" . intval($idAgenda));
									// invalider les caches marques de cette rubrique
									include_spip('inc/invalideur');
									suivre_invalideur("id='idAgenda/$idAgenda'");
								$arrayMensage[]=array(
								'id'=>1,
								'message'=>'::OK:: Registro eliminado correctamente!',
								'status'=>'202');										
							}else{
								$arrayMensage[]=array(
								'id'=>1,
								'message'=>'::WARNING:: Registro '.$idAgenda.' no fue eliminado!',
								'status'=>'202');								
							}

							 					
						}
			echo var2js($arrayMensage);				
			
			break;
			
		}

													
?>
