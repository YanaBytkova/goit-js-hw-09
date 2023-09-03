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
const stopTimer = {days: 0, hours: 0, minutes: 0, seconds: 0};

btnStart.disabled = true;
let errorMessage = "Please choose a date in the future"; 

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

    return ms;
    timerId = setInterval(() => {

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
        Notiflix.Notify.failure(error);
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

        
        // console.log(days.padStart(2, "0"));
        return { days, hours, minutes, seconds };
      }

      function addLeadingZero(value) {
        infoDay.textContent = value.days.toString().padStart(2, "0");
        infoHour.textContent = value.hours.toString().padStart(2, "0");
        infoMinute.textContent = value.minutes.toString().padStart(2, "0");
        infoSecond.textContent = value.seconds.toString().padStart(2, "0");
      }

    const startTimeCounter = () => {
      inputDate.disabled = true;
        
        const intervalId = setInterval(() => {
          addLeadingZero(convertMs(chooseDate()));
          // console.log((convertMs(chooseDate())));
          if ((convertMs(chooseDate())) === stopTimer) {
            clearInterval(intarvalId);
            console.log(`Timer has stopped!`);
          }
          }, 1000);
    
    }   

 btnStart.addEventListener('click', startTimeCounter);