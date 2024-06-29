const BASEURL = 'http://127.0.0.1:5000';

/**
 * Función para realizar una petición fetch con JSON.
 * @param {string} url - La URL a la que se realizará la petición.
 * @param {string} method - El método HTTP a usar (GET, POST, PUT, DELETE, etc.).
 * @param {Object} [data=null] - Los datos a enviar en el cuerpo de la petición.
 * @returns {Promise<Object>} - Una promesa que resuelve con la respuesta en formato JSON.
 */
async function fetchData(url, method, data = null) {
  const options = {
      method: method,
      headers: {
          'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : null,  // Si hay datos, los convierte a JSON y los incluye en el cuerpo
  };
  try {
    const response = await fetch(url, options);  // Realiza la petición fetch
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return await response.json();  // Devuelve la respuesta en formato JSON
  } catch (error) {
    console.error('Fetch error:', error);
    alert('An error occurred while fetching data. Please try again.');
  }
}

/**
 * Funcion que permite crear un elemento <tr> para la tabla de peliculas
 * por medio del uso de template string de JS.
 */
async function showProductos(){
    let productos =  await fetchData(BASEURL+'/api/productos/', 'GET');
    const tableProductos = document.querySelector('#list-table-productos tbody');
    tableProductos.innerHTML='';
    productos.forEach((producto, index) => {
      let tr = `<tr>
                    <td>${producto.categoría}</td>
                    <td>${producto.nombre}</td>
                    <td>${producto.material}</td>
                    <td>${producto.descripción}</td>
                    <td>${producto.precio}</td>
                    <td>${producto.foto}</td>
                    <td>
                        <button class="btn-cac" onclick='updateMovie(${producto.id_producto})'><i class="fa fa-pencil" ></button></i>
                        <button class="btn-cac" onclick='deleteMovie(${producto.id_producto})'><i class="fa fa-trash" ></button></i>
                    </td>
                  </tr>`;
      tableProductos.insertAdjacentHTML("beforeend",tr);
    });
}

/**
 * Función para comunicarse con el servidor para poder Crear o Actualizar
 * un registro de pelicula
 * @returns 
 */
async function saveProductos(){
    const idProducto = document.querySelector('#id-producto').value;
    const categoría = document.querySelector('#categoría').value;
    const nombre = document.querySelector('#nombre').value;
    const material = document.querySelector('#material').value;
    const descripción = document.querySelector('#descripción').value;
    const precio = document.querySelector('#precio').value;
    const foto = document.querySelector('#foto').value;
    //VALIDACION DE FORMULARIO
    if (!categoría || !nombre || !material || !descripción|| !precio || !foto ) {
      Swal.fire({
          title: 'Error!',
          text: 'Por favor completa todos los campos.',
          icon: 'error',
          confirmButtonText: 'Cerrar'
      });
      return;
    }
    // Crea un objeto con los datos de la película
    const productoData = {
        categoría: categoría,
        nombre: nombre,
        material: material,
        descripción:descripción,
        precio:precio,
        foto:foto,
           };
  let result = null;
  // Si hay un idProducto, realiza una petición PUT para actualizar la película existente
  if(idProducto!==""){
    result = await fetchData(`${BASEURL}/api/productos/${idProducto}`, 'PUT', productoData);
  }else{
    // Si no hay idProducto, realiza una petición POST para crear una nueva película
    result = await fetchData(`${BASEURL}/api/productos/`, 'POST', productoData);
  }
  
  const formProducto = document.querySelector('#form-producto');
  formProducto.reset();
  Swal.fire({
    title: 'Exito!',
    text: result.message,
    icon: 'success',
    confirmButtonText: 'Cerrar'
  })
  showProductos();
}


/**
 * Function que permite eliminar una producto del array del localstorage
 * de acuedo al indice del mismo
 * @param {number} id posición del array que se va a eliminar
 */
function deleteProducto(id){
    Swal.fire({
        title: "Esta seguro de eliminar el producto?",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
    }).then(async (result) => {
        if (result.isConfirmed) {
          let response = await fetchData(`${BASEURL}/api/productos/${id}`, 'DELETE');
          showProductos();
          Swal.fire(response.message, "", "success");
        }
    });
    
}

/**
 * Function que permite cargar el formulario con los datos del producto 
 * para su edición
 * @param {number} id Id de la pelicula que se quiere editar
 */
async function updateProducto(id){
    //Buscamos en el servidor la pelicula de acuerdo al id
    let response = await fetchData(`${BASEURL}/api/productos/${id}`, 'GET');
    const idProducto = document.querySelector('#id-producto');
    const categoría = document.querySelector('#categoría');
    const nombre = document.querySelector('#nombre');
    const material = document.querySelector('#material');
    const descripción = document.querySelector('#descripción');
    const precio = document.querySelector('#precio');
    const foto = document.querySelector('#foto');

    idProducto.value = response.id_producto;
    categoría.value = response.categoría;
    nombre.value = response.nombre;
    material.value = response.material;
    descripción.value = response.descripción;
    precio.value = response.precio;
    foto.value = response.foto;
}

// Escuchar el evento 'DOMContentLoaded' que se dispara cuando el 
// contenido del DOM ha sido completamente cargado y parseado.
document.addEventListener('DOMContentLoaded',function(){
    const btnSaveMovie = document.querySelector('#btn-save-movie');
    // //ASOCIAR UNA FUNCION AL EVENTO CLICK DEL BOTON
    btnSaveMovie.addEventListener('click',saveProductos);
    showProductos();
});
  