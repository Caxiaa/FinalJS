class Producto{
    constructor(id,nombre,precio,stock,image,cantidad){
        this.id = id;
        this.nombre = nombre;
        this.precio = parseFloat(precio);
        this.stock = stock;
        this.image = image;
        this.cantidad = parseInt(cantidad) || 1;
    }
}

