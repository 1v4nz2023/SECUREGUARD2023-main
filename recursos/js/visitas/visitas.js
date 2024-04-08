
$("#sendvisitas").click(function(e) {
 e.preventDefault();

 let nombres=$("#nombres").val();
 let apellidos=$("#apellidos").val();
 let dni=$("#dni").val();
 let telefono=$("#telefono").val();
 let fecha=$("#fecha").val();
 let hora=$("#hora").val();
 let motivo=$("#motivo").val();
 let FormDatatext =new FormData(); 

const currentUser = localStorage.getItem('usuario');


let array_visitas = {
    "usuario" : currentUser,
    "nombres": nombres,
    "apellidos":apellidos,
    "dni": dni,
    "telefono": telefono,
    "fecha": fecha,
    "hora": hora,
    "motivo":motivo,
}

$.ajax({

    type: "post",
    url: "https://secureguard2023.onrender.com/api/visitas",
    data: array_visitas,
    dataType: "json",
    success: function(response) {
    console.log(response);
    Swal.fire({
        customClass: {
            confirmButton: 'confirm-button-class2',
            title: 'title-class',
            icon: 'icon-class'
          },   
        title: 'Mensaje',
        text: 'Visita programada satisfactoriamente',
        icon: 'success',
        confirmButtonText: 'OK',
      })

    },
    error: function (xhr, status) {
            
            
        if (xhr.status === 404) {
           const response = JSON.parse(xhr.responseText);
           const mensajeerr =response.mensaje  // dni duplicado
           Swal.fire({
               customClass: {
                   confirmButton: 'confirm-button-class',
                   title: 'title-class',
                   icon: 'icon-class'
                 },
                 
               title: 'Error de programación',
               text: mensajeerr,
               icon: 'error',
               confirmButtonText: 'OK',
             })

       } 
       else {
           console.error('Error en la solicitud:', status);
       }
   }
    
    })


}   
    )







