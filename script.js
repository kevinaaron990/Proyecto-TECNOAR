// OBJETO CON MIS PRODUCTOS 

const productosDatos = [
    {
        id: 1,
        nombre: 'Samsung S22',
        precio: 200000,
        imagen: 'img/samsung-s22.png'
    },
    {
        id: 2,
        nombre: 'Iphone 13',
        precio: 250000,
        imagen: 'img/iphone-13.png'
    },
    {
        id: 3,
        nombre: 'Motorola Edge 20',
        precio: 100000,
        imagen: 'img/motoedge-20.png'
    },
    {
        id: 4,
        nombre: 'Xiamomi Mi 10 Pro',
        precio: 110000,
        imagen: 'img/Xiaomi_mi10.png'
    },
    {
        id: 5,
        nombre: 'Samsung Galaxy Z Flip3',
        precio:  160000,
        imagen: 'img/z-flip-3.png'
    },
    {
        id: 6,
        nombre: 'Apple iPhone SE 2020',
        precio: 140000,
        imagen: 'img/iphone-se-2020.png'
    },
    {
        id: 7,
        nombre: 'Moto G200',
        precio: 100000,
        imagen: 'img/moto-g200.png'
    },
    {
        id: 8,
        nombre: 'Mac Book PRO',
        precio: 400000,
        imagen: 'img/macbook-pro14.png'
    },
    {
        id: 9,
        nombre: 'Lenovo i3',
        precio: 120000,
        imagen: 'img/lenovo-i3.png'
    },
    {
        id: 10,
        nombre: 'HP 240 G7',
        precio: 50000,
        imagen: 'img/hp240-g7.png'
    },
    {
        id: 11,
        nombre: 'Razer Blade 15',
        precio:  400000,
        imagen: 'img/RazerBlade-15.png'
    },
    {
        id: 12,
        nombre: 'Asus ZenBook',
        precio: 120000,
        imagen: 'img/AsusZenBook.png'
    }
];

let carrito = [];
const divisa = '$';
const domItems = document.querySelector('#items');
const domCarrito = document.querySelector('#carrito');
const domTotal = document.querySelector('#total');
const domVaciarCarrito = document.querySelector('#boton-vaciar')
const milocalStorage = window.localStorage;


//funciones

//CREO MIS ELEMENTOS A TRAVEZ DE MI productosDatos

function renderizarProductos(){
    productosDatos.forEach((producto) =>{
        //estructura
        const miNodo = document.createElement('div'); //creo el elemento 
        miNodo.classList.add('card', 'col-sm-4'); // crep las clases en este caso de bootstrap
        //Body
        const miNodoCardBody = document.createElement('div');
        miNodoCardBody.classList.add('card-body');
        //titulo
        const miNodoTitulo = document.createElement('h5');
        miNodoTitulo.classList.add('card-title');
        miNodoTitulo.textContent = producto.nombre;// utilizo textContent para el contenido del texto y llamo por parametro al nombre de mi producto
        //imagen
        const miNodoImg = document.createElement('img');
        miNodoImg.classList.add('img-fluid','rounded');
        miNodoImg.style.height = '200px'
        miNodoImg.setAttribute('src', producto.imagen);// agrego atributos mediante setAtribute en este caso el src de la img seguido del producto.imagen
        //precio
        const miNodoPrecio = document.createElement('p');
        miNodoPrecio.classList.add('card-text');
        miNodoPrecio.textContent = `${producto.precio} ${divisa}`;
        //Boton
        const miNodoBoton = document.createElement('button');
        miNodoBoton.classList.add('btn', 'btn-dark');
        miNodoBoton.textContent = 'Agregar Al Carrito';
        miNodoBoton.setAttribute('marcador', producto.id);
        miNodoBoton.addEventListener('click', agregarProductoAlCarrito);//llamo al evento click y a la funcion agregarProdcutosAlCarrito

        //incertamos lo creado al DOM con appendChild

        miNodoCardBody.appendChild(miNodoImg); // agrego cada uno de mis contenidos de la card a mi cardBody
        miNodoCardBody.appendChild(miNodoTitulo);
        miNodoCardBody.appendChild(miNodoPrecio);
        miNodoCardBody.appendChild(miNodoBoton);
        miNodo.appendChild(miNodoCardBody); // agrego cardBody a miNodo la estructura de mi card
        domItems.appendChild(miNodo); // agrego miNodo a mi elemento Items

    })
};

//Evento para añadir un producto a mi carrito de compras 

function agregarProductoAlCarrito(e){
    //agregamos un nodo a nuestro array carrito
    carrito.push(e.target.getAttribute('marcador')) // llegamos al atributo mardacor
    
    //Actualizamos el carrito
    renderizarCarrito();

    //Actualizamos el LocalStorage
    guardarEnLocalStorage();
}

//dibujamos los productos guardados en el carrito 

function renderizarCarrito(){
    //vaciamos todo el html
    domCarrito.textContent = '';

    //Quitamos los productos duplicados 
    const carritoDuplicados = [...new Set(carrito)];

    //generamos los nodos apartir de carrito
    carritoDuplicados.forEach((item) =>{
        //obtenemos el item que necesitamos de mi productosDatos en este caso el ID
        const miItemId = productosDatos.filter((itemProductosDatos) =>{
            //si coiciden los ID ,solo puede haver un producto en el carrito con la misma ID
            return itemProductosDatos.id === parseInt(item);
        });

        //Cuenta el numero de veces que se repita el producto
        const numeroUnidadesItem = carrito.reduce((total,itemId) =>{
            //si coinciden los id incremento el contador caso contrario lo mantego
            return itemId === item ? total += 1 : total;
        },0);
        //Creamos los nodos del item del carrito 
        const miNodo = document.createElement('li');
        miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
        miNodo.textContent = `${numeroUnidadesItem} X ${miItemId[0].nombre} - ${miItemId[0].precio} ${divisa}`;
        //Boton de borrar
        const miBotonBorrar = document.createElement('button');
        miBotonBorrar.classList.add('btn', 'btn-dark', 'mx-5');
        miBotonBorrar.textContent = 'Borrar';
        miBotonBorrar.style.margin = '1rem';
        miBotonBorrar.dataset.item = item;
        miBotonBorrar.addEventListener('click', borrarItemCarrito);

       //Incertamos lo crado al DOM
       miNodo.appendChild(miBotonBorrar);//adentro de mmiNodo li va estar mi botton
       domCarrito.appendChild(miNodo); // adentro de mi domCarrito va estar mi nodo li
    });
    //renderizamos el precio total en el html
    domTotal.textContent = calcularTotal();
};

//Eveneto para eliminar un elemento del carrito 

function borrarItemCarrito(e){
    //accedemos el producto id que hay en el boton una vez pulsado 
    const idBotonBorrar = e.target.dataset.item;
    //borramos todos los productos
    carrito = carrito.filter((carritoId) =>{
        return carritoId !== idBotonBorrar;
    });
    //renderizamos carrito
    renderizarCarrito();
    //actualizamos el localStorage
    guardarEnLocalStorage();
};

//Calcular precio total

function calcularTotal(){
    //reccoremos el array del carrito 
    return carrito.reduce((total,item) =>{
        //de cada elemento obtenemos su precio por el reduce 
        const miItem = productosDatos.filter((itemProductosDatos) =>{
            return itemProductosDatos.id === parseInt(item);
        });
        //lo sumamos al total
        return total + miItem[0].precio;
    },0).toFixed(0);// con toFixed Convierto un número a una cadena, y podes asignar la cantida de decimales deseada
};

//Vaciar Carrito total
function vaciarCarrito(){
    //borramos los productos en carrito reinciando el array
    carrito = [];
    //renderizamos los cambios 
    renderizarCarrito();
    //borrar localStorage
    localStorage.clear();
}
function guardarEnLocalStorage(){
    //guardo en mi localstorage
    milocalStorage.setItem('carrito',JSON.stringify(carrito));
}
function cargarLocalStorage(){
    //existe un carrito previo guardado en localstorage?
    if (milocalStorage.getItem('carrito') != null){
        //cargo la informacion
        carrito = JSON.parse(milocalStorage.getItem('carrito'));
    }
};

//evento vaciar carrito 
domVaciarCarrito.addEventListener('click',vaciarCarrito);

//inicio
cargarLocalStorage();
renderizarProductos();
renderizarCarrito();



/*
const botonCelulares = document.getElementById('botonCelulares');
const botonNotebooks = document.getElementById('botonNotebooks');


botonCelulares.addEventListener('click',ordenarPorCelulares);*/
//Menu desplegable para dispositivos moviles

const iconoMenu = document.getElementById('iconoMenu');
const menu = document.getElementById('menu');
iconoMenu.addEventListener('click',(e) => {
    menu.classList.toggle('active');
    document.body.classList.toggle('opacity');
    const ruta  = e.target.getAttribute('src');
    if(ruta == 'img-logo/icono-menu.png'){
        e.target.setAttribute('src','img-logo/icono-menu2.png')
    }else{
        e.target.setAttribute('src','img-logo/icono-menu.png')
    }
})
//Contacto Formulario

const form = document.querySelector('#formulario')
    const buttonMailto = document.querySelector('#botonEmail')

    form.addEventListener('submit', handleSubmit)

    function handleSubmit(event) {
      event.preventDefault()
      const form = new FormData(this)
      buttonMailto.setAttribute('href', `mailto:kevinhorvath39@gmail.com?subject=nombre ${form.get('nombre')}  correo ${form.get('email')}&body=${form.get('mensaje')}`)
      buttonMailto.click()
    }

    