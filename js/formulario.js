document.addEventListener("DOMContentLoaded", function() {

    /**
     * Gestión del Formulario de Contacto
     */
    const formContacto = document.querySelector("#formulario-contacto");
    
    if (formContacto) {
        formContacto.addEventListener("submit", function(e) {
            e.preventDefault();

            // Obtención de valores
            const nombre = document.querySelector("#nombre").value.trim();
            const correo = document.querySelector("#correo").value.trim();
            const telefono = document.querySelector("#telefono").value.trim();
            const mensaje = document.querySelector("#mensaje").value.trim();
            const contenedorAviso = document.querySelector("#mensaje-formulario");

            // Validación básica
            if (nombre === "" || correo === "" || telefono === "" || mensaje === "") {
                return mostrarAviso(contenedorAviso, "Por favor completa todos los campos.", true);
            }

            // Validación de formato de correo
            if (!correo.includes("@") || !correo.includes(".")) {
                return mostrarAviso(contenedorAviso, "Ingresa un correo válido.", true);
            }

            // Validación de longitud de teléfono
            if (telefono.length < 7) {
                return mostrarAviso(contenedorAviso, "Ingresa un teléfono válido.", true);
            }

            // Éxito
            mostrarAviso(contenedorAviso, "Mensaje enviado correctamente. Te responderemos pronto.", false);
            formContacto.reset();
        });
    }

    /**
     * Gestión del Formulario de Cotización
     */
    const formCotizacion = document.querySelector("#formulario-cotizacion");
    
    if (formCotizacion) {
        formCotizacion.addEventListener("submit", function(e) {
            e.preventDefault();

            const servicio = document.querySelector("#servicio").value;
            const cantidad = Number(document.querySelector("#cantidad").value);
            const tipo = document.querySelector("#tipo").value;
            const res = document.querySelector("#resultado-cotizacion");

            // Tarifas base y multiplicadores
            const precios = {
                diseno: 120,
                marketing: 250,
                merchandising: 80,
                mercado: 300
            };
            
            const multiplicadores = {
                simple: 1,
                medio: 1.4,
                completo: 1.9
            };

            // Validación de selección
            if (servicio === "" || tipo === "" || cantidad <= 0) {
                return mostrarAviso(res, "Selecciona todos los datos para calcular.", true);
            }

            // Cálculo del total
            const total = precios[servicio] * cantidad * multiplicadores[tipo];

            // Mostrar resultado
            res.classList.remove("error");
            res.textContent = "Precio aproximado: S/ " + total.toFixed(2);
        });
    }

    /**
     * Función auxiliar para mostrar avisos en pantalla
     * @param {HTMLElement} el - Elemento donde mostrar el texto
     * @param {string} txt - Mensaje a mostrar
     * @param {boolean} esError - Indica si es un mensaje de error
     */
    function mostrarAviso(el, txt, esError) {
        el.textContent = txt;
        el.classList.toggle("error", esError);
    }
});