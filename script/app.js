/*const sneakersList = document.querySelector('containerShoes');
const searchBar = document.querySelector('input.searchInput');
let mySneakers = [];
console.log(searchBar);

searchBar.addEventListener('keyup', (e) => {
    console.log(e.target.value);
    const searchString = e.target.value;
    const filterSneakers = mySneakers.filter((sneakers) => {
        return (
            sneakers.name.includes(searchString)
        );
    });
    console.log(filterSneakers);
});

const loadSneakers = async () => {
    try {
        const res = await fetch('https://sneaker-api-htx.herokuapp.com/api/sneakers');
        let mySneakers = await res.json();
        displaySneakers(mySneakers);
        console.log(mySneakers);
    }   catch (err) {
        console.error(err);
    }
};

const displaySneakers = (sneakers) => {
    const htmlString = sneakers
        .map((sneakers) => {
            return `
            <li class="sneakers">
                <h2${sneakers.name}</h2>
                <p>Lowest_price: ${sneakers.lowest_price}</p>
                <p>Retail_price: ${sneakers.retail_price}</p>
            </li>
        `;

        })
        .join('');
    containerShoes.innerHTML = htmlString;
};

loadSneakers();*/

// JavaScript code
function search_animal() {
    let input = document.getElementById('searchbar').value
    input = input.toLowerCase();
    let x = document.getElementsByClassName('shoe');


    for (i = 0; i < x.length; i++) {
        if (!x[i].innerHTML.toLowerCase().includes(input)) {
            x[i].style.display = "none";

        }
        else {
            x[i].style.display = "list-item";
        }
    }
}
console.log("fsd")

let carts = document.querySelectorAll('.add-to-cart1')

let product = [
    {
        name: 'TN GRISE',
        tag: 'TN GRISE',
        price: 29,
        inCart: 0
    }

]

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        console.log('clicked')
        cartNumbers();
    })
}

function cartNumbers() {
    let productNumber = localStorage.getItem('cartNumbers');
    console.log(product)
    productNumber = parseInt(productNumber);

    if (productNumber) {
        localStorage.setItem('cartNumbers', productNumber + 1);

    } else {
        localStorage.setItem('cartNumbers', 1);

    }
}