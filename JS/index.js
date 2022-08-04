let form = document.getElementById('add-product-form');
let products_container = document.getElementById('products-container'); 
let read_products = document.getElementById('read-products');
let delete_form = document.getElementById('deleted-product-form');
let filtrar = document.getElementById('filter-product');
let ingreso = document.getElementById('tipo_ingreso');
let cantidad_productos = document.getElementById('cantidad-carrito');
let productos_carrito = document.getElementById('productos-carrito');
let totalCarro = document.getElementById('total-carrito')

form.addEventListener('submit',cargarProducto);

delete_form.addEventListener('submit',borrarProducto);

filtrar.addEventListener('input',function(){
    const filtrados = products.filter(prod => prod.nombre.includes(this.value.toUpperCase()));
    if(filtrados.length == 0){
        products_container.innerHTML = `<h3 class="not-find-text">No se encontro ningun producto.</h3>`;
    }else{
        verProductos(filtrados);
    }
});


window.addEventListener('load',function () {
    obtenerLocal("carritoProductos",cart);
    obtenerLocal("listaProductos",products);
    obtenerLocal("Ids",id);
    verProductos(products);
    carritoHTML(cart);
    cantidad_productos.innerHTML = cart.length;
})