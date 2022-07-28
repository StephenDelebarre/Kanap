const productInfos = document.getElementById("cart__items") // on récupère la section où on va venir afficher nos données
let getProductFromLocalStorage = JSON.parse(localStorage.getItem("Product"))

// fonction qui affiche les produits du panier

function showProductInCart() {

    if(getProductFromLocalStorage) {

        for (let item of getProductFromLocalStorage) {
            let id = item.id;
            let color = item.color;

            fetch(`http://localhost:3000/api/products/${id}`) // on lance une requête fetch pour accéder au serveur de données

                .then(response => {

                    if (response.ok) {

                        response.json()

                            .then(products => {
                                    
                                /* création de l'article */

                                const article = document.createElement("article")
                                article.className = "cart__item"
                                article.setAttribute("data-id", id)
                                article.setAttribute("data-color", color)
                                productInfos.appendChild(article)

                                /* création de la div contenant l'image */
                                
                                const divImg =document.createElement("div");
                                divImg.className = "cart__item__img";
                                article.appendChild(divImg);

                                /* création de l'image */
        
                                const imageProduct = document.createElement("img")
                                imageProduct.src = products.imageUrl;
                                imageProduct.alt = products.altTxt
                                divImg.appendChild(imageProduct)

                                /* création de la div contenant la div avec les infos du produit */

                                const divInfos = document.createElement("div")
                                divInfos.className = "cart__item__content"
                                article.appendChild(divInfos)

                                /* création de la div contenant les infos du produit */ 

                                const infos = document.createElement("div")
                                infos.className = "cart__item__content__description"
                                divInfos.appendChild(infos)

                                /* création du nom du produit */

                                const nameProduct = document.createElement("h2")
                                nameProduct.innerText = "Nom : " + products.name
                                infos.appendChild(nameProduct)

                                /* création de la couleur du produit */

                                const colorProduct = document.createElement("p")
                                colorProduct.innerText = "Couleur : " + item.color
                                infos.appendChild(colorProduct)

                                /* création de la quantité de produits */

                                const quantityProduct = document.createElement("p")
                                quantityProduct.innerText = "Quantité : " + item.quantity
                                infos.appendChild(quantityProduct)

                                /* création de la div settings */

                                const settingsDiv = document.createElement("div")
                                settingsDiv.className = "cart__item__content__settings"
                                divInfos.appendChild(settingsDiv)

                                /* création du boutton de suppression */

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

        /* création d'un message si le panier est vide */

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

function deleteProductInCart(){
    let deleteButton = document.getElementsByClassName("deleteItem")

    console.log(deleteButton)
    console.log(deleteButton.length)
    
    for (let i = 0; i < deleteButton.length; i++) {
        deleteButton[i].addEventListener('click', () => {

            let product = getProductFromLocalStorage[i]
            console.log(product)

            getProductFromLocalStorage = getProductFromLocalStorage.filter(element => element.id !== product.id && element.color !== product.color)
            console.log(getProductFromLocalStorage)
            localStorage.setItem("Product", JSON.stringify(getProductFromLocalStorage))

            if(getProductFromLocalStorage.length === 0) {
                localStorage.removeItem("Product")
                console.log("local supprimer")
            }
        
        location.reload()

        })
    }
}

function changeProductQuantity(){

}

function totalCart(){

}

showProductInCart()
deleteProductInCart()
changeProductQuantity()
totalCart()

/* parcourir tout les produits contenue dans le localstorage et créer 
- une div contenue une image pour chaque produits contenue dans le localstorage 
- une div cotenant deux div, une avec le nom du produit, la couleur et le prix et une autre contenant encore deux div, une avec la quantité et une avec un bouton pour supprimer un produit */