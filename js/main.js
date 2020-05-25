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
    'https://chamty.github.io/typingGame/img/apple-min.jpg',
    'https://chamty.github.io/typingGame/img/lemon-min.jpg',
    'https://chamty.github.io/typingGame/img/banana-min.jpg',
    'https://chamty.github.io/typingGame/img/peach-min.jpg',
    'https://chamty.github.io/typingGame/img/watermelon-min.jpg',
    'https://chamty.github.io/typingGame/img/strawberry-min.jpg',
  ];

  let wrong = [];
  let pic;
  let word;
  let loc;
  let score;
  let miss;
  const timeLimit = 15 * 1000;
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

      target.innerHTML = 'Time Up!<br>Press space to replay';
      picture.src = 'https://chamty.github.io/typingGame/img/clock-min.jpg';
    }
  }

  function showResult() {
    const accuracy = score + miss === 0 ? 0 : score / (score + miss) * 100;
    alert(`${score} letters, ${miss} misses, ${accuracy.toFixed(2)}% accuracy!`);
  }

  window.addEventListener('keydown', e => {
    if (isPlaying === true) {
      return;
    }

    if (e.keyCode === 32) {
    isPlaying = true;

    loc = 0;
    score = 0;
    miss= -1;
    scoreLabel.textContent = score;
    missLabel.textContent =  miss;
    word = words[index];
    pic = pics[index];

    target.textContent = word;
    picture.src = pic;
    startTime = Date.now();
    updateTimer();
    }
  });

  window.addEventListener('keydown', e => {
    if (isPlaying !== true) {
      return;
    }

    // consoleで間違えた単語を確認できる → 間違えた単語のみプレイできるようにする予定
    if (e.key !== word[loc]) {
      wrong.push(word);
      let set = new Set(wrong);
      console.log(set);
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