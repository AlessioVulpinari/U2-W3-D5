const URL_STRIVE = "https://striveschool-api.herokuapp.com/api/product/"

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

// FUNZIONE PRINCIPALE: richiamamo la lista dei prodotti dal server
const fetchData = () => {
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
      // Qui richiamo la funzione per creare le card
      createCards(data)
      const spinner = document.getElementById("spinner")
      spinner.classList.add("d-none")
    })
    .catch((err) => console.log(err))
}

// Funzione per la creazione delle card, istanziamo ogni elemento che formerà le nostre card
//
const createCards = (arrayOfObj) => {
  console.log(arrayOfObj)
  arrayOfObj.forEach((obj) => {
    console.log(obj)
    const card = {
      _id: obj._id,
      name: obj.name,
      description: obj.description,
      brand: obj.brand,
      price: obj.price,
      imageUrl: obj.imageUrl,
    }
    console.log(card)
    const row = document.getElementById("cardContainer")

    // Colonna
    const col = document.createElement("col")
    col.classList.add("col")

    // Contenitore interno
    const cardContainer = document.createElement("div")
    cardContainer.classList.add("card", "mb-4", "shadow-sm")

    // Immagine
    const img = document.createElement("img")
    img.src = card.imageUrl
    img.classList.add("bd-placeholder-img", "card-img-top")

    // Contenitore del testo
    const cardBody = document.createElement("div")
    cardBody.classList.add("card-body")

    // Titolo
    const title = document.createElement("div")
    title.classList.add("d-flex", "justify-content-between")
    const name = document.createElement("h5")
    name.classList.add("card-title")
    name.innerText = card.name

    // Badge della marca
    const brand = document.createElement("span")
    brand.classList.add("badge", "text-bg-secondary")
    brand.innerText = card.brand

    // Descrzione del prodotto
    const description = document.createElement("p")
    description.classList.add("card-text", "my-2")
    description.innerText = card.description

    // Badge del prezzo
    const price = document.createElement("span")
    price.classList.add("badge", "text-bg-secondary")
    price.innerText = "Prezzo: " + card.price + "$"

    // Contenitore per i bottoni
    const btnContainer = document.createElement("div")
    btnContainer.classList.add("my-2")

    // Flex intterno per la posizione dei bottoni
    const btnInnerContainer = document.createElement("div")
    btnInnerContainer.classList.add(
      "btn-group",
      "d-flex",
      "justify-content-between",
      "align-items-center"
    )

    // Bottone per visualizzare la schermata di dettaglio
    const moreInfoBtn = document.createElement("button")
    moreInfoBtn.classList.add("btn", "btn-sm", "btn-outline-secondary")
    moreInfoBtn.type = "button"
    moreInfoBtn.innerText = "Scopri di più"
    moreInfoBtn.addEventListener("click", () => {
      window.location.href = `/details.html?_id=${card._id}`
    })

    // Bottone per visualizzare la schermata per modificare il prodotto
    const modifyBtn = document.createElement("button")
    modifyBtn.classList.add("btn", "btn-sm", "btn-outline-secondary")
    modifyBtn.type = "button"
    modifyBtn.innerText = "Modifica"
    modifyBtn.addEventListener("click", () => {
      window.location.href = `/backOffice.html?_id=${card._id}`
    })

    cardContainer.appendChild(img)
    title.appendChild(name)
    title.appendChild(brand)
    cardBody.appendChild(title)
    cardBody.appendChild(description)
    cardBody.appendChild(price)
    btnInnerContainer.appendChild(moreInfoBtn)
    btnInnerContainer.appendChild(modifyBtn)
    btnContainer.appendChild(btnInnerContainer)
    cardBody.appendChild(btnContainer)
    cardContainer.appendChild(cardBody)
    col.appendChild(cardContainer)
    row.appendChild(col)
  })
}

window.addEventListener("DOMContentLoaded", () => {
  fetchData()
})
