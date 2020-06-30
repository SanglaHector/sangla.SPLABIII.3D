import {Anuncio}  from './anuncio.js'
import {altaXML,modificarXML,getXML,altaFetch,modificarFetch,bajaFetch,getFetch,alta,baja} from './serverComunication.js'
import {tratarDatos,armarTabla,armarPropiedadDesdeForm,limpiarTabla,limpiarTablaDinamica,
        porDefault,spinnerOn,spinnerOff,crearTabla,refreshDiv,
        crearDrop,cargarDrop,eliminarDrop,verDrop,filtrarDatos,normalizarTabla,
        calcularPromedio,verSelect,retornarFilas,
        traerCheckeados} from './funciones.js';
import {formatearParaServer,formatearParaForm} from './formateo.js';
import {cargarLocalStorage} from './localStorage.js';
export class AnuncioMascota extends Anuncio
{
    id;
    titulo;
   // transaccion;
    descripcion;
    animal;
    precio;
    raza;
    fecha;
    elegir;
    
    constructor(id,titulo,descripcion,animal,precio,raza,fecha,elegir)
    {
        super(id,titulo,descripcion,precio);
        this.id = id;
        this.titulo = titulo;
     //   this.transaccion = "VENTA";
        this.descripcion = descripcion;
        this.animal =  animal;
        this.precio = precio;
        this.raza = raza;
        this.fecha = fecha;
        this.elegir = elegir;
    }
    
    static async traerPropiedades()
    {
        let botones = document.getElementById('botones');
        const traer = 'http://localhost:3000/traer';
        limpiarTablaDinamica();
        eliminarDrop(botones);
        spinnerOn();
        let datos = await getXML(traer);
        spinnerOff();
        if(datos != null)
      /*  {
            let propiedades =  tratarDatos(datos.data);
            let arr = Array.from(propiedades);
            let tabla = crearTabla(arr);
            crearDrop(botones);
            let div = document.getElementById('paraTabla');
            cargarDrop(arr[0]);
            div.appendChild(tabla);
            let option = verSelect('selectAnimal').textContent.toLocaleUpperCase();
            let trArray = retornarFilas(option);
            calcularPromedio(trArray);
        }*/
        AnuncioMascota.armarPagina(datos.data);
        porDefault();
    }
    static armarPagina(datos)
    {
        if(datos != null)
        {
            let propiedades =  tratarDatos(datos);
            let arr = Array.from(propiedades);
            let tabla = crearTabla(arr);
            crearDrop(botones);
            let div = document.getElementById('paraTabla');
            cargarDrop(arr[0]);
            div.appendChild(tabla);
            let option = verSelect('selectAnimal').textContent.toLocaleUpperCase();
            let trArray = retornarFilas(option);
            calcularPromedio(trArray);
            normalizarTabla();
            let arrCheck = traerCheckeados();
            filtrarDatos(arrCheck);
            cargarLocalStorage(arrCheck);
        }
    }
    static async altaPropiedad()
    {
        const alta = 'http://localhost:3000/alta';
        let propiedad = armarPropiedadDesdeForm();
        propiedad = formatearParaServer(propiedad);
        propiedad.id = 0;
        
        spinnerOn();
        limpiarTablaDinamica();
        let response = await altaXML(alta,propiedad);

        spinnerOff();
        if(response.message == "Alta Exitosa")
        {
            AnuncioMascota.traerPropiedades();
            return true;
        }else
        {
            return false;
        }
    }
    static async eliminarPropiedad()
    {
        const bajaU = 'http://localhost:3000/baja';
        
        if(confirm("¿Desea eliminar esta publicacion?"))
        {
            let propiedad = armarPropiedadDesdeForm();
            spinnerOn();
            limpiarTablaDinamica();
    
            let response = await baja(bajaU,propiedad);
    
            spinnerOff();
            if(response.message == "Baja Exitosa")
            {
                AnuncioMascota.traerPropiedades();
                return true;
            }else
            {
                return false;
            }
        }
    }
    
    static async modificarPropiedad()
    {
        const modif = 'http://localhost:3000/modificar';
        if(confirm("¿Desea guardar cambios?"))
        {
            let propiedad = armarPropiedadDesdeForm();
            propiedad = formatearParaServer(propiedad);
            spinnerOn();
            limpiarTablaDinamica();
    
            let response = await modificarXML(modif,propiedad);
    
            spinnerOff();
            if(response.message == "Modificacion Exitosa")
            {
                AnuncioMascota.traerPropiedades();
                return true;
            }else
            {
                return false;
            }
        }
    }
    static filtrarTabla()
    {
        normalizarTabla();
        let arr = verDrop();
        filtrarDatos(arr);
    }
    static reCalcularPromedio()
    {
        let option = verSelect('selectAnimal').textContent.toLocaleUpperCase();
        let trArray = retornarFilas(option);
        calcularPromedio(trArray);
    }
    static reArmerTabla()
    {
        normalizarTabla();
        let arrCheck = traerCheckeados();
        filtrarDatos(arrCheck);
        cargarLocalStorage(arrCheck);
    }
}