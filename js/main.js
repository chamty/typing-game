'use strict';

{
  const words = [
    'apple',
    'lemon',
    'banana',
    'peach',
    'watermelon',
    'strawberry',
  ];

  const pics = [
    'https://chamty.github.io/typing-game/img/apple-min.jpg',
    'https://chamty.github.io/typing-game/img/lemon-min.jpg',
    'https://chamty.github.io/typing-game/img/banana-min.jpg',
    'https://chamty.github.io/typing-game/img/peach-min.jpg',
    'https://chamty.github.io/typing-game/img/watermelon-min.jpg',
    'https://chamty.github.io/typing-game/img/strawberry-min.jpg',
  ];

  let wrong = [];
  let pic;
  let word;
  let loc;
  let score;
  let miss;
  const timeLimit = 20 * 1000;
  let startTime;
  let isPlaying = false;

  const index = Math.floor(Math.random() * words.length);
  const picture = document.getElementById('picture');
  const target = document.getElementById('target');
  const scoreLabel = document.getElementById('score');
  const missLabel = document.getElementById('miss');
  const timerLabel = document.getElementById('timer');


  function updateTarget() {
    let placeholder = '';
    for (let i = 0; i < loc; i++) {
      placeholder += '_';
    }
    target.textContent = placeholder + word.substring(loc);
    
  }

  function updateTimer() {
    const timeLeft = startTime + timeLimit - Date.now();
    timerLabel.textContent = (timeLeft / 1000).toFixed(2);

    const timeoutId = setTimeout(() => {
      updateTimer();
    }, 10);

    if (timeLeft < 0) {
      isPlaying = false;
      clearTimeout(timeoutId);
      timerLabel.textContent = '0.00';
      setTimeout(() => {
        showResult();
      }, 100);

      target.innerHTML = 'Time Up!<br>Click or Press space to replay';
      picture.src = 'https://chamty.github.io/typing-game/img/clock-min.jpg';
    }
  }

  function showResult() {
    const accuracy = score + miss === 0 ? 0 : score / (score + miss) * 100;
    alert(`${score} letters, ${miss} misses, ${accuracy.toFixed(2)}% accuracy!`);
  }

  function start() {
    if (isPlaying === true) {
      return;
    }

    isPlaying = true;

    loc = 0;
    score = 0;
    miss = 0;
    scoreLabel.textContent = score;
    missLabel.textContent =  miss;
    word = words[index];
    pic = pics[index];

    target.textContent = word;
    picture.src = pic;
    startTime = Date.now();
    updateTimer();
  }

  window.addEventListener('click', () => {
    start();
  });

  window.addEventListener('keydown', e => {
    if (isPlaying === true) {
      return;
    }

    if (e.keyCode === 32) {
    start();
    miss = -1;
    }
  });

  window.addEventListener('keydown', e => {
    if (isPlaying !== true) {
      return;
    }

    if (e.key === word[loc]) {
      loc++;
      if (loc === word.length) {
        const index = Math.floor(Math.random() * words.length);
        word = words[index];
        pic = pics[index];
        loc = 0;

        picture.src = pic;
      }

      updateTarget();
      score++;
      scoreLabel.textContent = score;
    } else {
      miss++;
      missLabel.textContent = miss;
    }
  });
}