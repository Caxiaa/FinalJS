class Producto{
    constructor(id,nombre,precio,image,cantidad){
        this.id = id;
        this.nombre = nombre;
        this.precio = parseFloat(precio);
        this.image = image;
        this.cantidad = parseInt(cantidad) || 1;
    }
}

