
console.log("- - Agradezco tu interés en mi código. - - ")

const datos = {
    nombre: '',
    empresa: '',
    telefono: '',
    correo: '',
    mensaje: ''
};

const templateZer = "template_g3x8ldf";
const templateRecruiter = "template_rkganh9";

//Expresion regular para validar correos de dominios comunes.
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.(com|net|org|edu|gov|mil|biz|info|mobi|name|aero|jobs|museum|co|mx|uk|us|ca|au|de|fr|jp|ru|ch|it|nl|se|no|es|mil|gov|edu|int|pro|coop|tv|ws|travel|asia|cat|jobs|tel|online|site|tech|store|xyz)(\.[a-zA-Z]{2,})?$/;
//Expresión regular para validar telefonos locales.
const phoneRegex = /^(55|56)\d{8}$|^(33|81|664|222|442|999|998|722|477|443|777|449|686|667|669|662|844|833|229|993|899|444|618|744|614|961|951|871|492|312|612)\d{7}$/;

const formulario = document.querySelector('.formulario');

const telefono = document.querySelector('#telefono')

const menu = document.querySelector('.menu-toggle')

const menuElements = document.querySelectorAll('.menu')
console.log(menuElements)
//Evento para desplegar el menú en dispositivos moviles
menu.addEventListener('click', function(e){
    e.preventDefault();
    menuElements.forEach((i) => i.classList.toggle('show'))
    this.classList.toggle('active')
})


//Evento para preparar los datos mientras el usuario escribe en pantalla
formulario.addEventListener('input', function(e){
    datos[e.target.id] = e.target.value;
})



//Evento para envío y validación de formulario.
formulario.addEventListener('submit', function(e){
    
    e.preventDefault();
    const { nombre, empresa, telefono, correo, mensaje } = datos;

    if(nombre == '' && (telefono == '' || correo == '') ){
        showMensaje('Favor de llenar todos los campos requeridos',1);
        return; 
    }
    else if(nombre != '' && (telefono != '' || correo != '') ){
        //Validar correo electrónico.
        if(correo != ''){
            const correoValido = emailRegex.test(correo);
            if(correoValido == false){
                showMensaje('Por favor, verifica tu mail',1);
                return;
            }
        }
        //Validar numero telefónico.
        if(telefono != ''){
            const telefonoValido = phoneRegex.test(telefono);
            if(telefonoValido == false){
                showMensaje('Introduce un número de teléfono válido',1);
                return;
            }
        }
        //Enviar formulario por correo a Zer y al reclutador
        EnviarMail(this , templateZer);
        EnviarMail(this , templateRecruiter);
        showMensaje("¡Mensaje enviado! :D",0)
    }else {
        showMensaje('No puedo continuar sin tu nombre',1);
        return; 
    }

})

function showMensaje(mensaje, tipo){
    const err = document.createElement('P');
    err.textContent = mensaje;
    if(tipo == 1){//si es un error
        err.classList.add('error');
       
    }else if(tipo == 0){//si es un success
        err.classList.add('success');
    }
    err.classList.add('entrada_error');
    formulario.appendChild(err);
    
    //Desaparecer alerta 3 seg delay
    setTimeout(() => {
       err.classList.remove('entrada_error');
       err.classList.add('salida_error');
    }, 2000);

    setTimeout(() => {
        err.remove();
     }, 2500);
    
}

function EnviarMail(formulario, template){
    emailjs.init({
        publicKey: "efLHra8Lu8AZKJEKE",
      });

      emailjs.sendForm('service_zf3rryo', template , formulario)
      .then(() => {
          console.log('Correo Enviado!');
      }, (error) => {
          console.log('FAILED...', error);
      });

}
