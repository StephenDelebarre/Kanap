const productInfos = document.getElementById("cart__items")
let numberOfProduct = localStorage.getItem.length

for (let i = 0; i < numberOfProduct; i++) {
    fetch("http://localhost:3000/api/products")

        .then(response => {

            if (response.ok) {

                response.json()

                    .then(products => {

                        const divImg = document.createElement("div");
                        divImg.className = "cart__item__img";
                        productInfos.appendChild(divImg);

                        const imageProduct = document.createElement("img")
                        imageProduct.src = products.imageUrl;
                        divImg.appendChild(imageProduct)
                    })
                
            }
        })
}

/* parcourir tout les produits contenue dans le localstorage et créer 
- une div contenue une image pour chaque produits contenue dans le localstorage 
- une div cotenant deux div, une avec le nom du produit, la couleur et le prix et une autre contenant encore deux div, une avec la quantité et une avec un bouton pour supprimer un produit */