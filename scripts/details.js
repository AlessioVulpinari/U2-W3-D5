const params = new URLSearchParams(window.location.search)
const id = params.get("_id")
const URL_STRIVE = "https://striveschool-api.herokuapp.com/api/product/" + id

const handleCreatePage = function (obj) {
  const product = {
    _id: obj._id,
    name: obj.name,
    description: obj.description,
    brand: obj.brand,
    price: obj.price,
    imageUrl: obj.imageUrl,
  }

  const productContainer = document.getElementById("productContainer")

  const imgContainer = document.createElement("div")
  imgContainer.classList.add("d-flex", "justify-content-center")

  const img = document.createElement("img")
  img.src = product.imageUrl

  const textContainer = document.createElement("div")

  const title = document.createElement("h2")
  title.classList.add("display-2")
  title.innerText = product.name

  const description = document.createElement("p")
  description.classList.add("fs-5")
  description.innerText = product.description

  const tagContainer = document.createElement("div")
  tagContainer.classList.add("d-flex", "my-2", "align-items-center", "gap-2")

  const price = document.createElement("span")
  price.classList.add("badge", "text-bg-secondary")
  price.innerText = "Prezzo: " + product.price + "$"

  const brand = document.createElement("span")
  brand.classList.add("badge", "text-bg-secondary", "me-auto")
  brand.innerText = product.brand

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
        if (response.status === 400) {
          throw new Error("Bad Request")
        }
        if (response.status === 401) {
          throw new Error("Unauthorized")
        }
        if (response.status === 403) {
          throw new Error("Forbidden")
        }
        if (response.status === 404) {
          throw new Error("Not Found")
        }
        if (response.status === 500) {
          throw new Error("Server Error")
        }

        throw new Error("Generic Fetch Error")
      }
    })
    .then((data) => {
      console.log(data)
      handleCreatePage(data)
    })
    .catch((err) => console.log(err))
})
