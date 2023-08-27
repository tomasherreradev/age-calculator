
document.addEventListener('DOMContentLoaded', function() {
    iniciarApp();
});


function iniciarApp() {
    escucharBoton();
}

function escucharBoton() {
    const boton = document.querySelector('#boton');
    boton.addEventListener('click', obtenerFecha);
}

const containerForm = document.querySelector('.contenedor__formulario');

const diaInput = document.querySelector('#day');
const mesInput = document.querySelector('#month');
const añoInput = document.querySelector('#year');

const labels = document.querySelectorAll('.campo__label');
const inputs = document.querySelectorAll('.campo__input');

const errorTexto = document.createElement('p');
errorTexto.classList.add('error-texto');
errorTexto.textContent = 'must be a valid number';


function obtenerFecha () {
    if(diaInput.value === '' || mesInput.value === '' || añoInput.value === '') {        
        mostrarError();
    } else {
        comprobarFechas();
    }
    
}

function comprobarFechas() {
    if(parseInt(mesInput.value) <1 || parseInt(mesInput.value) > 12 ) {
        mostrarError();
        return;
    } 
    if(parseInt(mesInput.value) === 2 && parseInt(diaInput.value) > 28) {
        mostrarError();
        return;
    } 
    if(parseInt(diaInput.value) > 31) {
        mostrarError();
        return;
    }    
    else {
        imprimirEdad();
    }
}


function imprimirEdad () {
    const fechaActual = new Date();
    const diaActual = fechaActual.getDate();
    const mesActual = fechaActual.getMonth() +1;
    const añoActual = fechaActual.getFullYear();

    const fechaNacimiento = new Date(
        parseInt(añoInput.value),
        parseInt(mesInput.value) - 1,
        parseInt(diaInput.value)
    );

    const diffEnMS = fechaActual - fechaNacimiento;

    const años = Math.floor(diffEnMS / (1000 * 60 * 60 * 24 * 365.25));
    const meses = Math.floor((diffEnMS % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44));
    const dias = Math.floor((diffEnMS % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));

    
    const spanAños = document.querySelector('#spanAños');
    const spanMeses = document.querySelector('#spanMeses');
    const spanDias = document.querySelector('#spanDias');

    spanAños.textContent = años;
    spanMeses.textContent = meses;
    spanDias.textContent = dias;

}


function mostrarError() {
    labels.forEach(label => {
        label.classList.add('error');
        setTimeout(() => {
            label.classList.remove('error');
        }, 2000);
    });
    inputs.forEach(input => {
        input.classList.add('error-border');
        setTimeout(() => {
            input.classList.remove('error-border');
        }, 2000);
    });
    containerForm.appendChild(errorTexto);
    setTimeout(() => {
        errorTexto.remove();
    }, 2000);

}