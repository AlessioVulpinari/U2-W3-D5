// recuperiamo l'id dall'URL
const params = new URLSearchParams(window.location.search)
const id = params.get("_id")
const URL_STRIVE = "https://striveschool-api.herokuapp.com/api/product/" + id

// FUNZIONE PRINCIPALE: questa funzione serve per gestire la creazione degli elementi del DOM
const handleCreatePage = function (obj) {
  const product = {
    _id: obj._id,
    name: obj.name,
    description: obj.description,
    brand: obj.brand,
    price: obj.price,
    imageUrl: obj.imageUrl,
  }

  // Contenitore della schermata
  const productContainer = document.getElementById("productContainer")

  // Contenitore dell'immagine
  const imgContainer = document.createElement("div")
  imgContainer.classList.add("d-flex", "justify-content-center")

  // Immagine del prodotto
  const img = document.createElement("img")
  img.src = product.imageUrl

  // Contenitore del testo
  const textContainer = document.createElement("div")

  // Titolo
  const title = document.createElement("h2")
  title.classList.add("display-2")
  title.innerText = product.name

  // Descizione
  const description = document.createElement("p")
  description.classList.add("fs-5")
  description.innerText = product.description

  // Contenitore delle badge
  const tagContainer = document.createElement("div")
  tagContainer.classList.add("d-flex", "my-2", "align-items-center", "gap-2")

  // Badge prezzo
  const price = document.createElement("span")
  price.classList.add("badge", "text-bg-secondary")
  price.innerText = "Prezzo: " + product.price + "$"

  // Badge brand
  const brand = document.createElement("span")
  brand.classList.add("badge", "text-bg-secondary", "me-auto")
  brand.innerText = product.brand

  // Id
  const id = document.createElement("span")
  id.innerText = product._id

  imgContainer.appendChild(img)
  productContainer.appendChild(imgContainer)
  textContainer.appendChild(title)
  textContainer.appendChild(description)
  tagContainer.appendChild(price)
  tagContainer.appendChild(brand)
  tagContainer.appendChild(id)
  textContainer.appendChild(tagContainer)
  productContainer.appendChild(textContainer)
}

// Funzione pre creare gli Alert di errore, vengono richiamati in ogni operazione
// avvenuta tramite un server, in caso di errore per avvertire l'utente del tipo
// di errore riscontrato
const errorAlert = function (string) {
  const alertContainer = document.getElementById("alertContainer")

  alertContainer.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
  ERRORE: <strong> ${string}</strong> 
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`
}

window.addEventListener("DOMContentLoaded", () => {
  fetch(URL_STRIVE, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZTJmMjdmMzA0NjAwMWFlNTlmNWEiLCJpYXQiOjE3MTI5MDc5MTksImV4cCI6MTcxNDExNzUxOX0.HQjY17eWKUM8a0qYW9rNdzYJIRMtk-ThpbxwcKvh1ws",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        if (resp.status === 400) {
          errorAlert("400: Bad Request")
          throw new Error("Bad Request")
        }
        if (resp.status === 401) {
          errorAlert("401: Unauthorized")
          throw new Error("Unauthorized")
        }
        if (resp.status === 403) {
          errorAlert("403: Forbidden")
          throw new Error("Forbidden")
        }
        if (resp.status === 404) {
          errorAlert("404: Not Found")
          throw new Error("Not Found")
        }
        if (resp.status === 500) {
          errorAlert("500: Server Error")
          throw new Error("Server Error")
        }
        errorAlert("Generic Fetch Error")
        throw new Error("Generic Fetch Error")
      }
    })
    .then((data) => {
      console.log(data)
      handleCreatePage(data)
    })
    .catch((err) => console.log(err))
})
