import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const infoDay = document.querySelector('[data-days]');
const infoHour = document.querySelector('[data-hours]');
const infoMinute = document.querySelector('[data-minutes]');
const infoSecond = document.querySelector('[data-seconds]');

const inputDate = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
let selectedDates = '';
flatpickr(inputDate, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      Notify.warning('Please, choose a date in the future');
    } else {
      Notify.info(
        'Click on start!');
      startBtn.disabled = false;
      const setTimer = () => {
        selectedDate = selectedDates[0].getTime();
        startTimeCounter.start();
      };
      startBtn.addEventListener('click', setTimer);
    }
  },
});

const startTimeCounter = {
  start() {
    intervalId = setInterval(() => {
      startBtn.disabled = true;
      inputDate.disabled = true;
      flatpickr(inputDate).disabled = true;
      currentDate = Date.now();
      const ms = selectedDate - currentDate;

      if (ms <= 0) {
        startTimeCounter.stop();
        Notify.info('Timer stopped!');
        return;
      }
      const { days, hours, minutes, seconds } = this.convertMs(ms);
      infoDay.textContent = this.addLeadingZero(days);
      infoHour.textContent = this.addLeadingZero(hours);
      infoMinute.textContent = this.addLeadingZero(minutes);
      infoSecond.textContent = this.addLeadingZero(seconds);
    }, 1000);
  },

  stop() {
    clearInterval(intervalId);
    this.intervalId = null;
    startBtn.disabled = true;
    inputDate.disabled = false;
  },

  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = this.addLeadingZero(Math.floor(ms / day));
    const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = this.addLeadingZero(
      Math.floor(((ms % day) % hour) / minute)
    );
    const seconds = this.addLeadingZero(
      Math.floor((((ms % day) % hour) % minute) / second)
    );

    return { days, hours, minutes, seconds };
  },

  addLeadingZero(value) {
    return String(value).padStart(2, 0);
  },
};
