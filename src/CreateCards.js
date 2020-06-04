import createElement from './helper';

export default function renderCard(card, index) {
    const mainCards = createElement('a','main-cards');
    mainCards.classList.add(`number${index}`);
    mainCards.setAttribute('href', '#');
    pictureDiv.append(mainCards);

    const image = createElement('img','main-cards__image');
    image.classList.add(`number${index}`);
    image.setAttribute('alt', index);
    mainCards.append(image);

    const MainCardsSpan = createElement('span','main-cards__span');
    MainCardsSpan.classList.add(`number${index}`);
    mainCards.append(MainCardsSpan);
    MainCardsSpan.innerHTML = card;
  }