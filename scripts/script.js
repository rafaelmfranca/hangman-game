const get = (str) => document.querySelector(str);
const getAll = (str) => document.querySelectorAll(str);

const alphabetList = get('.alphabet');
const wordElement = get('.word');
const hangmanParts = getAll('.hangman-part');

const words = [
  'item',
  'gratuito',
  'proibido',
  'rubrica',
  'recorde',
  'menu',
  'raiz',
  'higiene',
];

const pickRandomWord = () => words[Math.floor(Math.random() * words.length)];
const randomWord = pickRandomWord();

const renderWord = () => {
  randomWord.split('').forEach((ch) => {
    const li = `<li class="letter"><span class="hidden">${ch}</span></li>`;
    wordElement.insertAdjacentHTML('beforeend', li);
  });
};

const showCorrectLetter = (letter) => {
  const { children } = wordElement;
  [...children]
    .filter((item) => item.textContent === letter)
    .forEach((item) => {
      const span = item;
      span.innerHTML = `<span class="visible">${item.textContent}</span>`;
    });
};

const showHangmanPart = () => {
  const firstPartNotVisible = [...hangmanParts].find(
    (item) => !item.classList.contains('visible')
  );
  firstPartNotVisible.classList.add('visible');
};

const updateWord = (event) => {
  const { target } = event;

  if (target.classList.contains('digit')) {
    target.setAttribute('disabled', '');

    if (randomWord.includes(target.textContent)) {
      showCorrectLetter(target.textContent);
    } else {
      showHangmanPart();
    }
  }
};

alphabetList.addEventListener('click', updateWord);

const init = () => {
  renderWord();
};

window.onload = () => init();
