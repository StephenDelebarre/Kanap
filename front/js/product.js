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

/* fonction qui ajoute les produits au panier */ 

function ajouterProduitPanier (produit){ // fonction
    
    let quantity = quantityProduct.value // on stock la valeur de quantité dans une variable
    let color = colorsProduct.value // on stock la couleur dans une variable
    let storage = JSON.parse(localStorage.getItem("Product")) // on récupére les données du localstorage sous forme d'objet et on stock dans une variable

    console.log("quantity",quantityProduct.value) // on vérifie la valeur de quantity
    console.log("colors product",colorsProduct.value) // on vérifie la valeur de color

    if (quantity > 0 && quantity <= 100 && color != "") { // condition si la quantité est entre 1 et 100 et si la couleur est séléctionnée

        // Merci de rajouter les autres proprietes du produit (nom,description, image url, alt text...)
        // dans productInfos excepter le prix
        let productInfos = { // on créer un objet pour y stocker les valeur de nos produits
            id: produit._id,
            color: colorsProduct.value,
            quantity: Number(quantityProduct.value),
        //     name: product.name,
        //     description: product.description,
        //     image: product.imageUrl,
        //     altTxt: product.altTxt
        };

        console.log("product infos",productInfos); // on vérifie les information du produits séléctionné

        if(storage) { // condition si il y a quelque chose dans le localstorage

            let resultatRecherche = storage.find((element) => element.id === productInfos.id && element.color === productInfos.color) //on cherche dans le local storage si un produit à le même id et la même couleur qu'un produit déjà existant

            if(resultatRecherche) { // condition si on à trouvé un produit avec le même id et la même couleur que le produit séléctionné

                let qte = parseInt(resultatRecherche.quantity) + parseInt(productInfos.quantity); // on convertie la valeur de quantité du produit stocké dans le localstorage et la quantité séléctionné et on le stock dans une variable

                resultatRecherche.quantity = qte; // défini la nouvelle quantité avec les 2 quantité additionnnées

                localStorage.setItem("Product", JSON.stringify(storage)); // on créer un objet avec la nouvelle quantité et on l'ajoute au localstorage

                console.log("produit rechercher",resultatRecherche); // on vérifie les nouvelles valeur de quantité

            } else { // dans le cas ou on ne trouve pas un produit avec le même id et la même couleur

                storage.push(productInfos) // on ajoute le produit au localstorage

                localStorage.setItem("Product", JSON.stringify(storage)); // on créer un nouvel objet et on le sauvegarde dans le localstorage

                console.log("Storage dans if",storage); // on vérifie le localstorage

            }
        }

        else {

            storage = []; // on défini le local storage comme tableau

            storage.push(productInfos) // on y ajoute notre objet et on le stock dans notre tableau

            localStorage.setItem("Product", JSON.stringify(storage)); // on créer un nouvel objet dans le tableau du localstorage

            console.log("Storage lorsqu'il n'existe pas",storage);

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
