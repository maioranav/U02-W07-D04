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
                  <span class="text-bg-danger py-2 px-4 fw-bold rounded-2">${array[i].price.toFixed(2)}€</span>
                  <button type="button" class="btn btn-primary" onclick="deleteBook(${i})">Skip This</button>
               </div>
            </div>
         </div>
   `;

      libraryDOM.innerHTML += card

   }
}

window.onload = fetchBooks