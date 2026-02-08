import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const startBtn = document.querySelector('[data-start]');
const input = document.querySelector('#datetime-picker');



let userSelectedDate;
let isTimerRunning = false;
startBtn.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (isTimerRunning) {
                iziToast.error({
                title: 'Error',
                message: 'Timer is running! Wait until it finishes.',
                position: 'topRight',
                timeout: 3000
            });

        flatpickrInstance.setDate(userSelectedDate, false);
        return;
    }


        console.log(selectedDates[0]);
        if (selectedDates[0] > Date.now()) {
            userSelectedDate = selectedDates[0];
            startBtn.disabled = false;
        } else {
            iziToast.error({
                title: 'Error',
                message: 'Please choose a date in the future',
                position: 'topRight',
                timeout: 3000
            });
           startBtn.disabled = true;
         }
    },
    clickOpens: true,
};

const flatpickrInstance = flatpickr("#datetime-picker", options);

startBtn.addEventListener("click", (event) => {
    startBtn.disabled = true;
    flatpickrInstance.set('clickOpens', false);
    flatpickrInstance.input.disabled = true;
    flatpickrInstance.close();
    isTimerRunning = true;

    const intervalId = setInterval(() => {
        const deltaTime = userSelectedDate - Date.now();
        if (deltaTime <= 0) {
            clearInterval(intervalId)
            flatpickrInstance.set('clickOpens', true);
            flatpickrInstance.input.disabled = false;
               isTimerRunning = false;
       } else {
            const arrTime = convertMs(deltaTime);
            document.querySelector('[data-days]').textContent = addLeadingZero(arrTime.days);
            document.querySelector('[data-hours]').textContent = addLeadingZero(arrTime.hours);
            document.querySelector('[data-minutes]').textContent = addLeadingZero(arrTime.minutes);
            document.querySelector('[data-seconds]').textContent = addLeadingZero(arrTime.seconds);
        }
    }, 1000);
});

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
};

function addLeadingZero(value) {
   return String(value).padStart(2, "0");
}