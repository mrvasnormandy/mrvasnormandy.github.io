import RubberyCharacter from './RubberyCharacter'
export default class Rubbery {
  constructor(e) {
    this.element = e;
    this.characters = [];
    this.init();
  }
  waveRight(index) {
    let timeout = 0;
    for (let i = index; i < this.characters.length; i++) {
      timeout += 50;
      setTimeout(() => {
        let c = this.characters[i];
        c.unjiggle();
        c.jiggle();
      }, timeout);
    }
  }
  waveLeft(index) {
    let timeout = 0;
    for (let i = index; i >= 0; i--) {
      timeout += 50;
      setTimeout(() => {
        let c = this.characters[i];
        c.unjiggle();
        c.jiggle();
      }, timeout);
    }
  }
  wave(index) {
    this.waveLeft(index);
    this.waveRight(index);
  }
  init() {
    this.element.setAttribute("aria-label", this.element.innerText);
    let c = this.element.innerText.split("");
    for (let i = 0; i < c.length; i++) {
      let rubberyCharacterElement = document.createElement("span");
      if (c[i] !== '\n') {
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

