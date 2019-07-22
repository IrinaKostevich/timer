export class TimerStatusService {
    isWarningTime(originalTime, currentTime) {
        const orinalTotalSeconds = originalTime.getTotalSeconds();
        const currentTimeSeconds = currentTime.getTotalSeconds();

        const ratio = currentTimeSeconds / orinalTotalSeconds;

        return ratio > 0 && ratio < 0.5;
    }
}
