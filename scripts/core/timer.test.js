import { Time } from './time.js';
import { State, Timer } from './timer.js';


const INITIAL_TIME = new Time(1, 15);
const CHANGED_TIME = new Time(2, 55);
const INVALID_TIME = new Time(0, 0);


describe('Time', () => {
    describe('constructor', () => {
        test('is instanciated with correct values', () => {
            const timer = new Timer(INITIAL_TIME);

            expect(timer.state).toBe(State.PENDING);
            expect(timer.time).toBe(INITIAL_TIME);
        });

        test('throws an error when time contains 0 minutes and 0 seconds', () => {
            expect(() => new Timer(INVALID_TIME))
                .toThrow('Time is invalid');
        });
    });

    describe('start', () => {
        test('throws when time contains 0 minutes and 0 seconds', () => {
            jest.useFakeTimers();
            const timer = new Timer(INITIAL_TIME);
            const callback = jest.fn();
            timer.start(callback);
            jest.runAllTimers();

            expect(() => timer.start(callback)).toThrow('Reset is needed.');
        });

        test('calls callback every second', () => {
            jest.useFakeTimers();
            const timer = new Timer(INITIAL_TIME);
            const callback = jest.fn();

            timer.start(callback);

            expect(setInterval).toHaveBeenCalledTimes(1);
            expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 1000);
        });

        test('calls callback after each run', () => {
            jest.useFakeTimers();
            const time = new Time(0, 2);
            const timer = new Timer(time);
            const callback = jest.fn();

            timer.start(callback);
            
            jest.advanceTimersByTime(1000);
            expect(callback.mock.calls[0][0]).toEqual(new Time(0, 1));
            expect(timer.state).toBe(State.RUNNING);
            expect(timer.time).toEqual(new Time(0, 1));

            jest.advanceTimersByTime(1000);
            expect(callback.mock.calls[1][0]).toEqual(new Time(0, 0));
            expect(timer.state).toBe(State.FINISHED);
            expect(timer.time).toEqual(new Time(0, 0));

            jest.runAllTimers();
            expect(callback.mock.calls.length).toBe(2);
        });
    });

    describe('reset', () => {
        test('sets timer to default state', () => {
            jest.useFakeTimers();
            const timer = new Timer(INITIAL_TIME);
            const callback = jest.fn();
            timer.start(callback);

            timer.reset(CHANGED_TIME);

            expect(clearInterval).toHaveBeenCalledTimes(1);
            expect(clearInterval).toHaveBeenLastCalledWith(expect.any(Number));
            expect(timer.state).toBe(State.PENDING);
            expect(timer.time).toBe(CHANGED_TIME);
        });

        test('does not clear setInterval when timer was not started', () => {
            jest.useFakeTimers();
            const timer = new Timer(INITIAL_TIME);

            timer.reset(CHANGED_TIME);

            expect(clearInterval).toHaveBeenCalledTimes(0);
            expect(timer.state).toBe(State.PENDING);
            expect(timer.time).toBe(CHANGED_TIME);
        });

        test('sets timer to default state for finished timer', () => {
            jest.useFakeTimers();
            const time = new Time(0, 1);
            const timer = new Timer(time);
            const callback = jest.fn();
            timer.start(callback);
            jest.runAllTimers();

            timer.reset(CHANGED_TIME);

            expect(clearInterval).toHaveBeenCalledTimes(1);
            expect(clearInterval).toHaveBeenLastCalledWith(expect.any(Number));
            expect(timer.state).toBe(State.PENDING);
            expect(timer.time).toBe(CHANGED_TIME);
        });

        test('throws an error when time contains 0 minutes and 0 seconds', () => {
            const timer = new Timer(INITIAL_TIME);

            expect(() => timer.reset(INVALID_TIME))
                .toThrow('Time is invalid');
        });
    });

    describe('pause', () => {
        test('does nothing if PENDING', () => {
            jest.useFakeTimers();
            const timer = new Timer(INITIAL_TIME);

            timer.pause();

            expect(clearInterval).toHaveBeenCalledTimes(0);
            expect(timer.state).toBe(State.PENDING);
            expect(timer.time).toBe(INITIAL_TIME);
        });

        test('does nothing if FINISHED', () => {
            jest.useFakeTimers();
            const timer = new Timer(INITIAL_TIME);
            const callback = jest.fn();
            timer.start(callback);
            jest.runAllTimers();

            timer.pause();

            expect(clearInterval).toHaveBeenCalledTimes(1);
            expect(timer.state).toBe(State.FINISHED);
            expect(timer.time).toEqual(new Time(0, 0));
        });

        test('sets to PAUSED if RUNNING', () => {
            jest.useFakeTimers();
            const time = new Time(0, 2);
            const timer = new Timer(time);
            const callback = jest.fn();
            timer.start(callback);
            jest.advanceTimersByTime(1000);

            timer.pause();

            expect(clearInterval).toHaveBeenCalledTimes(1);
            expect(clearInterval).toHaveBeenLastCalledWith(expect.any(Number));
            expect(timer.state).toBe(State.PAUSED);
            expect(timer.time).toEqual(new Time(0, 1));

            jest.runAllTimers();
            expect(timer.time).toEqual(new Time(0, 1));
        });
    });
});