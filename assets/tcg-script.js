var formEl = document.querySelector('#form');
var input = document.querySelector('#searchBar');
var searchEl = document.querySelector('#span');
var picGallery = document.querySelector('#gallery');
var pokeName = document.querySelector('.name');
var image = document.querySelector('img');
var galleryCol = document.querySelector('#cardCol');
var profPicEl = document.querySelector('#profPic');
var titleEl = document.querySelector('.name');
var infoColEl = document.querySelector('#infoCol');
var addTeamEl = document.querySelector('.addTeam');
var addTmEl = document.querySelector('.addTeam');
var memListEl = document.querySelector('.mem');
var pokemonName;
var pictureIndex;

var cardMem = JSON.parse(localStorage.getItem('cardStorage')) || [];

var apiSearch = function (pokemon) {
    pokemonName = pokemon;
    requestUrl = 'https://api.pokemontcg.io/v2/cards?q=name:' + pokemon;
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            renderProfPic(data);
        })
}

var renderMemBtns = function () {
    //var memCol = document.createElement('pure-u-2-5'); 

    for (var card of cardMem) {
        var button = document.createElement('button');
        button.textContent = card;
        memListEl.appendChild(button);
    }
}

var renderProfPic = function (card) {
    var i = 4;
    var ind = 0;
    galleryCol.innerHTML = " ";
    while (i < card.data.length) {
        var divEl = document.createElement('div');
        var imgEl = document.createElement('img');
        imgEl.setAttribute('src', card.data[i].images.small);
        divEl.setAttribute('class', 'pure-u-2-5');
        imgEl.setAttribute('index', ind);
        galleryCol.appendChild(divEl);
        divEl.appendChild(imgEl);
        titleEl.textContent = input.value;
        //add color to the title
        i += 4;
        ind++;
    }
}

var renderHolo = function (card) {
    addTeamEl.setAttribute('style', 'visibility:visible;');
    //console.log(card.data.findIndex('tcgplayer'));
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
    for(var i = 0; i < arrPrices.length; i++){
        var liEl = document.createElement('li');
        liEl.textContent = arrPrices[i];
        ulEl.appendChild(liEl);
    }
}

var renderNormalCard = function (card) {
    addTeamEl.setAttribute('style', 'visibility:visible;');
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
    for(var i = 0; i < arrPrices.length; i++){
        var liEl = document.createElement('li');
        liEl.textContent = arrPrices[i];
        ulEl.appendChild(liEl);
    }
}

var renderRevHolofoil = function (card) {
    addTeamEl.setAttribute('style', 'visibility:visible;');
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
    for(var i = 0; i < arrPrices.length; i++){
        var liEl = document.createElement('li');
        liEl.textContent = arrPrices[i];
        ulEl.appendChild(liEl);
    }
}

var renderFirstEd = function (card) {
    var firstEdPrices = card.data[pictureIndex].prices.tcgplayer['1stEditionHolofoil'];
    var arrPrices = [
        'Low: $' + firstEdPrices.low, 'Mid: $' + firstEdPrices.mid, 
        'High: $' + firstEdPrices.high, 'Market: $' + firstEdPrices.market
    ];
    var rowEl = document.createElement('div');
    var colEl = document.createElement('div');
    var firstEdEl = document.createElement('h3');
    var hrEl = document.createElement('hr');
    firstEdEl.textContent = '1st Edition Holofoil';
    rowEl.setAttribute('class', 'pure-g');
    colEl.setAttribute('class', 'pure-u');
    infoColEl.appendChild(rowEl);
    rowEl.appendChild(colEl);
    colEl.appendChild(firstEdEl);
    firstEdEl.appendChild(hrEl);
    var ulEl = document.createElement('ul');
    hrEl.appendChild(ulEl);
    for(var i = 0; i < arrPrices.length; i++){
        var liEl = document.createElement('li');
        liEl.textContent = arrPrices[i];
        ulEl.appendChild(liEl);
    }
}

formEl.addEventListener('submit', function (event) {
    event.preventDefault();
    var searchQuery;
    searchQuery = input.value.toLowerCase();
    apiSearch(searchQuery);
});

galleryCol.addEventListener('click', function (event) {
    infoColEl.innerHTML = " ";
    event.preventDefault();
    var element = event.target;
    if (element.matches('img')) {
        profPicEl.setAttribute('src', element.src);
        profPicEl.setAttribute('width', '300');
        profPicEl.setAttribute('height', '400');
        pictureIndex = element.getAttribute('index');
        fetch(requestUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (card) {
                console.log(card.data.indexOf(pokemonName));
                if(card.data[pictureIndex].tcgplayer.prices.hasOwnProperty('holofoil')){
                    renderHolo(card);
                }
                
                if(card.data[pictureIndex].tcgplayer.prices.hasOwnProperty('1stEditionHolofoil')){
                    renderFirstEd(card);
                } 

                if(card.data[pictureIndex].tcgplayer.prices.hasOwnProperty('reverseHolofoil')){
                    renderRevHolofoil(card);
                }

                if(card.data[pictureIndex].tcgplayer.prices.hasOwnProperty('normal')){
                    renderNormalCard(card);
                }
            })
    }
})

addTmEl.addEventListener('click', function(){
    cardMem.push(pokemonName);
    localStorage.setItem('cardMem', JSON.stringify(cardMem));
    renderMemBtns();
});