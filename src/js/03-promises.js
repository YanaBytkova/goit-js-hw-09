import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const ourForm = document.querySelector('.form');
const inputDelay = document.querySelector('input[name="delay"]');
const delayStep = document.querySelector('input[name="step"]')
const inputAmount = document.querySelector('input[name="amount"]');

const readForm = function(event) {
  
const step = delayStep.value;
const firstDelay = inputDelay.value;
const amount = inputAmount.value;
return (firstDelay, step, amount); 
};

ourForm.addEventListener("input", readForm);
ourForm.addEventListener("submit", handleSubmit);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function handleSubmit(event) {
  event.preventDefault();
  const { delay, step, amount }
  = event.currentTarget.elements;
  console.log("firstDelay= ", delay.value, "step = ", step.value, "amount = ", amount.value) ;
  if (step.value === "" || delay.value === "" || amount.value === "") {
     return alert("Please fill in all the fields!");
  }
      

            for (let i = 1; i <= amount.value; i++) {
              let position = i;
              const delayStep = Number(delay.value) + Number((i - 1)*step.value);
              createPromise(position, delayStep)
              .then((position, delay) => {
                Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delayStep}ms`);
              })
              .catch((position, delay) => {
                Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delayStep}ms`);
              }); 
              

              }
              
            }
