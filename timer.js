export default class Timer {
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

    reset(time) {
        this.pause();
        this.time = time;
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