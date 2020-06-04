import cards from './Cards';
import createMainPage from './MainPage';
import createElement from './helper';


export default function renderLeftSideMenu() {
 const header = document.querySelector('.header');
 const nav = createElement('nav','nav');
 header.append(nav);

 const ul = createElement('ul','nav__ul');
 nav.append(ul);

 cards[0].forEach((el) => {
   const li = createElement('li','nav__li'); 
   ul.append(li);

   const a = createElement('a','nav__link'); 
   a.setAttribute('href', '#');
   li.append(a);
   a.innerHTML = el;
 });

  // create burger
  const burger = createElement('button','burger'); 
  nav.append(burger);

  const span = createElement('span','burger__span');
  burger.append(span);

}
