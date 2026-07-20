const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
const panels = document.querySelectorAll('[role="tabpanel"]');

function activarPestaña(tab) {

    tabs.forEach(t => {
        t.setAttribute("aria-selected", "false");
        t.classList.remove("active");
    });

    panels.forEach(panel => {
        panel.hidden = true;
    });

    tab.classList.add("active");
    tab.setAttribute("aria-selected", "true");

    const panel = document.getElementById(
        tab.getAttribute("aria-controls")
    );

    panel.hidden = false;

}

tabs.forEach((tab, indice) => {

    tab.addEventListener("click", () => activarPestaña(tab));

    tab.addEventListener("keydown", (evento) => {

        let destino = null;

        if (evento.key === "ArrowRight") {
            destino = tabs[(indice + 1) % tabs.length];
        } else if (evento.key === "ArrowLeft") {
            destino = tabs[(indice - 1 + tabs.length) % tabs.length];
        }

        if (destino) {
            evento.preventDefault();
            destino.focus();
            activarPestaña(destino);
        }

    });

});

// Enlaces como "Comprar entradas" apuntan a exposiciones.html#panel-comprar
// (desde esta misma página o desde index.html). Sin esto, el panel de
// destino existe pero está con `hidden`, así que el enlace no mostraba nada.
function activarPestañaDesdeHash() {
    if (!location.hash) return;
    const idPanel = location.hash.slice(1);
    const tabDestino = tabs.find(tab => tab.getAttribute("aria-controls") === idPanel);
    if (tabDestino) activarPestaña(tabDestino);
}

window.addEventListener("hashchange", activarPestañaDesdeHash);
activarPestañaDesdeHash();
