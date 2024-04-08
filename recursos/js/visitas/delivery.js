
$("#sendelivery").click(function(e) {
    e.preventDefault();
   
    let empresa=$("#empresa").val();
    let vehiculo=$("#vehiculo").val();
    let contacto=$("#contacto").val();
    let fecha=$("#fecha2").val();
    let hora=$("#hora2").val();
    let FormDatatext =new FormData(); 
   
   const currentUser = localStorage.getItem('usuario');
   
   
   let array_delivery = {
       "usuario" : currentUser,
       "empresa": empresa,
       "vehiculo":vehiculo,
       "contacto": contacto,
       "fecha": fecha,
       "hora": hora,
   }
   
   $.ajax({
   
       type: "post",
       url: "https://secureguard2023.onrender.com/api/delivery",
       data: array_delivery,
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
           text: 'Delivery programado satisfactoriamente',
           icon: 'success',
           confirmButtonText: 'OK',
         })
   
       },
       
       })
   
   
   }   
       )
   
   
   
   
   
   
   
   