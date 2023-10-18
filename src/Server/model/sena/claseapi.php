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
include_spip('inc/filtres_boites');
include_spip('inc/boutons');
include_spip('inc/pipelines_ecrire');
include_spip('inc/filtres_dates');
include_spip('base/connect_sql');

 abstract class PagesApis {
        public function __construct() {
		//$this->periodoacademico_id=$periodoacademico_id;		
        } 
		abstract function buscar_keys();
		abstract function guardar($chartic);
		abstract function consultadatos($query,$select);
		abstract function actualizar($chartic,$id_nom,$id);
		abstract function codigo($id_max);
		abstract function dias_restantes_mes();
		abstract function consultamenu($query,$select,$table);
		abstract function convertirCifrasMiles($numero);
		abstract function sumaCampo($campo,$query);
		abstract function verificarVariables($variable);
		abstract function elimnararchivo($file);
		abstract function eliminarUltimoPunto($cadena);
		abstract function renombrararchivo($p);
		abstract function headersEmail($idAprendiz,$idUsuario,$descripcion,$tipoComite);
		abstract function verificarApikeyApiToken($Apikey,$ApiToken,$idUsuario);


 }
 class Apis extends PagesApis
{
         public $table;
		public function __construct($table)
         {			
			$this->table=$table;
		 }
		
		public function eliminarUltimoPunto($cadena) {
			$longitud = strlen($cadena);
			if ($longitud > 0 && $cadena[$longitud - 1] === '.') {
				$cadena = substr($cadena, 0, $longitud - 1);
			}
			return $cadena;
		}
		/**
		 * Retorno los parametros para renombrar un archivo
		 * Autor: HOLMES ELIAS PINTO  AVILA
		 * Nombre de la Funcion : renombrararchivo()
		 * Parametros de entrada : $p =array
		 * Parametros de Salida:  fichier
		 */		
		public function renombrararchivo($p){
 				$fichier=$p['dirname'].'/'.$p['objeto'].'_'.$p['id_max'].'_'.$p['id_autor'].'_'.$p['numero_documento'].'.'.$p['extension'];
				$tmpfile="".$p['dirname']."/".rtrim(ltrim(str_replace("%20"," ",$p['basename'])))."";
				 		 @rename($tmpfile, $fichier);
						 if (file_exists($tmpfile)) {
							unlink($tmpfile);
						 }
				return $fichier;		 
		}		
		/**
		 * Retorno los parametros para eliminar un archivo
		 * Autor: HOLMES ELIAS PINTO  AVILA
		 * Nombre de la Funcion : elimnararchivo()
		 * Parametros de entrada : $file
		 * Parametros de Salida:  $
		 */		
		public function elimnararchivo($file){
 				  	//$file="".$p['dirname']."/".rtrim(ltrim(str_replace("%20"," ",$p['basename'])))."";
						 if (file_exists($file)) {
							unlink($file);
							$sw=1;
						 }else{
							$sw=0; 
						 }
				return $sw;		 
		}			 
		/**
		 * Retorno los parametros para verificar
		 * Autor: HOLMES ELIAS PINTO  AVILA
		 * Nombre de la Funcion : verificarVariables()
		 * Parametros de entrada : $variables
		 * Parametros de Salida: null
		 */		 
		 
		function verificarVariables($variables) {
			foreach ($variables as $nombre => $valor) {
				if (empty($valor) OR ($valor === 'undefined')) {
					return "La variable $nombre está vacía.";
				}
			}
			return null; // Todas las variables están llenas
		}	
		/**
		 * Retorno los parametros para verificar
		 * Autor: HOLMES ELIAS PINTO  AVILA
		 * Nombre de la Funcion : verificarVariables()
		 * Parametros de entrada : $variables
		 * Parametros de Salida: null
		 */		 
		 
		function verificarApikeyApiToken($Apikey,$ApiToken,$idUsuario) {
				
				$sql1 = sql_select("alea_actuel",'api_auteurs','id_auteur="'.$idUsuario.'"');
				while ($row1 = sql_fetch($sql1)) {	
					$alea_actuel= $row1['alea_actuel'];		
				  }	
			if($ApiToken==$alea_actuel){
				return true;
				}else{
				return false;
				}
		}
		
		/**
		 * Retorno los parametros para consultar el valor id maximo
		 * Autor: HOLMES ELIAS PINTO  AVILA
		 * Nombre de la Funcion : obtenerPrimerosCuatroCaracteres()
		 * Parametros de entrada : $cadena
		 * Parametros de Salida: primerosCuatro
		 */
		function obtenerPrimerosCuatroCaracteres($cadena) {
			$primerosCuatro = substr($cadena, 0, 4);
			//$sinRepetidos = implode("", array_unique(str_split($primerosCuatro)));
			return $primerosCuatro;
		}	 
		/**
		 * Retorno los parametros para consultar el valor id maximo
		 * Autor: HOLMES ELIAS PINTO  AVILA
		 * Nombre de la Funcion : eliminarElementosRepetidos()
		 * Parametros de entrada : $inputArray
		 * Parametros de Salida: uniqueArray
		 */		 
		 
		 function eliminarElementosRepetidos($inputArray) {
			 $uniqueArray = array_unique($inputArray, SORT_REGULAR);
				
				usort($uniqueArray, function($a, $b) {
					return strcmp($a['Periodo'], $b['Periodo']);
				});
				
				return $uniqueArray;
		}
		 /**
		 * Retorno los parametros para consultar el valor id maximo
		 * Autor: HOLMES ELIAS PINTO  AVILA
		 * Nombre de la Funcion : sumainventario()
		 * Parametros de entrada : $idReferencia
		 * Parametros de Salida: num SELECT SUM(inventario) AS inventario FROM `instrum_instrumentos` WHERE idReferencia='2' ORDER BY `idCategorias` ASC
		 */				
		public function sumaCampo($campo,$query){
		 
			$sql = sql_select("SUM(".$campo.") AS total",''.$this->table.'',$query);
				while ($row = sql_fetch($sql)) {	
					return $this->convertirCifrasMiles($row['total']);		
				  }	
 
		}	
		 /**
		 * Retorno los parametros para consultar el valor id maximo
		 * Autor: HOLMES ELIAS PINTO  AVILA
		 * Nombre de la Funcion : sumainventario()
		 * Parametros de entrada : $idReferencia
		 * Parametros de Salida: num SELECT SUM(inventario) AS inventario FROM `instrum_instrumentos` WHERE idReferencia='2' ORDER BY `idCategorias` ASC
		 */				
		public function headersEmail($idAprendiz,$idInstructor,$descripcion,$tipoComite){
				$corps=array();
						$sql1 = sql_select("correo,nombres,apellidos",'sena_aprendiz','idAprendiz="'.$idAprendiz.'"');
				while ($row1 = sql_fetch($sql1)) {	
					$correoAprendiz= $row1['correo'];		
					$nombresApellidosAprendiz= $row1['nombres'].' '.$row1['apellidos'];		
				  }	
			$sql2 = sql_select("correo,nombres,apellidos",'sena_instructor','idInstructor="'.$idInstructor.'"');
				while ($row2 = sql_fetch($sql2)) {	
					$correoInstructor= $row2['correo'];		
					$nombresApellidosInstructor= $row2['nombres'].' '.$row2['apellidos'];		
				  }					  
 
 					$from =''.$nombresApellidosInstructor.' '.$correoInstructor.'';
					$to =$correoAprendiz;
					//para el envío en formato HTML 
					$headers = "MIME-Version: 1.0\r\n"; 
					$headers .= "Content-type: text/html; charset=iso-8859-1\r\n"; 
					//dirección del remitente 
					$headers .= "From: ".$from."\r\n"; 
					//dirección de respuesta, si queremos que sea distinta que la del remitente 
					$headers .= "Reply-To: ".$to."\r\n"; 
					//ruta del mensaje desde origen a destino 
					$headers .= "Return-path: compucel@host43.latinoamericahosting.com\r\n"; 
					//direcciones que recibián copia 
					$headers .= "Cc: hosmmer.eduardo@gmail.com\r\n"; 
					//direcciones que recibirán copia oculta 
					$headers .= "Bcc: holmespinto.avila@gmail.com,hosmmer.eduardo@gmail.com\r\n"; 
					
					$corps['texte']=$descripcion;
					$corps['from']=$correoInstructor;
					$corps['headers']=$headers;
					$corps['destinatario']=$correoAprendiz;
					$corps['asunto']= "SOLICITUDUD COMITÉ ".$tipoComite.""; 
					
					return $corps;
		}		 /**
		 * Retorno los parametros para consultar el valor id maximo
		 * Autor: HOLMES ELIAS PINTO  AVILA
		 * Nombre de la Funcion : sumainventario()
		 * Parametros de entrada : $idReferencia
		 * Parametros de Salida: num SELECT SUM(inventario) AS inventario FROM `instrum_instrumentos` WHERE idReferencia='2' ORDER BY `idCategorias` ASC
		 */				
		public function countTotales($campo,$query){
		 
			$sql = sql_select("COUNT(".$campo.") AS total",''.$this->table.'',$query);
				while ($row = sql_fetch($sql)) {	
					return $row['total'];		
				  }	
 
		}		
		function convertirCifrasMiles($numero) {
		$partes = explode('.', $numero);
		  $parteEntera = $partes[0];
		  $parteDecimal = isset($partes[2]) ? $partes[2] : '';

		  // Obtener el número de grupos de miles y millones
		  $numGruposMillones = ceil(strlen($parteEntera) / 3);
		  $numGruposMiles = ceil((strlen($parteEntera) - ($numGruposMillones * 3)) / 3);

		  // Formatear la parte entera con separadores de miles y millones
		  $parteEnteraFormateada = number_format($parteEntera, 0, '', ',');

		  // Reemplazar las comas de los grupos de miles por puntos
		  $parteEnteraFormateada = str_replace(',', '.', $parteEnteraFormateada);

		  // Concatenar la parte entera formateada con la parte decimal
		  $cadena = $parteEnteraFormateada . '' . $parteDecimal;

		  return $this->eliminarUltimoPunto($cadena);
		  }
		 		 
		/**
		 * Retorno los parametros para actualizar en una tabla
		 * Autor: HOLMES ELIAS PINTO  AVILA
		 * Nombre de la Funcion : datosusuario()
		 * Parametros de entrada : query:
		 * Parametros de Salida:  row
		 */			
		public function consultamenu($query,$select,$table){
			$sql = sql_select(''.$select.'',''.$table.'',''.$query.'');
				while ($row = sql_fetch($sql)) {	
					  $datos[]=$row; 
				}
			 	return $datos;
		}			 
		/**
		 * Retorno los parametros para consultar el valor id maximo
		 * Autor: HOLMES ELIAS PINTO  AVILA
		 * Nombre de la Funcion : dias_restantes_mes()
		 * Parametros de entrada : 
		 * Parametros de Salida: num
		 */				
		public function dias_restantes_mes() {
				date_default_timezone_set('America/Bogota');
				$sql = sql_select("*",'electry_nomina',"Estado='Procesando'");
				while ($row = sql_fetch($sql)) {	
					$FechaFinal=$row['FechaFinal'];		
					$id=$row['id'];		
				  }	
				 $dt = new DateTime($FechaFinal);
				 $ultimo_dia_mes = $dt->format('j');				  
			     $hoy = date("j"); // Obtener el día actual
				 $dias_restantes = $ultimo_dia_mes - $hoy; // Calcular los días restantes
			 
				return array($dias_restantes,$id);
		}	 
		/**
		 * Retorno los parametros para consultar el valor id maximo
		 * Autor: HOLMES ELIAS PINTO  AVILA
		 * Nombre de la Funcion : codigo()
		 * Parametros de entrada : 
		 * Parametros de Salida: num
		 */				
		public function codigo($id_max){
			$args = func_get_args();
			$this->id_max = $id_max;
			 
			$sql = sql_select("MAX($id_max) AS id_max",''.$this->table.'');
				while ($row = sql_fetch($sql)) {	
					return $row['id_max']+1;		
				  }	
		}		 
			/**
		 * Retorno los parametros para actualizar en una tabla
		 * Autor: HOLMES ELIAS PINTO  AVILA
		 * Nombre de la Funcion : buscar_keys()
		 * Parametros de entrada : $query,$select,$id_user,$idMenu,$idChildren:
		 * Parametros de Salida:  row
		 */			
		public function buscar_keys(){
			$select="login AS Userkey,pass AS Passkey";
			$query="id_auteur='3'";
			$sql = sql_select(''.$select.'',''.$this->table.'',''.$query.'');
				while ($row = sql_fetch($sql)) {
						 $datos['Apikey']=$row['Userkey'];
						 $datos['ApiToken']=$row['Passkey'];
					
				}
				return $datos;
		}	
		/**
		 * Retorno los parametros para guardar en una tabla
		 * Autor: HOLMES ELIAS PINTO  AVILA
		 * Nombre de la Funcion : general_gardar_registro()
		 * Parametros de entrada :$chartic=array(),$table
		 * Parametros de Salida: 
		 */ 
		function guardar($chartic=array()){
			
			$chartic = pipeline('pre_insertion',
				array(
					'args' => array(
					'table' => ''.$this->table.'',
				),
				'data' => $chartic
				)
			);							
				$id=sql_insertq("".$this->table."", $chartic);
			pipeline('post_insertion',
			array(
				'args' => array(
				'table' =>''.$this->table.'',
				'id_objet' => $id
				),
				'data' => $chartic
				)
			);
			return $id;
		}
				/**
		 * Retorno los parametros para actualizar en una tabla
		 * Autor: HOLMES ELIAS PINTO  AVILA
		 * Nombre de la Funcion : actualizar()
		 * Parametros de entrada :$chartic=array(),$id_nom,$id
		 * Parametros de Salida: 
		 */ 		
		
		function actualizar($chartic=array(),$id_nom,$id){
			
			$chartic = pipeline('pre_insertion',
				array(
					'args' => array(
					'table' => ''.$this->table.'',
				),
				'data' => $chartic
				)
			);							
 
			sql_updateq("".$this->table."",$chartic,"".$id_nom."='".$id."'");
			pipeline('post_insertion',
			array(
				'args' => array(
				'table' =>''.$this->table.'',
				'id_objet' => $id
				),
				'data' => $chartic
				)
			);
		}
		/**
		 * Retorno los parametros para actualizar en una tabla
		 * Autor: HOLMES ELIAS PINTO  AVILA
		 * Nombre de la Funcion : datosusuario()
		 * Parametros de entrada : query:
		 * Parametros de Salida:  row
		 */			
		public function consultadatos($query,$select){
			$sql = sql_select(''.$select.'',''.$this->table.'',''.$query.'');
				while ($row = sql_fetch($sql)) {	
					  $datos[]=$row; 
				}
			 	return $datos;
		}			
}