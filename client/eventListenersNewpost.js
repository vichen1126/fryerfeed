// event listeners that add to the db, this file should just be similar to index.js from lab but no routes, only pouchdb for pr4
// victor: just think abt what you talked abt with ana

// new post page
let recipeNameInput = document.getElementById('recipeName');
let recipeName = "";
recipeNameInput.addEventListener('input', function() {
  recipeName = recipeNameInput.value;
});
let imageUrlInput = document.getElementById('image');
let imageUrl = "";
imageUrlInput.addEventListener('input', function() {
  imageUrl = imageUrlInput.value;
});
let authorInput = document.getElementById('author');
let author = "";
authorInput.addEventListener('input', function() {
  author = authorInput.value;
});
let ingredientsInput = document.getElementById('ingredients');
let ingredients = "";
ingredientsInput.addEventListener('input', function() {
  ingredients = ingredientsInput.value;
});
let timeInput = document.getElementById('time');
let time = "";
timeInput.addEventListener('input', function() {
  time = timeInput.value;
});
let tempInput = document.getElementById('temp');
let temp = "";
tempInput.addEventListener('input', function() {
  temp = tempInput.value;
});
let flipInput = document.getElementById('flip');
let flip = "";
flipInput.addEventListener('input', function() {
  flip = flipInput.value;
});
let flipTimeInput = document.getElementById('flipTime');
let flipTime = "";
flipTimeInput.addEventListener('input', function() {
  flipTime = flipTimeInput.value;
});

let dietaryMap = {};
document.getElementsByName('dietOption').forEach((e)=> 
{
  dietaryMap[e.id] = e.checked;
  e.addEventListener('click', ()=>{
    dietaryMap[e.id] = e.checked;
  });
});

let instructionsInput = document.getElementById('additionalInstructions');
let instructions = "";
instructionsInput.addEventListener('input', function() {
  instructions = instructionsInput.value;
});
let postButton = document.getElementById('postButton');

function stringBuilder(map){
  const arr = Array(2).fill('');
  let checked = [];
  let unChecked = [];
  for(const restriction of Object.keys(dietaryMap)){
    (dietaryMap[restriction]) ? checked.push(restriction) : unChecked.push(restriction);
  }
  if (checked.length !== 0){
    arr[0] += '\n' + String.fromCharCode(9989) + ': ' + checked.reduce((acc, e) => acc.concat(', ',  e)), '';
  }
  if (unChecked.length !== 0){ 
    arr[1] += '\n' + String.fromCharCode(10060) + ': ' + unChecked.reduce((acc, e) => acc.concat(', ',  e));
  }
  return arr;
}

// create new post
postButton.addEventListener("click", async (event) => {
  let createdAt = Date.now();
  let likes = 0;
  let response = await fetch("/posts", {headers: { "Content-Type": "application/json" }, method: "POST", body: JSON.stringify({
    recipeName: recipeName,
    imageUrl: imageUrl,
    author: author,
    ingredients: ingredients,
    time: time,
    temp: temp,
    flip: flip,
    flipTime: flipTime,
    dietaryCompliance: stringBuilder(dietaryMap),
    instructions: instructions,
    likes: likes,
    createdAt: createdAt
  })});

  document.location = "/";
  
});
  
  