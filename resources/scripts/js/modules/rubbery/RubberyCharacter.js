export default class RubberyCharacter {
  constructor(rubbery, e, index) {
    this.rubbery = rubbery;
    this.element = e;
    this.index = index;
    this.init();
  }
  init() {
    var self = this;
    this.element.addEventListener("mouseover", e => {
      if (e.target !== self.element)
        return;
      self.jiggle();
    });
    this.element.addEventListener("animationend", e => {
      if (e.target !== self.element)
        return;
      self.unjiggle();
    });
    this.element.addEventListener("click", () => {
      self.unjiggle();
      self.rubbery.wave(self.index);
    });
  }
  unjiggle() {
    this.element.classList.remove("animated");
    this.element.classList.remove("rubberBand");
  }
  jiggle() {
    this.element.classList.add("animated");
    this.element.classList.add("rubberBand");
  }
}