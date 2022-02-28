/*
    Victor Lozano Alonso. ID: 130720204 - August 3, 2021
    I declare that the Assignment 5 is wholly my own work in accordance with Seneca Academic Policy.
    No part of this Assignment has been copied manually or electronically from any other source except 
    for the information supplied by the WEB222 instructors and / or made available in 
    this Assignment for my use.
    I also declare that no part of this Quiz has been distributed to other students.
*/
// Add the text to the <span>...<span> element in the element with id=cards-title
function updateCardsTitle(title) {
  let titleId = document.getElementById("cards-title");
  titleId.querySelector("span").textContent = title;
}
//Function to append element to the div id=observation-data
function addCard(card) {
  let divCard = document.getElementById("observation-data");
  divCard.appendChild(card);
}

// Given a URL src string and alt text string, create an <img> element and return:
// <img src="https://static.inaturalist.org/photos/109319291/square.jpg?1609877680" alt="Muskrat">
function createImg(src, alt) {
  let img = document.createElement("img");
  img.setAttribute("src", src);
  img.setAttribute("alt", alt);
  return img;
}

// Given a string of text, create and return a TextNode
// https://developer.mozilla.org/en-US/docs/Web/API/Document/createTextNode
function createText(text) {
  let textN = document.createTextNode(text);
  return textN;
}

// create and return an anchor element.
// <a href="http://en.wikipedia.org/wiki/Muskrat">Muskrat</a>.  NOTE:
// The innerContent will be a TextNode or HTML Img Element (i.e., it
// won't be simple text).
function createAnchor(href, innerContent) {
  let a = document.createElement("a");
  a.setAttribute("href", href);
  a.appendChild(innerContent);
  return a;
}

// Return a proper time element with its dateTime property set:
// <time datetime="2020-09-18">2020-09-18</time>
function createTime(formatted) {
  let output = formatted.split("/");
  let dValue = `${output[2]}-${output[1] < 10 ? 0 : ""}${output[1]}-${
    output[0] < 10 ? 0 : ""
  }${output[0]}`;
  let time = document.createElement("time");
  let tCont = document.createTextNode(dValue);
  time.setAttribute("datetime", dValue);
  time.appendChild(tCont);
  return time;
}
//Create i element for fontawesome icons. Return i element.
function createIcon(name, title) {
  let iElm = document.createElement("i");
  iElm.setAttribute("class", name);
  iElm.setAttribute("title", title);
  return iElm;
}
//Extract the year, month, and day in format YYYY-MM-DD from a date element.
//Return extracted date.
function simplifiedDate(date) {
  let output = date.split("/");
  let dValue = `${output[2]}-${output[1] < 10 ? 0 : ""}${output[1]}-${
    output[0] < 10 ? 0 : ""
  }${output[0]}`;
  return dValue;
}

// Given a boolean value (true/false) return a string "Yes" or "No"
function toYesNo(value) {
  if (value) return "Yes";
  return "No";
}

// Converts an Observation object into DOM nodes that produce the following HTML:
//
//     <div class="card" id="60706122">
//       <div
//         class="card-img"
//         style="background-image: url(background-image: url(‘https://inaturalist-open-
//     data.s3.amazonaws.com/photos/10177220/medium.jpg?1545693877’);"></div>
//       <div class="card-body">
//         <h3>
//           <a href="https://en.wikipedia.org/wiki/Campsis_radicans">American Trumpet Vine</a>
//         </h3>
//         <h4>
//           <a href="https://www.inaturalist.org/observations/60706122">9/25/2020</a>
//     </h4> </div>
//       <div class="card-icons">
//         <i class="fas fa-leaf" title="Native"></i>
//         <i class="fas fa-radiation-alt" title="Threatened"></i>
//       </div>
//     </div>
//
//Creates a div class="card" and id="id" and return the div.
function createCard(id) {
  let div = document.createElement("div");
  div.setAttribute("class", "card");
  div.setAttribute("id", id);
  return div;
}
//Creates a div class="card-img". Replaces square by medium in
//the URL passed in the argument. Creates inline style of background-image using
//transformed url. Returns the div.
function cardImg(url) {
  let mediumUrl = url.replace(/square/, "medium");
  let style = `background-image: url('${mediumUrl}');`;
  let div = document.createElement("div");
  div.setAttribute("class", "card-img");
  div.setAttribute("style", style);
  return div;
}
//Creates div class="card-body", h3, and h4 elements. It appends h3 and h4
//to the div element. Returns div.
function cardBody(name, date, uri, wikipediaUrl) {
  let div = document.createElement("div");
  let h3Elmt = document.createElement("h3");
  h3Elmt.appendChild(createAnchor(wikipediaUrl, createText(name)));
  let h4Elmt = document.createElement("h4");
  h4Elmt.appendChild(
    createAnchor(uri, createText(simplifiedDate(date.toLocaleDateString())))
  );
  div.setAttribute("class", "card-body");
  div.appendChild(h3Elmt);
  div.appendChild(h4Elmt);
  return div;
}
//Creates div class="card-icons". Appends proper fontawesome icons checking the
//parameters passed in the function arguments. Returns div.
function cardIcons(isNative, isIntroduced, isThreatened, isEndangered) {
  let div = document.createElement("div");
  div.setAttribute("class", "card-icons");
  if (isNative) div.appendChild(createIcon("fas fa-leaf", "Native"));
  if (isIntroduced) div.appendChild(createIcon("fas fa-frog", "Introduced"));
  if (isThreatened)
    div.appendChild(createIcon("fas fa-radiation-alt", "Threatened"));
  if (isEndangered)
    div.appendChild(createIcon("fas fa-skull-crossbones", "Endangered"));
  return div;
}
//Build div card element. Returns div.
function buildCardForObservation(observation) {
  let card = createCard(observation.id);
  card.appendChild(cardImg(observation.photoUrl));
  card.appendChild(
    cardBody(
      observation.name,
      observation.date,
      observation.uri,
      observation.wikipediaUrl
    )
  );
  card.appendChild(
    cardIcons(
      observation.isNative,
      observation.isIntroduced,
      observation.isThreatened,
      observation.isEndangered
    )
  );
  return card;
}
