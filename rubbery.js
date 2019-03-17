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