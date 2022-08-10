const guardarLocal = (clave,valor) =>{
    localStorage.setItem(clave,valor);
}

const obtenerLocal = (local_name,array) => {
    let almacenados = JSON.parse(localStorage.getItem(local_name));
    if(almacenados == null){
        return 0;
    }else{
        for (const objeto of almacenados) {
            array.push(objeto);
        }
    }
}

const cargarProducto = (e)=>{
    e.preventDefault();
    if(ingreso.value == "Usuario"){
        Toastify({
            text: "❌No puedes realizar esta accion",
            className: "error",
            gravity: "bottom",
            style: {
                background: "background: linear-gradient(90deg, rgba(251,134,66,1) 24%, rgba(255,0,0,1) 76%)"
            }
          }).showToast();
    }else{
        let nombre = e.target[0].value;
        let precio = e.target[1].value;
        let stock = e.target[2].value;
        let image = e.target[3].value;
            
        form.reset();
            
        id.push(0);
        guardarLocal("Ids",JSON.stringify(id));
        let product = new Producto(id.length,nombre.toUpperCase(),parseFloat(precio),parseInt(stock),image);
        products.push(product);
        guardarLocal("listaProductos",JSON.stringify(products));
        verProductos(products);
    }
}

const verProductos = (lista)=>{

    if(filtroMarca.value == "All"){
        products_container.innerHTML = "";
        for(const product of lista){
            let div = document.createElement('div');
            div.classList.add('card');
            div.setAttribute("style","width:18rem;");
            div.innerHTML = `
                <div class="d-flex imagen-card">
                    <img src="${product.image}" class="align-self-center card-img-top product-img" alt="${product.nombre}">
                </div>
                <div class="card-body carta-producto">
                    <h5 class="card-title">${product.nombre}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Precio: $${product.precio}</h6>
                    <h6 class="card-subtitle mb-2 text-muted">Stock: ${product.stock}</h6>
                    <p class="card-subtitle mb-2 text-muted">Id: ${product.id}</p>
                    <button id="${product.id}" class="btn btn-outline-primary buy-button">Comprar</button>
                </div>
            `
            products_container.append(div); 
        }  
        eventoBoton();
    }else{
        
    }
}

const borrarProducto = (e)=>{
    e.preventDefault();
    if(ingreso.value == "Usuario"){
        Toastify({
            text: "❌No puedes realizar esta accion",
            className: "error",
            gravity: "bottom",
            style: {
                background: "background: linear-gradient(90deg, rgba(251,134,66,1) 24%, rgba(255,0,0,1) 76%)"
            }
          }).showToast();
    }else{
        let id = e.target[0].value;
        let exists = products.find(product=>product.id == id);
        if(!exists){
            Toastify({
                text: "❌El id ingresado no existe!",
                className: "error",
                gravity: "bottom",
                style: {
                    background: "background: linear-gradient(90deg, rgba(251,134,66,1) 24%, rgba(255,0,0,1) 76%)"
                }
              }).showToast();
        }
        Swal.fire({
            title: 'Está seguro de eliminar el producto?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, seguro',
            cancelButtonText: 'No, no quiero'
        }).then((result) => {
    
            if (result.isConfirmed) {
                let array_delete = products.filter((prod)=>prod.id != id);
                products = array_delete;
                guardarLocal("listaProductos",JSON.stringify(products));
                verProductos(products);
                Swal.fire({
                    title: 'Borrado!',
                    icon: 'success',
                    text: 'El archivo ha sido borrado'
                })
            }
        })
        verProductos(products);
    }
}

const sinStock = (id) =>{
    let array_delete = products.filter((prod)=>prod.id != id); 
    products = array_delete;
    guardarLocal("listaProductos",JSON.stringify(products));
    verProductos(products);
}

const toastifyAddCart = () =>{
    Toastify({
        text: "🛒Se agrego correctamente!",
        className: "info",
        gravity: "bottom",
        style: {
            background: "background: linear-gradient(90deg, rgba(45,34,238,1) 23%, rgba(0,212,255,1) 92%)"
        }
      }).showToast();
}

const toastifyDeleteCart = () =>{
    Toastify({
        text: "🗑 Producto borrado correctamente!",
        className: "info",
        gravity: "bottom",
        style: {
            background: "background: linear-gradient(90deg, rgba(45,34,238,1) 23%, rgba(0,212,255,1) 92%)"
        }
      }).showToast();
}

const eventoBoton = () =>{  
    let botones = document.getElementsByClassName('buy-button');
    for (const boton of botones) {
        boton.addEventListener('click',function(){
            for(let i=0;i<products.length;i++){
                if(products[i].id == this.id){
                    let exits = cart.find(producto=>producto.id == this.id);
                    if(exits){
                        exits.cantidad++;
                        products[i].stock--;
                        if(products[i].stock == 0){
                            sinStock(products[i].id);
                        }
                        toastifyAddCart();
                    }else{
                        exits = products.find(producto=>producto.id == this.id);
                        cart.push(exits);
                        toastifyAddCart();
                        products[i].stock--;
                        if(products[i].stock == 0){
                            sinStock(products[i].id);
                        }
                    }
                    guardarLocal("carritoProductos",JSON.stringify(cart));
                    guardarLocal("listaProductos",JSON.stringify(products));    
                    carritoHTML(cart);
                    verProductos(products);
                }
            }
        })
    }
}

const botonBorrarProductoCarro = ()=>{
    let botones = document.getElementsByClassName('trash-cart');
    for (const boton of botones) {
        boton.addEventListener('click',function(){
            let borrado = cart.filter(prod => prod.id != this.id);
            cart = borrado;
            guardarLocal("carritoProductos",JSON.stringify(cart));
            toastifyDeleteCart();
            carritoHTML(cart);
        })
    }
}

const subTotal = (precio,cantidad) =>{
    return precio*cantidad;
}

const carritoHTML = (lista) =>{
    cantidad_productos.innerHTML = lista.length;
    productos_carrito.innerHTML = "";
    for (const producto of lista) {
        let prod = document.createElement('div');
        prod.classList.add('div-product-cart');
        prod.innerHTML = `<h6>${producto.nombre} x${producto.cantidad}</h6>
        <h6 class="h6-cart">Precio unitario: $${producto.precio}  <span class="badge bg-secondary">SubTotal: $${subTotal(producto.precio,producto.cantidad)}</span></h6>
        <button id="${producto.id}" class="trash-cart" type="button"><i class="fa-solid fa-trash"></i></button>
        `
        productos_carrito.append(prod);
    }
    botonBorrarProductoCarro();
    let total = 0;
    for(let i = 0;i<lista.length;i++){
        total = total + subTotal(lista[i].precio,lista[i].cantidad);
    }
    totalCarro.innerHTML = `Total: $${total}`
}
