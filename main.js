function Rubber(v) {
  let txt = v.innerText;
  v.setAttribute("aria-label", txt);
  v.innerHTML = "";
  txt.split("").forEach(c => {
    if (c === "" || c === " ") {
      v.appendChild(document.createTextNode(c));
      return;
    }
    if (c === ",") {
      v.appendChild(new Letter(c).element);
      v.appendChild(document.createElement("br"));
      return;
    }
    v.appendChild(new Letter(c).element);
  });
}

function Letter(l) {
  this.element = document.createElement("span");
  this.element.style.display = "inline-block";
  this.element.appendChild(document.createTextNode(l));
  this.element.addEventListener("mouseover", event => {
    event.target.classList.add("animated");
    event.target.classList.add("rubberBand");
  });
  this.element.addEventListener("animationend", event => {
    event.target.classList.remove("animated");
    event.target.classList.remove("rubberBand");
  });
}

document.querySelectorAll(".rubbery").forEach(v => {
  new Rubber(v);
});

document.getElementById("contactBtn").addEventListener("click", event => {
  flipOutFlipIn(document.getElementById("infoContainer"),document.getElementById("contactContainer"));
});

document.getElementById("cancelContactBtn").addEventListener("click", event => {
  flipOutFlipIn(document.getElementById("contactContainer"), document.getElementById("infoContainer"));
});

function flipOutFlipIn(flipOut, flipIn){
  flipOut.classList.add("animated");
  flipOut.classList.add("flipOutX");
  var fadeIn = event => {
  flipOut.classList.remove("animated");
  flipOut.classList.remove("flipOutX");
 event.target.style.display = 'none';
    flipIn.classList.add("animated");
    flipIn.classList.add("flipInX"); 
  flipIn.style.display = 'block';
    var fadeOut = event => {
      event.target.classList.remove("animated");
      event.target.classList.remove("flipInX");
      event.target.removeEventListener("animationend",fadeOut);
    };
    flipIn.addEventListener("animationend", fadeOut);
    event.target.removeEventListener("animationend",fadeIn);
  };
  flipOut.addEventListener("animationend", fadeIn);
}