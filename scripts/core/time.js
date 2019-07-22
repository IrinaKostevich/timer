const SECONDS_PER_MINUTES = 60;

export class Time {
    constructor(minutes, seconds) {
        if (minutes < 0 || minutes > 59) throw new Error('Minutes value is invalid.');
        if (seconds < 0 || seconds > 59) throw new Error('Seconds value is invalid.');

        this._minutes = minutes;
        this._seconds = seconds;
    }

    get minutes() {
        return this._minutes;
    }

    get seconds() {
        return this._seconds;
    }

    addSeconds(value) {
        const totalSeconds = this.getTotalSeconds() + value;

        if (totalSeconds < 0) throw new Error('Can not add seconds.');

        const currentMinutes = Math.trunc(totalSeconds / SECONDS_PER_MINUTES);
        const currentSeconds = totalSeconds % SECONDS_PER_MINUTES;

        return new Time(currentMinutes, currentSeconds);
    }

    getTotalSeconds() {
        return this.minutes * SECONDS_PER_MINUTES + this.seconds;
    }

    equalsTo(time) {
        return this.getTotalSeconds() === time.getTotalSeconds();
    }

    toString() {
        const minutes = this.minutes < 10 ? `0${this.minutes}` : this.minutes;
        const seconds = this.seconds < 10 ? `0${this.seconds}` : this.seconds;

        return `${minutes}:${seconds}`;
    }
}
