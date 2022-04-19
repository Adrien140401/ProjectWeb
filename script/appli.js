displayCart();  

document.addEventListener('click', function(event) {

    event.preventDefault();
    var btn = event.target;

    /** ------------------------ AJOUTER DANS LE PANIER AVEC LE BOUTON ------------------------ **/
    if (btn.classList.contains('add-to-cart')) {
        // On récupère le parent du bouton (course item)
        let course = event.target.parentNode.parentNode;

        // On récupère l'identifiant du cours
        let courseId = btn.getAttribute('data-id');

        // On récupère l'élement stock dans la carte ci dessus 
        let dispo = course.getElementsByClassName('stock ')[0];

        // On converti le contenu de l'élément stock en entier
        let stock = parseInt(dispo.innerText);

        // On récupère le contenu du cours à partir de son ID
        let courseData = searchCourse(courseId);


        if (stock > 0) {
            // On affecte le nouveau stock après avoir décrémenté la valeur
            notifications(`${courseData.title} a été ajouté au panier`);
            dispo.innerText = --stock;
            saveInCart(courseId);


        } else if (stock <= 0) {
            notifications(`Ce cours n'est plus disponible`)
            return false;
        }

        afficher(courseData);
    }

    /** ------------------------ SUPPRIMER DANS LE PANIER AVEC LA CROIX ------------------------ **/
    if (btn.classList.contains('delete-from-cart')) {
        let courseId = btn.getAttribute('data-id');
        let courseData = searchCourse(courseId);

        // On cherche le parent du bouton pour le supprimer
        btn.parentNode.parentNode.remove();

        dispoPlus(courseId);

        notifications(`${courseData.title} a été supprimé du panier`);

        updateCart();
    }
})

/** ------------------------ VIDER TOUT LE PANIER EN CLIQUANT DESSUS ------------------------ **/
document.getElementById('empty-cart').addEventListener('click', function(event1) {
    var tab = document.getElementById('test');

    // On remplace la variable par un tableau vide
    tab.innerHTML = " ";

    notifications(`Le panier a été vidé`);

    // On vide le local Storage
    localStorage.clear()

    updateStock();

})


/** ------------------------ FONCTION POUR AUGMENTER LA VALEUR DU STOCK ------------------------ **/
function dispoPlus(courseId) {
    let courseBtn   = document.querySelector(`.add-to-cart[data-id="${courseId}"]`);
    let course      = courseBtn.parentNode.parentNode;
    let dispo       = course.getElementsByClassName('stock')[0];
    var stock       = parseInt(dispo.innerText);
    dispo.innerText = ++stock;
}

/** ------------------------ FONCTION POUR ACTUALISER LES VALEURS DES STOCKS ------------------------ **/
function updateStock() {
    // Rechercher l'item à partir du data id dans le course container
    let coursesInCart = getCart();

    console.log(coursesInCart);
    // [1, 2, 2, 2, 3, 3, 5]

    COURSES.forEach(function(course, i) {

        let countCourse = 0;
        // Compter le nombre de fois ou course.id est présent dans coursesInCart
        coursesInCart.forEach(function(cartCourseId, i) {
            if (cartCourseId == course.id) countCourse++;
        });

        let stockDB = course.stock - countCourse;

        // Modifier le stock dans le DOM avec la variable stockDB
        let courseBtn = document.querySelector(`.add-to-cart[data-id="${course.id}"]`);
        let stock     = courseBtn.parentNode.getElementsByClassName('stock')[0];

        stock.innerHTML = stockDB;

    });
}


/** ------------------------ FONCTION POUR LE LOCAL STORAGE ------------------------ **/
let resultsLala;

for (var p = 0; p < COURSES.length; p++) {
    resultsLala = 0;

    for (var w = 0; w < JSON.parse(localStorage.getItem("productsIncart")).length; w++) {
        if (JSON.parse(localStorage.getItem("productsIncart"))[w] === COURSES[p].id) {
            resultsLala = resultsLala + 1;
        }
    }

    console.log(`Il y a ${resultsLala} resultats pour votre recherche de ${COURSES[p].title}`);

    COURSES[p].stock -= resultsLala;

    console.log(`Le nouveau stock est ${COURSES[p].stock}`);
}


/** ------------------------ FONCTION POUR LE LOCAL STORAGE ------------------------ **/
function getCart() {
    let cartItems = localStorage.getItem('productsIncart');

    if (cartItems == null || cartItems.length == 0) return [];
    else return JSON.parse(cartItems);
}

function saveInCart(id) {
    let cart = getCart();

    cart.push(Number(id))

    localStorage.setItem("productsIncart", JSON.stringify(cart));
}

/** ------------------------ FONCTION POUR AFFICHER LE LOCAL STORAGE DANS LE PANIER ------------------------ **/

function displayCart() {

    let gcart = getCart(); // Récuperer le tableau 

    console.log(gcart);

    for (let j = 0; j < gcart.length; j++) { // Boucle jusqu'à la taille du tableau
        console.log(gcart[j]);
        for (let i = 0; i < COURSES.length; i++) { // boucle jusqu'à la taille de la base de donnée
            if (gcart[j] === COURSES[i].id) { // Si le produit à la même ID dans le local storage et la base de donnée 
                afficher(COURSES[i]); // Alors afficher
            }
        }
    }
}


/** ------------------------ FONCTION POUR AVOIR LES NOTIFICATIONS ------------------------ **/
function notifications(message) {
    document.querySelector('#notification_container').innerHTML += ` 
        <div class="content">           
        <p> ${message} </p>   
        </div>  
        `;

    setTimeout(function() {
        document.querySelector('#notification_container .content').remove();

    }, 3000); // Afficher les notifications pendant 3 secondes puis les supprimers par ordre d'apparition 
}


/** ------------------------ FONCTION POUR RÉCUPÉRER LES ÉLÉMENTS EN FONCTION DE L'ID ------------------------ **/
function searchCourse(id) {
    var course;

    COURSES.forEach(function(item, key) {
        if (item.id == id) course = item;
    });

    return course;
}


/** ------------------------ FONCTION POUR RÉCUPÉRER LES ÉLÉMENTS EN FONCTION DE L'ID + LES AFFICHER ------------------------ **/
function afficher(courseData) {
    let row = document.createElement('tr');

    var html = `
        <td id="test"><img src="img/courses/${courseData.img}" /></td>
        <td>${courseData.title}</td>
        <td>${courseData.price}</td>
        <td>1</td>
        <td><button class="delete-from-cart" data-id="${courseData.id}">X</button></td>`;

    // On affecte le contenu HTML à la ligne
    row.innerHTML = html;

    // On recherche le tbody dans le tableau du panier
    let cart = document.getElementById('cart-table').getElementsByTagName('tbody')[0];

    // Rajoute un data)id qui correspond à son id du tableau
    row.setAttribute('data-id', courseData.id);

    // On ajoute la ligne au tableau
    cart.appendChild(row);

}


/** ------------------------ FONCTION POUR SUPPRIMER LES VALEURS DU LS AVEC LA CROIX ------------------------ **/
function updateCart() {
    // Identifie les lignes et le panier

    let panier = document.querySelector('#cart-table tbody');
    let rows = panier.querySelectorAll('tr');

    // Faire un tableau avec les articles du panier et l'initialiser sans rien

    let panierItems = [];

    // Bouclez les lignes pour obtenir tous les identifiants de données et les pousser dans le tableau

    rows.forEach(function(row) {
        let dataId = row.getAttribute('data-id');

        panierItems.push(dataId);

    })

    // Stocker le tableau dans le LS

    if (JSON.parse(localStorage.getItem('productsIncart')).length !== 1) {
        // S'il y a un article dans le panier, mettez l'autre dans le LS.
        localStorage.setItem('productsIncart', JSON.stringify(panierItems));
    } else {
        // S'il n'y en a pas, supprimez productsInCart du LS 
        localStorage.removeItem('productsIncart')
    }
}


/** ------------------------ DIFFÉRENTS TESTS ------------------------ **/



// function RecupData() {
//     var courseData = searchCourse(courseId);
//     var courseId   = btn.getAttribute('data-id');
// }


//local storage
// function displayCart(){
//     let cartItems = localStorage.getItem("productsIncart");
//      cartItems = JSON.parse(cartItems);
//      let productContainer = document.querySelector(".course__item");
//      if (cartItems && productContainer)    {
//         productContainer.innerHTML = '';
//         Object.values(cartItems).map(item => 
//             {
//             productContainer.innerHTML +=`
//             }
//             }
//         }
//     }



// //local storage test


// // on affecte le boutton add- to -cart a la variable carts
// let carts = document.getElementsByClassName('add-to-cart')

// for (let i = 0; i < carts.length; i++) {
// // on ajoute un event listener "clique" qui va      
//     carts[i].addEventListener('click', () => {
//         cartNumbers(COURSES[i]);
//     })
// }


// function cartNumbers(course) {
//     let productNumber = localStorage.getItem('cartNumbers');
//     productNumber = parseInt(productNumber);
//     if (productNumber) {
//         localStorage.setItem('cartNumbers', productNumber + 1);
//     } else {
//         localStorage.setItem('cartNumbers', 1);
//     }
//     setItems(course);
// }


// function setItems(course) {
//     let cartItems = localStorage.getItem('productsIncart');
//     cartItems     = JSON.parse(cartItems);  
//     if (cartItems !== null) {     
//         if (cartItems [course.id] == undefined){
//             cartItems = {
//                 ...cartItems,
//                 [course.id]: course
//             }
//         }
//         cartItems[course.id].inCart += 1;
//     } else {
//         course.inCart = 1;
//         cartItems = {
//             [course.id]: course
//         }
//     }
//     localStorage.setItem("productsIncart", JSON.stringify(cartItems));
// }