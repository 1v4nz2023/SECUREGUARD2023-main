
$(document).ready( function () {
   var dataTable = $('#myTable').DataTable();

   $.ajax({
    type: 'GET',
    url: 'https://secureguard2023.onrender.com/api/ver/visitas', // Reemplaza con la URL correcta de tu servidor
    dataType: 'json',
    success: function(data) {
      console.log(data);
        // Agregar cada fila de datos al DataTable
        data.forEach(function(item) {
            dataTable.row.add([
                item.usuario,
                item.nombres,
                item.apellidos,
                item.dni,
                item.telefono,
                item.fecha,
                item.hora,
                item.motivo, 
                // ... Agrega más columnas según tus datos
            ]).draw();
        });
    },
    error: function(error) {
        console.error('Error en la solicitud AJAX:', error);
    }
});


   
} )