import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const timerBox = document.querySelector('.timer');
const unitBox = document.querySelector('.field');
const valueBox = document.querySelector('.value');
const labelBox = document.querySelector('.label');
const btnStart = document.querySelector('[data-start]');
const inputDate = document.querySelector('#datetime-picker');

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
  
    timerId = setInterval(() => {
        console.log(yourDate.selectedDates);
        if (yourDate.selectedDates.length > 0) {
            clearInterval(timerId);
            return yourDate.selectedDates;
          }
      }, 3000); 
      
}
 chooseDate();


const startTimeCounter = () => {
    // console.log(inputDate.value);
}

 btnStart.addEventListener('click', startTimeCounter);