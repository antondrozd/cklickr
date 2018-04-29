class Timer {
    constructor(time, onTick = () => {}, onEnd = () => {}) {
        this.time = time;
        this.interval = null;
        this.onTick = onTick;
        this.onEnd = onEnd;

        this.tick = this.tick.bind(this);
    }

    start() {
        this.interval = setInterval(this.tick, 1000);
    }

    pause() {
        clearInterval(this.interval);
        this.interval = null;
    }

    tick() {
        if (this.time > 1000) {
            this.time -= 1000;
            this.onTick();
        } else {
            this.onEnd();
        }
    }
}

class Clickr {
    constructor(time) {
        this.buttonElement = document.querySelector('#button');
        this.displayElement = document.querySelector('#display');
        this.counterElement = document.querySelector('#counter');
        this._count = 0;
        this.time = time;
        this.timer = new Timer(
            time,
            this.handleTick.bind(this),
            this.end.bind(this)
        );
        this.isGameOver = false;

        this.init();
    }

    init() {
        this.buttonElement.addEventListener(
            'click',
            this.handleClick.bind(this)
        );

        this.displayElement.textContent = this.time;
        this.counterElement.textContent = this.count;
    }

    get count() {
        return this._count;
    }

    increment() {
        this._count += 1;
        this.counterElement.textContent = this.count;
    }

    end() {
        this.isGameOver = true;
        this.displayElement.textContent = 'Game over';
    }

    handleClick() {
        if (this._count === 0) {
            this.timer.start();
        }
        if (!this.isGameOver) {
            this.increment();
        }
    }

    handleTick() {
        this.displayElement.textContent = this.timer.time;
    }
}

const clickr = new Clickr(5000);