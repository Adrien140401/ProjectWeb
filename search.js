

showProducts(); //Appel de la fonction pour présenter les produits

document.querySelector('input').addEventListener('input', (e) => { //Saisie dans la barre de recherche

    var input, filter; //Déclaration des variables 
    input = e.target.value; //Récupération des données saisie dans la barre de recherche
    filter = input.toUpperCase(); //Mettre tout en Majuscule pour éviter les problèmes de Case 

    var courses = document.querySelector("#courses-list .courses__container");
    var no_course = document.querySelector('#no_course');

    courses.innerHTML = ""; //Remettre à 0

    if (input) {
        for (let i = 0; i < COURSES.length; i++) {
            if (COURSES[i].title.toUpperCase().includes(filter)) { //Reconnaître ce qui à été saisie parmis les produits
                courses.innerHTML += createProduct(i); //Remplacer l'HTML 
                no_course.classList.add('hidden'); //Enlever Aucun cours n'est disponible pour votre recherche
            } else if (!courses.innerHTML) {
                no_course.classList.remove('hidden'); //Mettre Aucun cours n'est disponible pour votre recherche
            }
        }
    } else {
        showProducts(); //Afficher les produits
    }
});

function showProducts() { //Fonction pour afficher les produits
    var courses = document.querySelector("#courses-list .courses__container");//Sélectionner la partie HTML où il y a les produits

    courses.innerHTML = '';//Remettre à 0

    for (let i = 0; i < COURSES.length; i++) {
        courses.innerHTML += createProduct(i);
    }
}





function createProduct(id) { // Remplacer l'HTML par les produits dans la "base de données"
    return `
        <div class="course__item">
            <figure class="course_img">
                <img src="img/courses/${COURSES[id].img}">
            </figure>
            <div class="info__card">
                <h4>${COURSES[id].title}</h4>

            <p>
                <span class="discount">${COURSES[id].price} €</span>
            </p>
            <p>
                Disponible: <span class="stock">${COURSES[id].stock}</span>
            </p>
                <a href="#" class="add-to-cart" data-id="${COURSES[id].id}"><i class="fa fa-cart-plus"></i>Ajouter au panier</a>
            </div>
        </div>`;
}





