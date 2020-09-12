const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingBtn = document.getElementById('setting-btn');
const setting = document.getElementById('setting');
const settingForm = document.getElementById('setting-form');
const difficultySelect = document.getElementById('difficulty');

// List of words

const words = [
  'sigh',
  'tense',
  'airplane',
  'ball',
  'juice',
  'warlike',
  'bad',
  'north',
  'dependent',
  'steer',
  'silver',
  'hightfalutin',
  'superficial',
  'quince',
  'eight',
  'feeble',
  'admit',
  'drag',
  'loving'
];

// Initialize words
let randomWord;

//Init score
let score = 0;

// Init time
let time = 10;

//get value from localStorage
let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

// Set difficulty select value
difficultySelect.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

// Focus on text
text.focus();

// Start Counting down
const timeInterval = setInterval(updateTime, 1000);

// Generate Random word from words
function getRandom() {
  return words[Math.floor(Math.random() * words.length)];
}

// Add word to DOM
function addWordToDOM() {
  randomWord = getRandom();
  word.innerHTML = randomWord;
}

// Function update score
function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

// Update timeout
function updateTime() {
    time--;
    timeEl.innerHTML = time + 's';

    if (time === 0) {
      clearInterval(timeInterval);
      //end game
      gameOver();
    }
}

// game over show on the screen
function gameOver() {
  endgameEl.innerHTML = `
    <h1>Time out</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Reload</button>
  `;

  endgameEl.style.display = 'flex';
}

addWordToDOM();

// EventListener
text.addEventListener('input', (e) => {
  const insertedText = e.target.value;

  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();
    //Clear
    e.target.value = '';

    if (difficulty === 'hard') {
      time += 2;
    } else if (difficulty === 'medium') {
      time += 3;
    } else {
      time +=5;
    }

    updateTime();
  }

});

// Setting btn click
settingBtn.addEventListener('click', () => setting.classList.toggle('hide'));

// Setting select
settingForm.addEventListener('change', e => {
  difficulty = e.target.value;
  // save to localStorage
  localStorage.setItem('difficulty', difficulty);
});
