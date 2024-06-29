
function validarFormulario() {
    var nombre = document.getElementById('Nombre').value;
    var telefono = document.getElementById('Teléfono').value;
    var correo = document.getElementById('Correo').value;
    var consulta = document.getElementById('Consulta').value;
    if (nombre.trim() === '') {
        alert('Por favor, ingrese su nombre.');
        return false;
    }
    if (telefono.trim() === '') {
        alert('Por favor, ingrese su número de teléfono.');
        return false;
    }
    if (correo.trim() === '') {
        alert('Por favor, ingrese su correo electrónico.');
        return false;
    }
    if (consulta.trim() === '') {
        alert('Por favor, escriba su consulta.');
        return false;
    }

    // Si todos los campos obligatorios están llenos, enviar el formulario
    return true;
}

  

// document.addEventListener('DOMContentLoaded', function() {
//     var btns = document.querySelectorAll('.active-btn');
//     btns.forEach(function(btn) {
//         btn.addEventListener('click', function() {
//             var subproductos = this.parentNode.querySelector('.subproductos');
//             subproductos.classList.toggle('mostrar');
//         });
//     });
// });

function toggleDarkMode() {
    const root = document.documentElement;
    const isDarkMode = root.classList.contains('mode');
    
    if (isDarkMode) {
      root.classList.remove('mode');
    } else {
      root.classList.add('mode');
    }
  }

document.addEventListener("DOMContentLoaded", function() {
    const darkModeInput = document.getElementById("dark-mode-1");
  
    // Verificar si el modo oscuro está activado en el almacenamiento local
    const isDarkMode = localStorage.getItem("darkMode") === "true";
  
    // Si el modo oscuro está activado, marcar el checkbox
    if (isDarkMode) {
        darkModeInput.checked = true;
        document.documentElement.classList.add("mode");
    }
  
    // Manejar el cambio de modo oscuro
    darkModeInput.addEventListener("change", function() {
        if (this.checked) {
            document.documentElement.classList.add("mode");
            localStorage.setItem("darkMode", true);
        } else {
            document.documentElement.classList.remove("mode");
            localStorage.setItem("darkMode", false);
        }
    });
});

