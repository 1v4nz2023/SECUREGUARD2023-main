
$(document).ready( function () {
    var dataTable = $('#myTable1').DataTable();
 
    $.ajax({
     type: 'GET',
     url: 'https://secureguard2023.onrender.com/api/ver/deliverys', // Reemplaza con la URL correcta de tu servidor
     dataType: 'json',
     success: function(data) {
       console.log(data);
         // Agregar cada fila de datos al DataTable
         data.forEach(function(item) {
             dataTable.row.add([
                 item.usuario,
                 item.empresa,
                 item.vehiculo,
                 item.contacto,
                 item.fecha,
                 item.hora,
 
             ]).draw();
         });
     },
     error: function(error) {
         console.error('Error en la solicitud AJAX:', error);
     }
 });
 
 
    
 } )