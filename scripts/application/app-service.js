import { Time } from '../core/time.js';


const DEFAULT_TIME = new Time(1, 30);


export class AppService {
    constructor(timerFn, timerStatusService) {
        this._timer = timerFn(DEFAULT_TIME);
        this._timerStatusService = timerStatusService;

        this._state = {
            time: this._timer.time,
            state: this._timer.state,
            isWarningTime: false,
        }
    }

    get state() {
        return this._state;
    }

    startTimer(callback) {
        this._timer.start(() => {
            this._state = this._getState();
            callback();
        });

        this._state = this._getState();
    }

    pauseTimer() {
        this._timer.pause();
        this._state = this._getState();
    }

    resetTimer() {
        this._timer.reset(DEFAULT_TIME);
        this._state = this._getState();
    }

    _getState() {
        const isWarningTime = this._timerStatusService
            .isWarningTime(DEFAULT_TIME, this._timer.time);

        return {
            state: this._timer.state,
            time: this._timer.time,
            isWarningTime
        };
    }
}