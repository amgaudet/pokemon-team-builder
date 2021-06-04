//declarations
var formEl = document.querySelector('#form');
var input = document.querySelector('#searchBar');
var galleryCol = document.querySelector('#cardCol');
var profPicEl = document.querySelector('#profPic');
var titleEl = document.querySelector('.name');
var infoColEl = document.querySelector('#infoCol');
var addTeamEl = document.querySelector('#addTeam');
var addTmEl = document.querySelector('#addTeam');
var memListEl = document.querySelector('.mem');
var remTmEl = document.querySelector('#removeTeam');
var pokemonName;
var pictureIndex;
var pictureUrl;
var btnInd = 0;
var element;
var cardMem = JSON.parse(localStorage.getItem('cardMem')) || [];

//fetch request fro the TCG API
function apiSearch(pokemon) {
    pokemonName = pokemon;
    requestUrl = 'https://api.pokemontcg.io/v2/cards?q=name:' + pokemon;
    fetch(requestUrl, {
        headers: {
            'X-API-KEY': '2de89bea-fc49-4f8c-bb07-8c24fc5b83ff'
        }
    })
        .then(function (response) {
            if (!response.ok) {
                window.location = './429Error.html';
            }
            return response.json();
        })
        .then(function (card) {
            renderProfPic(card);
        })
}

// renders the gallery of cards by setting attributes true to pure css and appending them
var renderProfPic = function (card) {
    console.log(card);
    var ind = 0;
    galleryCol.innerHTML = " ";
    // loops to create multiple cards with multiple indexes
    for (var i = 0; i < 20; i++) {
        var divEl = document.createElement('div');
        var imgEl = document.createElement('img');
        imgEl.setAttribute('src', card.data[i].images.small);
        imgEl.setAttribute('data-id', card.data[i].id); 
        imgEl.setAttribute('data-name', card.data[i].name);
        divEl.setAttribute('class', 'pure-u-3-4');
        divEl.setAttribute('id', 'indivImg');
        imgEl.setAttribute('index', ind);
        imgEl.setAttribute('id', 'card' + i);
        galleryCol.appendChild(divEl);
        divEl.appendChild(imgEl);
        titleEl.textContent = pokemonName;
        ind++;
    }
}

// this function displays the holo cost for a card
function renderHolo(card) {
    // setting attributes
    addTeamEl.setAttribute('style', 'visibility:visible;');
    addTeamEl.setAttribute('class', 'pure-button');
    // pulling the prices from the API database
    var holofoil = card.data[pictureIndex].tcgplayer.prices.holofoil;
    // an array of the subtypes of holofoil priceses
    var arrPrices = [
        'Low: $' + holofoil.low, 'Mid: $' + holofoil.mid,
        'High: $' + holofoil.high, 'Market: $' + holofoil.market
    ];
    // creating and appending elements
    var rowEl = document.createElement('div');
    var colEl = document.createElement('div');
    var firstEdEl = document.createElement('h3');
    var hrEl = document.createElement('hr');
    firstEdEl.textContent = 'Holofoil';
    rowEl.setAttribute('class', 'pure-g');
    colEl.setAttribute('class', 'pure-u-1');
    infoColEl.appendChild(rowEl);
    rowEl.appendChild(colEl);
    colEl.appendChild(firstEdEl);
    firstEdEl.appendChild(hrEl);
    var ulEl = document.createElement('ul');
    hrEl.appendChild(ulEl);
    for (var i = 0; i < arrPrices.length; i++) {
        var liEl = document.createElement('li');
        liEl.textContent = arrPrices[i];
        ulEl.appendChild(liEl);
    }
}
// this function displays the normal cost for a card
function renderNormalCard(card) {
    // setting attributes
    addTeamEl.setAttribute('style', 'visibility:visible;');
    // pulling the prices from the API database
    var normal = card.data[pictureIndex].tcgplayer.prices.normal;
    // an array of the subtypes of normal priceses
    var arrPrices = [
        'Low: $' + normal.low, 'Mid: $' + normal.mid,
        'High: $' + normal.high, 'Market: $' + normal.market
    ];
    // creating and appending elements
    var rowEl = document.createElement('div');
    var colEl = document.createElement('div');
    var firstEdEl = document.createElement('h3');
    var hrEl = document.createElement('hr');
    firstEdEl.textContent = 'Normal';
    rowEl.setAttribute('class', 'pure-g');
    colEl.setAttribute('class', 'pure-u-1');
    infoColEl.appendChild(rowEl);
    rowEl.appendChild(colEl);
    colEl.appendChild(firstEdEl);
    firstEdEl.appendChild(hrEl);
    var ulEl = document.createElement('ul');
    hrEl.appendChild(ulEl);
    for (var i = 0; i < arrPrices.length; i++) {
        var liEl = document.createElement('li');
        liEl.textContent = arrPrices[i];
        ulEl.appendChild(liEl);
    }
}

// this function displays the reverse holo cost for a card
function renderRevHolofoil(card) {
    // setting attributes
    addTeamEl.setAttribute('style', 'visibility:visible;');
    // pulling the prices from the API database
    var revHolo = card.data[pictureIndex].tcgplayer.prices.reverseHolofoil;
    // an array of the subtypes of reverse holo priceses
    var arrPrices = [
        'Low: $' + revHolo.low, 'Mid: $' + revHolo.mid,
        'High: $' + revHolo.high, 'Market: $' + revHolo.market
    ];
    // creating and appending elements
    var rowEl = document.createElement('div');
    var colEl = document.createElement('div');
    var firstEdEl = document.createElement('h3');
    var hrEl = document.createElement('hr');
    firstEdEl.textContent = 'Reverse Holofoil';
    rowEl.setAttribute('class', 'pure-g');
    colEl.setAttribute('class', 'pure-u-1');
    infoColEl.appendChild(rowEl);
    rowEl.appendChild(colEl);
    colEl.appendChild(firstEdEl);
    firstEdEl.appendChild(hrEl);
    var ulEl = document.createElement('ul');
    hrEl.appendChild(ulEl);
    for (var i = 0; i < arrPrices.length; i++) {
        var liEl = document.createElement('li');
        liEl.textContent = arrPrices[i];
        ulEl.appendChild(liEl);
    }
}

//renders team from memory
function renderHistory() {
    //clears the history first to remove redundancies
    clearHistory(memListEl);
    btnInd = 0;

    // slects the memory container
    var btnListEl = document.querySelector('.mem');
    // loops through local storage to populate the memory page
    for (card of cardMem) {
        // setting attributes and appending 
        var container = document.createElement('div');
        container.setAttribute('class', 'team-container');

        var remove = document.createElement('button');
        remove.setAttribute('class', 'pure-button button-remove removeTeam');
        remove.setAttribute('data-name', card.Name);
        remove.textContent = 'X';

        var butt = document.createElement('img');
        butt.setAttribute('src', cardMem[btnInd].url)
        butt.setAttribute('class', 'memButton');
        butt.setAttribute('index', btnInd);
        butt.setAttribute('data-name', card.Name)

        btnListEl.appendChild(container);
        container.appendChild(butt);
        container.appendChild(remove);
        btnInd++;
    }
}

//adds an event listener on the search button to enable the user to search for a pokemon
formEl.addEventListener('submit', function (event) {
    event.preventDefault();
    var searchQuery;
    searchQuery = input.value.toLowerCase();
    //if the search bar is empty the user is prompted
    if (searchQuery === "") {
        alert('Please enter a valid pokemon name!');
    }
    // calls the apiSearch function with the search contents as the parameter
    apiSearch(searchQuery);
});

// clears history to remove redundancies
var clearHistory = function (parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
};

// removes a card from memory by splicing it out of the array in localStorage
// or it can add a card by doing another fetch to populate the profile picture column
document.querySelector('.mem').addEventListener('click', function (event) {
    event.preventDefault();
    element = event.target;
    if (element.matches('button')) {
        var selector = element.dataset.id;
        // looping through localstorage to find the card and then remove it
        for (var i = 0; i < cardMem.length; i++) {
            if (selector === cardMem[i].id) {
                cardMem.splice(i, 1);
                localStorage.setItem("cardMem", JSON.stringify(cardMem));
            }
        }
        // calls renderHistory function
        renderHistory();
    }
    //uses the pokemon name assigned the card and fetches from the api
    pokemonName = element.dataset.name;
    requestUrl = 'https://api.pokemontcg.io/v2/cards?q=name:' + pokemonName;
    // empties the information column html
    infoColEl.innerHTML = " ";
    element = event.target;
    // conditional to make sure the element being clicked is an image
    //then the profile picture can obtain its attributes 
    if (element.matches('img')) {
        pictureUrl = element.src;
        profPicEl.setAttribute('data-id', element.dataset.id);
        profPicEl.setAttribute('data-name', element.dataset.name);
        profPicEl.setAttribute('src', pictureUrl);
        profPicEl.setAttribute('width', '300');
        profPicEl.setAttribute('height', '400');
        pictureIndex = element.getAttribute('index');
        //fetching from api
        fetch(requestUrl, {
            //attatching the api key to reduce the amount of 429 errors
            headers: {
                'X-API-KEY': '2de89bea-fc49-4f8c-bb07-8c24fc5b83ff'
            }
        })
            //returns the json response of the api to make it obtainable
            .then(function (response) {
                // if it runs into an error an error page pops up
                if (!response.ok) {
                    window.location = './429Error.html';
                }
                return response.json();
            })
            // checking what prices come with the specfic card in order to call the right functions
            .then(function (card) {
                if (card.data[pictureIndex].tcgplayer.prices.hasOwnProperty('holofoil')) {
                    renderHolo(card);
                }
                if (card.data[pictureIndex].tcgplayer.prices.hasOwnProperty('reverseHolofoil')) {
                    renderRevHolofoil(card);
                }
                if (card.data[pictureIndex].tcgplayer.prices.hasOwnProperty('normal')) {
                    renderNormalCard(card);
                }
            })
    }
})

//selects card from gallery search
galleryCol.addEventListener('click', function (event) {
    event.preventDefault();
    infoColEl.innerHTML = " ";
    element = event.target;
    // conditional to make sure the element being clicked is an image
    //then the profile picture can obtain its attributes 
    if (element.matches('img')) {
        pictureUrl = element.src;
        profPicEl.setAttribute('src', pictureUrl);
        profPicEl.setAttribute('width', '300');
        profPicEl.setAttribute('height', '400');
        pictureIndex = element.getAttribute('index');
        //fetching from api
        fetch(requestUrl, {
            //attatching the api key to reduce the amount of 429 errors
            headers: {
                'X-API-KEY': '2de89bea-fc49-4f8c-bb07-8c24fc5b83ff'
            }
        })
            //returns the json response of the api to make it obtainable
            .then(function (response) {
                // if it runs into an error an error page pops up
                if (!response.ok) {
                    window.location = './429Error.html';
                }
                return response.json();
            })
            // checking what prices come with the specfic card in order to call the right functions
            .then(function (card) {
                if (card.data[pictureIndex].tcgplayer.prices.hasOwnProperty('holofoil')) {
                    renderHolo(card);
                }
                if (card.data[pictureIndex].tcgplayer.prices.hasOwnProperty('reverseHolofoil')) {
                    renderRevHolofoil(card);
                }
                if (card.data[pictureIndex].tcgplayer.prices.hasOwnProperty('normal')) {
                    renderNormalCard(card);
                }
            })
    }
})

//add to team button
addTmEl.addEventListener('click', function (event) {
    event.preventDefault();
    var image = document.querySelector('#profPic');
    console.log(image.dataset);
    cardMem = cardMem.concat({ name: image.dataset.name, url: image.src, id: image.dataset.id });
    localStorage.setItem('cardMem', JSON.stringify(cardMem));
    renderHistory();
});

//remove from team button
remTmEl.addEventListener('click', function (event) {
    event.preventDefault();
    var image = document.querySelector('#profPic');

    //checks cardMem for correct index of card to be removed and saves
    for (var i = 0; i < cardMem.length; i++) {
        if (image.dataset.id === cardMem[i].id) {
            cardMem.splice(i, 1);
            localStorage.setItem("cardMem", JSON.stringify(cardMem));
        }
    }
    renderHistory();
})



renderHistory();