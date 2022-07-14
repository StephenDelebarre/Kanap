const params = new URL (document.location).searchParams
const id = params.get("id")

const imgProduct = document.querySelector(".item__img")
const nameProduct = document.getElementById("title")
const priceProduct = document.getElementById("price")
const descriptionProduct = document.getElementById("description")
let colorsProduct = document.querySelector("#colors")

fetch('http://localhost:3000/api/products/'+ id)
    .then (response => {
        if (response.ok) {
            response.json()
            .then (addInfo => {

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

                let colors = addInfo.colors
                let colorsProduct = document.querySelector("#colors")

                for (let color of colors){
                    let productColors = document.createElement("option");
                    productColors.value = `${color}`;
                    productColors.innerText = `${color}`;
                    colorsProduct.appendChild(productColors);
                }
            })
        }
    })


/* création du localstorage */






/* récupérer les données du produit séléctionné
puis afficher les données et toutes les informations du produtis sur la pages produits */

/* Envoie des produits dans le localstorage */

const btnCart = document.querySelector("#addToCart")
const quantityProduct = document.querySelector("#quantity")
let colorProduct = document.querySelector("#colors")

console.log(colorProduct)

const productInfos = {
    id: id,
    color: colorsProduct.value,
    quantity: quantityProduct.value
};

btnCart.addEventListener('click', e => {

    localStorage.setItem("Product", JSON.stringify(productInfos));
    
    // if (colors.value == "") {
    //     alert ("Veuillez choisir une couleur !")
    // } else {
    //     alert("Les articles ont étaient ajoutés à votre panier !")
    // }

    // document.location.reload()
})




/* créer un tableau pour y stocker des données a envoyer dans le local storage
envoyer les données dans le localstorage quand on clic sur le bouton */