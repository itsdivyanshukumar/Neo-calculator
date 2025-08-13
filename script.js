
let display = document.getElementById('display');
let historyEl = document.getElementById('history');
let soundEnabled = true;
let clickSound = new Audio('https://www.soundjay.com/buttons/sounds/button-16.mp3');

function append(char) {
  playSound();
  display.value += char;
}
function clearDisplay() {
  playSound();
  display.value = '';
}
function delChar() {
  playSound();
  display.value = display.value.slice(0, -1);
}
function calculate() {
  try {
    playSound();
    const result = eval(display.value);
    addToHistory(`${display.value} = ${result}`);
    display.value = result;
  } catch (error) {
    display.value = 'Error';
  }
}
function playSound() {
  if (soundEnabled) clickSound.play();
}
function addToHistory(entry) {
  let div = document.createElement('div');
  div.textContent = entry;
  div.onclick = () => display.value = entry.split('=')[0].trim();
  historyEl.prepend(div);
  if (historyEl.childElementCount > 10) historyEl.removeChild(historyEl.lastChild);
}

document.addEventListener('keydown', (e) => {
  if (!isNaN(e.key) || '+-*/.'.includes(e.key)) append(e.key);
  if (e.key === 'Enter') calculate();
  if (e.key === 'Backspace') delChar();
  if (e.key === 'Escape') clearDisplay();
});

document.getElementById('toggle-theme').onclick = () => {
  document.body.classList.toggle('light');
};
document.getElementById('toggle-sound').onclick = () => {
  soundEnabled = !soundEnabled;
};



 

