// have to event.preventDefault() on submit buttons
//form elements have accessible data via its val atribute
var btnDisplay = document.querySelector("#btn-area");
var searchBar = document.querySelector("#search-bar");
var subBtn = document.querySelector("#submit-btn");
var gifDisplay = document.querySelector("#gif-area");

function grabGIFs(searchTerm){
  var baseUrl = "http://api.giphy.com/v1/gifs/search?q=";
  var apiKey = "&api_key=VxlTnIrmRXycSQQNUh8bYJ7vrKAxBDSB";
  var query = baseUrl + searchTerm + apiKey + "&limit=9";
  var req = new XMLHttpRequest();
  req.onload = () => {
    var data = JSON.parse(req.responseText);
    console.log(data.data);
    
    for (var i = 0; i < data.data.length; i++) {
      var x = data.data[i].images
      addGif(x.original_still.url, x.original.url);
    }
    
  };
  req.open("GET", query, true);
  req.send();
}
grabGIFs("turtle");

function addBtn(searchTerm) {
  var btn = document.createElement("button");
  btn.value = searchTerm;
  btn.textContent = searchTerm;
  btn.classList.add("search-button");
  btn.addEventListener("click", ()=>{
    grabGIFs(this.value);
  });
  btnDisplay.appendChild(btn);
}

function addGif(stillURL, gifURL) {
  var img = document.createElement("img");
  img.src = stillURL;
  img.dataset.stillURL = stillURL;
  img.dataset.gifURL = gifURL;
  img.classList.add("gif");
  
  img.addEventListener("click", swap);
  var gifBox = document.createElement("div");
  gifBox.classList.add("gif-container");
  gifBox.appendChild(img);
  gifDisplay.appendChild(gifBox);

}

function swap() {
  //swaps between still and gif
  console.log("swap called");
  var d = this.dataset;
  this.src == d.stillURL ? this.src = d.gifURL : this.src = d.stillURL;
  
  
  
}

subBtn.addEventListener("click", ()=> {
  if (searchBar.value) {
    addBtn(searchBar.value);
  }
});