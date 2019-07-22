import { App } from './app.js';
import { State } from '../core/timer.js';
import { Time } from '../core/time.js';


const INITIAL_STATE = {
    time: new Time(0, 15),
    state: State.PENDING,
    isWarningTime: false,
};

const RUNNING_STATE = {
    time: new Time(0, 14),
    state: State.RUNNING,
    isWarningTime: true,
};


describe('App', () => {
    function setup(initialState, runningState) {
        let state = initialState;

        const appService = {
            startTimer: jest.fn(() => {
                state = runningState;
            })
        };

        Object.defineProperty(appService, 'state', {
            get: jest.fn(() => state),
        });

        const app = new App(appService);

        document.body.innerHTML = `
                <div class="js-timer timer">
                    <time class="js-timer-value"></time>
                </div>
                <div>
                    <button class="js-timer-start">Start</button>
                    <button class="js-timer-pause is-hidden">Pause</button>
                    <button class="js-timer-reset">Reset</button>
                </div>`;

        return {app, appService, document};
    }

    describe('start', () => {
        test('renders initial UI', () => {
            const {app, document} = setup(INITIAL_STATE);

            app.start(document);

            expect(document.querySelector('.js-timer-value').textContent)
                .toBe(INITIAL_STATE.time.toString());
        });
    });

    describe('Event handling', () => {
        test('starts a timer when "Start" button is clicked', () => {
            const {app, appService, document} = setup(INITIAL_STATE, RUNNING_STATE);

            app.start(document);
            document.querySelector('.js-timer-start').click();

            expect(appService.startTimer).toHaveBeenCalledTimes(1);
            expect(document.querySelector('.js-timer').classList.contains('timer--running')).toBe(true);
            expect(document.querySelector('.js-timer').classList.contains('timer--warning')).toBe(true);
            expect(document.querySelector('.js-timer-value').textContent).toBe(RUNNING_STATE.time.toString());
            expect(document.querySelector('.js-timer-start').classList.contains('is-hidden')).toBe(true);
            expect(document.querySelector('.js-timer-pause').classList.contains('is-hidden')).toBe(false);
        });
    });
});