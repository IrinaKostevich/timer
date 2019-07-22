import { Time } from './time.js';

describe('Time', () => {
    describe('constructor', () => {
        test('is instanciated with correct values', () => {
            const time = new Time(5, 45);

            expect(time.minutes).toBe(5);
            expect(time.seconds).toBe(45);
        });

        test('throws an error for incorrect minutes', () => {
            expect(() => new Time(60, 45)).toThrow('Minutes value is invalid.');
        });

        test('throws an error for incorrect seconds', () => {
            expect(() => new Time(5, 60)).toThrow('Seconds value is invalid.');
        });
    });

    describe('addSeconds', () => {
        test('adds seconds with minutes increasing', () => {
            const time = new Time(1, 30);

            const newTime = time.addSeconds(35);

            expect(newTime.minutes).toBe(2);
            expect(newTime.seconds).toBe(5);
        });

        test('substructs seconds with minutes descreasing', () => {
            const time = new Time(1, 30);

            const newTime = time.addSeconds(-35);

            expect(newTime.minutes).toBe(0);
            expect(newTime.seconds).toBe(55);
        });

        test('returns new Time instance', () => {
            const time = new Time(1, 30);

            const newTime = time.addSeconds(20);

            expect(newTime).not.toBe(time);
            expect(time.minutes).toBe(1);
            expect(time.seconds).toBe(30);
        });

        test('throws an error for negative result', () => {
            const time = new Time(1, 30);

            expect(() => time.addSeconds(-1000)).toThrow('Can not add seconds.');
        });
    });

    describe('equalsTo', () => {
        test('returns true for equal times', () => {
            const time = new Time(10, 10);

            expect(time.equalsTo(new Time(10, 10))).toBe(true);
        });

        test('returns false for not equal minutes', () => {
            const time = new Time(10, 10);

            expect(time.equalsTo(new Time(11, 10))).toBe(false);
        });

        test('returns false for not equal seconds', () => {
            const time = new Time(10, 10);

            expect(time.equalsTo(new Time(10, 11))).toBe(false);
        });
    });
});