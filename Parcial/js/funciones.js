import {Anuncio}  from './anuncio.js'
import{AnuncioMascota} from './anuncioMascota.js'
import {transaccionDeServer,precioDeServer,precioDeForm} from './formateo.js';

//********************** TRATAR DATOS ****************************************************//
function tratarDatos(datos)
{
    if(datos != null)
    {
        let propiedades = [];
       datos.forEach(element => {
           let propiedad = new AnuncioMascota(element.id,element.titulo,element.descripcion,element.animal,element.precio,element.raza,element.fecha,element.elegir);
           propiedades.push(propiedad);
       });
       return propiedades;
    }
    return null;
}

//************************************* HTML ****************************************//
function armarTabla(objetos)
{
    let body = document.getElementById("body");
    objetos.forEach(element => {
        let tr = document.createElement('tr');
        tr.addEventListener('dblclick', cargarElemento)
        body.appendChild(tr);
        tr.appendChild(fnNewTD(element.id));
        tr.appendChild(fnNewTD(element.titulo));
        tr.appendChild(fnNewTD(element.descripcion));
        tr.appendChild(fnNewTD(element.animal));
        tr.appendChild(fnNewTD(element.precio));
        tr.appendChild(fnNewTD(element.raza));
        tr.appendChild(fnNewTD(element.fecha));
        tr.appendChild(fnNewTD(element.elegir));
    });
}
function cargarElemento(obj)
{
    let propiedad = obj.srcElement.parentNode;//me traigo el elemento seleccionado
    let start = propiedad.firstElementChild;//el primer objetos de ese hijo
    let aux = start;
    let arr = Array('txtId','txtTitulo','txtDescripcion','txtPrecio','animal','txtRaza','date','elegir');

    arr.forEach(element => {
        if(element == 'animal')
        {
            let numero = 0;
            if(aux.firstChild.nodeValue == 'PERRO')
            {
                numero = 1;
            }else if(aux.firstChild.nodeValue == 'GATO')
            {
                numero = 2;
            }
            cargarRadios(numero,element);
            aux = aux.nextElementSibling;
        }else if(element == 'txtPrecio')
        {
            let nodo =  getElement(element);
            nodo.value = precioDeServer(aux.firstChild.nodeValue);
            aux = aux.nextElementSibling;
        }else if(element == 'elegir')//aca
        {
            let opcion;
            if(aux.firstChild.nodeValue == 'Si')
            {
                opcion = 1;
            }else if(aux.firstChild.nodeValue == 'No')
            {
                opcion = 2;
            }
            cargarSelect(element,opcion);
            aux = aux.nextElementSibling;
            //tratarCombo('elegir');
        }
        else{
            let nodo =  getElement(element);
            nodo.value = aux.firstChild.nodeValue;
            aux = aux.nextElementSibling;
        }
    });
    /*console.log(start);//este es el td
    console.log(start.firstChild);//este el objeto dentro del td
    console.log(start.firstChild.nodeValue);*///el valor dento del objeto del td
}
function ordenarTabla(obj)
{
    let name = obj.srcElement.getAttribute('name');
    let tr = document.getElementsByTagName('tr');
    let trArray = Array.from(tr);
    trArray.shift();//tengo todas las finals
    
    let trOrdenado = trArray.sort((a,b)=>{//a y b son trs
        let celdasA = Array.from(a.childNodes);
        let celdasB = Array.from(b.childNodes);
        let compararA ="";
        let compararB ="";
        celdasA.forEach(element => {
            if(element.getAttribute('name') == name)
            {
                compararA = element.textContent;
            }
        });
        celdasB.forEach(element => {
            if(element.getAttribute('name') == name)
            {
                compararB = element.textContent;
            }
        });
        if(name == 'CELDAPRECIO')
        {
           compararA =  precioDeServer(compararA);
           compararB =  precioDeServer(compararB);
           return compararA-compararB;
        }else if(name == 'CELDAID')
        {
            compararA = new Number(compararA);
            compararB = new Number(compararB);
            return compararA-compararB;
        }
        return compararA.localeCompare(compararB);
    });
    return trOrdenado;
}
function reOrdenarFilas(obj)
{
    let nuevoOrden = ordenarTabla(obj);
    let tr = document.getElementsByTagName('tr');
    let tbody = document.getElementsByTagName('tbody');
    let trArray = Array.from(tr);
    trArray.shift();
    trArray.forEach(element => {
        element.remove();
    });
    nuevoOrden.forEach(element => {
        tbody[0].appendChild(element);
    });

}
function getElement(elemeto)
{
    return document.getElementById(elemeto);
}
function fnNewTD(varData) 
{
    let td = document.createElement('td');
    let text = document.createTextNode(varData);
    td.appendChild(text);

    return td;
}
function armarPropiedadDesdeForm()
{
    let id = getElement("txtId").value;
    let titulo = getElement("txtTitulo").value;
   // let animal = document.getElementsByName('transaccion');//
    let animal = verRadios('animal');//retorna el valor en string del chckbox
    if(animal == 1)
    {
        animal = 'PERRO';
    }else if ( animal == 2)
    {
        animal = 'GATO';
    }else{
        animal = '';
    }
    let descripcion = getElement("txtDescripcion").value;
    let precio = getElement("txtPrecio").value;
    let raza = getElement("txtRaza").value;
    let date = getElement("date").value;
    let elegir = getElement("elegir").value;
    return new AnuncioMascota(id,titulo,descripcion,animal,precio,raza,date,elegir);
}

function limpiarTabla()
{
    let trs = document.querySelectorAll('tr');
    let body = getElement("body");

    for (let i = 1; i < trs.length; i++) {
        let item = trs[i];
        body.removeChild(item); 
      }
}
function limpiarTablaDinamica()
{
    let tabla = document.getElementById('tablaDinamica');
    let contenedor = document.getElementById('paraTabla');
    if(tabla != null)
    {
        contenedor.removeChild(tabla);
    }
}
function porDefault()
{
    getElement('txtId').value = 0;
    getElement('txtTitulo').value = "";
    getElement('txtDescripcion').value = "";
    getElement('txtPrecio').value = "";
    getElement('txtRaza').value = "";
    getElement('date').value = 'dd/mm/aaaa';
    cargarRadios(3,'animal')
    cargarSelect('elegir',3);
}
//******************************MEJORAS PARA LEER Y CARGAR DOM **************************************/
function verRadios(selectId)
{
    let select = getElement(selectId);
    select= select.firstElementChild;
    let check1 = select.nextElementSibling;//perro
    let check2 = check1.nextElementSibling;//gato

    check1 = check1.firstElementChild;
    check2 = check2.firstElementChild;
    if(check1.checked == true)
    {
        return 1;

    }else if(check2.checked == true)
    {
        return 2;
    }else
    {
        return 0;
    }
}
function cargarRadios(numero,selectId)
{
    let select = getElement(selectId);
    select= select.firstElementChild;
    let check1 = select.nextElementSibling;//perro
    let check2 = check1.nextElementSibling;//gato

    check1 = check1.firstElementChild;
    check2 = check2.firstElementChild;
    if(numero == 1 )
    {
        check1.checked = true;
        check2.checked = false;
    }else if( numero == 2)
    {
        check2.checked = true;
        check1.checked = false;
    }else
    {
        check1.checked = false;
        check2.checked = false;
    }
}
function cargarSelect(selectId,opcion)
{
    let select = getElement(selectId);
    if(opcion == 1)
    {
        select.firstElementChild.selected = true;
    }else if(opcion == 2)
    {
        select.firstElementChild.nextElementSibling.selected = true;
    }else
    {
        select.firstElementChild.selected =  false;
        select.firstElementChild.nextElementSibling.selected =  false;
    }
}
//******************************* Spinner **************************************************/
function spinnerOn()
{
    let estructura = document.getElementById('tabla');
    let forms = document.getElementsByTagName('form');
    let imagen = document.createElement('img');
    let contenedor =  document.createElement('div');
    
    
    forms.item(0).hidden = true;

    contenedor.width = '100%';
    contenedor.display = 'flex';
    contenedor.align= 'center';
    contenedor.setAttribute('class','contenedorSpinner')

    contenedor.appendChild(imagen);

    imagen.setAttribute('src','../img/spinner.gif');
    imagen.width="200";
    imagen.height="200";
    imagen.align="middle";
    imagen.setAttribute('position','-webkit-sticky');
    imagen.setAttribute('top','300px');

    
    estructura.append(contenedor);
}
function spinnerOff()
{
    let estructura = document.getElementById('header');
    let forms = document.getElementsByTagName('form');
    let contenedor =  document.getElementsByClassName('contenedorSpinner');


    forms.item(0).hidden = false;

    contenedor = contenedor.item(0);
    contenedor.remove();

}
/******************************** Tabla dinamica ****************************************************/

function crearTabla(arr){
    let tabla = document.createElement('table');
    tabla.appendChild(crearCaberceraTabla(arr[0]));//creo la cabecera con el primer elemento , pero lo podria crear con cualqier
    tabla.appendChild(crearCuerpoTabla(arr))
    tabla.classList.add('table');
    //agregar clases bootstrap para tabla
    tabla.classList.add('table-striped');
    tabla.classList.add('table-bordered');
    tabla.classList.add('table-hover');
    tabla.classList.add('table-dark');
    tabla.classList.add('table-responsive{-sm|-md|-lg|-xl}');


    tabla.id = 'tablaDinamica';
    return tabla;
}
function crearCaberceraTabla(objeto)
{
    let tHead = document.createElement('thead');
    let tr  = document.createElement('tr');
    for(const key in objeto)
    {
        let th = document.createElement('th');
        th.classList.add('text-center');//bootstrap
        th.addEventListener('click', reOrdenarFilas)
     //   th.scope = 'col';//bootstrap
        let texto = document.createTextNode(key.toLocaleUpperCase());//key vendria a ser el indice de un array pero el objeto, aca le saco el atributo y lo convierto en strting, buenisimo
        let name = "CELDA" + texto.textContent;
        th.setAttribute("name",name);
        th.appendChild(texto);
        tr.appendChild(th);
    }//una vez que termino de reccorrer la propiedads del objeto termina el for
    tHead.appendChild(tr);
    
    return tHead;
}
function crearCuerpoTabla(arr)
{
    let tBody = document.createElement('tBody');
    arr.forEach(element => {
        //puedo reccorer el objeto con el for in!!!
        let tr = document.createElement('tr');
        tr.classList.add('table-warning');//bootstrap
        tr.addEventListener('dblclick', cargarElemento)
        for (const key in element) {
            let name = "CELDA" + key.toUpperCase();
            let td = document.createElement('td');
            td.setAttribute('name',name);
            let texto = document.createTextNode(element[key]);
            td.appendChild(texto);//contruyo celda
            tr.appendChild(td);//contruyo columna

            td.classList.add('text-secondary');
            td.classList.add('text-center');
        }
        tBody.appendChild(tr);//construyo filas
    });    
    return tBody;
}
function refreshDiv(div, tabla)
{
    while(div.hasChildNodes())
    {
        div.removeChild(thead.firstElementChild);
    }
    div.appendChild(tabla);
}
function crearDrop(padre)
{
    let drop = document.getElementById('btnFiltrar');
    let flecha = document.getElementById('flecha');
    let promedio = document.getElementById('contenedorPromedio');
  //  drop.hidden = false; boton filtrar
   // flecha.hidden = false;
    promedio.hidden =  false;

}
function cargarDrop(arr)
{
    let select = document.getElementById('selectFiltros');
    $('.dropdown-menu').on('click', function (e) {
        e.stopPropagation();
      });
    for (const key in arr) {
        if (arr.hasOwnProperty(key)) {
            const element = arr[key];
            let option = document.createElement('option');
            option.append(key.toLocaleUpperCase());
            select.appendChild(option);
        }
    }
}
function eliminarDrop(padre)
{
    let drop = document.getElementById('containerdrop');
    if(drop != null)
    {
        padre.removeChild(drop);
    }
}
function verDrop()
{
    let options = $('#selectFiltros option:selected');
    let arr = Array();
    options.each((index,option)=>{
        let x = option.textContent;
        arr.push(x);
    });
    return arr;
}
function filtrarDatos(arr)
{
    let th = document.getElementsByTagName('th');
    let tr = document.getElementsByTagName('tr');//fila
    let td = document.getElementsByTagName('td');//celda
    esconder();
    let name = "CELDA";
    for (let index = 0; index < arr.length; index++) {
        const element = arr[index];
        name = name + element;
        let celdas = document.getElementsByName(name);
        for (const iterator of celdas) {
           // iterator.hidden = true;
            iterator.hidden = false;
           
        }
        name = "CELDA";
    }   
}
function esconder()
{
    let th = document.getElementsByTagName('th');
    let td = document.getElementsByTagName('td');//celda
    for (const iterator of th) {
        iterator.hidden = true;
    }
    for (const iterator of td) {
        iterator.hidden = true;
    }
}
function normalizarTabla()
{
    let th = document.getElementsByTagName('th');
    let td = document.getElementsByTagName('td');//celda
    for (const iterator of th) {
        iterator.hidden = false;
    }
    for (const iterator of td) {
        iterator.hidden = false;
    }
}
function calcularPromedio(trArray)
{
    let promedio = getElement('promedio');
   /* let option = verSelect('selectAnimal').textContent;
    let trArray = retornarFilas(option);*/
    let precioFinal = 0;
    let cantidad = 0;
    
    trArray.forEach(element => {
        let celdas = Array.from(element.childNodes);
        celdas.forEach(celdaElement => {
            if(celdaElement.getAttribute('name') == 'CELDAPRECIO')
            {
               let precio = precioDeServer(celdaElement.textContent);
               precioFinal = parseInt(precioFinal) + parseInt(precio);
               cantidad ++;
            }
        });
    });
    promedio.value = precioDeForm((precioFinal / cantidad)) ;
}
function retornarFilas(filtro)//para select Animal
{
    let tr = document.getElementsByTagName('tr');
    let trArray = Array.from(tr);
    trArray.shift();
    let filtroArray = Array();
    if(filtro == 'AMBOS')
    {
        return trArray;
    }else
    {
        trArray.forEach(element => {
            let celdas = Array.from(element.childNodes);
            celdas.forEach(celdaElement => {
                if(celdaElement.getAttribute('name') == 'CELDAANIMAL' && filtro == celdaElement.textContent)
                {
                    filtroArray.push(element);
                }
            });
        });
        return filtroArray;
    }
}
function retornarCeldas(name)//retorna todas las celdas con el imsmo nombre, menos la de la cabecera
{
    let tr = document.getElementsByTagName('tr');
    let trArray = Array.from(tr);
    trArray.shift();
    let celdasArray = Array();
    trArray.forEach(element => {
        let celdas = Array.from(element.childNodes);
        celdas.forEach(celdaElement => {
            if(celdaElement.getAttribute('name') == name)
            {
                celdasArray.push(celdaElement);
            }
        });
    });
    return celdasArray;
}
function verSelect(id)
{
    let select = getElement(id);
    let selectArray = Array.from(select.children);
    let retorno;
    selectArray.forEach(element => {
        if(element.selected == true)
        {
            retorno =  element;
        }
    });
    return retorno;
}
function traerCheckeados()
{
    let checks = $('input[name=check]');
    let arr = Array();
    checks.each((index,option)=>{
        if(option.checked == true)
        {
            let x = option.value;
            arr.push(x);
        }
    });
    return arr;
}
function tildarChecks(objChecks)
{
    let checks = traerCheckeados();

    let checkss = $('input[name=check]');
    checkss.each((index,option)=>{
        option.checked = false;
    });

    
    for (const key in objChecks) {
        if (objChecks.hasOwnProperty(key)) {
            const element = objChecks[key];
            if(element == true)
            {
                checks.forEach(elementCh => {
                    if(key == elementCh)
                    {
                        tildoUnCheck(elementCh);
                       // objChecks[key] = true;
                    }
                });
            }
        }
    }
}
function tildoUnCheck(elementCh)
{
    let checks = $('input[name=check]');
    
    checks.each((index,option)=>{
        if(option.value == elementCh)
        {   
            option.checked = true;
        }
    });
}
export {tratarDatos,armarTabla,armarPropiedadDesdeForm,limpiarTabla,limpiarTablaDinamica,porDefault,
    spinnerOn,spinnerOff,crearTabla,refreshDiv,crearDrop,cargarDrop,eliminarDrop,verDrop,
    filtrarDatos,normalizarTabla,
    calcularPromedio,verSelect,retornarFilas,
    traerCheckeados,tildarChecks}