const get = (str) => document.querySelector(str);
const getAll = (str) => document.querySelectorAll(str);

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

const renderWord = () => {
  const randomWord = pickRandomWord();
  const wordElement = get('.word');

  randomWord.split('').forEach((ch) => {
    const li = `<li class="letter"><span class="hidden">${ch}</span></li>`;
    wordElement.insertAdjacentHTML('beforeend', li);
  });
};

const init = () => {
  renderWord();
};

window.onload = () => init();
