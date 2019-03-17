require('../../stylesheets/sass/index.scss');
import Rubbery from './modules/Rubbery.js';

document.querySelectorAll(".rubbery").forEach(v => {
  new Rubbery(v);
});

document.getElementById("contactBtn").addEventListener("click", event => {
  let contact = document.getElementById("contactContainer");
  let info = document.getElementById("infoContainer");
  if (anyAnimating([contact, info]))
    return;
  flipOutFlipIn(
    info,
    contact
  );
});

document.getElementById("cancelContactBtn").addEventListener("click", event => {
  let contact = document.getElementById("contactContainer");
  let info = document.getElementById("infoContainer");
  if (anyAnimating([contact, info]))
    return;
  flipOutFlipIn(
    contact,
    info
  );
});

function anyAnimating(arr) {
  for (let i = 0; i < arr.length; i++)
    if (isAnimating(arr[i]))
      return true;
  return false;
}

function isAnimating(e) {
  return e.classList.contains("animated");
}

function oneTimeEvent(element, eventType, callback) {
  element.addEventListener(eventType, function callee (e) {
    e.target.removeEventListener(e.type, callee);
    return callback(e);
  });
}

function flipOutFlipIn(flipOut, flipIn) {
  flipOut.classList.add("animated");
  flipOut.classList.add("flipOutX");
  oneTimeEvent(flipOut, "animationend", () => {
    flipOut.style.display = 'none';
    flipOut.classList.remove("animated");
    flipOut.classList.remove("flipOutX");
    flipIn.classList.add("animated");
    flipIn.classList.add("flipInX");
    flipIn.style.display = 'block';
    oneTimeEvent(flipIn, "animationend", () => {
      flipIn.classList.remove("animated");
      flipIn.classList.remove("flipInX");
    });
  });
}