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
		include_spip('inc/json');
		include_spip('exec/model/sena/claseapi');	
		include_spip('exec/model/sena/email');	
		//include_spip('fpdf.php');	
		include_spip('inc/charsets');
 
		switch($_POST['obj']) {
				case "ConsultarSolicitud":
				case "ConsultarSolicitudByID":
				case "queryByIdComite":
				case "queryByIdAprendiz":
				
				$campos = $GLOBALS['tables_principales']['sena_solicitudComite']['field'];
				$select = implode(',',array_keys($campos));
				$tbls='sena_solicitudComite';
				$apps=new Apis($tbls);
				$idUsuario = base64_decode($_POST["idUsuario"]);
				$idSolicitud = base64_decode($_POST["idSolicitud"]);
				$entidad = base64_decode($_POST["entidad"]);
				
						$variablesAVerificar = [
							'idUsuario' => $idUsuario,
							'entidad' => $entidad,
						];
				
				
				
						$mensajeError = $apps->verificarVariables($variablesAVerificar);
						
						if ($mensajeError !== null) {
							$arrayMensage[]=array('id'=>1,'message'=>'::ERROR-001:: '.$mensajeError.'','status'=>'404');	
							
						} else {
						
							switch($_POST['sw']) {
								///dashboard/ModuloNotificaciones/AgendarCitas
								case '3':
									$row=$apps->consultadatos('entidad="'.$entidad.'" AND idSolicitud="'.$idSolicitud.'" ORDER BY idSolicitud DESC',$select);
								break;	
								//dashboard/ModuloNotificaciones/ConsultaNotificaciones
								case '1':
									$row=$apps->consultadatos('entidad="'.$entidad.'" ORDER BY idSolicitud DESC',$select);
								break;
								///dashboard/ModuloSolicitudComite/EnviarSolicitud
								case '2':
								case '0':
									$row=$apps->consultadatos('entidad="'.$entidad.'" AND idInstructor="'.$idUsuario.'" ORDER BY idSolicitud DESC',$select);
								
								break;
								case '4':
									$row=$apps->consultadatos('entidad="'.$entidad.'" AND idAprendiz="'.base64_decode($_POST["idAprendiz"]).'" ORDER BY idSolicitud DESC',$select);
								break;							
							}
							
							foreach($row as $a => $value){
								$sql1 = sql_select("nombres,apellidos",'sena_aprendiz','idAprendiz="'.$value['idAprendiz'].'"');
								while ($row1 = sql_fetch($sql1)) {	
									$nombresApellidosAprendiz= $row1['nombres'].' '.$row1['apellidos'];		
								  }	
								$sql2 = sql_select("nombres,apellidos",'sena_instructor','idInstructor="'.$value['idInstructor'].'"');
								while ($row2 = sql_fetch($sql2)) {	
									$nombresApellidosInstructor= $row2['nombres'].' '.$row2['apellidos'];		
								  }	
								 								 								 
								$Solicitudes[] = array(
								'id'=>$value['idSolicitud'],
								'aprendiz'=>"".$value['idAprendiz']."-".$nombresApellidosAprendiz,
								'instructor'=>"".$value['idInstructor']."-".$nombresApellidosInstructor,
								'tipoSolicitud '=>$value['tipoSolicitud'],
								'codigoFicha'=>$value['codigoFicha'],
								'tipoAtencion'=>$value['tipoAtencion'],
								'fechaHora'=>$value['fechaIncidente'],
								'fechaHoraPropuesta'=>$value['fechaPropuesta'],
								'fechaHoraAgendada'=>$value['fechaHoraAgendada'],
								'estado'=>$value['estado'],
								'attachments'=> array(
									array('id'=> 1, 'filename'=> 'sales-assets.zip', 'size'=> '2.3 MB' ),
									array( 'id'=> 2, 'filename'=> 'new-contarcts.docx', 'size'=> '1.3 MB' ),
									)
								);
							}
							 
							//CONSULTAR MIEMBROPS DEL COMITE
							$tblComite='sena_directivo';
							$comt=new Apis($tblComite);	
							$campos_comit = $GLOBALS['tables_principales']['sena_directivo']['field'];
							$select_comit = implode(',',array_keys($campos_comit));
							$row2=$comt->consultadatos('entidad="'.$entidad.'"',$select_comit);
							foreach($row2 as $a => $val){
									$directivos[] = array(
									'id'=>$val['idDirectivo'],
									'nombresApellidos'=>$val['nombres'].' '.$val['apellidos'],
									'correo'=>$val['correo']
									);
							}
							
							//CONSULTAR AGENDA
							$tblaAgenda='sena_agenda';
							$agen=new Apis($tblaAgenda);
							
							$tbla_solicitudComite='sena_solicitudComite';
							$_solicitudComite=new Apis($tbla_solicitudComite);
							$campos_solicitudComite = $GLOBALS['tables_principales']['sena_solicitudComite']['field'];
							$select_solicitudComite = implode(',',array_keys($campos_solicitudComite));
							
							$campos_agen = $GLOBALS['tables_principales']['sena_agenda']['field'];
							$select_agen = implode(',',array_keys($campos_agen));
							
							$row3=$agen->consultadatos('entidad="'.$entidad.'"',$select_agen);
							foreach($row3 as $a => $val3){
								$row4=$_solicitudComite->consultadatos('idSolicitud="'.$val3['idSolicitud'].'"',$select_solicitudComite);
								foreach($row4 as $a => $val4){
								$className = $val4['tipoSolicitud']=='DISCIPLINA'? 'bg-warning':'bg-danger';
								$codigoFicha = $val4['codigoFicha'];
								}
								
									$Agendas[] = array(
									'id'=>$val3['idAgenda'],
									'start'=>$val3['start'],
									'end'=>$val3['end'],
									'className'=>$className,
									'title'=>'-S'.$val3['idSolicitud'],
									);
							}							
							//print_r($Solicitudes);
							$Agenda = array("Agenda"=>$Agendas);
							$Directivo = array("Directivos"=>$directivos);
							$Solicitud = array("Solicitudes"=>$Solicitudes);
							$datos = array_merge($Directivo,$Solicitud,$Agenda);
							$arrayMensage = array("data"=>$datos);
						}
					echo var2js($arrayMensage);	
				break;
				
				
	}
?>
  
 