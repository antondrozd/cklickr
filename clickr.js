import Timer from './timer.js';

export default class Clickr {
    constructor({
        time = 5000,
        buttonElement,
        displayElement,
        counterElement,
        resetElement
    }) {
        this.buttonElement = buttonElement;
        this.displayElement = displayElement;
        this.counterElement = counterElement;
        this.resetElement = resetElement;
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

        this.resetElement.addEventListener(
            'click',
            this.handleReset.bind(this)
        );

        this.render();
    }

    render() {
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
        if (this.count === 0) {
            this.timer.start();
        }

        if (!this.isGameOver) {
            this.increment();
        }
    }

    handleTick() {
        this.displayElement.textContent = this.timer.time;
    }

    handleReset() {
        this._count = 0;
        this.timer.reset(this.time);
        this.isGameOver = false;
        this.render();
    }
}
