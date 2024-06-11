const form = document.querySelector("form");
const inputName = document.getElementById("event-name");

let names = [];

class ListNamesEvent {
  constructor(name) {
    this.eventName = name;
  }
}

form.onsubmit = (event) => {
  event.preventDefault();

  const listOfNames = new ListNamesEvent(inputName.value);

  names.push(listOfNames);

  console.log("inviato")
  localStorage.setItem("events-memory", JSON.stringify(names));
  generateNames(listOfNames);
  console.log(names);
};
window.addEventListener("DOMContentLoaded", () => {
  const listOfNamesFromStorage = localStorage.getItem("events-memory");
  if (listOfNamesFromStorage) {
    const namesAsArray = JSON.parse(listOfNamesFromStorage);
    names = namesAsArray;
    names.forEach((listsofnames) => generateNames(listsofnames));
  }
});
function generateNames(listsofnames) {
  const nameList = document.getElementById("nameList");
  const nameItem = document.createElement("div");
  nameItem.className = "card mt-2";
  nameItem.innerHTML = `
        <div class="card-body bg-dark">
            <p class="card-text text-white ">${listsofnames.eventName}</p>
        </div>`;
  nameList.appendChild(nameItem);
}

function removeName() {
  localStorage.removeItem("events-memory");
  names = [];
  document.getElementById("nameList").innerHTML = "";
}

//Esercizio 2
function startCounter() {
    // recupero il valore del contatore dalla sessionStorage, se c'è, altrimenti inizia da 0
    let counter;
    const storedCounter = sessionStorage.getItem('counter');
    if (storedCounter !== null) {
        counter = parseInt(storedCounter);
    } else {
        counter = 0;
    }
    
    const counterElement = document.getElementById('counter');
    const progressBar = document.getElementById('progress-bar');
    // avvia un intervallo che si ripete ogni secondo
    setInterval(() => {
        counter++;
        // salva il nuovo valore del contatore nella sessionStorage
        sessionStorage.setItem('counter', counter);
        counterElement.textContent = `Tempo trascorso: ${counter} secondi`;
        
         // calcola la percentuale di avanzamento della barra progress
        let progressPercentage = (counter % 100);
          // imposto la larghezza della barra di progresso in base alla percentuale di avanzamento
        progressBar.style.width = `${progressPercentage}%`;
         // imposto l'attributo 'aria-valuenow' per la barra di progresso
        progressBar.setAttribute('aria-valuenow', progressPercentage);
    }, 1000);
}


document.addEventListener("DOMContentLoaded", startCounter);