class Rubbery {
  constructor(e) {
    this.element = e;
    this.characters = [];
    this.init();
  }
  waveRight(index){
    var self = this;
    let timeout = 0;
    for(let i = index; i < this.characters.length; i++){
      timeout+=50;
      setTimeout(function(){
        self.characters[i].jiggle();
      }, timeout);
    }
  }
  waveLeft(index){
    var self = this;
    let timeout = 0;
    for(let i = index; i >= 0; i--){
      timeout += 50;
      setTimeout(function(){
        self.characters[i].jiggle();
      }, timeout);
    }
  }
  wave(index){
    this.waveLeft(index);
    this.waveRight(index);
  }
  init() {
    this.element.setAttribute("aria-label", this.element.innerText);
    let c = this.element.innerText.split("");
    for (let i = 0; i < c.length; i++) {
      let rubberyCharacterElement = document.createElement("span");
      if(c[i] !== '\n'){
        rubberyCharacterElement.style.display = "inline-block";
        rubberyCharacterElement.style.whiteSpace = "pre-wrap";
      }
      rubberyCharacterElement.appendChild(document.createTextNode(c[i]));
      this.characters.push(new RubberyCharacter(this, rubberyCharacterElement, i));
    }
    this.element.innerHTML = "";
    for (let i = 0; i < this.characters.length; i++) {
      this.element.appendChild(this.characters[i].element);
    }
  }
}

class RubberyCharacter {
  constructor(rubbery, e, index) {
    this.rubbery = rubbery;
    this.element = e;
    this.index = index;
    this.init();
  }
  init() {
    var self = this;
    this.element.addEventListener("mouseover", function() {
      self.jiggle();
    });
    this.element.addEventListener("animationend", function(e) {
      self.unjiggle();
    });
    this.element.addEventListener("click", function(){
      self.unjiggle();
      self.rubbery.wave(self.index);
    });
  }
  unjiggle(){
    this.element.classList.remove("animated");
    this.element.classList.remove("rubberBand");
  }
  jiggle(){
    this.element.classList.add("animated");
    this.element.classList.add("rubberBand");
  }
}


document.querySelectorAll(".rubbery").forEach(function(v) {
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