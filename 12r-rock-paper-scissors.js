
let isAutoPlaying = false;
let intervalId;
let autoPlayButton = document.querySelector('.autoplay-button');
let rockButtonElement = document.querySelector('.js-rock-button');
let paperButtonElement = document.querySelector('.js-paper-button');
let scissorsButtonElement = document.querySelector('.js-scissors-button');
const resetButton = document.querySelector('.reset-button');
const text = document.querySelector('.grid');
score = JSON.parse(localStorage.getItem('score')) ||
{
  wins: 0,
  losses: 0,
  ties: 0
};

function initllized() {
  displayText();
  score.losses = 0;
  score.wins = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreElement();
  autoPlayButton.innerHTML = 'Auto Play';

}
const autoPlayGame = () => {
  
  clickedAutoPlayButton();
  autoPlay();
};
function resetChoice() {

  const yesButton = document.querySelector('.yes-button');
  const noButton = document.querySelector('.no-button');
  yesButton.addEventListener('click', () => {
    initllized();
    text.innerHTML = ''
  });
  noButton.addEventListener('click', () => {
    text.innerHTML = '';

  });

}
autoPlayButton.addEventListener('click', autoPlayGame);

resetButton.addEventListener('click', () => {displayText();});
document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('Rock');
  } else if (event.key === 'p') {
    playGame('Paper');

  } else if (event.key === 'a') {
    autoPlayGame();
  }
  else if (event.key === 'Enter') {
    displayText();
    
  }
  else if(event.key === 's') {
    playGame('Scissors');
  }



})
updateScoreElement();

function clickedAutoPlayButton() {
  if (autoPlayButton.innerHTML === 'Auto Play') {

    autoPlayButton.innerHTML = `Stop`
  } else {
    autoPlayButton.innerHTML = 'Auto Play';
  }
}





function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
  }
  else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}
function pickComputerMove() {
  const randomNumber = Math.random();

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    return 'Rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    return 'Paper';
  } else {
    return 'Scissors'
  }
}


rockButtonElement.addEventListener('click', () => {
  playGame('Rock');
});
paperButtonElement.addEventListener('click', () => {
  playGame('Paper');
});
scissorsButtonElement.addEventListener('click', () => {
  playGame('Scissors');
});
function playGame(p_value) {

  const computerMove = pickComputerMove();
  let result = '';


  if (p_value === 'Rock') {
    if (computerMove === 'Rock') {
      result = 'Tie.';

    } else if (computerMove === 'Paper') {
      result = 'You lose.'

    } else if (computerMove === 'Scissors') {
      result = 'You win.'

    }
  }

  else if (p_value === 'Paper') {
    if (computerMove === 'Rock') {
      result = 'You win.'

    } else if (computerMove === 'Paper') {
      result = 'Tie.';

    } else if (computerMove === 'Scissors') {
      result = 'You lose.'

    }
  }

  else if (p_value === 'Scissors') {
    if (computerMove === 'Rock') {
      result = 'You lose.'

    } else if (computerMove === 'Paper') {
      result = 'You win.'

    } else if (computerMove === 'Scissors') {

      result = 'Tie.';
    }
  }
  if (result === 'You win.') {
    score.wins++;
  } else if (result === 'You lose.') {
    score.losses++;
  } else {
    score.ties++;
  }
  document.querySelector('.js-result').innerHTML = result;
  document.querySelector('.js-moves').innerHTML = `You
    <img src="images/${p_value}-emoji.png" class="move-icon">
    <img src="images/${computerMove}-emoji.png" class="move-icon">
    Computer`;
  updateScoreElement()

  localStorage.setItem('score', JSON.stringify(score));
}
function updateScoreElement() {

  document.querySelector('.js-score').
    innerHTML = `Wins : ${score.wins}, Losses : ${score.losses} Ties : ${score.ties}`;
}

function displayText() {

  const html = `Are you sure you want to reset the score? <button class="yes-button">Yes</button>
   <button class="no-button">No</button>`
  text.innerHTML = html;
  resetChoice();

}