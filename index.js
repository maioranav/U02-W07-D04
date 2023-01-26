const url = 'https://striveschool-api.herokuapp.com/books';

const fetchBooks = async function () {
   try {
      sessionStorage.clear();
      let response = await fetch(url)
      if (response.ok) {
         let data = await response.json()
         sessionStorage.setItem('books', JSON.stringify(data))
      } else {
         console.log('Il server ha restituito un errore!' + response)
      }
   } catch (error) {
      console.log("C'è un problema all'accesso alla risorsa")
      console.log(error)
   }
}


window.onload = fetchBooks