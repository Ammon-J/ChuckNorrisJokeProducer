class SingleJoke {
    id:number;
    joke:string;
    categories:string[];
}

window.onload = function() {
    let jokeBtn = document.getElementById("get-joke");
    jokeBtn.onclick = main;

    // Get all catagories
    getAllCategories()
}

function main() {
    let http = new XMLHttpRequest();
    // GET request asks the server for data
    // The url is the website we are requesting data from
    http.open("GET", "https://api.icndb.com/jokes/random?limitTo=[nerdy]");

    // Function to handle different readyStates
    http.onreadystatechange = processRequest;

    http.send();
}

function processRequest() {
    let http = <XMLHttpRequest>this;
    if(http.readyState == 4 && http.status == 200) {
        let response:SingleJoke = JSON.parse(http.responseText).value;
        
        displayJoke(response);
    }
}

function displayJoke(j:SingleJoke) {
    let displayDiv = document.getElementById("display-joke");

    //Display joke id
    let jokeHeading = <HTMLElement>displayDiv.querySelector("h2");
    jokeHeading.innerText = "Joke ID: " + j.id;

    // Display the actual joke
    let jokeP = displayDiv.querySelector("p");
    jokeP.innerText = j.joke;

    // Display the joke category 
    let catList = displayDiv.querySelector("ul");
    catList.innerHTML = "";
    for(let i  = 0; i < j.categories.length; i++) {
        let nextCat = document.createElement("li");
        nextCat.innerText = j.categories[i];
        catList.appendChild(nextCat);
    }
}

function getAllCategories() {
    let http = new XMLHttpRequest();
    http.open("GET", "https://api.icndb.com/categories");
    http.onreadystatechange = displayCategories;
    http.send();
}

function displayCategories() {
    let http = <XMLHttpRequest>this;

    if(http.readyState == 4 && http.status == 200) {
        let catigories:string[] = JSON.parse(http.responseText).value;
        console.log(http.responseText);
        console.log(catigories);
    }
}