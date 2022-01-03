$(function () {
    $("#header").load("../Documents/header.html");
    $("#footer").load("../Documents/footer.html");
});


// const animalsForSale = [
//     {
//         name: "bird1",
//         price: 300
//     },
//     {
//         name: "bird2",
//         price: 150
//     },
//     {
//         name: "bird3",
//         price: 500
//     },
//     {
//         name: "bird4",
//         price: 250
//     }
// ];

let shoppingCartItems = {};

const products = 
{
    Hund: {
            Säng: {info: "Stor mjuk säng till din bäste vän", price: 700, id: 1},
            Leksak: {info: "Pip leksak som garanterat underhåller din hund", price: 49, id: 2}
        },
    Katt: {
            Klösbräda: {info: "Stor solid klösbräda som håller din katt från att förstöra soffan", price: 140, id: 3},
            Hatt: {info: "Liten hatt till din katt", price: 299, id: 4}
        },
    Papegoja: {
                Bur: {info: "Stor klassisk bur till din papegoja", price: 1999, id: 5},
                Pinne: {info: "Perfekt lekpinne att underhålla din papegoja med", price: 20, id: 6},
                Vattenskål: {info: "Lite gullig vattenskål", price: 55, id: 7},
                Foder: {info: "Perfekta fodret, som innehåller allt din pappegoja behöver", price: 115, id: 8}
            },
    Gnagare: {
                Bur: {info: "Liten bur till din papegoja", price: 999, id: 9},
                Kamm: {info: "Perfekt kamm till att snygga till din gnagare", price: 34, id: 10},
                Vattenflaska: {info: "Vattenflaska att hänga utanpå buren till din gnagare", price: 89, id: 11}

            },
    Reptiler: {
                Akvarium: {info: "Stort rymmligt akvarium till din reptil", price: 2999, id: 12},
                
            }
}
;


function generateProducts() {
    let template;
    let productInfo;
    Object.keys(products).forEach(animal => { 
        template =`
        <div class="item-wrapper"><h3>${animal}</h3>
        `
        console.log(animal + " <---- animal");
        Object.keys(products[animal]).forEach(item => { 
            productInfo = `
            <div class="each-item id-${products[animal][item].id}"><h4 class="item-name">${item}</h4>
            <p>${products[animal][item].info}</p>
            <p>${products[animal][item].price}</p>
            <button class="buy-btn">Köp</button></div>`
            console.log(item + " <----- item")
            console.log(products[animal][item].price)
            console.log(products[animal][item].info)
            template += productInfo;
        })  
        template += `</div>`
        document.getElementById("products-wrapper").innerHTML += template;
    })
    
}


function numOfItemsInCart(shoppingCartItems) {

    let displayNumOfItems = document.getElementById("num-of-items");
    let size = Object.keys(shoppingCartItems).length;
    let totalItems = 0;
    for (const animal in shoppingCartItems) {
        totalItems += shoppingCartItems[animal].amount
    }
    size < 1 ? displayNumOfItems.textContent = "Varukorgen är tom" : displayNumOfItems.textContent = totalItems;
}


function addBuyEvent() {
    let buyBtn = document.getElementsByClassName("buy-btn");
    for (let btn of buyBtn) {
        btn.addEventListener('click', clickBuyBtn);
    }
}

function clickBuyBtn(event) {
    let getAnimal = event.target.parentElement.classList;
    console.log(getAnimal);
    Object.keys(products).forEach(animal => {
        Object.keys(products[animal]).forEach(item => {
            console.log(products[animal][item].id + " sadasdasdsa")
            if(getAnimal.contains(`id-${products[animal][item].id}`)) {
                console.log("true")
                if(shoppingCartItems.hasOwnProperty(item)) {
                    shoppingCartItems[item].amount++;
                    showItemsInCart(shoppingCartItems)
                    numOfItemsInCart(shoppingCartItems)
                }
                else {
                    shoppingCartItems[item] = { price: products[animal][item].price, amount: 1 }
                    showItemsInCart(shoppingCartItems)
                    numOfItemsInCart(shoppingCartItems)
                }
            } 
        })
    })
}

function showItemsInCart(shoppingCart) {
    let template = "";
    let cartToShow = document.createElement("div");
    cartToShow.setAttribute("id", "show-cart-wrapper")
    let total = 0;
    document.getElementById("shopping-cart").innerHTML = "";
    for (const item in shoppingCart) {
        total += shoppingCart[item].amount * shoppingCart[item].price;
        console.log(shoppingCart[item].price);
        template += `
        <div id="${item}">
            <h5>${item}</h5>
            <p>${shoppingCart[item].price}</p>            
            <p class="amount-of-item">Antal: <button class="decrease-item">-</button>${shoppingCart[item].amount}<button class="increase-item">+</button></p>
            <p class="total-item-cost">Varupris: ${shoppingCart[item].amount * shoppingCart[item].price}</p>
            <button class="remove-item">Remove</button>
        </div>        
            `; 

    }
    template += `<p>Total: ${total} kr</p> <button id="fin-pur-btn">Slutför köp</button>`

    document.getElementById("shopping-cart").append(cartToShow);
    cartToShow.innerHTML = template;
    document.getElementById("fin-pur-btn").addEventListener('click', () => { 
        alert("Tack för ditt köp!");
        shoppingCartItems = [];
        cartToShow.innerHTML = "";
        showItemsInCart(shoppingCartItems)
        numOfItemsInCart(shoppingCartItems)
        

    })
    document
        .querySelectorAll(".increase-item")
        .forEach(btn =>
            btn.addEventListener('click', (event) => increaseBtn(shoppingCart, event)));
    document
        .querySelectorAll(".decrease-item")
        .forEach(btn =>
            btn.addEventListener("click", (event) => decreaseBtn(shoppingCart, event)));
    document    
            .querySelectorAll(".remove-item")
            .forEach(btn => 
                btn.addEventListener('click', (event) => removeFromCart(event.target.parentElement.id)));

}

function increaseBtn(shoppingCart, event) {
    let itemToIncrease = event.target.parentElement.parentElement.id;
    shoppingCart[itemToIncrease].amount++;
    showItemsInCart(shoppingCart)
    numOfItemsInCart(shoppingCartItems)
}

function decreaseBtn(shoppingCart, event) {
    let itemToDecrease = event.target.parentElement.parentElement.id;
    if (shoppingCart[itemToDecrease].amount <= 1) {
        removeFromCart(itemToDecrease)
        showItemsInCart(shoppingCart)
        numOfItemsInCart(shoppingCartItems)
    } else {
        shoppingCart[itemToDecrease].amount--;
        showItemsInCart(shoppingCart)
        numOfItemsInCart(shoppingCartItems)
    }

}

function showShopIcon() {
    const showShopIconToggle = document.getElementById("shop-icon");
    showShopIconToggle.addEventListener("click", () => { showShop() });
}

function removeFromCart(itemToRemove) {
    console.log(itemToRemove)
    delete shoppingCartItems[itemToRemove];
    showItemsInCart(shoppingCartItems);
    numOfItemsInCart(shoppingCartItems);

}




function showShop() {    
    const shoppingCart = document.querySelector("#shopping-cart")
    let visibility = shoppingCart.style.display;
    console.log(visibility)
    if (visibility == "flex") {
        shoppingCart.style.display = "none";
    } else {
        shoppingCart.style.display = "flex";
    }
}

window.onload = () => {
    if(window.location.href.indexOf('products.html') > -1){
        generateProducts();
    }
    addBuyEvent();
    showShopIcon();
    numOfItemsInCart(shoppingCartItems);
};