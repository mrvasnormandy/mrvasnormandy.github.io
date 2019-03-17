export default class Slideshow {
    constructor(element, images, speed, pause) {
        this.element = element;
        this.element.style.opacity = 1;
        this.images = images;
        this.index = -1;
        this.speed = speed || 15000;
        this.pause = pause || 0;
        this.start();
    }
    start() {
        this.updateImage(this.nextImage());
        setTimeout(() => {
            this.next();
        }, this.speed);
    }
    next() {
        this.fadeOut().then(() => {
            this.updateImage(this.nextImage());
            setTimeout(() => {
                this.fadeIn().then(() => {
                    setTimeout(() => {
                        this.next();
                    }, this.speed);
                });
            }, this.pause);
        });
    }
    fadeOut() {
        return new Promise(resolve => {
            var interval = setInterval(() => {
                this.decreaseOpacity();
                if (this.element.style.opacity <= 0) {
                    clearInterval(interval);
                    resolve();
                }
            }, 10);
        });
    }
    fadeIn() {
        return new Promise(resolve => {
            var interval = setInterval(() => {
                this.increaseOpacity();
                if (this.element.style.opacity >= 1) {
                    clearInterval(interval);
                    resolve();
                }
            }, 10);
        });
    }
    decreaseOpacity() {
        this.element.style.opacity -= .003;
    }
    increaseOpacity() {
        this.element.style.opacity -= -.003;
    }
    nextImage() {
        return this.images[this.nextIndex()];
    }
    updateImage(image) {
        this.element.style.backgroundImage = image;
    }
    nextIndex() {
        if (++this.index >= this.images.length)
            this.index = 0;
        return this.index;
    }
}