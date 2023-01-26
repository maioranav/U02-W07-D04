const url = 'https://striveschool-api.herokuapp.com/books';

const fetchBooks = async function () {
   try {
      sessionStorage.clear();
      let response = await fetch(url)
      if (response.ok) {
         let data = await response.json()
         sessionStorage.setItem('books', JSON.stringify(data))
         listBooks(data)
      } else {
         console.log('Il server ha restituito un errore!' + response)
      }
   } catch (error) {
      console.log("C'è un problema all'accesso alla risorsa")
      console.log(error)
   }
}

const listBooks = (array) => {
   let libraryDOM = document.querySelector("#libraryList")
   libraryDOM.innerHTML = ''
   for (let i = 0; i < array.length; i++) {

      let card = `
         <div id="book${i}" class="card col bg-light p-2 rounded-4 m-1">
            <div class="card-img-top">
               <img class="w-100 rounded-top-4 mb-3" src="${array[i].img}">
            </div>
            <div class="card-content h-100 d-flex flex-column justify-content-end">
               <h5 class="card-title text-black fw-bold mb-3">
                  ${array[i].title}
               </h5>
               <div class="d-flex align-items-center justify-content-end ">
                  <p class="text-muted mx-3">ASIN: ${array[i].asin}</p>
                  <p class="text-end bg-dark-subtle text-muted rounded-2 p-1">${array[i].category}</p>
               </div>
               <div class="d-flex justify-content-evenly align-items-center">
                  <span class="text-bg-danger py-1 px-3 fw-bold rounded-2">${array[i].price.toFixed(2)}€</span>
                  <button type="button" class="btn btn-primary" onclick="deleteBook(${i})">Skip</button>
               </div>
            </div>
         </div>
   `;

      libraryDOM.innerHTML += card

   }
}

const deleteBook = (i) => {
   listedItems = JSON.parse(sessionStorage.getItem('books'))
   listedItems.splice(i, 1)
   console.log(listedItems.length)
   if (listedItems.length > 0) {
      sessionStorage.setItem('books', JSON.stringify(listedItems))
      listBooks(listedItems)
   } else {
      endReached()
   }
}

const endReached = () => {
   let libraryDOM = document.querySelector("#libraryList")
   libraryDOM.classList.remove("row-cols-2")
   libraryDOM.classList.remove("row-cols-md-4")
   libraryDOM.classList.remove("row-cols-lg-5")
   libraryDOM.classList.add("flex-column")
   libraryDOM.classList.add("align-items-center")

   libraryDOM.innerHTML = `
      <h2 class="display-5 m-4">Hai finito l'elenco!</h2>
      <h5>E ora che si fa? Giusto per capire!</h5>
      <p class="m-5"><a href="#" onclick="window.location.reload()">Ricarica la pagina</a></p>
      `
}

window.onload = fetchBooks