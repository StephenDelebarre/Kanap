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


fetch('http://localhost:3000/api/products/'+ id)
    .then (response => {
        if (response.ok) {
            response.json()
            .then (addInfo => {

                product=addInfo;

                afficherProduit(product);
            })
        }
    }).catch(function (error) {
        console.log(error);
    });


// création des éléments pour l'affichage des produits

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

/* fonction qui ajoute les produits au panier */ 

function ajouterProduitPanier (produit){
    
    let quantity = quantityProduct.value
    let color = colorsProduct.value
    let storage = JSON.parse(localStorage.getItem("Product"))

    if (quantity > 0 && quantity <= 100 && color != "") {

        let productInfos = {
            id: produit._id,
            color: colorsProduct.value,
            quantity: Number(quantityProduct.value),
        };

        if(storage) {

            let resultatRecherche = storage.find((element) => element.id === productInfos.id && element.color === productInfos.color) // on recherche un produit avec le même id et la même couleur

            if(resultatRecherche) { // on additionne la quantité choisie à celle déjà existante

                let qte = parseInt(resultatRecherche.quantity) + parseInt(productInfos.quantity);
                resultatRecherche.quantity = qte;
                localStorage.setItem("Product", JSON.stringify(storage));

                alert("Le produit a bien été ajouté à votre panier")

            } else { // sinon on ajoute le produit dans le localstorage

                storage.push(productInfos)
                localStorage.setItem("Product", JSON.stringify(storage));

            }
        }

        else {

            storage = [];
            storage.push(productInfos)
            localStorage.setItem("Product", JSON.stringify(storage));

        }
    }
}


btnCart.addEventListener('click', e => {

    ajouterProduitPanier(product);
    
})