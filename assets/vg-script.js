var searchValueEl = document.querySelector('input');
var searchEl = document.querySelector('.search');
var statsEl = document.querySelector('.stats');
var pokeNameEl = document.querySelector('.poke-name');
var searchResultsEl = document.querySelector('.search-results');
var saveBtn = document.querySelector('.save-btn');
var savedLibrary = document.querySelector('.saved-team');
var imageEl = document.querySelector('.main-img');
var imageUrl = "";
var myTeam = JSON.parse(localStorage.getItem("savedTeam")) || [];
// var duplicate = false;
var removeEl = document.querySelector('.remove');

var searchAPI = function (pokemon) {
    var requestUrl = 'https://pokeapi.co/api/v2/pokemon/' + pokemon;
    var speciesUrl = 'https://pokeapi.co/api/v2/pokemon-species/' + pokemon;
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (baseStats) {
            fetch(speciesUrl)
                .then(function (response) {
                    return response.json();
                })
                .then(function (details) {
                    renderStats(baseStats, details);
                })
        })
};

var renderStats = function (pokemon, details) {
    //clears old stats
    clearHistory(statsEl);
    var included = false;

    //creates image
    imageUrl = pokemon.sprites.front_default
    imageEl.setAttribute("src", imageUrl);
    searchResultsEl.prepend(imageEl);

    //check if pokemon is already in my Team, if true, dont show btn
    for (var a = 0; a < myTeam.length; a++) {
        if (myTeam[a].name === pokemon.name) {
            included = true;
        }
    }
    
    //displays save button and sets dataset for pokemon name if not on myTeam
    if (!included) {
        saveBtn.style.display = "inline";
        saveBtn.setAttribute("data-name", pokemon.name);
    }

    //finds english pokedex entry
    var dexEntry = "";
    for (var j = 0; j < details.flavor_text_entries.length; j++) {
        if (details.flavor_text_entries[j].language.name === ("en")) {
            dexEntry = details.flavor_text_entries[j].flavor_text;
        }
    }

    //populates stats to page
    var dexEntryEl = document.createElement('li');
    dexEntryEl.textContent = dexEntry;
    var heightM = (pokemon.height / 10);
    var heightEl = document.createElement('li');
    heightEl.textContent = "Height: " + heightM + "m";
    var weightKg = (pokemon.weight / 10);
    var weightEl = document.createElement('li');
    weightEl.textContent = "Weight: " + weightKg + "kg";
    statsEl.append(dexEntryEl);
    statsEl.append(heightEl);
    statsEl.append(weightEl);

    for (var i = 0; i < pokemon.stats.length; i++) {
        var statEl = document.createElement('li');
        var statName = pokemon.stats[i].stat.name;
        var statValue = pokemon.stats[i].base_stat;
        statEl.textContent = statName + ": " + statValue;
        statsEl.append(statEl);
    }
};

// Populates my team from local storage on load
var renderMyTeam = function () {
    //clears out myTeam so we dont get redundant entries
    clearHistory(savedLibrary);

    var teamTitle = document.createElement('h2');
    teamTitle.textContent = "My Team";
    savedLibrary.appendChild(teamTitle);

    //populates saved team section
    for (var i = 0; i < myTeam.length; i++) {
        var teamSpot = document.createElement('span');
        teamSpot.setAttribute("class", "team-spot");
        var savedPokemon = myTeam[i].name;
        var savedPokemonEl = document.createElement('h3');
        savedPokemonEl.textContent = savedPokemon;
        var removeBtnEl = document.createElement('button');
        removeBtnEl.setAttribute("data-index", i);
        removeBtnEl.textContent = "Remove From Team";
        var savedAvatarEl = document.createElement('img');
        savedAvatarEl.setAttribute("src", myTeam[i].url);
        savedAvatarEl.setAttribute("class", savedPokemon);

        savedLibrary.appendChild(teamSpot);
        teamSpot.appendChild(savedPokemonEl);
        teamSpot.appendChild(savedAvatarEl);
        teamSpot.appendChild(removeBtnEl);
    }
}

searchResultsEl.addEventListener("click", function (event) {
    event.preventDefault();
    var element = event.target;
    var savedMon = "";
    if (element.matches('button')) {
        savedMon = element.dataset.name;
        //checks for duplicates on my saved team
        for (var i = 0; i < myTeam.length; i++) {
            if (myTeam[i].name.includes(savedMon)) {
                duplicate = true;
            }
        }
        //Displays warning message for Team max size
        if (myTeam.length > 5) {
            $('#error-message').text("You may only have six pokemon on your team.");
            setTimeout(fade, 3000);
        } else if (duplicate) {
            $('#error-message').text("That Pokemon is already on your team");
            duplicate = false;
            setTimeout(fade, 3000);
        } 
        else {
            var savedEntry = { name: savedMon, url: imageUrl };
            myTeam = myTeam.concat(savedEntry);
            localStorage.setItem("savedTeam", JSON.stringify(myTeam));
            renderMyTeam();
        }
    }
});

//removes warning message after designated time in call
var fade = function () {
    $('#error-message').fadeOut();
}

searchEl.addEventListener("click", function (event) {
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

savedLibrary.addEventListener("click", function (event) {
    event.preventDefault();
    var element = event.target;
    if (element.matches('img')) {
        var pokemon = element.getAttribute('class');
        searchAPI(pokemon);
    }
    if (element.matches('button')) {
        myTeam.splice(element.dataset.index, 1);
        localStorage.setItem("savedTeam", JSON.stringify(myTeam));
        renderMyTeam();
    }
});

var clearHistory = function (parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
};

var init = function () {
    renderMyTeam();
};

init();