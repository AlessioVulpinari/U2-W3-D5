const params = new URLSearchParams(window.location.search)
const id = params.get("_id")
const URL_BASIC = "https://striveschool-api.herokuapp.com/api/product/"
const URL_STRIVE = id ? URL_BASIC + id : URL_BASIC
let method = id ? "PUT" : "POST"

console.log(URL_STRIVE)
console.log(method)

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
        return resp.json()
      } else {
        throw new Error("Errore nell'inserimento")
      }
    })
    .catch((err) => console.log(err))
}

const resetForm = function (e) {
  e.target.closest("form").reset()
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
        alert("Risorsa: eliminata con successo!")
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
          throw new Error("Errore nella fetch")
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
