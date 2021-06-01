var videoGameEl = document.querySelector(".video-game");
var tradingCardGameEl = document.querySelector(".trading-card-game");
var containerEl = document.querySelector(".container");

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