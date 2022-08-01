const guardarLocal = (clave,valor) =>{
    localStorage.setItem(clave,valor);
}

const obtenerLocal = (local_name,array) => {
    let almacenados = JSON.parse(localStorage.getItem(local_name));
    for (const objeto of almacenados) {
        array.push(objeto);
    }
}

const cargarProducto = (e)=>{
    e.preventDefault();
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

const verProductos = (lista)=>{
    products_container.innerHTML = "";
    for(const product of lista){
        let div = document.createElement('div');
        div.classList.add('products-detail');
        div.innerHTML = `<h3>${product.nombre}</h3>
        <img class="product-img" src="${product.image}">
        <p>Precio: $${product.precio}</p>
        <p>Stock: ${product.stock} unidades</p>
        <button id="${product.id}" class="buy-button">Comprar</button>
        <p>ID: ${product.id}</p>
        `
        products_container.append(div); 
    }  
    eventoBoton();
}

const borrarProducto = (e)=>{
    e.preventDefault();
    let id = e.target[0].value;
    let exists = products.find(product=>product.id == id);
    if(!exists){
        return alert("El valor ingresado no existe!")
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
            Swal.fire({
                title: 'Borrado!',
                icon: 'success',
                text: 'El archivo ha sido borrado'
            })
        }
    })
    verProductos(products);
}

const sinStock = (id) =>{
    let array_delete = products.filter((prod)=>prod.id != id); 
    products = array_delete;
    guardarLocal("listaProductos",JSON.stringify(products));
    verProductos(products);
}

const eventoBoton = () =>{  
    let botones = document.getElementsByClassName('buy-button');
    for (const boton of botones) {
        boton.addEventListener('click',function(){
            for(let i=0;i<products.length;i++){
                if(products[i].id == this.id){
                    Toastify({
                        text: "🛒Se agrego correctamente!",
                        className: "info",
                        gravity: "bottom",
                        style: {
                            background: "background: linear-gradient(90deg, rgba(45,34,238,1) 23%, rgba(0,212,255,1) 92%)"
                        }
                      }).showToast();
                    products[i].stock--;
                    if(products[i].stock == 0){
                        sinStock(products[i].id);
                    }
                }
            }
            guardarLocal("listaProductos",JSON.stringify(products));    
            verProductos(products);
        })
    }
}