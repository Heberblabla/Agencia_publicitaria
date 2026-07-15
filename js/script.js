// =========================================
// Clase Cotizador (Programación Orientada a Objetos)
// Encapsula los servicios disponibles y el cálculo de la cotización.
// =========================================

class Cotizador {
    constructor(servicios) {
        // servicios: [{ nombre, precio }]
        this.servicios = servicios;
    }

    // Lee los checkboxes y cantidades del DOM y calcula el detalle
    calcular() {
        const checks = document.getElementsByClassName("servicioCheck");
        const cantidades = document.getElementsByClassName("cantidad");

        let total = 0;
        let detalle = "<h3>Detalle de la Cotización</h3>";

        for (let i = 0; i < this.servicios.length; i++) {
            if (checks[i].checked) {
                const cantidad = Number(cantidades[i].value);
                const subtotal = cantidad * this.servicios[i].precio;
                total += subtotal;

                detalle +=
                    this.servicios[i].nombre +
                    " (" + cantidad + ") = S/ " +
                    subtotal +
                    "<br>";
            }
        }

        if (total === 0) {
            detalle = "Seleccione al menos un servicio.";
        } else {
            detalle += "<hr>";
            detalle += "<strong>Total: S/ " + total + "</strong>";
        }

        return detalle;
    }

    // Reinicia los checkboxes y cantidades a su estado inicial
    limpiar() {
        const checks = document.getElementsByClassName("servicioCheck");
        const cantidades = document.getElementsByClassName("cantidad");

        for (let i = 0; i < checks.length; i++) {
            checks[i].checked = false;
            cantidades[i].value = 1;
        }
    }
}

// Instancia única con los servicios y precios de la agencia
const cotizador = new Cotizador([
    { nombre: "Estudio de Mercado", precio: 100 },
    { nombre: "Marketing", precio: 50 },
    { nombre: "Merchandising", precio: 20 },
    { nombre: "Diseño y Artes Gráficas", precio: 50 }
]);

// Funciones globales que el HTML sigue llamando con onclick="..."
function calcularCotizacion() {
    document.getElementById("resultado").innerHTML = cotizador.calcular();
}

function limpiarFormulario() {
    cotizador.limpiar();
    document.getElementById("resultado").innerHTML = "";
}
