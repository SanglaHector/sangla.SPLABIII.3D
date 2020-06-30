import { Anuncio } from "./anuncio.js";

function formatearParaServer(objeto)
{
    objeto.precio = precioDeForm(objeto.precio);
   // objeto.elegit = elegirForm(objeto.elegir);
    return objeto;
}
function formatearParaForm(objeto)
{
    transaccionDeServer(objeto.animal);
    objeto.precio = precioDeServer(objeto.precio);
}
//*Lo que me viene en el server lo formateo para poder cargarlo en el formulario
function transaccionDeServer(transaccion)
{
    let perro = document.getElementById('perro');
    let gato = document.getElementById('gato');
    if(transaccion == "Perro")
    {
        perro.checked = true;
        gato.checked = false;
    }else{
        perro.checked = false;
        false.checked = true;
    }
}
function precioDeServer(precio)
{
    precio = precio.substr(1);
    let arr = precio.split(',');
    let conComa = "";
    let precioNum = "";
    arr.forEach(element => {
        conComa = element.split('.')[1];
    });
    for (let index = 0; index < arr.length - 1; index++) {
        precioNum = precioNum + arr[index];
    }
    arr = arr.reverse();
    precioNum = precioNum + arr[0];
    return precioNum;
}
///////////
///////////*Lo que cargo en el form lo formateo para mandarlo en el server
///////////
function precioDeForm(precio)
{
    let precioString = "";
    let formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      });
    precioString = precioString + formatter.format(precio);
    return precioString;
}
function transaccionDeForm(transaccionNode)//no la uso
{
    let transaccionString = "";
    for (let i = 0; i < transaccionNode.length; i++) {
        let item = transaccionNode[i];

        if(item.checked == true)
        {
            if(i == 0)
            {
                transaccionString = "Perro";
            }else{
                transaccionString = "Gato";
            }
        }
      }
      return transaccionString;
}
export {formatearParaServer,formatearParaForm,precioDeServer,transaccionDeServer,precioDeForm}