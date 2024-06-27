let countdown;
let isRunning = false;

const timerDisplay = document.getElementById('timer-display');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const daysInput = document.getElementById('days');
const hoursInput = document.getElementById('hours');
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');

function startTimer() {
    if (isRunning) return;

    const totalSeconds = parseInt(daysInput.value || 0) * 86400 +
                         parseInt(hoursInput.value || 0) * 3600 +
                         parseInt(minutesInput.value || 0) * 60 +
                         parseInt(secondsInput.value || 0);

    if (totalSeconds <= 0) return;

    isRunning = true;
    startBtn.textContent = "Pause";

    const endTime = Date.now() + totalSeconds * 1000;

    countdown = setInterval(() => {
        const secondsLeft = Math.round((endTime - Date.now()) / 1000);

        if (secondsLeft <= 0) {
            clearInterval(countdown);
            isRunning = false;
            startBtn.textContent = "Start";
            timerDisplay.textContent = "00:00:00:00";
            return;
        }

        displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds) {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const display = `${String(days).padStart(2, '0')}:${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    timerDisplay.textContent = display;
}

function resetTimer() {
    clearInterval(countdown);
    isRunning = false;
    startBtn.textContent = "Start";
    timerDisplay.textContent = "00:00:00:00";
    daysInput.value = '';
    hoursInput.value = '';
    minutesInput.value = '';
    secondsInput.value = '';
}

startBtn.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(countdown);
        isRunning = false;
        startBtn.textContent = "Start";
    } else {
        startTimer();
    }
});

resetBtn.addEventListener('click', resetTimer);
