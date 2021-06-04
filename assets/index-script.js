// declaring query selector vars
var videoGameEl = document.querySelector(".video-game");
var tradingCardGameEl = document.querySelector(".trading-card-game");
var containerEl = document.querySelector(".container");

// Once the user presses a button the event listener gets the name of the class
//and uses the name to create a new window for the user
var init = function() {
    containerEl.addEventListener("click", function (event) {
        if (event.target.matches('button')) {
            var element = event.target;
            var newURL = element.getAttribute("class");
            window.location = "./" + newURL + ".html";
        }
    })
}

init();