var formEl = document.querySelector('#form');
var input = document.querySelector('#searchBar');
var searchEl = document.querySelector('#span');
var picGallery = document.querySelector('#gallery');
var image = document.querySelector('img');
var galleryCol = document.querySelector('#cardCol');
var profPicEl = document.querySelector('#profPic');
var titleEl = document.querySelector('.name');
var infoColEl = document.querySelector('#infoCol');
var addTeamEl = document.querySelector('.addTeam');
var addTmEl = document.querySelector('.addTeam');
var memListEl = document.querySelector('.mem');
var remTmEl = document.querySelector('.removeTeam');
var pokemonName;
var pictureIndex;
var pictureUrl;
var arrObj;
var btnInd = 0;
var cardMem = JSON.parse(localStorage.getItem('cardMem')) || [];


function apiSearch(pokemon) {
    // declaration not needed
    pokemonName = pokemon;
    requestUrl = 'https://api.pokemontcg.io/v2/cards?q=name:' + pokemon + '&pageSize=20';
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            renderProfPic(data);
        })
}


var renderProfPic = function (card) {
    var ind = 0;
    galleryCol.innerHTML = " ";
    for (var i = 0; i < 20; i++) {
        var divEl = document.createElement('div');
        var imgEl = document.createElement('img');
        imgEl.setAttribute('src', card.data[i].images.small);
        divEl.setAttribute('class', 'pure-u-2-5');
        imgEl.setAttribute('index', ind);
        imgEl.setAttribute('id', 'card');
        galleryCol.appendChild(divEl);
        divEl.appendChild(imgEl);
        titleEl.textContent = pokemonName;
        i++;
        ind++;
    }
}

function renderHolo(card) {
    addTeamEl.setAttribute('style', 'visibility:visible;');
    remTmEl.setAttribute('style', 'visibility:visible;');
    var holofoil = card.data[pictureIndex].tcgplayer.prices.holofoil;
    var arrPrices = [
        'Low: $' + holofoil.low, 'Mid: $' + holofoil.mid,
        'High: $' + holofoil.high, 'Market: $' + holofoil.market
    ];
    var rowEl = document.createElement('div');
    var colEl = document.createElement('div');
    var firstEdEl = document.createElement('h3');
    var hrEl = document.createElement('hr');
    firstEdEl.textContent = 'Holofoil';
    rowEl.setAttribute('class', 'pure-g');
    colEl.setAttribute('class', 'pure-u');
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

function renderNormalCard(card) {
    addTeamEl.setAttribute('style', 'visibility:visible;');
    remTmEl.setAttribute('style', 'visibility:visible;');
    var normal = card.data[pictureIndex].tcgplayer.prices.normal;
    var arrPrices = [
        'Low: $' + normal.low, 'Mid: $' + normal.mid,
        'High: $' + normal.high, 'Market: $' + normal.market
    ];
    var rowEl = document.createElement('div');
    var colEl = document.createElement('div');
    var firstEdEl = document.createElement('h3');
    var hrEl = document.createElement('hr');
    firstEdEl.textContent = 'Normal';
    rowEl.setAttribute('class', 'pure-g');
    colEl.setAttribute('class', 'pure-u');
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

function renderRevHolofoil(card) {
    addTeamEl.setAttribute('style', 'visibility:visible;');
    remTmEl.setAttribute('style', 'visibility:visible;');
    var revHolo = card.data[pictureIndex].tcgplayer.prices.reverseHolofoil;
    var arrPrices = [
        'Low: $' + revHolo.low, 'Mid: $' + revHolo.mid,
        'High: $' + revHolo.high, 'Market: $' + revHolo.market
    ];
    var rowEl = document.createElement('div');
    var colEl = document.createElement('div');
    var firstEdEl = document.createElement('h3');
    var hrEl = document.createElement('hr');
    firstEdEl.textContent = 'Reverse Holofoil';
    rowEl.setAttribute('class', 'pure-g');
    colEl.setAttribute('class', 'pure-u');
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
    clearHistory(memListEl);

    var btnListEl = document.querySelector('.mem');
    for (card of cardMem) {
        var butt = document.createElement('button');
        //var butt = document.createElement('img');
        butt.setAttribute('class', 'memButton');
        butt.setAttribute('index', btnInd);
        butt.textContent = card.Name;
        btnListEl.appendChild(butt);
        btnInd++;
    }
}


function renderMemBtns() {
    var liEl = document.createElement('li');
    var button = document.createElement('button');
    button.textContent = pokemonName;
    memListEl.appendChild(liEl);
    liEl.appendChild(button);
}

formEl.addEventListener('submit', function (event) {
    event.preventDefault();
    var searchQuery;
    searchQuery = input.value.toLowerCase();
    if (searchQuery === "") {
        alert('Please enter a valid pokemon name!');
    }
    apiSearch(searchQuery);
});


var clearHistory = function (parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
};

document.querySelector('.mem').addEventListener('click', function (event) {
    event.preventDefault();
    var targetName = event.target.innerHTML;
    apiSearch(targetName);
})

galleryCol.addEventListener('click', function (event) {
    event.preventDefault();
    infoColEl.innerHTML = " ";
    var element = event.target;
    if (element.matches('img')) {
        pictureUrl = element.src;
        profPicEl.setAttribute('src', pictureUrl);
        profPicEl.setAttribute('width', '300');
        profPicEl.setAttribute('height', '400');
        pictureIndex = element.getAttribute('index');
        fetch(requestUrl)
            .then(function (response) {
                return response.json();
            })
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

addTmEl.addEventListener('click', function (event) {
    event.preventDefault();
    var duplicate = false;
    //changed URL to picture index instead of full fetch URL
    for (var i = 0; i < cardMem.length; i++) {
        if (pokemonName === cardMem[i].Name)
            duplicate = true;
    }
    if (!duplicate) {
        cardMem = cardMem.concat({ Name: pokemonName, URL: pictureUrl });
        localStorage.setItem('cardMem', JSON.stringify(cardMem));
        renderHistory();
    }
});

remTmEl.addEventListener('click', function (event) {
    event.preventDefault();
    var buttons = document.getElementsByClassName('memButton');
    for (var i = 0; i < btnInd + 1; i++) {
        if (buttons[i].innerHTML === pokemonName) {
            buttons[i].setAttribute('style', 'display:none;');
            cardMem.splice(i, 1);
            localStorage.setItem('cardMem', JSON.stringify(cardMem));
        }
    }
    renderHistory();
})

renderHistory();