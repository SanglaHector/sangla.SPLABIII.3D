import{AnuncioMascota} from './anuncioMascota.js'
import {traerCheckeados,tildarChecks} from './funciones.js';

function inicializarManejadores()
{
    let checks = traerCheckeados();
    let objChecks = {
        ID:false,
        TRANSACCION:false,
        TITULO:false,
        DESCRIPCION:false,
        PRECIO:false,
        ANIMAL:false,
        RAZA:false,
        FECHA:false,
        ELEGIR:false
    };
    for (const key in objChecks) {
        if (objChecks.hasOwnProperty(key)) {
            const element = objChecks[key];
            checks.forEach(elementCh => {
                if(key == elementCh)
                {
                    objChecks[key] = true;
                }
            });
        }
    }
    
    if(!localStorage.getItem('listaCheck'))
    {
        localStorage.setItem('listaCheck',JSON.stringify(objChecks));
    }else
    {
        objChecks = JSON.parse(localStorage.getItem('listaCheck'));
        tildarChecks(objChecks);
    }
}
function cargarLocalStorage(checks)
{
    let objChecks = {
        ID:false,
        TRANSACCION:false,
        TITULO:false,
        DESCRIPCION:false,
        PRECIO:false,
        ANIMAL:false,
        RAZA:false,
        FECHA:false,
        ELEGIR:false
    };
    for (const key in objChecks) {
        if (objChecks.hasOwnProperty(key)) {
            const element = objChecks[key];
            checks.forEach(elementCh => {
                if(key == elementCh)
                {
                    objChecks[key] = true;
                }
            });
        }
    }
    localStorage.setItem('listaCheck',JSON.stringify(objChecks));
}
export {inicializarManejadores,cargarLocalStorage}