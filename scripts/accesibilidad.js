// ============================================
// PANEL DE OPCIONES DE ACCESIBILIDAD
// Las preferencias se guardan en localStorage para que persistan
// al navegar entre páginas (sitio multipágina, no una SPA).
// ============================================

const ALMACENAMIENTO_ACCESIBILIDAD = 'accesibilidad-preferencias';

function leerPreferenciasAccesibilidad() {
    try {
        return JSON.parse(localStorage.getItem(ALMACENAMIENTO_ACCESIBILIDAD)) || {};
    } catch (error) {
        return {};
    }
}

function aplicarPreferenciasAccesibilidad(preferencias) {
    const clases = document.documentElement.classList;

    clases.remove('accesibilidad-texto-grande', 'accesibilidad-texto-mas-grande');
    if (preferencias.texto === 'grande') clases.add('accesibilidad-texto-grande');
    if (preferencias.texto === 'mas-grande') clases.add('accesibilidad-texto-mas-grande');

    clases.toggle('accesibilidad-alto-contraste', !!preferencias.contraste);
    clases.toggle('accesibilidad-espaciado-lectura', !!preferencias.espaciado);
    clases.toggle('accesibilidad-movimiento-reducido', !!preferencias.movimiento);
}

// Aplicar de inmediato (este script se carga al final del body, así
// que ya hay una preferencia guardada de páginas anteriores).
aplicarPreferenciasAccesibilidad(leerPreferenciasAccesibilidad());

document.addEventListener('DOMContentLoaded', function () {
    const boton = document.getElementById('botonAccesibilidad');
    const panel = document.getElementById('panelAccesibilidad');
    if (!boton || !panel) return;

    const botonCerrar = document.getElementById('botonCerrarAccesibilidad');
    const botonRestablecer = document.getElementById('botonRestablecerAccesibilidad');
    const botonesTexto = panel.querySelectorAll('[data-texto]');
    const toggleContraste = document.getElementById('toggleContraste');
    const toggleEspaciado = document.getElementById('toggleEspaciado');
    const toggleMovimiento = document.getElementById('toggleMovimiento');

    function guardarYAplicar(preferencias) {
        localStorage.setItem(ALMACENAMIENTO_ACCESIBILIDAD, JSON.stringify(preferencias));
        aplicarPreferenciasAccesibilidad(preferencias);
    }

    function sincronizarControles() {
        const preferencias = leerPreferenciasAccesibilidad();
        botonesTexto.forEach(function (b) {
            const activo = b.dataset.texto === (preferencias.texto || 'normal');
            b.setAttribute('aria-pressed', String(activo));
        });
        toggleContraste.checked = !!preferencias.contraste;
        toggleEspaciado.checked = !!preferencias.espaciado;
        toggleMovimiento.checked = !!preferencias.movimiento;
    }

    boton.addEventListener('click', function () {
        sincronizarControles();
        panel.showModal();
    });

    botonCerrar.addEventListener('click', function () {
        panel.close();
    });

    // Cerrar al hacer clic fuera del cuadro (sobre el backdrop)
    panel.addEventListener('click', function (evento) {
        if (evento.target === panel) panel.close();
    });

    botonesTexto.forEach(function (b) {
        b.addEventListener('click', function () {
            const preferencias = leerPreferenciasAccesibilidad();
            preferencias.texto = b.dataset.texto;
            guardarYAplicar(preferencias);
            sincronizarControles();
        });
    });

    toggleContraste.addEventListener('change', function () {
        const preferencias = leerPreferenciasAccesibilidad();
        preferencias.contraste = toggleContraste.checked;
        guardarYAplicar(preferencias);
    });

    toggleEspaciado.addEventListener('change', function () {
        const preferencias = leerPreferenciasAccesibilidad();
        preferencias.espaciado = toggleEspaciado.checked;
        guardarYAplicar(preferencias);
    });

    toggleMovimiento.addEventListener('change', function () {
        const preferencias = leerPreferenciasAccesibilidad();
        preferencias.movimiento = toggleMovimiento.checked;
        guardarYAplicar(preferencias);
    });

    botonRestablecer.addEventListener('click', function () {
        guardarYAplicar({});
        sincronizarControles();
    });
});
