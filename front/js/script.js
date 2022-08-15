// requête fetch pour venir récupérer les données du serveur

fetch("http://localhost:3000/api/products")

    .then(response => {

        if (response.ok) {

            response.json()

                .then(products => {

                    for (product of products) {

                        const items = document.getElementById("items")

                        /* création du lien */

                        const producId = document.createElement ("a");
                        producId.href = `./product.html?id=${product._id}`;
                        items.appendChild(producId);

                        /* création article */ 

                        const articleSection = document.createElement("article");
                        producId.appendChild(articleSection);
                        
                        /* création image */

                        const productImage = document.createElement("img");
                        productImage.src = product.imageUrl;
                        productImage.alt = product.altTxt;
                        articleSection.appendChild(productImage);

                        /* création nom */

                        const productTitle = document.createElement("h3");
                        productTitle.innerText = product.name;
                        productTitle.className = "productName";
                        articleSection.appendChild(productTitle);

                        /*création description */

                        const productDescription = document.createElement("p");
                        productDescription.innerText = product.description;
                        productDescription.className = "productDescription"
                        articleSection.appendChild(productDescription);
                        
                    }
                })
            }
        })
