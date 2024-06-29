class Producto{

    constructor(id,categoría,nombre,material,descripción,precio,foto){
        this.id=id;
        this.categoría=categoría;
        this.nombre=nombre;
        this.material=material;
        this.descripción=descripción;
        this.precio=precio;
        this.foto=foto
    }

}

// const movie1 = new Movie(1,'Damsel','Un director',4.5,'2024-03-01','https://image.tmdb.org/t/p/w500//sMp34cNKjIb18UBOCoAv4DpCxwY.jpg');

// const movie2 = new Movie(2,'Dune 2','Un director 2',5,'2024-04-01','https://image.tmdb.org/t/p/w500//8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg');

// const movie3 = new Movie(3,'Kunfu panda 4','Un director 2',5,'2024-04-01','https://image.tmdb.org/t/p/w500//kDp1vUBnMpe8ak4rjgl3cLELqjU.jpg');

// let movies = [movie1,movie2,movie3];

// localStorage.setItem('movies',JSON.stringify(movies));

// console.log(movies);

function showProductos(){
    
    //BUSCAR LO QUE HAY EN LOCAL STORAGE
    let productos = JSON.parse(localStorage.getItem('productos')) || [];

    //buscar elemento HTML donde quiero insertar las peliculas
    const tbodyProductos = document.querySelector('#list-table-productos tbody');
    // const tbodyMovies = document.getElementById('#tbody-table-movies');
    //limpio el contenido de la tabla
    tbodyProductos.innerHTML = '';
    productos.forEach(producto  => {
        //TEMPLATE STRING - TEMPLATE LITERAL 
        const tr = `
                    <tr>
                        <td>${producto.categoría}</td>
                        <td>${producto.nombre}</td>
                        <td>${producto.material}</td>
                        <td>${producto.descripción}</td>
                        <td>${producto.precio} </td>                         
                        <td>${producto.foto}</td>
                        <td>
                            <button class="btn-cac" onclick='updateProducto(${producto.id})'><i class="fa fa-pencil" ></button></i>
                            <button class="btn-cac" onclick='deleteProducto(${producto.id})'><i class="fa fa-trash" ></button></i>
                        </td>
                    </tr>
        `;
        tbodyProductos.insertAdjacentHTML('beforeend',tr);
    });

}

/**
 * funcion que permite agregar o modificar una pelicula al listado de peliculas
 * almacenado en el localstorage
 */
function saveProducto(){
    
    //Obtengo el elemento HTML del formulario
    const form = document.querySelector('#form-producto');

    //obtengo los inputs del formulario
    const inputId = document.querySelector('#id-producto');
    const inputCategoría = document.querySelector('#categoría');
    const inputNombre = document.querySelector('#nombre');
    const inputMaterial = document.querySelector('#material');
    const inputDescripción = document.querySelector('#descripción');
    const inputPrecio = document.querySelector('#precio');
    const inputFoto = document.querySelector('#foto');
    //Realizo una validación simple de acuerdo al contenido del value del input del titulo
    if(inputProducto.value.trim() !== ''){
        //Busca en localstorage el item movies, si no existe asigna el array vacio.
        let productos = JSON.parse(localStorage.getItem('productos')) || [];

        //Si el input de ID es distinto de vacio, es porque se trata de una acción de UPDATE
        if(inputId.value!==""){
            //Busco dentro del arraya de movies el objeto a editar
            const movieFind = productos.find(producto => producto.id == inputId.value);
            //Si existe actualizo el objeto
            if (productoFind) {
              productoFind.Categoría = inputCategoría.value;
              productoFind.Nombre = inputNombre.value;
              productoFind.Material = inputMaterial.value;
              productoFind.Descripción = inputDescripción.value;
              productoFind.Precio = inputPrecio.value;
              productoFind.Foto = inputFoto.value;
            }
        }else{
            let newProducto = new Producto(
                productos.length+1,
                inputCategoría.value,
                inputNombre.value,
                inputMaterial.value,
                inputDescripción.value,
                inputPrecio.value,
                inputFoto.value,
            );
            productos.push(newProducto);
        }

        //Se actualiza el array de peliculas en el localstorage
        localStorage.setItem('productos',JSON.stringify(productos));
        showProductos();
        //Se limpian los inputs del formulario
        form.reset();
        Swal.fire({
            title: 'Exito!',
            text: 'Operacion exitosa.',
            icon: 'success',
            confirmButtonText: 'Cerrar'
        })
    }else{
        Swal.fire({
            title: 'Error!',
            text: 'Por favor completa el campo Producto.',
            icon: 'error',
            confirmButtonText: 'Cerrar'
        });
    }

}

/**
 * Function que permite cargar el formulario para editar una pelicula
 * de acuedo al id de la pelicula
 * @param {number} productoId id movie que se va a actualizar
 */
function updateProducto(productoId){
    let productos = JSON.parse(localStorage.getItem('productos'));
    //se utiliza el metodo find para poder asegurarnos que exista una pelicula con el id que queremos eliminar.
    let productoToUpdate = productos.find(producto => producto.id===productoId);
    if(movieToUpdate){
        //Se buscan los elementos HTML del input
        const inputId = document.querySelector('#id-producto');
        const inputCategoría = document.querySelector('#categoría');
        const inputNombre = document.querySelector('#nombre');
        const inputMaterial = document.querySelector('#material');
        const inputDescripción = document.querySelector('#descripción');
        const inputPrecio = document.querySelector('#precio');
        const inputFoto = document.querySelector('#foto');
        //Se cargan los inputs con los valores de la pelicula encontrada
        inputId.value = productoToUpdate.id;
        inputCategoría.value = productoToUpdate.categoría;
        inputNombre.value = productoToUpdate.nombre;
        inputMaterial.value = productoToUpdate.material;
        inputDescripción.value = productoToUpdate.descripción;
        inputPrecio.value = productoToUpdate.producto;
        inputFoto.value = productoToUpdate.foto;
    }
}

/**
 * Function que permite eliminar una pelicula del array del localstorage
 * de acuedo al indice del mismo
 * @param {number} productoId id movie que se va a eliminar
 */
function deleteProducto(productoId){
    let productos = JSON.parse(localStorage.getItem('productos'));
    //se utiliza el metodo find para poder asegurarnos que exista una pelicula con el id que queremos eliminar.
    let productoToDelete = productos.find(producto => producto.id===productoId);
    if(productoToDelete){
        //se utiliza el metodo filter para actualizar el array de movies, sin tener el elemento encontrado en cuestion.
        productos = productos.filter(producto => producto.id !== productoToDelete.id);
        //se actualiza el localstorage
        localStorage.setItem('productos',JSON.stringify(productos));
        showProductos();
        Swal.fire({
            title: 'Exito!',
            text: 'El producto fue eliminado.',
            icon: 'success',
            confirmButtonText: 'Cerrar'
        })
    }
}

// NOS ASEGURAMOS QUE SE CARGUE EL CONTENIDO DE LA PAGINA EN EL DOM
document.addEventListener('DOMContentLoaded',function(){

    const btnSaveMovie = document.querySelector('#btn-save-movie');

    //ASOCIAR UNA FUNCION AL EVENTO CLICK DEL BOTON
    btnSaveMovie.addEventListener('click',saveProducto);
    showProductos();
});