const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
const panels = document.querySelectorAll('[role="tabpanel"]');

function activarPestaña(tab) {

    tabs.forEach(t => {
        t.setAttribute("aria-selected", "false");
        t.setAttribute("tabindex", "-1");
        t.classList.remove("active");
    });

    panels.forEach(panel => {
        panel.hidden = true;
    });

    tab.classList.add("active");
    tab.setAttribute("aria-selected", "true");
    tab.setAttribute("tabindex", "0");

    const panel = document.getElementById(
        tab.getAttribute("aria-controls")
    );

    panel.hidden = false;

}

tabs.forEach((tab, indice) => {

    tab.setAttribute("tabindex", tab.classList.contains("active") ? "0" : "-1");

    tab.addEventListener("click", () => activarPestaña(tab));

    tab.addEventListener("keydown", (evento) => {

        let destino = null;

        if (evento.key === "ArrowRight") {
            destino = tabs[(indice + 1) % tabs.length];
        } else if (evento.key === "ArrowLeft") {
            destino = tabs[(indice - 1 + tabs.length) % tabs.length];
        } else if (evento.key === "Home") {
            destino = tabs[0];
        } else if (evento.key === "End") {
            destino = tabs[tabs.length - 1];
        }

        if (destino) {
            evento.preventDefault();
            destino.focus();
            activarPestaña(destino);
        }

    });

});
