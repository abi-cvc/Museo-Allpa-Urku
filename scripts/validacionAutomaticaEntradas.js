// ============================================
// VALIDACIÓN Y RETROALIMENTACIÓN DEL FORMULARIO
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('#panel-comprar form');
    const inputs = form.querySelectorAll('input, select');
    
    // Configuración de validación para cada campo
    const validaciones = {
        fecha: {
            validar: (valor) => {
                if (!valor) return { valido: false, mensaje: 'Por favor selecciona una fecha' };
                const fecha = new Date(valor);
                const hoy = new Date();
                hoy.setHours(0, 0, 0, 0);
                if (fecha < hoy) return { valido: false, mensaje: 'La fecha no puede ser en el pasado' };
                return { valido: true };
            }
        },
        expo: {
            validar: (valor) => {
                if (!valor || valor === 'Selecciona una exposición') {
                    return { valido: false, mensaje: 'Por favor selecciona una exposición' };
                }
                return { valido: true };
            }
        },
        adultos: {
            validar: (valor) => {
                const num = parseInt(valor);
                if (isNaN(num) || num < 0) return { valido: false, mensaje: 'Ingresa un número válido' };
                return { valido: true };
            }
        },
        estudiantes: {
            validar: (valor) => {
                const num = parseInt(valor);
                if (isNaN(num) || num < 0) return { valido: false, mensaje: 'Ingresa un número válido' };
                return { valido: true };
            }
        },
        ninos: {
            validar: (valor) => {
                const num = parseInt(valor);
                if (isNaN(num) || num < 0) return { valido: false, mensaje: 'Ingresa un número válido' };
                return { valido: true };
            }
        },
        gratis: {
            validar: (valor) => {
                const num = parseInt(valor);
                if (isNaN(num) || num < 0) return { valido: false, mensaje: 'Ingresa un número válido' };
                return { valido: true };
            }
        },
        nombre: {
            validar: (valor) => {
                if (!valor || valor.trim().length < 3) {
                    return { valido: false, mensaje: 'Ingresa tu nombre completo (mínimo 3 caracteres)' };
                }
                return { valido: true };
            }
        },
        correo: {
            validar: (valor) => {
                const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!regex.test(valor)) {
                    return { valido: false, mensaje: 'Ingresa un correo electrónico válido' };
                }
                return { valido: true };
            }
        }
    };

    // Crear elementos de mensaje de error para cada input
    inputs.forEach(input => {
        const mensajeError = document.createElement('div');
        mensajeError.className = 'mensaje-error';
        mensajeError.id = `error-${input.id}`;
        input.parentNode.insertBefore(mensajeError, input.nextSibling);
        
        // Validación en tiempo real
        input.addEventListener('input', function() {
            validarCampo(this);
        });
        
        input.addEventListener('blur', function() {
            validarCampo(this);
        });
        
        // Para select, validar en cambio
        if (input.tagName === 'SELECT') {
            input.addEventListener('change', function() {
                validarCampo(this);
            });
        }
    });

    // Función para validar un campo individual
    function validarCampo(input) {
        const id = input.id;
        const valor = input.value;
        const mensajeError = document.getElementById(`error-${id}`);
        
        if (!validaciones[id]) {
            // Si no hay validación definida, solo limpiar errores
            input.classList.remove('error', 'success');
            if (mensajeError) mensajeError.classList.remove('visible');
            return true;
        }
        
        const resultado = validaciones[id].validar(valor);
        
        if (!resultado.valido) {
            input.classList.add('error');
            input.classList.remove('success');
            if (mensajeError) {
                mensajeError.textContent = resultado.mensaje;
                mensajeError.classList.add('visible');
            }
            return false;
        } else {
            input.classList.remove('error');
            input.classList.add('success');
            if (mensajeError) {
                mensajeError.classList.remove('visible');
            }
            return true;
        }
    }

    // Validar todo el formulario al enviar
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let formularioValido = true;
        
        // Validar todos los campos
        inputs.forEach(input => {
            const valido = validarCampo(input);
            if (!valido) formularioValido = false;
        });
        
        if (formularioValido) {
            // Mostrar mensaje de éxito
            const boton = form.querySelector('button[type="submit"]');
            const textoOriginal = boton.textContent;
            boton.textContent = '✓ ¡Reserva confirmada!';
            boton.style.backgroundColor = '#27ae60';
            boton.disabled = true;
            
            // Resetear después de 3 segundos
            setTimeout(() => {
                boton.textContent = textoOriginal;
                boton.style.backgroundColor = '';
                boton.disabled = false;
            }, 3000);
            
            // Aquí podrías enviar el formulario o mostrar un modal
            console.log('Formulario válido - Enviando datos...');
        } else {
            // Scroll al primer campo con error
            const primerError = form.querySelector('.error');
            if (primerError) {
                primerError.focus();
                primerError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });

    // Función para actualizar el contador de entradas (opcional)
    function actualizarContador(input, cambio) {
        const valorActual = parseInt(input.value) || 0;
        const nuevoValor = Math.max(0, valorActual + cambio);
        input.value = nuevoValor;
        input.dispatchEvent(new Event('input'));
    }

    // Agregar botones + y - para los inputs numéricos
    document.querySelectorAll('.grupo-entrada').forEach(grupo => {
        const input = grupo.querySelector('input[type="number"]');
        const wrapper = grupo.querySelector('.input-wrapper');
        
        if (input && wrapper) {
            // Crear botón -
            const btnMenos = document.createElement('button');
            btnMenos.type = 'button';
            btnMenos.textContent = '−';
            btnMenos.setAttribute('aria-label', 'Disminuir cantidad');
            
            // Crear botón +
            const btnMas = document.createElement('button');
            btnMas.type = 'button';
            btnMas.textContent = '+';
            btnMas.setAttribute('aria-label', 'Aumentar cantidad');
            
            // Insertar antes del input
            wrapper.insertBefore(btnMenos, input);
            wrapper.appendChild(btnMas);
            
            // Eventos
            btnMenos.addEventListener('click', function() {
                actualizarContador(input, -1);
            });
            
            btnMas.addEventListener('click', function() {
                actualizarContador(input, 1);
            });
        }
    });
});