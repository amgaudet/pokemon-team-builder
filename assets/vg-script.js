var searchValueEl = document.querySelector('input');
var searchEl = document.querySelector('.search');
var statsEl = document.querySelector('.stats');
var pokeNameEl = document.querySelector('.poke-name');
var searchResultsEl = document.querySelector('.search-results');


var searchAPI = function(pokemon){
    requestUrl = 'https://pokeapi.co/api/v2/pokemon/' + pokemon;
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
    .then(function (data) {
        renderStats(data);
        
    })

}

var renderStats = function(pokemon) {
    var imageEl = document.createElement('img');
    imageEl.setAttribute("src", pokemon.sprites.front_default);
    searchResultsEl.prepend(imageEl);

    var heightM = (pokemon.height / 10);
    var heightEl = document.createElement('li');
    heightEl.textContent = "Height: " + heightM + "m";
    var weightKg = (pokemon.weight / 10);
    var weightEl = document.createElement('li');
    weightEl.textContent = "Weight: " + weightKg + "kg";
    statsEl.append(heightEl);
    statsEl.append(weightEl);

    for (var i = 0; i < pokemon.stats.length; i++) {
        var statEl = document.createElement('li');
        var statName = pokemon.stats[i].stat.name;
        var statValue = pokemon.stats[i].base_stat;
        statEl.textContent = statName + ": " + statValue;
        statsEl.append(statEl);
    }



}



searchEl.addEventListener("click", function(event) {
    event.preventDefault();
    var element = event.target;
    var searchQuery = "";
    if (element.matches('button')) {
        searchQuery = searchValueEl.value.toLowerCase();
        searchValueEl.value = "";
        pokeNameEl.textContent = searchQuery;
        searchAPI(searchQuery);
    }
});