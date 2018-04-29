import Timer from './timer.js';

export default class Clickr {
    constructor({
        time = 5000,
        buttonElement,
        displayElement,
        counterElement,
        bestResultElement,
        resetElement
    }) {
        this.time = time;
        this.buttonElement = buttonElement;
        this.displayElement = displayElement;
        this.counterElement = counterElement;
        this.bestResultElement = bestResultElement;
        this.resetElement = resetElement;
        this.store = window.localStorage;
        this.timer = new Timer(
            time,
            this.handleTick.bind(this),
            this.handleEnd.bind(this)
        );
        this.isGameOver = false;
        this._count = 0;

        this.init();
    }

    get count() {
        return this._count;
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

        this.initialRender();
    }

    initialRender() {
        this.displayElement.textContent = this.time / 1000;
        this.counterElement.textContent = this.count;
        this.bestResultElement.textContent = `Best result: ${this.store.getItem(
            'clickrBestResult'
        ) || 0}`;
    }

    increment() {
        this._count += 1;
        this.counterElement.textContent = this.count;
    }

    handleEnd() {
        this.isGameOver = true;
        this.displayElement.textContent = 'Game over';

        if (this.count > this.store.getItem('clickrBestResult')) {
            this.store.setItem('clickrBestResult', this.count);
            this.bestResultElement.textContent = `Best result: ${this.store.getItem(
                'clickrBestResult'
            )}`;
        }
        this.buttonElement.classList.add('hinge');
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
        this.displayElement.textContent = this.timer.time / 1000;
    }

    handleReset() {
        this._count = 0;
        this.timer.reset(this.time);
        this.isGameOver = false;
        this.buttonElement.classList.remove('hinge');
        this.initialRender();
    }
}
