//funciones con application/x-www
function armarUrl(objeto)
{
    return `id=${objeto.id}&titulo=${objeto.titulo}&transaccion=${objeto.transaccion}&descripcion=${objeto.descripcion}&precio=${objeto.precio}&num_wc=${objeto.num_wc}&num_estacionamiento=${objeto.num_estacionamiento}&num_dormitorio=${objeto.num_dormitorio}`;
}
function alta(url,objeto)
{
    let xhr = new XMLHttpRequest();
    let mandar = armarUrl(objeto);
    return new Promise((resolve,reject) =>
    {
        xhr.onreadystatechange = ()=>{
            if(xhr.readyState == 4)
            {
                if(xhr.status == 200)
                {
                    resolve(JSON.parse(xhr.responseText));
                }else
                {
                    reject(JSON.parse(xhr.responseText));
                }
            }
         };
        xhr.open('POST',url);
        xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
        xhr.send(mandar);//mandar
    });
}
function baja(url,objeto)
{
    let xhr = new XMLHttpRequest();
    let mandar = armarUrl(objeto);
    return new Promise((resolve,reject) =>
    {
        xhr.onreadystatechange = ()=>{
            if(xhr.readyState == 4)
            {
                if(xhr.status == 200)
                {
                    resolve(JSON.parse(xhr.responseText));
                }else
                {
                    reject(JSON.parse(xhr.responseText));
                }
            }
         };
        xhr.open('POST',url);
        xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
        xhr.send(mandar);//mandar
    });
}
//funciines con XML
 function getXML(url)
{
    try{
        let xhr = new XMLHttpRequest();
        return new Promise((resolve,reject)=>{
            xhr.onreadystatechange = ()=>
            {
                if(xhr.readyState == 4)
                {
                    if(xhr.status == 200)
                    {
                        resolve(JSON.parse(xhr.responseText));
                    }else
                    {
                        reject(xhr);
                    }
                }
            };
            xhr.open('GET',url);
            xhr.send();
        });
    }catch(e)
    {
        console.log(e);
    }
}

function  altaXML(url,objeto)
{
    let xhr = new XMLHttpRequest();
    return new Promise((resolve,reject)=>
    {
        xhr.onreadystatechange = ()=>{
            if(xhr.readyState == 4)
                {
                    if(xhr.status == 200)
                    {
                        resolve(JSON.parse(xhr.responseText));
                    }else
                    {
                        reject(xhr);
                    }
                }
        };

        xhr.open('POST',url);
        xhr.setRequestHeader('content-type','application/json');//
        xhr.send(JSON.stringify(objeto));
    });
}
function modificarXML(url,objeto)
{
    let xhr = new XMLHttpRequest();
    return new Promise((resolve,reject)=>
    {
        xhr.onreadystatechange = ()=>{
            if(xhr.readyState == 4)
                {
                    if(xhr.status == 200)
                    {
                        resolve(JSON.parse(xhr.responseText));
                    }else
                    {
                        reject(xhr);
                    }
                }
        };

        xhr.open('POST',url);
        xhr.setRequestHeader('content-type','application/json');//
        xhr.send(JSON.stringify(objeto));
    });
}
function bajaXML(url,objeto)
{
    let xhr = new XMLHttpRequest();
    let urlAlta = armarUrlBaja(url,objeto);
    xhr.onreadystatechange = ()=>{
        if(xhr.readyState == 4)
        {
            return JSON.parse(xhr.responseText);
        }else
        {
            return JSON.parse(xhr.responseText);   
        }
    };
    xhr.setRequestHeader('content-type','application/json');
    xhr.open('POST',url);
    xhr.send(JSON.stringify(objeto));
}
//funcion con fetch, funcionan
function getFetch(url)
{
  return fetch(url)
   .then(res =>res.text())
   .then(data =>{
      return JSON.parse(data);
   })
   .catch(()=>{
      return null;
   });
}
function altaFetch(url,objeto)
{
    return fetch(url,{
        method:'POST',
        headers:{'content-type':'application/json'},
        body:JSON.stringify(objeto)
    })
    .then((res) =>{
        return res.text();
    })
    .then(data =>{
       return JSON.parse(data);
    })
    .catch(()=>{
       return null;
    });
}
function bajaFetch(url,objeto)
{
    return fetch(url,{
        method:'POST',
        headers:{'content-type':'application/json'},
        body:JSON.stringify(objeto)
    })
    .then((res) =>{
        return res.text();
    })
    .then(data =>{
       return JSON.parse(data);
    })
    .catch(()=>{
       return null;
    });
}
function modificarFetch(url,objeto)
{
    return fetch(url,{
        method:'POST',
        headers:{'content-type':'application/json'},
        body:JSON.stringify(objeto)
    })
    .then((res) =>{
        return res.text();
    })
    .then(data =>{
       return JSON.parse(data);
    })
    .catch(()=>{
       return null;
    });
}
export{getFetch,getXML,altaFetch,bajaFetch,modificarFetch,alta,altaXML,baja,modificarXML}