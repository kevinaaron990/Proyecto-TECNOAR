//****************FUNCIONES ******************************************
$(document).ready(function () {
    funcionCascaron();
});

async function funcionCascaron (){
    await cargarProductos();
};

async function cargarProductos (){  
    await $.getJSON(archivoJson, 
        function (data, textStatus) {
            if (textStatus==="success"){
                productos=data;
                for (producto of productos) {
                    
                    $(".cards").append(
                        `<div class="card card2" id="${producto.id}">
                            <div class="cont-img">
                                <img src="${producto.imagen}" class="card-img-top img-responsive" alt="...">     
                            </div>    
                            <div class="card-body card-productos">
                                <h5 class="card-title">${producto.producto} ${producto.marca}</h5>
                                <h6>$ ${producto.precio}</h6>
                                <p class="card-text">${producto.marca} ${producto.modelo}</B></p>
                                <div id="msjAgregado${producto.id}" class="msjAgregado"></div>
                                <div class="card-boton">
                                    <a id="btn${producto.id}" href="#" class="btn btn-secondary">Agregar</a>
                                </div>
                            </div>
                        </div>`
                    );

                    
                    if (producto.producto==="Celular"){
                        $(`#${producto.id}`).addClass("Celular");
                    } else if (producto.producto==="Notebook"){
                        $(`#${producto.id}`).addClass("Notebook");
                    } else if (producto.producto==="Accesorio") {
                        $(`#${producto.id}`).addClass("Accesorio")
                    };
                    
                    let indice= `${producto.id}`;   
                
                    //BOTON PARA AGREGAR LOS PROCUTOS AL CARRITO

                    $(`#btn${producto.id}`).click((e)=> {   
                        e.preventDefault();
                        eleccionBajo(indice);
                        
                        if (vaAlDOM){
                            infoEnElDom();
                        };
                        
                        mensaje(e, indice);

                        let sidebar= document.getElementById("sidebar");
                        if (sidebar.style.display=="none" || sidebar.style.display==""){
                            $("#sidebar").css({"right":"0px"}).toggle(500);
                        };
                    });
                };
            };
        },
    );
};
//******Filtrar por categoria***************************************
function filtrarProductos(categoria) {
    if (categoria==="Productos"){
        $(".card").css({"display":"flex"});
    }else if (categoria==="Celular") {
        $(".Celular").css({"display":"flex"});
        $(".Notebook").css({"display":"none"});
        $(".Accesorio").css({"display":"none"});
    } else if (categoria==="Notebook") {
        $(".Celular").css({"display":"none"});
        $(".Notebook").css({"display":"flex"});
        $(".Accesorio").css({"display":"none"});
    } else if (categoria==="Accesorio") {
        $(".Celular").css({"display":"none"});
        $(".Notebook").css({"display":"none"});
        $(".Accesorio").css({"display":"flex"});
    };
};

//*******FUNCIONES CARDS*******************************************************

function eleccionBajo(ind) {     
    for (const prod of productos) {
        if (prod.id == ind) {
            pdCarrito = new prodDelCarrito (prod.id, prod.producto, prod.marca, prod.modelo, prod.precio, prod.imagen);
        };
    };
    
    productosDelCarrito.push(pdCarrito);    
    validarRepeticion(pdCarrito);           //Verificamos que el prodcuto no se guarde dos veces
    carrito.incrementarCarrito();
    
    return pdCarrito
};

function validarRepeticion(obj) {
    
    let contadorRepeticiones= 0;
    
    for (let i=0; i< productosDelCarrito.length; i++) {
        if (obj.id == productosDelCarrito[i].id){
            contadorRepeticiones +=1;
        };  
        if (contadorRepeticiones>1){
            Swal.fire({
                icon: 'error',
                title: '<h2 class="p-sweetAlert">Producto Repetido</h2>',
                html: '<p class="p-sweetAlert">Este producto ya fue agregado.</p>',
                background: '#777',
                position:'center',
                allowOutsideClick: "true",
                customClass: "SeewAlert"
            });
            productosDelCarrito.splice(i,1);
            carrito.decrementarCarrito();
            vaAlDOM=false;
        } else {
            obj.agregar();
            vaAlDOM=true;
        }; 
    };
};

function infoEnElDom() {    //Aquí pintamos en el DOM cada producto seleccionado
     $("#cont-sidebar").prepend(
        `<ol id="${pdCarrito.id}" class="list-group prod-seleccionado${pdCarrito.id}">
            <li class="list-group-item d-flex align-items-start">
            <div class="ms-1 me-auto">
                <div class="fw-bold">${pdCarrito.producto} ${pdCarrito.marca}</div>
                <p>$${pdCarrito.precio}</p>
                <img src="${pdCarrito.imagen}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="trash">
                <span id="badge${pdCarrito.id}" class="badge bg-dark rounded-pill">Cantidad: ${pdCarrito.cantidad}</span>
                <div class="MasMenos">
                    <i type="button" id="menos${pdCarrito.id}" class="fas fa-minus-square"></i>
                    <i id="mas${pdCarrito.id}" class="fas fa-plus-square"></i>
                </div>
                <i id="btn-trash${pdCarrito.id}" class="far fa-trash-alt"></i>
            </div>
            </li>
        </ol>`
    ); 

    //BOTON P/ELIMINAR PRODUCTO SELECCIONADO
    $(`#btn-trash${pdCarrito.id}`).click( (e) => { 
    e.preventDefault();
    let indiceParaEliminar= e.target.parentNode.parentNode.parentNode.getAttribute("id");
    eliminarDelCarrito(e.target, indiceParaEliminar);
    eliminarDelArray(indiceParaEliminar);
    });

    //BOTON PARA DECREMENTAR CANTIDAD DEL PRODUCTO SELECCIONADO
    $(`#menos${pdCarrito.id}`).click( (e) => { 
        e.preventDefault();
        let identificador= e.target.parentNode.parentNode.parentNode.parentNode.getAttribute("id");

        for (const prod in productosDelCarrito) {
            if (productosDelCarrito[prod].cantidad==1){
                e.target.style.visibility="hidden".toggle;
            }else{
                if (identificador == productosDelCarrito[prod].id){
                    productosDelCarrito[prod].decrementarCantidad();

                    carrito.decrementarCarrito();
            
                    let contenido= e.target.parentNode.parentNode.childNodes[1].textContent ="Cantidad: "+`${productosDelCarrito[prod].cantidad}`;
                    document.getElementById(`badge${identificador}`).innerHTML= contenido;
                };
            };
        };
    });

    //BOTON PARA INCREMENTAR CANTIDAD DEL PRODUCTO SELECCIONADO
    $(`#mas${pdCarrito.id}`).click( (e) => { 
        e.preventDefault();
        carrito.incrementarCarrito();

        let identificador= e.target.parentNode.parentNode.parentNode.parentNode.getAttribute("id");
        for (const prod in productosDelCarrito){
            if (identificador == productosDelCarrito[prod].id){
                productosDelCarrito[prod].aumentarCantidad();
        
                let contenido= e.target.parentNode.parentNode.childNodes[1].textContent ="Cantidad: "+`${productosDelCarrito[prod].cantidad}`;
                document.getElementById(`badge${identificador}`).innerHTML= contenido;
            };
        };
    });
};

function eliminarDelCarrito(valor, elimina) {        //Elimina elementos de carrito en DOM 
    $(valor).parent().parent().parent().remove();
    
    for (const prod in productosDelCarrito){
            if (elimina == productosDelCarrito[prod].id){
                carrito.cantidad -= parseInt(productosDelCarrito[prod].cantidad);
                span.innerHTML = `<span class="cart__count">${carrito.cantidad}</span>`;
            };
    };
};

function eliminarDelArray(num) {        //Elimina el prod del array de compras
    for (let i=0; i < productosDelCarrito.length; i++){   
        if (productosDelCarrito[i].id == num) {
            productosDelCarrito.splice(i,1);
            break;
        };
    };

    let sidebar= document.getElementById("cont-sidebar");  // Se segura que, si el contenedor esta vacío, se elimine el array de compras
    if (sidebar.hasChildNodes()==false){
        productosDelCarrito=[];
        carrito.resetearCarrito();
    };
};

function limpiarCarritoEnDOM (){
    let sidebar= document.getElementById("cont-sidebar");
    sidebar.innerHTML=""
    productosDelCarrito=[];
    carrito.resetearCarrito();
};

function mensaje(valor, ind){        // Muestra un mensaje cada vez que se agrega un producto
    $(`#msjAgregado${ind}`).append('<p class="mensaje">Producto agregado!</p>');
    $(valor.target.parentNode.parentNode.childNodes[7].children).fadeOut(3000)
};

function agregarAlCarrito (){       
    for (let i=0; i< productosDelCarrito.length; i++) {
        localStorage.setItem(i, JSON.stringify(productosDelCarrito[i]));
    };
};

//****************FUNCION FINALIZAR COMPRA******************************************

function sumaFinal (){      
    agregarAlCarrito()
    
    let total = 0;
    for (let i=0; i < productosDelCarrito.length; i++){
        total += (productosDelCarrito[i].precio)*(productosDelCarrito[i].cantidad);
    };
    
    return parseFloat(total)
};
 //Función agregar evnio

function sumarEnvio(){     
    let envio= document.getElementById("envio")
    let compraFinal;
    if (envio.checked==false) {
        compraFinal= sumaFinal();
    } else {
        compraFinal= sumaFinal()+5000;
    };

    return compraFinal
};
 //Función mostrar el monto total

function mostrarCompraFinal (){    
    let aPagar= document.getElementById("compraFinalizada");
    let ul= document.createElement('ul');
    aPagar.appendChild(ul);
    for (let i=0; i < productosDelCarrito.length; i++){
        let li= document.createElement('li')
        li.innerHTML= `${productosDelCarrito[i].producto} ${productosDelCarrito[i].marca} ${productosDelCarrito[i].modelo}\nPrecio Unitario: $${productosDelCarrito[i].precio} \nCantidad: ${productosDelCarrito[i].cantidad}`;
        ul.appendChild(li);
    };
    
    let div= document.createElement('div');
    aPagar.appendChild(div);
    div.innerHTML= `<h4>El monto total es: <h3>$${sumarEnvio()}</h3></h4>`;
};

function limpiarContenedor() {
    document.getElementById("compraFinalizada").textContent=""
}

//****************SweetAlert formulario*****************************************

function validarFurmlario() {
    let nombre=  document.getElementById("fullname").value;
    let email=  document.getElementById("email").value;
    let asunto=  document.getElementById("affair").value;
    let mensaje=  document.getElementById("message").value;

    if (nombre=="" || email=="" || asunto=="" || mensaje=="") {
        Swal.fire({
            icon: 'error',
            title: '<h2 class="p-sweetAlert">Atención!</h2>',
            html: '<p class="p-sweetAlert">Debes completar todos los campos.</p>',
            background: '#777',
            position:'center',
            allowOutsideClick: false
        });
    }else if (!(/^\w+([\.\+\-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email))) {
        Swal.fire({
            icon: 'error',
            title: '<h2 class="p-sweetAlert">Email Incorrecto</h2>',
            html: '<p class="p-sweetAlert">Verifique el Email.</p>',
            background: '#777',
            position:'center',
            allowOutsideClick: false,
            customClass: "SeewAlert"
        });
    }else {
        Swal.fire({
            icon: 'success',
            title: '<h2 class="p-sweetAlert">Enviado!</h2>',
            html: '<p class="p-sweetAlert">Consulta Enviada\nEn la brevedad te Contactaremos</p>',
            background: '#777',
            position:'center',
            allowOutsideClick: false,
            customClass: "SeewAlert"
        });
        document.getElementById("form").reset();
    };
};



















