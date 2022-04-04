class Carrito {
    cantidad = 0;
    
    incrementarCarrito () {
        this.cantidad +=1;
        span.innerHTML=`<span class="cart__count">${this.cantidad}</span>`;
    };

    decrementarCarrito () {
        if (this.cantidad > 0){
            this.cantidad -=1;
            span.innerHTML=`<span class="cart__count">${this.cantidad}</span>`;
        };
    };

    resetearCarrito (){
        this.cantidad = 0;
        span.innerHTML=`<span class="cart__count">${this.cantidad}</span>`;
    };
};












