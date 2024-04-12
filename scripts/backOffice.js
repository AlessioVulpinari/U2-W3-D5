const params = new URLSearchParams(window.location.search)
const id = params.get("_id")
const URL_BASIC = "https://striveschool-api.herokuapp.com/api/product/"
const URL_STRIVE = id ? URL_BASIC + id : URL_BASIC
let method = id ? "PUT" : "POST"

const createAlert = function (string) {
  const alertContainer = document.getElementById("alertContainer")

  alertContainer.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
  L'operazione di <strong> ${string}</strong> ha avuto successo!
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>`
}

const errorAlert = function (string) {
  const alertContainer = document.getElementById("alertContainer")

  alertContainer.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
  ERRORE: <strong> ${string}</strong> 
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`
}

const handleSubmitForm = function (event) {
  event.preventDefault()

  const name = document.getElementById("name").value
  const description = document.getElementById("description").value
  const brand = document.getElementById("brand").value
  const imageUrl = document.getElementById("imageUrl").value
  const price = parseInt(document.getElementById("price").value)

  const newProduct = { name, description, brand, imageUrl, price }

  callServer(newProduct)

  console.log(newProduct)
  if (id) {
  } else {
    event.target.reset()
  }
}

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
        if (response.status === 400) {
          createAlert("400: Bad Request")
          throw new Error("Bad Request")
        }
        if (response.status === 401) {
          createAlert("401: Unauthorized")
          throw new Error("Unauthorized")
        }
        if (response.status === 403) {
          createAlert("403: Forbidden")
          throw new Error("Forbidden")
        }
        if (response.status === 404) {
          createAlert("404: Not Found")
          throw new Error("Not Found")
        }
        if (response.status === 500) {
          createAlert("500: Server Error")
          throw new Error("Server Error")
        }
        createAlert("Generic Fetch Error")
        throw new Error("Generic Fetch Error")
      }
    })
    .catch((err) => console.log(err))
}

const resetForm = function (e) {
  const hasConfirmed = confirm("Vuoi davvero resettare il form?")

  if (hasConfirmed) {
    e.target.closest("form").reset()
    createAlert("reset")
  }
}

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
      .then((deletedObj) => {
        console.log(deletedObj)
        createAlert("eliminazione")
        window.location.assign("/index.html")
      })
      .catch((err) => console.log(err))
  }
}

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
          if (response.status === 400) {
            createAlert("400: Bad Request")
            throw new Error("Bad Request")
          }
          if (response.status === 401) {
            createAlert("401: Unauthorized")
            throw new Error("Unauthorized")
          }
          if (response.status === 403) {
            createAlert("403: Forbidden")
            throw new Error("Forbidden")
          }
          if (response.status === 404) {
            createAlert("404: Not Found")
            throw new Error("Not Found")
          }
          if (response.status === 500) {
            createAlert("500: Server Error")
            throw new Error("Server Error")
          }
          createAlert("Generic Fetch Error")
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
