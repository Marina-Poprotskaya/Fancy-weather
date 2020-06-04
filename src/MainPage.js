import cards from './Cards';
import createElement from './helper';
import renderLeftSideMenu from './Menu';
import renderCard from './CreateCards';


export default function createMainPage() {

  // create main div and container
  
  const site = createElement('div','site');
  document.body.append(site);

  const container = createElement('div','container');
  container.id = 'container';
  site.append(container);

  // create nested block for toggle and burger
  const header = createElement('div','header');
  container.append(header);

  // create menu
  renderLeftSideMenu();

  // add Main Page to list of menu's links
  const ul = document.querySelector('ul');
  const li = createElement('li','nav__li'); 
  const a = createElement('a','nav__link');
  a.setAttribute('href', '#');
  li.append(a);
  ul.prepend(li);
  a.innerHTML = 'Main Page';


  // menu disappears and shows by button's click
  const burger = document.querySelector('.burger')
  burger.addEventListener('click', (event) => {
    event.stopPropagation();
    ul.classList.toggle('show');
    burger.classList.toggle('rotate');
  });

  // menu disappears by clicking outside the menu
  document.addEventListener('click', (event) => {
    if (!(event.target === ul || ul.contains(event.target)) && ul.classList.contains('show')) {
      ul.classList.remove('show');
      burger.classList.remove('rotate');
    }
  });

  // menu disappears by clicking on links in the menu
  const link = document.querySelectorAll('a');
  link.forEach((el) => {
    el.addEventListener('click', () => {
      ul.classList.remove('show');
      burger.classList.remove('rotate');
    });
  });

  // create toggle button
  const toggleWrapper = createElement('div','toggle-wrapper');
  toggleWrapper.id = 'toggleWrapper';
  header.append(toggleWrapper);

  const playSpan = createElement('span','toggle-wrapper__play');
  toggleWrapper.append(playSpan);
  playSpan.innerHTML = 'Play';

  const trainSpan = createElement('span','toggle-wrapper__train');
  toggleWrapper.append(trainSpan);
  trainSpan.innerHTML = 'Train';

  const toggleBtn = createElement('div','toggle-wrapper__btn');
  toggleWrapper.append(toggleBtn);

  // turn off/on for toggle button
  toggleWrapper.addEventListener('click', () => {
    toggleWrapper.classList.toggle('active');
    toggleBtn.classList.toggle('active');
    playSpan.classList.toggle('not-hidden');
    trainSpan.classList.toggle('hidden');
  });

  // create div with pictures
  const wrapperDiv = createElement('div','wrapper-div');
  wrapperDiv.id = 'wrapperDiv';
  container.append(wrapperDiv);

  const pictureDiv = createElement('div','picture-div');
  pictureDiv.id = 'pictureDiv';
  wrapperDiv.append(pictureDiv);

  // create Main Pages' cards
  cards[0].forEach((card, index)=>{
    renderCard(card, index);
  })

  // Add pictures from the const cards
  const imgArr = [];
  for (let i = 1; i < cards.length; i++) {
    const cardList = cards[i]
    const lastCard = cardList[cardList.length - 1]
    for (let j = 1; j < cardList.length; j += lastCard) {
      imgArr.push(cardList[j].image);
    }
  }

  const IMG = document.querySelectorAll('.main-cards__image');
  for (let i = 0; i < IMG.length; i++) {
      IMG[i].setAttribute('src', imgArr[i]);
  }
}
createMainPage();
