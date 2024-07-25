class Vaso {
    constructor(cantidad, capacidad) {
        this.cantidad = cantidad;
        this.capacidad = capacidad;
    }

    hasVasos(cantidad) {
        return this.cantidad >= cantidad;
    }

    giveVasos() {
        if (this.cantidad > 0) {
            this.cantidad--;
        }
    }

    getCantidadVasos() {
        return this.cantidad;
    }
}

class Cafetera {
    constructor(cantidad) {
        this.cantidad = cantidad;
    }

    hasCafe(cantidad) {
        return this.cantidad >= cantidad;
    }

    giveCafe(cantidad) {
        if (this.cantidad >= cantidad) {
            this.cantidad -= cantidad;
        }
    }

    getCantidadCafe() {
        return this.cantidad;
    }
}

class Azucarero {
    constructor(cantidad) {
        this.cantidad = cantidad;
    }

    hasAzucar(cantidad) {
        return this.cantidad >= cantidad;
    }

    giveAzucar(cantidad) {
        if (this.cantidad >= cantidad) {
            this.cantidad -= cantidad;
        }
    }

    getCantidadAzucar() {
        return this.cantidad;
    }
}

class MaquinaDeCafe {
    constructor() {
        this.cafetera = null;
        this.vasosPequenos = null;
        this.vasosMedianos = null;
        this.vasosGrandes = null;
        this.azucarero = null;
    }

    setCafetera(cafetera) {
        this.cafetera = cafetera;
    }

    setVasosPequenos(vasosPequenos) {
        this.vasosPequenos = vasosPequenos;
    }

    setVasosMediano(vasosMedianos) {
        this.vasosMedianos = vasosMedianos;
    }

    setVasosGrande(vasosGrandes) {
        this.vasosGrandes = vasosGrandes;
    }

    setAzucarero(azucarero) {
        this.azucarero = azucarero;
    }

    getTipoDeVaso(tipo) {
        if (tipo === "pequeno") return this.vasosPequenos;
        if (tipo === "mediano") return this.vasosMedianos;
        if (tipo === "grande") return this.vasosGrandes;
    }

    getVasoDeCafe(vaso, cantidadCafe, cantidadAzucar) {
        if (this.cafetera.hasCafe(cantidadCafe) && vaso.hasVasos(1) && this.azucarero.hasAzucar(cantidadAzucar)) {
            this.cafetera.giveCafe(cantidadCafe);
            vaso.giveVasos();
            this.azucarero.giveAzucar(cantidadAzucar);
            return `Tu café (${vaso.capacidad} oz) con ${cantidadAzucar} cucharada(s) de azúcar está listo. ¡Disfruta!`;
        }
        return this.getMensajeDeError(vaso, cantidadCafe, cantidadAzucar);
    }

    getMensajeDeError(vaso, cantidadCafe, cantidadAzucar) {
        if (!this.cafetera.hasCafe(cantidadCafe)) return "Lo siento, no hay suficiente café.";
        if (!vaso.hasVasos(1)) return "Lo siento, no hay suficientes vasos.";
        if (!this.azucarero.hasAzucar(cantidadAzucar)) return "Lo siento, no hay suficiente azúcar.";
    }
}

const cafetera = new Cafetera(50);
const vasosPequenos = new Vaso(10, 3);
const vasosMedianos = new Vaso(20, 5);
const vasosGrandes = new Vaso(30, 7);
const azucarero = new Azucarero(20);

const maquinaDeCafe = new MaquinaDeCafe();
maquinaDeCafe.setCafetera(cafetera);
maquinaDeCafe.setVasosPequenos(vasosPequenos);
maquinaDeCafe.setVasosMediano(vasosMedianos);
maquinaDeCafe.setVasosGrande(vasosGrandes);
maquinaDeCafe.setAzucarero(azucarero);

function crearGranito() {
    const granito = document.createElement('div');
    granito.classList.add('granito');
    granito.style.left = Math.random() * 100 + 'vw';
    granito.style.animationDuration = (Math.random() * 2 + 2) + 's';
    document.getElementById('granitos-container').appendChild(granito);

    setTimeout(() => {
        granito.remove();
    }, 4000);
}

function hacerCafe() {
    const tamanio = document.getElementById("tamanio").value;
    const azucar = document.getElementById("azucar").value;

    const vaso = maquinaDeCafe.getTipoDeVaso(tamanio);
    const resultado = maquinaDeCafe.getVasoDeCafe(vaso, 1, azucar);

    const mensajeElemento = document.getElementById("mensaje");

    if (resultado.includes("Lo siento")) {
        const sonidoError = new Audio('Sound/error.mp3');
        sonidoError.play();
    } else {
        // Reproducir sonido
        const sonidoCafe = document.getElementById("sonido-cafe");
        sonidoCafe.play();

        // Agregar clase de animación
        mensajeElemento.classList.add("animacion-cafe");

        // Crear granitos de café
        for (let i = 0; i < 30; i++) {
            setTimeout(crearGranito, i * 100);
        }

        // Remover clase de animación después de la animación
        setTimeout(() => {
            mensajeElemento.classList.remove("animacion-cafe");
        }, 1000);
    }

    // Mostrar mensaje y lanzar granitos de café
    Swal.fire({
        title: 'Resultado',
        text: resultado,
        icon: resultado.includes("Disfruta") ? 'success' : 'error'
    });

    mensajeElemento.innerText = resultado;
}
