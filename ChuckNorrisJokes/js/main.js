var SingleJoke = (function () {
    function SingleJoke() {
    }
    return SingleJoke;
}());
window.onload = function () {
    var jokeBtn = document.getElementById("get-joke");
    jokeBtn.onclick = main;
    getAllCategories();
};
function main() {
    var http = new XMLHttpRequest();
    http.open("GET", "https://api.icndb.com/jokes/random?limitTo=[nerdy]");
    http.onreadystatechange = processRequest;
    http.send();
}
function processRequest() {
    var http = this;
    if (http.readyState == 4 && http.status == 200) {
        var response = JSON.parse(http.responseText).value;
        displayJoke(response);
    }
}
function displayJoke(j) {
    var displayDiv = document.getElementById("display-joke");
    var jokeHeading = displayDiv.querySelector("h2");
    jokeHeading.innerText = "Joke ID: " + j.id;
    var jokeP = displayDiv.querySelector("p");
    jokeP.innerText = j.joke;
    var catList = displayDiv.querySelector("ul");
    catList.innerHTML = "";
    for (var i = 0; i < j.categories.length; i++) {
        var nextCat = document.createElement("li");
        nextCat.innerText = j.categories[i];
        catList.appendChild(nextCat);
    }
}
function getAllCategories() {
    var http = new XMLHttpRequest();
    http.open("GET", "https://api.icndb.com/categories");
    http.onreadystatechange = displayCategories;
    http.send();
}
function displayCategories() {
    var http = this;
    if (http.readyState == 4 && http.status == 200) {
        var catigories = JSON.parse(http.responseText).value;
        console.log(http.responseText);
        console.log(catigories);
    }
}
