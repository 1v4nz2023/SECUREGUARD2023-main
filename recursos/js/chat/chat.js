import { onAuthStateChanged } from "../../../src/index.js";
import { auth } from "../../../src/index.js";
import { provider } from "../../../src/index.js";
import { signInWithPopup } from "../../../src/index.js";
import { collection } from "../../../src/index.js";
import { addDoc } from "../../../src/index.js";
import { GoogleAuthProvider } from "../../../src/index.js";
import { db } from '../../../src/index.js';
import { onSnapshot } from '../../../src/index.js';
import { query } from '../../../src/index.js';
import { where } from '../../../src/index.js';
import { doc } from '../../../src/index.js';
import { orderBy } from "../../../src/index.js";
import { signOut } from "../../../src/index.js"; 

const nombreUsuario = document.querySelector('#nombreUsuario');
const contenidoProtegido=document.querySelector('#contenidoProtegido');
const formulario=document.querySelector('#formulario');
const inputChat=document.querySelector('#inputChat');
const usuario = localStorage.getItem('usuario');


function getTime(){
  const f = new Intl.DateTimeFormat("es-sp",{
    dateStyle:"short",
    timeStyle:"short",
  })
  const date=f.format(new Date());
  console.log(date);
  return date;
}

onAuthStateChanged(auth, (user) => {
    if (user) {

        const uid = user.uid;
        nombreUsuario.innerHTML=user.displayName;
        formulario.classList = "input-group py-3 position-absolute fixed-bottom"
        contenidoChat(user);


    } else if (usuario){

      nombreUsuario.innerHTML=usuario;
      formulario.classList = "input-group py-3 position-absolute fixed-bottom"
      contenidoChat2(usuario);
    }
});

const contenidoChat = (user) => {

    formulario.addEventListener('submit',(e) => {
        e.preventDefault();
        getTime();
        console.log(inputChat.value);
        if(!inputChat.value.trim()){
            console.log("Input vacio");
            return;
        }

        try {
            const docRef = addDoc(collection(db, "chat"), {
              texto: inputChat.value,
              uid: user.uid,
              nick:user.displayName,
              fecha: Date.now(),
              date:`${getTime()}`        

            });
            console.log("Mensaje guardado ");
          } catch (e) {
            console.error("Error adding document: ", e);
          }
          inputChat.value=""

    })
    
    const q = query(collection(db, "chat"),orderBy('fecha'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        contenidoProtegido.innerHTML="";
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        console.log(user.uid);
        if(doc.data().uid === user.uid){
          contenidoProtegido.innerHTML +=/*html*/`
          <div class="message">
          <div class="sender d-flex justify-content-end">${doc.data().nick}</div>
          <div class="message-text d-flex justify-content-end">${doc.data().texto}</div>
          <div class="timestamp d-flex justify-content-end">${doc.data().date}</div>
          </div>
          `
        } else{
          contenidoProtegido.innerHTML +=/*html*/`
          <div class="message received">
            <div class="sender">${doc.data().nick}</div>
            <div class="message-text">${doc.data().texto}</div>
            <div class="timestamp">${doc.data().date}</div>                  
          </div>
          `
        }
        contenidoProtegido.scrollTop=contenidoProtegido.scrollHeight;

      });
    });

      };


      const contenidoChat2 = (usuario) => {

        formulario.addEventListener('submit',(e) => {
            e.preventDefault();
            getTime();

            console.log(inputChat.value);
            if(!inputChat.value.trim()){
                console.log("Input vacio");
                return;
            }
    
            try {
                const docRef = addDoc(collection(db, "chat"), {
                  texto: inputChat.value,
                  nick:usuario,
                  fecha: Date.now(),
                  date:`${getTime()}`        

                });
                console.log("Mensaje guardado ");
              } catch (e) {
                console.error("Error adding document: ", e);
              }
              inputChat.value=""
    
        })
        
        const q = query(collection(db, "chat"),orderBy('fecha'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            contenidoProtegido.innerHTML="";
          querySnapshot.forEach((doc) => {
            console.log(doc.data());
            console.log(usuario);
            if(doc.data().nick === usuario){
                contenidoProtegido.innerHTML +=/*html*/`
                <div class="message">
                <div class="sender d-flex justify-content-end">${doc.data().nick}</div>
                <div class="message-text d-flex justify-content-end">${doc.data().texto}</div>
                <div class="timestamp d-flex justify-content-end">${doc.data().date}</div>
                </div>
                `
            } else{
                contenidoProtegido.innerHTML +=/*html*/`
                <div class="message received">
                  <div class="sender">${doc.data().nick}</div>
                  <div class="message-text">${doc.data().texto}</div>
                  <div class="timestamp">${doc.data().date}</div>                  
                </div>
                `
            }
            contenidoProtegido.scrollTop=contenidoProtegido.scrollHeight;
    
          });
        });
    
          };      