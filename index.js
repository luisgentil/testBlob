

window.onload = function() {

// muestra los botones de compartir al pulsar el botón 'comartir'


ocultar = function() {
	 ff = window.clearInterval(ff);
	 console.log("Stop");
};


myTimer = function() {
/*	console.log(resto);
	document.getElementById("d_0_D").innerHTML = resto; */
	const d = new Date();
  	document.getElementById("d_0_D").innerText = d.toLocaleTimeString();
	var resto0 = indice % num_diapos;
	indice = indice + 1;
	var resto = indice % num_diapos;
	var texto0 = "diapositiva_" + resto0;
	var texto = "diapositiva_" + resto;
	console.log(texto0, texto);
	document.getElementById(texto0).classList.toggle("d-none");
	document.getElementById(texto).classList.toggle("d-none");
	if (indice >= 7) {window.clearInterval(ff)};
};

var num_diapos = 4;
var indice = 0;
const saveButton = document.querySelector('#save');
var ff = window.setInterval(myTimer, 1000);

// esto proviene de test.html, y habrá que depurarlo

// Al elegir un directorio, se genera el evento y lanza la función que lee el contenido del directorio. Lo carga en una lista 'listing'
document.getElementById("filepicker").addEventListener("change", function(event) {
 // let output = document.getElementById("listing"); // esto es opcional, para mostrar los hijos en forma de lista
  let files = event.target.files;
  let textSolo = "";
  for (let i=files.length-1; i>-1; i--) {
  //  let item = document.createElement("li");
  //  item.innerHTML = files[i].webkitRelativePath;
    textSolo += files[i].webkitRelativePath +'\n';
  //  output.appendChild(item);
 //   extraerDir(files[i].webkitRelativePath);
  };

  var listado = textSolo; // document.getElementById("listing").innerText;
  //console.log(listado);
  //console.log("texto solo", textSolo);
  var elementos = listado.split("\n");

  // El listado de texto que contiene todo lo que hay en el directorio
  // se convierte en una lista de listas e imágenes --> diapositivas.
  var lasDiapositivas = procesarDir(listado);
  // Con la lista de diapositivas, ya podemos construir la presentación final 
  document.getElementById("borrar").innerText = "test"; //procesarDir(listado);//lasDiapositivas;
//  console.log("A ver ", localStorage.listaDiapos);
  construirPresentacion(lasDiapositivas);
  // Finalmente, activamos el botón de Descargar (saveButton) y permitimos la descarga
  saveButton.disabled = false;
 // guardarArchivoDeTexto(textoCreado, "\/"+ localStorage.getItem("dirRaiz") + "\/" + "nombre.html");

}, false);

/* ESTRUCTURA DE DATOS
un Object clave:valor, donde cada carpeta es una clave, y cada valor una lista de url de fotos. 
Ejm:
listaDiapositivas = {1.Uno: ['400.png'], 2-Dos:['ffffff.png', '640x480.png'] , 3 Tres: ['Tres-1.png','Tres-2.png', 'Tres-3.png'] , 4 Cuatro: ['Cuatro-1.png','Cuatro-2.png','Cuatro-3.png','Cuatro-4.png']}

*/

function procesarDir(listaFicheros) {
	// Devuelve una lista de diapositivas: lista de listas con las url de cada imagen.

	var elementos = listaFicheros.split("\n"); // es una lista con cada url de imagen
	// directorio-raiz debe ser siempre el primer elemento, igual al del primer elemento
	 // si el primer elemento sólo tiene 1 ó 2 elementos, es xq faltan carpetas o fotos.
	 var dirRaiz = "";
	 var listaDiapositivas = []; // un objeto clave:valor de listas

	 let primerElemento = elementos[0].split("/");
	if (primerElemento.length <= 1) {		
		console.log("Demasiado corto, faltan carpetas.")
		return 0;}
	else {
		var dirRaiz = primerElemento[0];
		var dirDiapo1 = primerElemento[1];
		console.log(dirRaiz, dirDiapo1);
		//localStorage.setItem("dirRaiz", "C:\\Users\\isabel\\Downloads\\Apps_Programación\\Presentador\\app" + '\/' + dirRaiz); // esto no funciona, sigue descargando el fichero en Descargas, con un nombre más largo
	}

	// recorremos todos los elementos para averiguar cuántas carpetas (= diapositivas) y fotos tenemos.
	// cada elemento debe tener 3 elementos: dirRaiz, carpetaDiapositiva, nombreFoto.
	// recorriendo cada elemento, debemos ir añadiendo nombreFoto a la lista de nombre "carpetaDiapositiva"
	// NUEVO: puede tener más subcarpetas. Lo leemos al revés: elemento -1 es nombreFoto, -2: carpetaDiapositiva.
	//Así no importa cuántos niveles de carpetas tengamos.
	// al terminar, añadir a listaDiapositivas [carpetaDiapositiva] : [la lista de nombresFotos de esa carpetaDiapotiva]
	console.log("Elementos:", elementos);
	for (i =0; i<elementos.length; i++) {
		cadaFichero = elementos[i];
		let suDirectorio = cadaFichero.split("/"); // una lista de al menos 3: dirRaiz, carpetaDiapositiva, nombreFoto. NUEVO: leemos desde el final, así no importa cuántos niveles tengamos.
		
		// Comprueba cada fichero, si es o no una imagen.
		console.log(cadaFichero, comprobarImagen(suDirectorio[suDirectorio.length-1]));
		// Si no es una imagen, continua revisando la lista. 
		if (comprobarImagen(suDirectorio[suDirectorio.length-1]) == false){continue;}
		// Si es una imagen, la añade a la lista
		else {
			// En una lista de 3 elementos: [0]= lista.length -3; [1]=length length-2, [2]= length-1.
			// si existe carpetaDiapositiva en la listaDiapositivas: se añade la nueva imagen
			if (listaDiapositivas[suDirectorio[suDirectorio.length -2]]){
			listaDiapositivas[(suDirectorio[suDirectorio.length -2])].push(cadaFichero);}
			// si no existe, se crea como clave, asignando el primer valor como una lista.
			else {
				listaDiapositivas[(suDirectorio[suDirectorio.length-2])] = [cadaFichero];
				}
		}
	}
	console.log("listaDiapositivas:", listaDiapositivas);
	
	
	return listaDiapositivas;
}

// comprobarImagen(nombre) es una función que verifica si un fichero acaba en jpg, png, gif.
function comprobarImagen(url) {
	let aa = url.split('.');
	let bb = aa[aa.length-1];
    return ['jpg', 'png', 'gif'].includes(bb);
	}


function extraerDir(cadaFichero) {
	// Obtenemos el directorio de cada fichero, contenido en la lista del directorio
	let suDirectorio = cadaFichero.split("/");
	console.log(suDirectorio);
}


}
