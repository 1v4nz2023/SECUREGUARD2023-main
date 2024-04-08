const usuario_session=localStorage.getItem('usuario');
const profileImageUrl=localStorage.getItem('profileImageUrl');
const fotoperfil = localStorage.getItem('fotoperfil');



$.ajax({
    type: 'GET',
    url: `https://secureguard2023.onrender.com/api/users/${usuario_session}`,
    dataType: 'json',
    success: function(response) {

        if (response.message === 'noadmin') {
            $('#pagvisitas1').hide();
            $('#pagvisitas').hide();
           
        } 
    },
    error: function(error) {
        console.error('Error en la solicitud AJAX:', error);
    }
});


if (fotoperfil=="none") {
    $("#foto").html(`<img src="${profileImageUrl}" alt="foto" id=fotito class="estilo-imagen">`);
    localStorage.setItem('fotoperfil',fotoperfil);
    $("#preview").attr("src",profileImageUrl)

}

else{
    $("#foto").html(`<img src="../../../recursos/img/${fotoperfil}" alt="foto" id=fotito class="estilo-imagen">`);
    $("#preview").attr("src",`../../../recursos/img/${fotoperfil}`)


}



$("#title").html(usuario_session);
