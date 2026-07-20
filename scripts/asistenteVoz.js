// ============================================
// LEER PÁGINA EN VOZ ALTA
// Usa la Web Speech API (SpeechSynthesis) del navegador — sin
// backend ni permisos de micrófono, con buen soporte en Chrome,
// Edge, Safari y Firefox recientes.
// ============================================

document.addEventListener('DOMContentLoaded', function () {
    if (!('speechSynthesis' in window)) return;

    const boton = document.getElementById('botonAsistenteVoz');
    const etiqueta = document.getElementById('etiquetaAsistenteVoz');
    const main = document.querySelector('main');
    if (!boton || !main) return;

    function detener() {
        window.speechSynthesis.cancel();
        boton.setAttribute('aria-pressed', 'false');
        if (etiqueta) etiqueta.textContent = 'Leer página en voz alta';
    }

    boton.addEventListener('click', function () {
        if (window.speechSynthesis.speaking) {
            detener();
            return;
        }

        const texto = main.innerText.trim();
        if (!texto) return;

        const mensaje = new SpeechSynthesisUtterance(texto);
        mensaje.lang = 'es-ES';
        mensaje.rate = 1;
        mensaje.addEventListener('end', detener);
        mensaje.addEventListener('error', detener);

        window.speechSynthesis.speak(mensaje);
        boton.setAttribute('aria-pressed', 'true');
        if (etiqueta) etiqueta.textContent = 'Detener lectura en voz alta';
    });

    // Si el usuario se va de la página, no dejar la lectura sonando.
    window.addEventListener('pagehide', function () {
        window.speechSynthesis.cancel();
    });
});
