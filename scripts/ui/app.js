import { State } from '../core/timer.js';


export class App {
    constructor(appService) {
        this._appService = appService;

        this._timerElement = null;
        this._timerValueElement = null;
        this._startButton = null;
        this._pauseButton = null;
        this._resetButton = null;
    }

    start(document) {
        this._timerElement = document.querySelector('.js-timer');
        this._timerValueElement = document.querySelector('.js-timer-value');
        this._startButton = document.querySelector('.js-timer-start');
        this._pauseButton = document.querySelector('.js-timer-pause');
        this._resetButton = document.querySelector('.js-timer-reset');

        this._startButton.addEventListener('click', this.onStartClick.bind(this));
        this._pauseButton.addEventListener('click', this.onPauseClick.bind(this));
        this._resetButton.addEventListener('click', this.onResetClick.bind(this));

        this.render(this._appService.state);
    }

    onStartClick() {
        this._appService.startTimer(() => {
            this.render(this._appService.state);
        });

        this.render(this._appService.state);
    }

    onPauseClick() {
        this._appService.pauseTimer();
        this.render(this._appService.state);
    }

    onResetClick() {
        this._appService.resetTimer();
        this.render(this._appService.state);
    }

    render({ time, state, isWarningTime }) {
        this._timerElement.classList
            .remove('timer--running', 'timer--warning', 'timer--finished');

        this._timerValueElement.textContent = time;

        switch (state) {
            case State.RUNNING: {
                this._timerElement.classList.add('timer--running');
                this._startButton.classList.add('is-hidden');
                this._startButton.disabled = false;
                this._pauseButton.classList.remove('is-hidden');

                if (isWarningTime) {
                    this._timerElement.classList.add('timer--warning');
                } else {
                    this._timerElement.classList.remove('timer--warning');
                }

                break;
            }

            case State.FINISHED: {
                this._timerElement.classList.add('timer--finished');
                this._startButton.classList.remove('is-hidden');
                this._startButton.disabled = true;
                this._pauseButton.classList.add('is-hidden');
                this._timerElement.classList.remove('timer--warning');
                break;
            }

            case State.PENDING:
            case State.PAUSED: {
                this._startButton.classList.remove('is-hidden');
                this._startButton.disabled = false;
                this._pauseButton.classList.add('is-hidden');
                this._timerElement.classList.remove('timer--warning');
                break;
            }
        }
    }
}