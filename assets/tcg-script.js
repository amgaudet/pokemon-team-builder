var formEl = document.querySelector('#form');
var input = document.querySelector('#searchBar');
var searchEl = document.querySelector('#span');
var picGallery = document.querySelector('#gallery');
var pokeName = document.querySelector('.name');
var image = document.querySelector('img');
var galleryCol = document.querySelector('#cardCol');

var apiSearch = function(pokemon){
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

var renderProfPic = function(card){
    var i = 4;
    galleryCol.innerHTML = " ";
    console.log(card.data.length);
    while(i<card.data.length){
        var divEl = document.createElement('div');
        var refEl = document.createElement('a');
        var imgEl = document.createElement('img');
        imgEl.setAttribute('src', card.data[i].images.small)
        divEl.setAttribute('class', 'pure-u-2-5');
        refEl.setAttribute
        galleryCol.appendChild(divEl);
        divEl.appendChild(imgEl);
    i += 4;
    }
}

formEl.addEventListener('submit', function(event) {
    event.preventDefault();
    var element = event.target;
    var searchQuery;
    if(element.matches('form')){
        searchQuery = input.value.toLowerCase();
        apiSearch(searchQuery);
    }
});
