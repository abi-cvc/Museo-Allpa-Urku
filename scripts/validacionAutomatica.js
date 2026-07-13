const formulario = document.getElementById("formContacto");

const campos = [

    {
        input: nombre,
        error: errorNombre,
        mensaje: "Ingrese un nombre de al menos 5 caracteres."
    },

    {
        input: correo,
        error: errorCorreo,
        mensaje: "Ingrese un correo válido."
    },

    {
        input: asunto,
        error: errorAsunto,
        mensaje: "Ingrese un asunto."
    },

    {
        input: mensaje,
        error: errorMensaje,
        mensaje: "El mensaje debe tener al menos 20 caracteres."
    }

];

campos.forEach(campo => {

    campo.input.addEventListener("input", () => validar(campo));

    campo.input.addEventListener("blur", () => validar(campo));

});

terminos.addEventListener("change", validarCheckbox);

function validar(campo){

    if(campo.input.checkValidity()){

        campo.error.textContent="";

        campo.input.classList.remove("invalido");
        campo.input.classList.add("valido");

        campo.input.setAttribute("aria-invalid","false");

    }else{

        campo.error.textContent=campo.mensaje;

        campo.input.classList.remove("valido");
        campo.input.classList.add("invalido");

        campo.input.setAttribute("aria-invalid","true");
    }

}

function validarCheckbox(){

    if(terminos.checked){

        errorTerminos.textContent="";
        terminos.setAttribute("aria-invalid","false");

    }else{

        errorTerminos.textContent="Debe aceptar los términos.";
        terminos.setAttribute("aria-invalid","true");

    }

}

formulario.addEventListener("submit",(e)=>{

    campos.forEach(validar);

    validarCheckbox();

    const valido = formulario.checkValidity();

    if(!valido){

        e.preventDefault();

    }

});