

$("#reg-btn").click(function (e) { 
    e.preventDefault();
    let nombre=$("#signup-name").val();
    let correo=$("#signup-email").val();
    let dni=$("#signup-dni").val();
    let tel=$("#signup-tel").val();
    let user=$("#signup-user").val().trim();
    let pass=$("#signup-password").val();
    //arreglo para enviar al servicio - api
    let FormDatatext =new FormData(); 

    //FormDatatext.append("led","valor_led");

    let array_usuario= {
       "nombres" : nombre,
       "correo": correo,
       "dni": dni,
       "telefono": tel,
       "usuario":user,
       "contraseña":pass,
       "imagenURL":"https://cdn-icons-png.flaticon.com/512/149/149071.png",
       "fotoperfil":"none",
       "rol":"vecino",
    }

    $.ajax({
        type: "post",
        url: "http://localhost:3000/api/registro",
        data: array_usuario,
        dataType: "json",
        //processData:false,
        //contentType:false,

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
        error: function (xhr, status) {
            
            
             if (xhr.status === 400) {
                const response = JSON.parse(xhr.responseText);
                const mensajeerr =response.mensaje  // El usuario ya existe
                Swal.fire({
                    customClass: {
                        confirmButton: 'confirm-button-class',
                        title: 'title-class',
                        icon: 'icon-class'
                      },
                      
                    title: 'Error de registro',
                    text: mensajeerr,
                    icon: 'error',
                    confirmButtonText: 'OK',
                  })

            } 
                        
           else if(xhr.status ===500){
            const response = JSON.parse(xhr.responseText);
            const mensajeerr =response.mensaje 
            Swal.fire({
                customClass: {
                    confirmButton: 'confirm-button-class',
                    title: 'title-class',
                    icon: 'icon-class'
                  },
                  
                title: 'Error de registro',
                text: mensajeerr,
                icon: 'error',
                confirmButtonText: 'OK',
              })

           }
            else {
                console.error('Error en la solicitud:', status);
            }
        }
    });
    

});
