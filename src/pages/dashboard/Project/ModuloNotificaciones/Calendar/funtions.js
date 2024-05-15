
//const loadings = (loading) => {loading? <div className=""></div>:''};
function extraerNumero(cadena) {
  // Utilizamos una expresión regular para extraer el número de la cadena
  const match = cadena.match(/-?(\d+)/);

  // Si hay un match, devolvemos el número como un entero, de lo contrario devolvemos null
  return match ? parseInt(match[1], 10) : null;
}
function filtrarPorMes(eventos, mes) {
  // Filtrar eventos por mes
  const eventosFiltrados = eventos.filter((evento) => {
    const fechaInicio = new Date(evento.start);
    const mesEvento = fechaInicio.getMonth() + 1; // getMonth devuelve un valor de 0 a 11

    return mesEvento === mes;
  });
  // Extraer números de la propiedad title
  const indicesTitle = eventosFiltrados.map((evento) => extraerNumero(evento.title));

  return indicesTitle;

}
function extraerId(objeto) {
   // Verificar si el objeto tiene la propiedad "id" y si su valor es un número válido
   if (objeto && objeto.id && !isNaN(objeto.id)) {
    return parseInt(objeto.id, 10);
  }

  // En caso de que no se pueda extraer un ID válido, devolver null
  return null;
}
function obtenerMesActual() {
  const fechaActual = new Date();
  const mesActual = fechaActual.getMonth() + 1; // Sumamos 1 porque los meses van de 0 a 11
  return mesActual;
}
function mesANumero(nombreMes) {
  const meses = {
    'ENERO': 1,
    'FEBRERO': 2,
    'MARZO': 3,
    'ABRIL': 4,
    'MAYO': 5,
    'JUNIO': 6,
    'JULIO': 7,
    'AGOSTO': 8,
    'SEPTIEMBRE': 9,
    'OCTUBRE': 10,
    'NOVIEMBRE': 11,
    'DICIEMBRE': 12
  };

  // Convertir a mayúsculas y obtener el número del mes
  const numeroMes = meses[nombreMes.toUpperCase()];

  // Devolver el número del mes o null si no se encuentra
  return numeroMes || null;
}

function extraerMes(cadena) {
  const palabras = cadena.split(' ');

  if (palabras.length === 4 && palabras[1] === 'DE') {
    return mesANumero(palabras[0]);
  }

  if (palabras.length === 7 && palabras[1].length === 3 && palabras[5].length === 3) {
    return mesANumero(palabras[5]);
  }

  if (palabras.length === 6 && palabras[1] === 'DE') {
    return mesANumero(palabras[2]);
  }

  return null;
}
function extraerTextoDesdeElemento(elemento) {
  if (elemento) {
    return elemento.textContent.trim().toUpperCase();
  }
  return null;
}

export {filtrarPorMes, extraerId,obtenerMesActual,extraerNumero,extraerMes ,extraerTextoDesdeElemento};
