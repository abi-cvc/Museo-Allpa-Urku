const tabs = document.querySelectorAll('[role="tab"]');
const panels = document.querySelectorAll('[role="tabpanel"]');

tabs.forEach(tab => {

    tab.addEventListener("click", () => {

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

    });

});