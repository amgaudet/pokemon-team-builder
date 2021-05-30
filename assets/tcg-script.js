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

var apiSearch = function (pokemon) {
    requestUrl = 'https://api.pokemontcg.io/v2/cards?q=name:' + pokemon;
    fetch(requestUrl)
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (data) {
            renderProfPic(data);
        })
}

var renderProfPic = function (card) {
    var i = 4;
    galleryCol.innerHTML = " ";
    console.log(card.data.length);
    while (i < card.data.length) {
        var divEl = document.createElement('div');
        var imgEl = document.createElement('img');
        imgEl.setAttribute('src', card.data[i].images.small);
        divEl.setAttribute('class', 'pure-u-2-5');
        galleryCol.appendChild(divEl);
        divEl.appendChild(imgEl);
        console.log(input.value);
        titleEl.textContent = input.value;
        //add color to the title
        i += 4;
    }
}

var renderInfo = function (card) {
    infoColEl.innerHTML = " ";
    var holofoil = card.data[20].tcgplayer.prices.holofoil;
    var arrPrices = [
        'Low: $' + holofoil.low, 'Mid: $' + holofoil.mid, 
        'High: $' + holofoil.high, 'Market: $' + holofoil.market
    ];
    var rowEl = document.createElement('div');
    var colEl = document.createElement('div');
    var holoEl = document.createElement('h3');
    var hrEl = document.createElement('hr');
    holoEl.textContent = 'Holofoil';
    rowEl.setAttribute('class', 'pure-g');
    colEl.setAttribute('class', 'pure-u');
    infoColEl.appendChild(rowEl);
    rowEl.appendChild(colEl);
    colEl.appendChild(holoEl);
    holoEl.appendChild(hrEl);
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
    event.preventDefault();
    var element = event.target;
    if (element.matches('img')) {
        profPicEl.setAttribute('src', element.src);
        profPicEl.setAttribute('width', '300');
        profPicEl.setAttribute('height', '400');

        fetch(requestUrl)
            .then(function (response) {
                console.log(response);
                return response.json();
            })
            .then(function (data) {
                renderInfo(data);
            })
    }
})
