
console.log("- - Agradezco tu interés en mi código. - - ")
const datos = {
    nombre: '',
    empresa: '',
    telefono: '',
    correo: '',
    mensaje: ''
};
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.(com|net|org|edu|gov|mil|biz|info|mobi|name|aero|jobs|museum|co|mx|uk|us|ca|au|de|fr|jp|ru|ch|it|nl|se|no|es|mil|gov|edu|int|pro|coop|tv|ws|travel|asia|cat|jobs|tel|online|site|tech|store|xyz)(\.[a-zA-Z]{2,})?$/;

const formulario = document.querySelector('.formulario');
const nombre = document.querySelector('#nombre');
const empresa = document.querySelector('#empresa');
const telefono = document.querySelector('#telefono');
const correo = document.querySelector('#correo');
const mensaje = document.querySelector('#mensaje');

formulario.addEventListener('input', function(e){
    datos[e.target.id] = e.target.value
})

formulario.addEventListener('submit', function(e){
    
    e.preventDefault();
    const { nombre, empresa, telefono, correo, mensaje } = datos;

    if(nombre == '' && (telefono == '' || correo == '') ){
        showError('Favor de llenar todos los campos A ')
        return; //corta la ejecución, por no tener ningun campo
    }
    else if(nombre != '' && (telefono != '' || correo != '') ){
        if(correo != ''){
            const correoValido = emailRegex.test(correo)
            if(correoValido == false){
                showError('Por favor, verifica tu mail.')
                return;//corta la ejecución, porque el mail está mal
            }
        }
    }else {
        showError('Favor de llenar todos los campos B')
        return; //corta la ejecución, porque necesita el nombre
    }

})

function showError(mensaje){
    const err = document.createElement('P')
    err.textContent = mensaje;
    err.classList.add('error')
    err.classList.add('entrada_error')
    formulario.appendChild(err)
    
    //Desaparecer alerta 3 seg delay
    setTimeout(() => {
       err.classList.remove('entrada_error');
       err.classList.add('salida_error')
    }, 2000);

    setTimeout(() => {
        err.remove();
     }, 2500);
    
}
