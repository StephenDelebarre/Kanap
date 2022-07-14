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
                        articleSection.appendChild(productDescription);
                    }
                })
            }
        })

/* récuperer les products de l'API
récuperer la réponse émise par l'API et la parcourir pour insérer chaque product dans la page d'accueil de façon dynamique*/

/* utiliser la méthode fetch pour récupérer les données du serveur
faire une promesse de réponse avec .then
vérifier la réponse
si il y a réponse, traduire les données en json
faire une nouvelle promesse avec les actions a effectuer dans la fonction
faire une boucle pour parcourir tout les éléments du serveur, qui insérera les information à chaque itération selon le nombre de products
récupérer les propriétés de la section items et les stocker dans une variable
créer les éléments html et y insérer les données correspondantes depuis le serveur */