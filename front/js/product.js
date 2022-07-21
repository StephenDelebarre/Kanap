const params = (new URL (document.location)).searchParams
const id = params.get("id")
let product = null;
const imgProduct = document.querySelector(".item__img")
const nameProduct = document.getElementById("title")
const priceProduct = document.getElementById("price")
const descriptionProduct = document.getElementById("description")
const colorsProduct = document.querySelector("#colors")
const btnCart = document.querySelector("#addToCart")
const quantityProduct = document.querySelector("#quantity")
let storage = null


fetch('http://localhost:3000/api/products/'+ id)
    .then (response => {
        if (response.ok) {
            response.json()
            .then (addInfo => {
                //on affecte l'element retourner à la variable globale product
                product=addInfo;

                // on affiche le produit
                afficherProduit(product);
            })
        }
    }).catch(function (error) {
        console.log(error);
    });


// Une fonction qui permet d'afficher un produit
function afficherProduit(addInfo){
    /* création de l'image */

    const productImage = document.createElement("img");
    productImage.src = addInfo.imageUrl;
    productImage.alt = addInfo.altTxt;
    imgProduct.appendChild(productImage);

    /* création du nom */

    const productTitle = document.createElement("h1");
    productTitle.innerText = addInfo.name;
    nameProduct.appendChild(productTitle);

    /* création du prix */

    const productPrice = document.createElement("span");
    productPrice.innerText = addInfo.price;
    priceProduct.appendChild(productPrice);

    /*création description */

    const productDescription = document.createElement("p");
    productDescription.innerText = addInfo.description;
    descriptionProduct.appendChild(productDescription);

    /* création de la couleur */ 

    for (let color of addInfo.colors){
        let productColors = document.createElement("option");
        productColors.value = `${color}`;
        productColors.textContent = `${color}`;
        colorsProduct.appendChild(productColors);
    }
}



// function getProductFromLocalStorage() {

//     let products = localStorage.getItem("Product")

//     if (!products) {
//         return {}
//     }

//     return JSON.parse(products)
// }

// function addProductToLocalStorage() {

//     let productInfos = {
//         id: product._id,
//         color: colorsProduct.value,
//         quantity: quantityProduct.value
//     };

//     localStorage.setItem("Product", JSON.stringify(productInfos));


// }




// une fonction qui permet de rajouter un produit dans le panier
// elle prend en parametre le produit à rajouter
function ajouterProduitPanier (){
    
    // console.log("quantity",quantityProduct.value)
    // console.log("colors product",colorsProduct.value)
    
    // console.log("product infos",productInfos)*

    let quantity = quantityProduct.value
    let color = colorsProduct.value
    let storage = JSON.parse(localStorage.getItem("Product"))

    


    if (quantity > 0 && quantity <= 100 && color != "") {

        let productInfos = {
            id: product._id,
            color: colorsProduct.value,
            quantity: Number(quantityProduct.value)
        };

        if(storage) {
            const resultatRecherche = storage.find((element) => element.id === product._id && element.color === product.color)

            console.log(resultatRecherche)
            console.log(productS)
            console.log(productInfos.quantity)
            console.log(productInfos.color)

            if(resultatRecherche) {
                productInfos.quantity = parseInt(productInfos.quantity) + parseInt(resultatRecherche.quantity)

                localStorage.setItem("Product", JSON.stringify(productS));

            } else {
                productS.push(productInfos)

                localStorage.setItem("Product", JSON.stringify(productS));
            }
        
        }

        else {
            productS.push(productInfos)
            localStorage.setItem("Product", JSON.stringify(productS));
        }
    }
}


btnCart.addEventListener('click', e => {
    ajouterProduitPanier(product);
    
})



/* créer une fonction qui incrémente la quantité du produit dans le localstorage si l'id du produit et la couleur sont identique, et qui créer un nouvel objet à stocker si ce n'est pas le cas 

if id du produit selectionner = id d'un produit dans le localstorage (parcourir avec une boucle) on compare alors la couleur, si color = color (+ id) identique incrémenter la quantité 
else ajouter le nouvel objet au localstorage 

utilisation de parse pour convertire une string en objet*/ 
