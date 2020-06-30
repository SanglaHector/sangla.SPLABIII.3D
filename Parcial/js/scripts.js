import {AnuncioMascota}  from './anuncioMascota.js';
import {porDefault} from './funciones.js';
import { inicializarManejadores } from './localStorage.js';

let botonTraer = document.getElementById("btnBuscar");
let botonEliminar = document.getElementById("btnEliminar");
let botonModificar = document.getElementById("btnModificar");
let botonLimpiar = document.getElementById("btnLimpiar");
//let botonFiltrar = document.getElementById("btnFiltrar");
let form = document.forms[0];
let select = document.getElementById('selectAnimal');
let checks = document.getElementById('checks');

botonTraer.addEventListener('click',AnuncioMascota.traerPropiedades);
botonEliminar.addEventListener('click',AnuncioMascota.eliminarPropiedad);
botonModificar.addEventListener('click',AnuncioMascota.modificarPropiedad);
botonLimpiar.addEventListener('click',porDefault);
//botonFiltrar.addEventListener('click',AnuncioMascota.filtrarTabla);

form.onsubmit = (e)=>{
    e.preventDefault();
    AnuncioMascota.altaPropiedad();
};
select.onchange = (e)=>
{
    e.preventDefault();
    AnuncioMascota.reCalcularPromedio();
}
checks.onclick = (e)=>
{
    AnuncioMascota.reArmerTabla();
}
window.addEventListener('load',inicializarManejadores);
//inicializarManejadores(listaMascotas);
