const URL_STRIVE = "https://striveschool-api.herokuapp.com/api/product/"

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
      createCards(data)
      const spinner = document.getElementById("spinner")
      spinner.classList.add("d-none")
    })
    .catch((err) => console.log(err))
}

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

    const col = document.createElement("col")
    col.classList.add("col")

    const cardContainer = document.createElement("div")
    cardContainer.classList.add("card", "mb-4", "shadow-sm")

    const img = document.createElement("img")
    img.src = card.imageUrl
    img.classList.add("bd-placeholder-img", "card-img-top", "img-thumbnail")

    const cardBody = document.createElement("div")
    cardBody.classList.add("card-body")

    const title = document.createElement("div")
    title.classList.add("d-flex", "justify-content-between")

    const name = document.createElement("h5")
    name.classList.add("card-title")
    name.innerText = card.name

    const brand = document.createElement("span")
    brand.classList.add("badge", "text-bg-secondary")
    brand.innerText = card.brand

    const description = document.createElement("p")
    description.classList.add("card-text", "my-2")
    description.innerText = card.description

    const price = document.createElement("span")
    price.classList.add("badge", "text-bg-secondary")
    price.innerText = "Prezzo: " + card.price + "$"

    const btnContainer = document.createElement("div")
    btnContainer.classList.add("my-2")

    const btnInnerContainer = document.createElement("div")
    btnInnerContainer.classList.add(
      "btn-group",
      "d-flex",
      "justify-content-between",
      "align-items-center"
    )

    const moreInfoBtn = document.createElement("button")
    moreInfoBtn.classList.add("btn", "btn-sm", "btn-outline-secondary")
    moreInfoBtn.type = "button"
    moreInfoBtn.innerText = "Scopri di più"
    moreInfoBtn.addEventListener("click", () => {
      window.location.href = `/details.html?_id=${card._id}`
    })

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
