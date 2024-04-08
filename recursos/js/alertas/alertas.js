import { onAuthStateChanged } from "../../../src/index.js";
import { auth } from "../../../src/index.js";
import { provider } from "../../../src/index.js";
import { signInWithPopup } from "../../../src/index.js";
import { collection } from "../../../src/index.js";
import { addDoc } from "../../../src/index.js";
import { GoogleAuthProvider } from "../../../src/index.js";
import { onSnapshot } from '../../../src/index.js';
import { query } from '../../../src/index.js';
import { where } from '../../../src/index.js';
import { doc } from '../../../src/index.js';
import { orderBy } from "../../../src/index.js";
import { signOut } from "../../../src/index.js"; 
import { getDatabase } from "../../../src/index.js"; 
import { database } from "../../../src/index.js"; 
import { ref } from "../../../src/index.js"; 
import { set } from "../../../src/index.js"; 
import { db } from "../../../src/index.js"; 

const title = document.querySelector('#title');



const q = query(collection(db, "alertas"),orderBy('fecha'));
const unsubscribe = onSnapshot(q, (querySnapshot) => {
  alertMessage.innerHTML="";

  querySnapshot.forEach((doc) => {


    if(doc.data().status==='activado'){
      alertMessage.innerHTML +=/*html*/`
      <div class="d-flex justify-content-start me-3 mt-3">
      <span class="badge text-bg-success">${doc.data().date} -> ${doc.data().texto}</span>
      </div>
      `
    }
    else {
      alertMessage.innerHTML +=/*html*/`
      <div class="d-flex justify-content-start me-3 mt-3">
      <span class="badge text-bg-danger">${doc.data().date} -> ${doc.data().texto}</span>
      </div>
      `
    }

    alertMessage.scrollTop=alertMessage.scrollHeight
    ;

  });

});






