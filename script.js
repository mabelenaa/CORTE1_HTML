// --- Carrusel Automático + Botones ---
const images = document.querySelectorAll(".carousel img");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
let currentIndex = 0;
let intervalId;

// Función para mostrar solo la imagen actual
function showImage(index) {
    images.forEach((img, i) => {
        img.classList.toggle('active', i === index);
    });
}

// Función para avanzar
function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
}

// Función para retroceder
function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
}

// Iniciar carrusel automático
function startCarousel() {
    intervalId = setInterval(nextImage, 3000);
}

// Detener carrusel automático temporalmente (cuando el usuario usa los botones)
function resetCarousel() {
    clearInterval(intervalId);
    startCarousel();
}

// Evento botones
if (prevButton && nextButton) {
    prevButton.addEventListener("click", () => {
        prevImage();
        resetCarousel();
    });

    nextButton.addEventListener("click", () => {
        nextImage();
        resetCarousel();
    });
}

// Inicializar
if (images.length > 0) {
    showImage(currentIndex);
    startCarousel();
}

// --- Validación de Formulario de Registro ---
const registroForm = document.getElementById("registroForm");

if (registroForm) {
    registroForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const correo = document.getElementById("correo").value.trim();
        const carrera = document.getElementById("carrera").value;
        const conferencias = document.querySelectorAll('input[name="conferencias"]:checked');

        // Expresión regular para validar correos de @uam.edu.ni o @uamv.edu.ni
        const correoValido = /^[a-zA-Z0-9._%+-]+@(uamv|uam)\.edu\.ni$/;

        if (!nombre || !correo || !carrera || conferencias.length === 0) {
            alert("Por favor, complete todos los campos y seleccione al menos una conferencia.");
            return;
        }

        // Validar formato del correo institucional
        if (!correoValido.test(correo)) {
            alert("El correo debe ser institucional de la UAM: ejemplo@uam.edu.ni o ejemplo@uamv.edu.ni.");
            return;
        }

        document.getElementById("mensajeConfirmacion").textContent = "¡Registro enviado con éxito! Nos vemos en las conferencias.";
        registroForm.reset();
    });
}
