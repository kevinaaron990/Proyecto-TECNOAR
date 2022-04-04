//********************************ACCIONES EN BOTONES********************************************
$("#logo").click(function (e) { e.preventDefault();});

$("#Nosotros").click(function (e) { 
    e.preventDefault();
    $('html,body').animate({
        scrollTop:$('#SeccionCarousel').offset().top
    },300);
});

$("#marcas").click( (e)=> { 
    e.preventDefault();
    $('html,body').animate({
        scrollTop:$('#SeccionMarcas').offset().top
    },300);
});

$("#Productos").click( (e) => { 
    e.preventDefault();
    filtrarProductos("Productos");
    $('html,body').animate({
        scrollTop:$('#SeccionCards').offset().top
    },300);
});

$("#Celular").click( (e)=> { 
    e.preventDefault();
    filtrarProductos("Celular");
    $('html,body').animate({
        scrollTop:$('#SeccionCards').offset().top
    },300);
});

$("#Notebook").click( (e) =>{ 
    e.preventDefault();
    filtrarProductos("Notebook");
    $('html,body').animate({
        scrollTop:$('#SeccionCards').offset().top
    },300);
});

$("#Accesorios").click( (e)=> { 
    e.preventDefault();
    filtrarProductos("Accesorio");
    $('html,body').animate({
        scrollTop:$('#SeccionCards').offset().top
    },300);
});

$("#Contacto").click( (e)=> { 
    e.preventDefault();
    $('html,body').animate({
        scrollTop:$('#SeccionFormulario').offset().top
    },300);
});

$("#carrito").click( (e)=> { 
    e.preventDefault();
    $("#sidebar").css({"right":"0px"}).toggle(500);
});

$(".btn-ConfirmarCompra").click( (e) =>{ 
    e.preventDefault();
    let sidebar= document.getElementById("cont-sidebar"); 
    if (sidebar.hasChildNodes()==false){
        Swal.fire({
            icon: 'error',
            title: '<h2 class="p-sweetAlert">Atención!</h2>',
            html: '<p class="p-sweetAlert">Al carrito de compras esta vacío.</p>',
            background: '#777',
            position:'center',
            allowOutsideClick: true
        });
    }else {
        $(".compraFinal").css({"display":"flex"});
        sumaFinal();
        mostrarCompraFinal();
        $(".btn-ConfirmarCompra").attr("disabled", "");
    };
});

$("#back").click( (e)=> { 
    e.preventDefault();
    $(".compraFinal").css({"display":"none"});
    limpiarContenedor();
    localStorage.clear();
    $(".btn-ConfirmarCompra").removeAttr("disabled");
});

$(".finalizada").click( (e)=> { 
    e.preventDefault();
    Swal.fire({
        icon: 'success',
        title: '<h2 class="p-sweetAlert">Gracias por tu compra!</h2>',
        html: '<p class="p-sweetAlert">De inmediato nos estaremos contactando</p>',
        background: '#777',
        position:'center',
        allowOutsideClick: false
    });
    $(".compraFinal").css({"display":"none"});
    document.getElementById("compraFinalizada").innerHTML=""
    limpiarCarritoEnDOM();
    localStorage.clear();
    $("#sidebar").css({"right":"-450px"}).toggle(500);
    $(".btn-ConfirmarCompra").removeAttr("disabled");
});

$("#enviaFormulario").click( (e)=> { 
    e.preventDefault();
    validarFurmlario();
});

