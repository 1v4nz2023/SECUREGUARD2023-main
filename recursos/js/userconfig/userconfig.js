//MOSTRAR PREVIEW
function mostrarImagen(event){
    let imagenSource = event.target.result;
    let previewImage = document.getElementById("preview");
    previewImage.src = imagenSource;

  }

  function procesarArchivo(event) { 

    let imagen = event.target.files[0];
    let lector = new FileReader();

    lector.addEventListener("load",mostrarImagen,false);
    lector.readAsDataURL(imagen);
    localStorage.setItem('fotoperfil',imagen.name)

  }                
  
  document.getElementById("archivo").addEventListener("change", procesarArchivo, false);


//GUARDAR FOTO
$("#savephoto").click(function(e){
    e.preventDefault();
    const user = localStorage.getItem('usuario');
    const fotoperfil = localStorage.getItem('fotoperfil');

    let array_update = {
        "fotoperfil": fotoperfil ,
    };


    $("#foto").html(`<img src="../../../recursos/img/${fotoperfil}" alt="foto" id=fotito class="estilo-imagen">`);



    $.ajax({

        type: "put",
        url: "https://secureguard2023.onrender.com/api/login/"+user,
        data: array_update,
        dataType: "json",
        success: function(response){
            console.log(response);
            localStorage.setItem('fotoperfil', fotoperfil);
            window.location.reload();
        }
       })
})



//QUITAR FOTO
$("#deletephoto").click(function(e){
  e.preventDefault();
  const user = localStorage.getItem('usuario');
  const fotoperfil = localStorage.getItem('fotoperfil');
  const profileImageUrl=localStorage.getItem('profileImageUrl');

  let array_update = {
      "fotoperfil": fotoperfil ,
  };

  $("#preview").attr("src",`${profileImageUrl}`)


  $.ajax({

      type: "put",
      url: "https://secureguard2023.onrender.com/api/login/"+user,
      data: array_update,
      dataType: "json",
      success: function(response){
          console.log(response);
          localStorage.setItem('fotoperfil', "none");
      }
     })
})
