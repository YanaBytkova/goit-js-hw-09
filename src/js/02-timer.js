import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const timerBox = document.querySelector('.timer');
const unitBox = document.querySelector('.field');
const valueBox = document.querySelector('.value');
const labelBox = document.querySelector('.label');
const infoDay = document.querySelector('[data-days]');
const infoHour = document.querySelector('[data-hours]');
const infoMinute = document.querySelector('[data-minutes]');
const infoSecond = document.querySelector('[data-seconds]');
const btnStart = document.querySelector('[data-start]');
const inputDate = document.querySelector('#datetime-picker');

btnStart.disabled = true;
errorMessage = "Please choose a date in the future";

const chooseDate = () => {
    const options = {
        enableTime: true,
        time_24hr: true,
        defaultDate: new Date(),
        minuteIncrement: 1,
        onClose(selectedDates) {
          console.log(selectedDates[0], );
        },
      };
    const yourDate = inputDate.flatpickr('input#datetime-picker', options);
    const currentDate = new Date();
    const choosingDate = new Date(yourDate.selectedDates);
    const ms = choosingDate - currentDate;
    console.log(ms);
    return ms;
    timerId = setInterval(() => {
        // console.log(yourDate.selectedDates);
        // console.log(currentDate);
        if (yourDate.selectedDates.length > 0) {
            clearInterval(timerId);}

      }, 3000); }
  
      chooseDate();

      const promise = new Promise((resolve, reject) => {
        
        setTimeout(() => {
          console.log("ms = ", chooseDate()); 
          if (chooseDate() > 0) {
            resolve(chooseDate());
          } else {
            reject(errorMessage);
          }
        }, 5000);
      });
      
      promise.then( ( ms ) => {
          btnStart.disabled = false;
          convertMs(ms);
      }, error => {
        window.alert(error);
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
        // console.log("result:", days, hours, minutes, seconds);
        infoDay.textContent = days;
        infoHour.textContent = hours;
        infoMinute.textContent = minutes;
        infoSecond.textContent = seconds;
        return { days, hours, minutes, seconds };
      }
    const startTimeCounter = () => {
    setInterval(() => {
    convertMs(chooseDate());
    }, 1000);
    }   

 btnStart.addEventListener('click', startTimeCounter);