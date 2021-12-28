const get = (str) => document.querySelector(str);
const getAll = (str) => document.querySelectorAll(str);

const alphabetList = get('.alphabet');

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
  const wordElement = get('.word');

  randomWord.split('').forEach((ch) => {
    const li = `<li class="letter"><span class="hidden">${ch}</span></li>`;
    wordElement.insertAdjacentHTML('beforeend', li);
  });
};

const updateWord = (event) => {
  const { target } = event;

  if (target.classList.contains('digit')) {
    target.setAttribute('disabled', '');
  }
};

alphabetList.addEventListener('click', updateWord);

const init = () => {
  renderWord();
};

window.onload = () => init();
