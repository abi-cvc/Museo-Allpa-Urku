# Museo Allpa Urku

Sitio web informativo del Museo Allpa Urku, enfocado en la divulgación del ecosistema del páramo andino, su biodiversidad, sus exposiciones y la experiencia de visita.

## Sitio desplegado

Versión en producción: https://museo-allpa-urku.vercel.app/

## Descripción

Este proyecto presenta una web estática desarrollada con HTML, CSS y JavaScript para mostrar la propuesta del museo, sus colecciones, exposiciones, información institucional y formulario de contacto.

La estructura del sitio está pensada para ofrecer una navegación clara, una lectura sencilla y una adaptación correcta a distintos dispositivos.

## Páginas del sitio

- Inicio
- Sobre el museo
- El páramo
- Colección
- Exposiciones
- Contacto
- Declaración de accesibilidad

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript
- Google Fonts

## Estructura del proyecto

- `index.html`
- `nosotros.html`
- `paramo.html`
- `colecciones.html`
- `exposiciones.html`
- `contacto.html`
- `declaracion-acc.html`
- `css/estilos.css`
- `css/estilos2.css`
- `scripts/exposiciones.js`
- `scripts/validacionAutomatica.js`
- `scripts/validacionAutomaticaEntradas.js`
- `recursos/`
- `docs/`

## Accesibilidad

El sitio incorpora varias prácticas alineadas con WCAG 2.2, entre ellas:

- enlace de salto al contenido principal
- foco visible para navegación con teclado
- respeto a la preferencia de reducción de movimiento
- uso de etiquetas semánticas y jerarquía de contenidos
- mensajes de error asociados a formularios
- atributos ARIA en secciones interactivas y paneles
- contenido pensado para escalar correctamente con zoom

Importante: la conformidad total con WCAG 2.2 requiere validación manual adicional. Aún existen elementos pendientes de ajuste, como enlaces temporales, la página de declaración de accesibilidad y algunos recursos multimedia sin subtítulos o transcripción.

## Cómo ejecutar el proyecto

Este es un sitio estático, por lo que no requiere instalación de dependencias.

1. Abrir la carpeta del proyecto en VS Code.
2. Iniciar un servidor local, por ejemplo con Live Server.
3. Navegar a `index.html`.

Se recomienda usar un servidor local para asegurar que las rutas de recursos funcionen correctamente.
