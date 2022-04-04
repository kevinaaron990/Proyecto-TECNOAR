class prodDelCarrito {
    constructor (id, producto, marca, modelo, precio, imagen) {
        this.id = id;
        this.producto = producto;
        this.marca = marca;
        this.modelo = modelo;
        this.precio = precio;
        this.imagen= imagen;
        this.cantidad = 1;
        this.agregado = false;
    };

    aumentarCantidad () {
        this.cantidad+=1;
        return this.cantidad;
    };

    decrementarCantidad () {
        if (this.cantidad > 1) {
            this.cantidad-=1;
        };
        return this.cantidad;
    };
    
    agregar () {
        if (this.agregado === false){
            this.agregado = true;
        };
    };
};