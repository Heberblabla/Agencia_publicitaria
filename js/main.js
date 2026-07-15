document.addEventListener("DOMContentLoaded", function() {

    /**
     * Clase MenuMovil
     * Encapsula toda la lógica del menú de navegación responsivo:
     * - Abrir/cerrar con el botón hamburguesa (y animarlo a una "X")
     * - Cerrar al hacer clic en un enlace, fuera del menú, o con la tecla Escape
     * - Manejar el submenú desplegable "Servicios" en pantallas móviles
     */
    class MenuMovil {
        constructor(selectorBoton, selectorNav) {
            this.boton = document.querySelector(selectorBoton);
            this.nav = document.querySelector(selectorNav);
            this.dropdownToggle = document.querySelector(".dropdown-toggle");
            this.dropdownMenu = document.querySelector(".dropdown-menu");

            if (this.boton && this.nav) {
                this.inicializar();
            }
        }

        // Registra todos los eventos necesarios
        inicializar() {
            this.boton.addEventListener("click", (e) => {
                e.stopPropagation();
                this.alternar();
            });

            // Cerrar el menú al elegir un enlace normal (no el que abre el submenú)
            this.nav.querySelectorAll("a").forEach((enlace) => {
                if (enlace !== this.dropdownToggle) {
                    enlace.addEventListener("click", () => this.cerrar());
                }
            });

            // Submenú "Servicios": en móvil se abre con un clic en vez de navegar
            if (this.dropdownToggle && this.dropdownMenu) {
                this.dropdownToggle.addEventListener("click", (e) => {
                    if (window.innerWidth <= 980) {
                        e.preventDefault();
                        e.stopPropagation();
                        this.dropdownMenu.classList.toggle("show");
                    }
                });
            }

            // Cerrar el menú si el usuario hace clic fuera de él
            document.addEventListener("click", (e) => {
                if (this.estaAbierto() && !this.nav.contains(e.target) && e.target !== this.boton) {
                    this.cerrar();
                }
            });

            // Cerrar el menú con la tecla Escape
            document.addEventListener("keydown", (e) => {
                if (e.key === "Escape" && this.estaAbierto()) {
                    this.cerrar();
                }
            });
        }

        estaAbierto() {
            return this.nav.classList.contains("abierto");
        }

        abrir() {
            this.nav.classList.add("abierto");
            this.boton.classList.add("activo");
            this.boton.setAttribute("aria-expanded", "true");
        }

        cerrar() {
            this.nav.classList.remove("abierto");
            this.boton.classList.remove("activo");
            this.boton.setAttribute("aria-expanded", "false");
            if (this.dropdownMenu) {
                this.dropdownMenu.classList.remove("show");
            }
        }

        alternar() {
            this.estaAbierto() ? this.cerrar() : this.abrir();
        }
    }

    new MenuMovil(".menu-toggle", ".nav");

    /**
     * Lógica de FAQ (Preguntas Frecuentes)
     * Permite expandir o contraer las respuestas al hacer clic en la pregunta.
     */
    document.querySelectorAll(".faq-pregunta").forEach(function(pregunta) {
        pregunta.addEventListener("click", function() {
            // Se añade/quita la clase 'abierto' al contenedor padre (faq-item)
            pregunta.parentElement.classList.toggle("abierto");
        });
    });

    /**
     * Lógica de Animaciones al hacer Scroll (Intersection Observer)
     * Detecta cuando un elemento entra en el campo de visión para activar la animación.
     */
    const elementosAnimar = document.querySelectorAll(".animar");

    // Comprobamos si el navegador soporta IntersectionObserver
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(function(entradas) {
            entradas.forEach(function(entrada) {
                if (entrada.isIntersecting) {
                    entrada.target.classList.add("visible");
                }
            });
        }, {
            threshold: 0.2 // Se activa cuando el 20% del elemento es visible
        });

        elementosAnimar.forEach(function(el) {
            observer.observe(el);
        });
    } else {
        // Fallback: si no hay soporte, mostramos todos los elementos directamente
        elementosAnimar.forEach(function(el) {
            el.classList.add("visible");
        });
    }
});