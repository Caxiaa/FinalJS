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
let filtroMarca = document.getElementById('filtrar_marca');
let comprarCarro = document.getElementById('comprar-carrito');

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

comprarCarro.addEventListener('click',function(){
    Swal.fire({
        title: 'Desea comprar el carrito?',
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
                title: 'Comprado!',
                icon: 'success',
                text: 'Carrito comprado correctamente!'
            })
        }
    })
})

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


fetch('productos.json')
    .then((res) => {
        return res.json();
    }).then((data) => {
        for (const product of data) {
            let {
                id,
                nombre,
                precio, 
                image
            } = product;
            let producto = new Producto(id, nombre.toUpperCase(), parseFloat(precio), image);
            products.push(producto);
        }
        verProductos(products);
    })
    obtenerLocal("carritoProductos",cart);
    carritoHTML(cart);
    cantidad_productos.innerHTML = cart.length;