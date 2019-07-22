import { Time } from './time.js';

export const State = Object.freeze({
    PENDING: 1,
    RUNNING: 2,
    PAUSED: 3,
    FINISHED: 4
});

export class Timer {
    constructor(time) {
        if (time.equalsTo(new Time(0, 0))) throw new Error('Time is invalid.');

        this._state = State.PENDING;
        this._time = time;
        this._intervalId = null;
    }

    get state() {
        return this._state;
    }

    get time() {
        return this._time;
    }

    start(callback) {
        if (this.time.equalsTo(new Time(0, 0))) throw new Error('Reset is needed.');
    
        this._state = State.RUNNING;

        this._intervalId = setInterval(() => {
            this._time = this._time.addSeconds(-1);

            if (this._time.equalsTo(new Time(0, 0))) {
                this._disposeInterval();
                this._state = State.FINISHED;
            }

            callback(this._time);
        }, 1000);
    }

    reset(time) {
        if (time.equalsTo(new Time(0, 0))) throw new Error('Time is invalid.');

        if (this._intervalId) {
            this._disposeInterval();
        }

        this._state = State.PENDING;
        this._time = time;
    }

    pause() {
        if (this.state !== State.RUNNING) return;

        this._state = State.PAUSED;
        this._disposeInterval();
    }

    _disposeInterval() {
        clearInterval(this._intervalId);
        this._intervalId = null;
    }
}
