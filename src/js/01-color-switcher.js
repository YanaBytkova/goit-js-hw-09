const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
const body = document.querySelector('body');
let timerId = null;

const changeColor = () => {
    
    timerId = setInterval(() => {
        function getRandomHexColor() {
            return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
          }
          let randomColor = getRandomHexColor();
    
      body.style.backgroundColor = randomColor;
    }, 1000);
    btnStart.disabled = true;
}
const stopChangeColor = () => {
    clearInterval(timerId);
//   console.log(`Interval with id ${timerId} has stopped!`);
  btnStart.disabled = false;
}

btnStart.addEventListener('click', changeColor);
btnStop.addEventListener('click', stopChangeColor);
