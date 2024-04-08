import { auth } from "../../../src/index.js";
import { provider } from "../../../src/index.js";
import { signInWithPopup } from "../../../src/index.js";
import { GoogleAuthProvider } from "../../../src/index.js";
import { onAuthStateChanged } from "../../../src/index.js";

const boton = document.getElementById('googleIniciar');

boton.addEventListener('click', () => {
    signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    console.log(user.photoURL);
      let array_usuario= {
        "nombres" : user.displayName,
        "correo": user.email,
        "dni": 0,
        "telefono": 0,
        "usuario":user.displayName,
        "contraseña":"default",
        "imagenURL":user.photoURL,
        "fotoperfil":"none",
        "rol":"usuario"

     }
      console.log(user.displayName);

      $.ajax({
        type: "get",
        url: "http://localhost:3000/api/users/"+user.displayName,
        success: function (response) {
            console.log(response);
            
            const token = user.accessToken;

            if (token) {
                // Almacena el token en una cookie con una duración de 30 días
                document.cookie = `auth_token=${token}; expires=${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString()}; path=/`;

                const nombreDeUsuario = response.usuario; 
                const profileImageUrl = response.imagenURL;
                const fotoperfil = response.fotoperfil;
                
                localStorage.setItem('profileImageUrl', profileImageUrl);
                localStorage.setItem('usuario', nombreDeUsuario);
                localStorage.setItem('fotoperfil', fotoperfil);

                Swal.fire({
                  customClass: {
                      confirmButton: 'confirm-button-class2',
                      title: 'title-class',
                      icon: 'icon-class'
                    },   
                  title: 'Bienvenido: '+ nombreDeUsuario,
                  text: 'Inicio de sesión satisfactoria',
                  icon: 'success',
                  confirmButtonText: 'OK',
                })
                setTimeout(function(){
                    window.location="../../../modulos/alarma/alarma.html";

                    
                }, 600);

            } else {
                console.error('La respuesta del servidor no contiene la propiedad "token".');
                Swal.fire({
                    customClass: {
                        confirmButton: 'confirm-button-class',
                        title: 'title-class',
                        icon: 'icon-class'
                    },
                    title: 'Error de sesión',
                    text: 'Datos incorrectos',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            }      
        },
        error: function (error) {

          $.ajax({
            type: "post",
            url: "http://localhost:3000/api/registro",
            data: array_usuario,
            dataType: "json",
            success: function (response) {
                if (response.mensaje === "Registro exitoso"){
                    Swal.fire({
                      customClass: {
                          confirmButton: 'confirm-button-class2',
                          title: 'title-class',
                          icon: 'icon-class'
                        },   
                      title: 'Éxito',
                      text: response.mensaje,
                      icon: 'success',
                      confirmButtonText: 'OK',
                    })
                  }
            },
          })

        }
    });


    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}
)


