import { AppService } from './application/app-service.js';
import { TimerStatusService } from './core/timer-status-service.js';
import { Timer } from './core/timer.js';
import { App } from './ui/app.js';

document.addEventListener('DOMContentLoaded', () => {
    const timerStatusService = new TimerStatusService();
    const appService = new AppService(time => new Timer(time), timerStatusService);

    const app = new App(appService);

    app.start(document);
});
