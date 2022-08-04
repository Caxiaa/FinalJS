let form = document.getElementById('add-product-form');
let products_container = document.getElementById('products-container'); 
let read_products = document.getElementById('read-products');
let delete_form = document.getElementById('deleted-product-form');
let filtrar = document.getElementById('filter-product');
let ingreso = document.getElementById('tipo_ingreso');
let cantidad_productos = document.getElementById('cantidad-carrito');
let productos_carrito = document.getElementById('productos-carrito');
let totalCarro = document.getElementById('total-carrito');
let limpiarCarro = document.getElementById('limpiar-carro');

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

limpiarCarro.addEventListener('click',function(){
    Swal.fire({
        title: 'Está seguro que desea limpiar el carrito?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, seguro',
        cancelButtonText: 'Cancelar'
    }).then((result) => {

        if (result.isConfirmed) {
            cart = [];
            guardarLocal("carritoProductos",JSON.stringify(cart));
            carritoHTML(cart);
            Swal.fire({
                title: 'Borrado!',
                icon: 'success',
                text: 'Carrito limpiado correctamente!'
            })
        }
    })

})


window.addEventListener('load',function () {
    obtenerLocal("carritoProductos",cart);
    obtenerLocal("listaProductos",products);
    obtenerLocal("Ids",id);
    verProductos(products);
    carritoHTML(cart);
    cantidad_productos.innerHTML = cart.length;
})