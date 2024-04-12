const params = new URLSearchParams(window.location.search)
const id = params.get("_id")
const URL_STRIVE = id
  ? "https://striveschool-api.herokuapp.com/api/product/" + id
  : "https://striveschool-api.herokuapp.com/api/product/"
let method = id ? "PUT" : "POST"

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

window.onload = () => {
  const form = document.getElementById("form")
  const btnModify = document.getElementById("btnModify")

  if (id) {
    fetch(URL_STRIVE)
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
        btnModify.addEventListener("click", (product) => callServer(product))

        document.getElementById("name").value = name
        document.getElementById("description").value = description
        document.getElementById("brand").value = brand
        document.getElementById("imageUrl").value = imageUrl
        document.getElementById("price").value = price
      })
      .catch((err) => console.log(err))
  }

  form.addEventListener("submit", handleSubmitForm)
}
