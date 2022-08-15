const productInfos = document.getElementById("cart__items")
let getProductFromLocalStorage = JSON.parse(localStorage.getItem("Product"))
let totalCartPrice = 0
let totalCartProduct = 0

// fonction qui affiche les produits dans le panier

function showProductInCart() {

    if(getProductFromLocalStorage) {

        for (let item of getProductFromLocalStorage) {
            let id = item.id;
            let color = item.color;

            fetch(`http://localhost:3000/api/products/${id}`)

                .then(response => {

                    if (response.ok) {

                        response.json()

                            .then(products => {
                                    
                                // création de l'article

                                const article = document.createElement("article")
                                article.className = "cart__item"
                                article.setAttribute("data-id", id)
                                article.setAttribute("data-color", color)
                                productInfos.appendChild(article)

                                // création de la div contenant l'image
                                
                                const divImg =document.createElement("div");
                                divImg.className = "cart__item__img";
                                article.appendChild(divImg);

                                // création de l'image 
        
                                const imageProduct = document.createElement("img")
                                imageProduct.src = products.imageUrl;
                                imageProduct.alt = products.altTxt
                                divImg.appendChild(imageProduct)

                                // création de la div contenant la div avec les infos du produit

                                const divInfos = document.createElement("div")
                                divInfos.className = "cart__item__content"
                                article.appendChild(divInfos)

                                // création de la div contenant les infos du produit

                                const infos = document.createElement("div")
                                infos.className = "cart__item__content__description"
                                divInfos.appendChild(infos)

                                // création du nom du produit

                                const nameProduct = document.createElement("h2")
                                nameProduct.innerText = "Nom : " + products.name
                                infos.appendChild(nameProduct)

                                // création de la couleur du produit

                                const colorProduct = document.createElement("p")
                                colorProduct.innerText = "Couleur : " + item.color
                                infos.appendChild(colorProduct)

                                // création du prix du produit

                                const priceProduct = document.createElement("p")
                                priceProduct.innerText = "Prix : " + products.price
                                infos.appendChild(priceProduct)

                                // création de la div settings

                                const settingsDiv = document.createElement("div")
                                settingsDiv.className = "cart__item__content__settings"
                                divInfos.appendChild(settingsDiv)

                                // création de la div contenant la quantité 

                                const divQuantityProduct = document.createElement("div")
                                divQuantityProduct.className = "cart__item__content__settings__quantity"
                                settingsDiv.appendChild(divQuantityProduct)

                                // création de la quantité de produits

                                const quantityProduct = document.createElement("p")
                                quantityProduct.innerText = "Quantité : " + item.quantity
                                divQuantityProduct.appendChild(quantityProduct)

                                // création de l'input contenant la quantité

                                const inputQuantityProduct = document.createElement("input")
                                inputQuantityProduct.className = "itemQuantity"
                                inputQuantityProduct.setAttribute = ("type", "number")
                                inputQuantityProduct.setAttribute = ("name", "itemQuantity")
                                inputQuantityProduct.min = "1"
                                inputQuantityProduct.max = "100"
                                inputQuantityProduct.value = item.quantity
                                divQuantityProduct.appendChild(inputQuantityProduct)

                                // création du boutton de suppression

                                const deleteBtn = document.createElement("div")
                                deleteBtn.className = "cart__item__content__settings__delete"
                                settingsDiv.appendChild(deleteBtn)

                                const deleteBtnText = document.createElement("p")
                                deleteBtnText.innerText = "Supprimer"
                                deleteBtnText.className = "deleteItem"
                                deleteBtn.appendChild(deleteBtnText)
                            })
                    }
                })
            }
    } else {

        // création d'un message si le panier est vide

        const txtEmptyCartArticle = document.createElement("article")
        txtEmptyCartArticle.className = "cart__Items__content"
        productInfos.appendChild(txtEmptyCartArticle)

        const txtEmptyCartDiv = document.createElement("div")
        txtEmptyCartDiv.className = "cart__item__content__description"
        txtEmptyCartArticle.appendChild(txtEmptyCartDiv)

        const txtEmptyCart = document.createElement("p")
        txtEmptyCart.innerText = "Votre panier est vide"
        txtEmptyCart.className = "cart__item__content__description__emptyCart"
        txtEmptyCartDiv.appendChild(txtEmptyCart)

    }
}

// fonction qui supprime un produit

function deleteProductInCart(){
   
    // window.onload = function() {
         
        let deleteButton = document.getElementsByClassName("deleteItem");

        console.log(deleteButton)
        console.log(deleteButton.length)

        for (let i = 0; i < deleteButton.length; i++) {

            console.log(deleteButton)

            deleteButton[i].addEventListener('click', () => {

                let product = getProductFromLocalStorage[i]

                console.log(product)

                getProductFromLocalStorage = getProductFromLocalStorage.filter(element => element.id !== product.id && element.color !== product.color)

                localStorage.setItem("Product", JSON.stringify(getProductFromLocalStorage))

                if(getProductFromLocalStorage.length === 0) {
                    localStorage.removeItem("Product")
                    console.log("local supprimer")
                }
            
            location.reload()

            })
        }
    // } 
}


// fonction qui permet la modification de quantité d'un produit

function changeProductQuantity(){

    // window.onload = function() {

        let quantityProduct = document.getElementsByClassName("itemQuantity");

        console.log(quantityProduct)
        console.log(quantityProduct.length)

        for (let quantity of quantityProduct) {
            
            let article = quantity.closest(".cart__item")
            let dataId = article.dataset.id 
            let dataColor = article.dataset.color
        

            quantity.addEventListener("change", () => {
                
                if (quantity.value) {
                    let newQuantity = quantity.value

                    for (let product of getProductFromLocalStorage) {
                        if (dataId == product.id && dataColor == product.color) {
                            product.quantity = newQuantity
                            localStorage.setItem("Product", JSON.stringify(getProductFromLocalStorage))
                            location.reload()

                        } 
                    }   
                }
            })
        }
    // }
}

// fonction qui calcul le prix total et le nombre total de produit du panier

function totalCart() {

    if(getProductFromLocalStorage) {

        for (let item of getProductFromLocalStorage) {
            let id = item.id;

            fetch(`http://localhost:3000/api/products/${id}`)

                .then(response => {

                    if (response.ok) {

                        response.json()

                            .then(products => {

                                let totalQuantity = document.querySelector("#totalQuantity")
                                let totalPrice = document.querySelector("#totalPrice")
                                
                                totalCartPrice += products.price * item.quantity
                                totalCartProduct += parseInt(item.quantity)

                                totalPrice.innerHTML = totalCartPrice
                                totalQuantity.innerHTML = totalCartProduct
                            })
                        }
                    })
        }
    }
}

showProductInCart()
deleteProductInCart()
changeProductQuantity()
totalCart()



// traitement du formulaire

// récupération des inputs

const firstName = document.getElementById("firstName")
const lastName = document.getElementById("lastName")
const address = document.getElementById("address")
const city = document.getElementById("city")
const email = document.getElementById("email")

// création des évènements

firstName.addEventListener("input", function () {
    inputValidation(this)
})

lastName.addEventListener("input", function () {
    inputValidation(this)
})

address.addEventListener("input", function () {
    addressValidation(this)
})

city.addEventListener("input", function () {
    inputValidation(this)
})

email.addEventListener("change", function () {
    emailValidation(this)
})

// création des fonctions de traitement des inputs

const emailValidation = function(inputEmail) { // fonction de traitement de l'input email


    let regexEmail = new RegExp(/^[a-zA-Z0-9.-_]{1,50}[@]{1}[a-zA-Z]{1,50}[.]{1}[a-z]{2,10}$/)
    let emailVerification = regexEmail.test(inputEmail.value)
    let emailErrorMessage = email.nextElementSibling

    if (!emailVerification) {

        emailErrorMessage.innerText = "Veuillez saisir une adresse mail valide"

    } else {

        emailErrorMessage.innerText = ""

    }
}

const inputValidation = function(input) { // fonction de traitement des input (nom, prénom, et ville)

    let regexInput = new RegExp(/^[a-zA-Z-]{1,50}$/)
    let inputVerification = regexInput.test(input.value)
    let inputErrorMessage = input.nextElementSibling

    if (inputVerification) {

        inputErrorMessage.innerText = ""

    } else if (input.value === "") {

        inputErrorMessage.innerText = "Veuillez saisir vos coordonnées"

    } else {

        inputErrorMessage.innerText = "Vous ne pouvez pas entrer de caractrères spéciaux, ni de chiffres"

    }
}

const addressValidation = function (inputAddress) { // fonction de traitement de l'input adresse

    let regexAddress = new RegExp(/^[a-zA-Z0-9 ]{1,50}$/)
    let addressVerification = regexAddress.test(inputAddress.value)
    let addressErrorMessage = address.nextElementSibling

    if (!addressVerification) {

        addressErrorMessage.innerText = "Veuillez saisir une addresse valide"

    } else {

        addressErrorMessage.innerText = ""

    }
}

// fonction d'envoie du formulaire au serveur

function contactInfos() {

    let contact = {
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value
    }

    console.log(contact)

    let product = getProductFromLocalStorage
    let products = []

    // on ajoute les id des produits dans un tableau dans le local

    for (let i = 0; i < product.length; i++) {
        products.push(product[i].id)
    }

    let sendInfos = JSON.stringify({contact, products}) // on créer un objet contenant les id des produits et les information du client

    fetch("http://localhost:3000/api/products/order", { // requête qui envoie les données au serveur

        method: "POST",
        headers: { 
        'Accept': 'application/json', 
        'Content-Type': 'application/json' 
        },

        body: sendInfos

        })
        .then((res) => res.json())

        .then((data) => {
            
            if (!firstName.value, !lastName.value, !city.value, !address.value, !email.value) { // on vérifie que tout les champs soit remplies
                
                alert("Veuillez remplir tout les champs")

            } else { // si c'est le cas on vide le localstorage et on renvoie sur la page de confirmation
                
                localStorage.clear();
                let confirmationUrl = "./confirmation.html?id=" + data.orderId;
                window.location.href = confirmationUrl;

            }
    })


}

// envoie du formulaire au clic

let btn = document.getElementById("order")

btn.addEventListener("click", (e) => {
    e.preventDefault()

    contactInfos()

})
