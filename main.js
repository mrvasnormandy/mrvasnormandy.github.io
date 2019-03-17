function rubberify(v) {
  let txt = v.innerText;
  v.setAttribute("aria-label", txt);
  v.innerHTML = "";
  txt.split("").forEach(function(c) {
    if (c === "" || c === " ") {
      v.appendChild(document.createTextNode(c));
      return;
    }
    if (c === ",") {
      v.appendChild(readyLetter(c));
      v.appendChild(document.createElement("br"));
      return;
    }
    v.appendChild(readyLetter(c));
  });
}

function readyLetter(l) {
  let element = document.createElement("span");
  element.style.display = "inline-block";
  element.appendChild(document.createTextNode(l));
  element.addEventListener("mouseover", function(event){
    event.target.classList.add("animated");
    event.target.classList.add("rubberBand");
  });
  element.addEventListener("animationend", function(event) {
    event.target.classList.remove("animated");
    event.target.classList.remove("rubberBand");
  });
  return element;
}

document.querySelectorAll(".rubbery").forEach(function(v) {
  rubberify(v);
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
  element.addEventListener(eventType, function (e) {
    e.target.removeEventListener(e.type, arguments.callee);
    return callback(e);
  });
}

function flipOutFlipIn(flipOut, flipIn) {
  flipOut.classList.add("animated");
  flipOut.classList.add("flipOutX");
  oneTimeEvent(flipOut, "animationend", function () {
    flipOut.style.display = 'none';
    flipOut.classList.remove("animated");
    flipOut.classList.remove("flipOutX");
    flipIn.classList.add("animated");
    flipIn.classList.add("flipInX");
    flipIn.style.display = 'block';
    oneTimeEvent(flipIn, "animationend", function () {
      flipIn.classList.remove("animated");
      flipIn.classList.remove("flipInX");
    });
  });
}