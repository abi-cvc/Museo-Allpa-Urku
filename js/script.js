const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const today = new Date();
const mesNombre = document.querySelector('.mes-nombre');
const mesAno = document.querySelector('.mes-ano');
const diasGrid = document.querySelector('.calendario-dias');

if (mesNombre && mesAno && diasGrid) {
    mesNombre.textContent = monthNames[today.getMonth()];
    mesAno.textContent = today.getFullYear();

    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    const offset = (firstDay + 6) % 7; // Ajusta para iniciar el lunes

    for (let i = 0; i < offset; i++) {
        const placeholder = document.createElement('span');
        placeholder.className = 'dia vacio';
        diasGrid.appendChild(placeholder);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dia = document.createElement('span');
        dia.className = 'dia';
        dia.textContent = day;
        if (day === today.getDate()) {
            dia.classList.add('hoy');
            dia.setAttribute('aria-current', 'date');
        }
        diasGrid.appendChild(dia);
    }
}

const datosZonas = {
    subparamo: {
        nombre: "Subpáramo",
        rango: "3.000 – 3.500 msnm",
        temperatura: "~12°C",
        especies: "+200",
        descripcion: "Zona de transición entre el bosque montano alto y el páramo abierto. Mayor diversidad de arbustos y helechos. Presencia de polylepis (árbol de papel).",
        tags: ["Polylepis", "Gynoxys", "Quilico", "Baccharis", "Lobo de páramo"]
    },
    paramo: {
        nombre: "Páramo",
        rango: "3.500 – 4.200 msnm",
        temperatura: "~6°C",
        especies: "+150",
        descripcion: "Zona abierta dominada por frailejones y paja de páramo, con lagunas glaciales y suelo esponjoso que retiene el agua.",
        tags: ["Frailejón", "Gynoxys", "Quilico", "Baccharis", "Lobo de páramo"]
    },
    superparamo: {
        nombre: "Superpáramo",
        rango: "3.000 – 3.500 msnm",
        temperatura: "~2°C",
        especies: "+40",
        descripcion: "Zona de transición entre el bosque montano alto y el páramo abierto. Mayor diversidad de arbustos y helechos. Presencia de polylepis (árbol de papel).",
        tags: ["Polylepis", "Gynoxys", "Quilico", "Baccharis", "Lobo de páramo"]
    }
};

(function () {
    const tabs = document.querySelectorAll('.tab-zona');
    const detalle = document.querySelector('.zonificacion-detalle');

    function pintar(zona) {
        const datos = datosZonas[zona];
        if (!datos) return;

        detalle.querySelector('[data-campo="nombre"]').textContent = datos.nombre;
        detalle.querySelector('[data-campo="rango"]').textContent = datos.rango;
        detalle.querySelector('[data-campo="temperatura"]').textContent = datos.temperatura;
        detalle.querySelector('[data-campo="especies"]').textContent = datos.especies;
        detalle.querySelector('[data-campo="descripcion"]').textContent = datos.descripcion;

        const listaTags = detalle.querySelector('[data-campo="tags"]');
        listaTags.innerHTML = '';
        datos.tags.forEach(tag => {
            const li = document.createElement('li');
            li.textContent = tag;
            listaTags.appendChild(li);
        });
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('activa'));
            tab.classList.add('activa');
            pintar(tab.dataset.zona);
        });
    });
})();