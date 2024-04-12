// recuperiamo l'id dall'URL
const params = new URLSearchParams(window.location.search)
const id = params.get("_id")
// Dichiarazione dell'URL di default che cambierà in base alla presenza o meno
// del parametro _id nell'URL
const URL_BASIC = "https://striveschool-api.herokuapp.com/api/product/"
const URL_STRIVE = id ? URL_BASIC + id : URL_BASIC
// Nello stesso modo decidiamo il metodo che dobbiamo applicare
// PUT nel caso sia presente un id, POST nel caso conttarrio
let method = id ? "PUT" : "POST"

// Una funzione per creare un alert generico, richiedo come parametro una stringa
// che verrà inserita in base all'operazione svolta dall'utente
const createAlert = function (string) {
  const alertContainer = document.getElementById("alertContainer")

  alertContainer.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
  L'operazione di <strong> ${string}</strong> ha avuto successo!
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>`
}

// Simile alla precedente, tuttavia questa crea un alert con un messaggio di errore
// anche questa richiede come parametro una stringa che indicherà il messaggio e il tipo
// di errore riscontrato
const errorAlert = function (string) {
  const alertContainer = document.getElementById("alertContainer")

  alertContainer.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
  ERRORE: <strong> ${string}</strong> 
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`
}

// Funzione che gestisce il submit del form
const handleSubmitForm = function (event) {
  // preveniamo il comportamento di default del form così la pagina non ricaricherà in automatico
  event.preventDefault()

  // recuperiamo i dati dalle inputBox
  const name = document.getElementById("name").value
  const description = document.getElementById("description").value
  const brand = document.getElementById("brand").value
  const imageUrl = document.getElementById("imageUrl").value
  const price = parseInt(document.getElementById("price").value)
  // salviamo i datti in un oggetto
  const newProduct = { name, description, brand, imageUrl, price }
  // passiamo i dati appena recuperati ad una funzione per fare un operazione con il server
  callServer(newProduct)

  if (id) {
  } else {
    event.target.reset()
  }
}

// FUNZIONE PRINCIPALE: gestisce le chiamate al server gestendo le operazioni di modifica o di inserimento
// dei prodotti
const callServer = function (obj) {
  fetch(URL_STRIVE, {
    method,
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZTJmMjdmMzA0NjAwMWFlNTlmNWEiLCJpYXQiOjE3MTI5MDc5MTksImV4cCI6MTcxNDExNzUxOX0.HQjY17eWKUM8a0qYW9rNdzYJIRMtk-ThpbxwcKvh1ws",
    },
  })
    .then((resp) => {
      if (resp.ok) {
        if (method === "PUT") {
          createAlert("modifica")
        } else {
          createAlert("creazione")
        }
        return resp.json()
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
    .catch((err) => console.log(err))
}

// funzione per resettare il Form, collegata al bottone di reset
const resetForm = function (e) {
  const hasConfirmed = confirm("Vuoi davvero resettare il form?")

  if (hasConfirmed) {
    e.target.closest("form").reset()
    createAlert("reset")
  }
}

// funzione per eliminare un prodotto dalla lista di elementi salvati nella nostra API
const handleDelete = () => {
  const hasConfirmed = confirm("Vuoi eliminare davvero il prodotto?")

  if (hasConfirmed) {
    fetch(URL_STRIVE, {
      method: "DELETE",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZTJmMjdmMzA0NjAwMWFlNTlmNWEiLCJpYXQiOjE3MTI5MDc5MTksImV4cCI6MTcxNDExNzUxOX0.HQjY17eWKUM8a0qYW9rNdzYJIRMtk-ThpbxwcKvh1ws",
      },
    })
      .then((resp) => {
        if (resp.ok) {
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
      .then((deletedObj) => {
        console.log(deletedObj)
        createAlert("eliminazione")
        setTimeout(() => {
          window.location.assign("/index.html")
        }, 2000)
      })
      .catch((err) => console.log(err))
  }
}

// OPERAZIONI ALL'AVVIO DELLA PAGINA:
window.onload = () => {
  const form = document.getElementById("form")
  const btnModify = document.getElementById("btnModify")
  const btnInsert = document.getElementById("btnInsert")
  const btnReset = document.getElementById("btnReset")
  const btnDelete = document.getElementById("btnDelete")
  const title = document.getElementById("primaryTitle")

  btnReset.addEventListener("click", (e) => {
    resetForm(e)
  })

  // Se id esiste recuperiamo i dati del prodotto con quel'id
  if (id) {
    fetch(URL_STRIVE, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZTJmMjdmMzA0NjAwMWFlNTlmNWEiLCJpYXQiOjE3MTI5MDc5MTksImV4cCI6MTcxNDExNzUxOX0.HQjY17eWKUM8a0qYW9rNdzYJIRMtk-ThpbxwcKvh1ws",
      },
    })
      .then((resp) => {
        if (resp.ok) {
          return resp.json()
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
      .then((product) => {
        const { name, description, brand, imageUrl, price } = product
        btnModify.classList.remove("d-none")
        btnDelete.classList.remove("d-none")
        btnDelete.addEventListener("click", handleDelete)
        btnInsert.classList.add("d-none")
        title.innerText = "Modifica il prodotto:"

        document.getElementById("name").value = name
        document.getElementById("description").value = description
        document.getElementById("brand").value = brand
        document.getElementById("imageUrl").value = imageUrl
        document.getElementById("price").value = price
      })
      .catch((err) => console.log(err))
  } else {
    title.innerText = "Inserimento prodotti:"
  }

  form.addEventListener("submit", handleSubmitForm)
}
