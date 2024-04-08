import { auth } from "../../../src/index.js";
import { signOut } from "../../../src/index.js"; 


if (!document.cookie.includes('auth_token')) {
    // Redirigir al usuario a 'index.html'
    window.location.href = '../../../index.html';

}



$("#endSesion").click(function(e){
    e.preventDefault();
    localStorage.removeItem('profileImageUrl');

    $.ajax({
        type: "post",
        url: "https://secureguard2023.onrender.com/api/logout",
        //processData:false,
        //contentType:false,

        success: function (response) {

            if (response.mensaje ==="Cierre de sesión exitoso"){
                document.cookie = 'auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                localStorage.removeItem('profileImageUrl');
                localStorage.removeItem('usuario');                
                localStorage.removeItem('fotoperfil');   
              // Cierra la sesion de firebase
                signOut(auth).then(() => {

                }).catch((error) => {
                  // An error happened.
                });               
                window.location="../../../index.html";
            }

        },
        
    });
})

