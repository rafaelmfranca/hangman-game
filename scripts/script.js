import words from './words.js';

const get = (str) => document.querySelector(str);
const getAll = (str) => document.querySelectorAll(str);

const alphabetList = get('.alphabet');
const wordElement = get('.word');
const hangmanParts = getAll('.hangman-part');
const restartButton = get('#restart-game');

let playable = true;
const correctLetters = [];
const wrongLetters = [];

const { word, category } = words[Math.floor(Math.random() * words.length)];

const displayWordAndCategory = () => {
  const categoryElement = get('.category');

  word.split('').forEach((ch) => {
    const li = `<li class="letter"><span class="hidden">${ch}</span></li>`;
    wordElement.insertAdjacentHTML('beforeend', li);
  });

  categoryElement.textContent = `Dica: ${category}`;
};

const showModal = (typeOfModal) => {
  const modal = get('.modal');

  const wonPhrases = ['Parabéns, você acertou!', 'Que tal jogar novamente?'];
  const lostPhrases = [
    'Que pena! Na próxima você acerta!',
    `A palavra correta era: ${word}`,
  ];
  const phrases = typeOfModal === 'won' ? wonPhrases : lostPhrases;

  const firstParagraph = `<p>${phrases[0]}</p>`;
  const secondParagraph = `<p>${phrases[1]}</p>`;
  modal.insertAdjacentHTML('afterbegin', secondParagraph);
  modal.insertAdjacentHTML('afterbegin', firstParagraph);

  modal.classList.add('visible');
};

const checkIfWon = () => {
  if (correctLetters.length === word.length) {
    showModal('won');
    playable = false;
  }
};

const checkIfLose = () => {
  if (wrongLetters.length === 6) {
    showModal('lost');
    playable = false;
  }
};

const showCorrectLetter = (letter) => {
  const { children } = wordElement;
  [...children]
    .filter((item) => item.textContent === letter)
    .forEach((item) => {
      const element = item;
      element.innerHTML = `<span class="visible">${item.textContent}</span>`;
      correctLetters.push(letter);
    });
};

const showHangmanPart = () => {
  const firstPartNotVisible = [...hangmanParts].find(
    (item) => !item.classList.contains('visible')
  );
  firstPartNotVisible.classList.add('visible');
};

const updateGame = (event) => {
  const { target } = event;

  if (playable) {
    if (target.classList.contains('digit')) {
      target.setAttribute('disabled', '');

      if (word.includes(target.textContent)) {
        showCorrectLetter(target.textContent);
        checkIfWon();
      } else {
        showHangmanPart();
        wrongLetters.push(target.textContent);
        checkIfLose();
      }
    }
  }
};

alphabetList.addEventListener('click', updateGame);

const restartGame = () => window.location.reload();
restartButton.addEventListener('click', restartGame);

const init = () => displayWordAndCategory();

window.onload = () => init();
