/*
    Victor Lozano Alonso. ID: 130720204 - August 3, 2021
    I declare that the Assignment 5 is wholly my own work in accordance with Seneca Academic Policy.
    No part of this Assignment has been copied manually or electronically from any other source except 
    for the information supplied by the WEB222 instructors and / or made available in 
    this Assignment for my use.
    I also declare that no part of this Quiz has been distributed to other students.
*/
// An instance of our SimpleMap, created below when the window loads.
let map;

// Update the map to show markers for the set of observations
function updateMap(observations, map) {
  // Clear the current markers on the map (if any)
  map.clear();
  // Call the Simple Map's addObservation method for every one
  // of the observations in order to add markers to the map.
  observations.forEach((marker) => map.addObservation(marker));
}

// Update the cards to show markers for the set of observations
function updateCards(observations) {
  document.querySelectorAll(".card").forEach((elm) => elm.remove());
  // Populate and build cards with all observation data we want to show
  observations.forEach((observation) => {
    let card = buildCardForObservation(observation);
    addCard(card);
  });
}
//Function to show all data, or only native, or only introduced
function show(native, introduced) {
  native = native || false;
  introduced = introduced || false;
  // Get all the observations from our data.js and format them so we can work with the data
  const observations = getAllObservations();
  let filtered;
  let message;
  if (native) {
    message = "Only Native Species";
    filtered = filterOnlyNative(observations);
  } else if (introduced) {
    message = "Only Introduced Species";
    filtered = filterOnlyIntroduced(observations);
  } else {
    message = "All Species";
    filtered = observations;
  }
  // Update the map and cards
  updateMap(filtered, map);
  updateCards(filtered);
  updateCardsTitle(`${message} (${filtered.length})`);
}

function start() {
  // Create our map object for Seneca's Newnham campus
  map = new SimpleMap("map-container", 43.7955, -79.3496);

  // Click handlers for all three buttons.
  // The "All Species" button should call the show function without arguments.

  //I will use different options to implement click handlers
  let btnAll = document.querySelector("#show-all");
  btnAll.onclick = function (e) {
    show();
  };
  // The "Only Native Species" button should call the show function
  //with only one true argument.
  let btnNative = document.getElementById("show-native");
  btnNative.addEventListener("click", function (e) {
    show(true);
  });
  // The "Only Introduced Species" button should call the show function
  //with false and true arguments.
  let btnIntroduced = document.getElementById("show-introduced");
  btnIntroduced.onclick = function (e) {
    show(false, true);
  };
  // Show all species observations by default when we start.
  show();
}

//Start function call when the page has finished fully loading.
window.addEventListener("load", (event) => {
  start();
});
