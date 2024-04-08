
$("#btn_inicio_sesion").click(function (e) { 
    e.preventDefault();

    let user = $("#login-email").val().trim();
    let pass = $("#login-password").val();

    // Arreglo para enviar al servicio - api
    let array_login = {
        "usuario": user,
        "contraseña": pass 
    };

    if (user.length === 0 || pass.length === 0) {
        Swal.fire({
            customClass: {
                confirmButton: 'confirm-button-class',
                title: 'title-class',
                icon: 'icon-class'
            },
            title: 'Error de sesión',
            text: 'Datos vacíos',
            icon: 'error',
            confirmButtonText: 'OK',
        });
    } else {
        $.ajax({
            type: "post",
            url: "http://localhost:3000/api/login",
            data: array_login,
            dataType: "json",
          
            success: function (response) {
                console.log(response);

                const token = response.data ? response.data.token : null;

                if (token) {
                    console.log(token);

                    // Almacena el token en una cookie con una duración de 30 días
                    document.cookie = `auth_token=${token}; expires=${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString()}; path=/`;

                    const nombreDeUsuario = response.displayName; 
                    const profileImageUrl = response.imgURL;
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
                      title: 'Bienvenido: '+ response.displayName,
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
                console.error('Error en la solicitud:', error);
            }
        });
    }
});
