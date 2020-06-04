import cards from './Cards';
import createMainPage from './MainPage';
import createElement from './helper';


export default function createPlayPage() {
  // create div with pictures for play
  const container = document.getElementById('container');

  const wrapperPlayDiv = createElement('div','wrapper-play-div'); 
  wrapperPlayDiv.id = 'wrapperPlayDiv';
  container.append(wrapperPlayDiv);

  const soundError = createElement('audio','sound-error'); 
  container.append(soundError);
  soundError.setAttribute('src', './audio/error.mp3')

  const soundSuccess = createElement('audio','sound-success'); 
  container.append(soundSuccess);
  soundSuccess.setAttribute('src', './audio/correct.mp3');

  const wrapperForStars = createElement('div','wrapper-play-div__wrapper-stars'); 
  wrapperPlayDiv.append(wrapperForStars);

  const nameOfCategory = createElement('div','wrapper-play-div__name-of-category'); 
  wrapperForStars.append(nameOfCategory);

  const fieldForStars = createElement('div','wrapper-play-div__field-for-stars');
  wrapperForStars.append(fieldForStars);

  const playDiv = createElement('div','play-div');
  wrapperPlayDiv.append(playDiv);

  // get all arrays from variable cards excluding the first
  let playCardsArr = [];
  for (let i = 1; i < cards.length; i++) {
    playCardsArr.push(cards[i])
  }

  playCardsArr.forEach((el) => {
    const playCardsWrapper = createElement('div','play-cards-wrapper');
    playDiv.id = 'playDiv';
    playDiv.append(playCardsWrapper);

    const playCards = createElement('div','play-cards-wrapper__front');
    playCardsWrapper.append(playCards);

    const audio = createElement('audio','play-cards-wrapper__audio');
    playCards.append(audio);

    const playCardsBack = createElement('div','play-cards-wrapper__back');
    playCardsWrapper.append(playCardsBack);

    const playImage = createElement('img','play-cards-wrapper__image');
    playImage.setAttribute('alt', '#');
    playCards.append(playImage);

    const playImageBack = createElement('img','play-cards-wrapper__image-back');
    playImageBack.setAttribute('alt', '#');
    playCardsBack.append(playImageBack);

    const playCardsText = createElement('div','play-cards-wrapper__text');
    playCards.append(playCardsText);

    const playCardsTextBack = createElement('div','play-cards-wrapper__text-back');
    playCardsBack.append(playCardsTextBack);

    const rotateButton = createElement('button','play-cards-wrapper__rotate-btn');
    playCardsWrapper.append(rotateButton);
    rotateButton.innerHTML = 'push';
  });

  
  // Switching to the desired page via menu links
    const [firstLink, ...links] = document.querySelectorAll('.nav__link');
    links.forEach((el, index) => {
      el.classList.add(`number${index}`);
    })


  links.forEach((el) => {
    el.addEventListener('click', (event) => {
      target = event.target;
      if (target.tagName != 'A') return;
      wrapperPlayDiv.classList.remove('hidePage');
      wrapperPlayDiv.classList.add('showPage');
      mainDiv.classList.remove('showPage');
      mainDiv.classList.add('hidePage');
      links.forEach((el) => {el.classList.remove('active-link')})
      firstLink.classList.remove('active-link');
      target.classList.add('active-link');
      fillGameCards();
    })
  })

  // Switch to the second page from first
  const playText = document.querySelectorAll('.play-cards-wrapper__text');
  const playImg = document.querySelectorAll('.play-cards-wrapper__image');
  const playTextBack = document.querySelectorAll('.play-cards-wrapper__text-back');
  const playImgBack = document.querySelectorAll('.play-cards-wrapper__image-back');
  let audio = document.querySelectorAll('.play-cards-wrapper__audio');
  let target;
  let k;

  function fillGameCards() {
    for (let k = 0; k < playCardsArr.length; k++) {
      if (target.classList.contains(`number${k}`)) {
        for (let i = 0; i < playCardsArr[k].length; i++) {
          nameOfCategory.innerHTML = cards[0][k];
          playImg[i].setAttribute('src', playCardsArr[k][i].image)
          playText[i].innerHTML = playCardsArr[k][i].word;
          playTextBack[i].innerHTML = playCardsArr[k][i].translation;
          playImgBack[i].setAttribute('src', playCardsArr[k][i].image);
          audio[i].setAttribute('src', playCardsArr[k][i].audioSrc);
        }
      }
    }
  }

  const mainDiv = document.getElementById('wrapperDiv');
  mainDiv.addEventListener('click', (event) => {
    target = event.target;
    const A = target.closest('A');
    if (!A) return;
    wrapperPlayDiv.classList.remove('hidePage');
    wrapperPlayDiv.classList.add('showPage');
    mainDiv.classList.remove('showPage');
    mainDiv.classList.add('hidePage');
    links.forEach((el) => {
      el.classList.remove('active-link');
     })  
     firstLink.classList.remove('active-link');
    fillGameCards();
  });


  // Switch to the main page via menu link
  firstLink.addEventListener('click', () => {
    wrapperPlayDiv.classList.remove('showPage');
    wrapperPlayDiv.classList.add('hidePage');
    mainDiv.classList.remove('hidePage');
    mainDiv.classList.add('showPage');
    links.forEach((el) => {el.classList.remove('active-link')})
    firstLink.classList.add('active-link');
  })

  
  // Turn on game mode
  let toggleActive = false;
  let mainCards = document.querySelectorAll('.main-cards');
  const toggleWrapper = document.getElementById('toggleWrapper');
  const playImage = document.querySelectorAll('.play-cards-wrapper__image');
  const playCardsText = document.querySelectorAll('.play-cards-wrapper__text');
  const rotateButton = document.querySelectorAll('.play-cards-wrapper__rotate-btn');
  toggleWrapper.addEventListener('click', () => {
    if (toggleWrapper.classList.contains('active')) toggleActive = true;
    else if (!toggleWrapper.classList.contains('active')) toggleActive = false;
    playImage.forEach((el) => {
      el.classList.toggle('play-level');
    });
    playCardsText.forEach((el) => {
      el.classList.toggle('hidden');
    });
    rotateButton.forEach((el) => {
      el.classList.toggle('hidden');
    });
    mainCards.forEach((el) => {
      el.classList.toggle('play-mode-background');
    })
    startBtn.classList.toggle('startBtn-show');
    cleanPlayField();
  });

  // flip cards on back side by clicking on button
  rotateButton.forEach((el) => {
    el.addEventListener('click', (event) => {
      el.classList.add('hidden');
      let target = event.target.closest('div');
      target.classList.add('is-flipped');
    })
  })

  // flip cards on front side by mouse out
  const playCardsWrapper = document.querySelectorAll('.play-cards-wrapper');
  playCardsWrapper.forEach((el) => {
    el.addEventListener('mouseleave', (event) => {
      if (el.classList.contains('is-flipped')) {
        el.classList.remove('is-flipped');
      }
      rotateButton.forEach((el) => {
        if (el.classList.contains('hidden')) {
          if (toggleWrapper.classList.contains('active')) return;
          setTimeout(() => el.classList.remove('hidden'), 300);
        }
      })
    })
  })


  // play sound by clicking  
  playCardsWrapper.forEach((el) => {
    el.addEventListener('click', (event) => {
      const target = event.target;
      const divPlay = target.closest('.play-cards-wrapper')
      if (event.target.tagName == 'BUTTON') return;
      if (!(toggleWrapper.classList.contains('active') || el.classList.contains('is-flipped'))) {
        divPlay.querySelector('audio').play();
      }
    })
  });

  // create Start Button
  const startBtn = createElement('button','wrapper-play-div__start-btn');
  wrapperPlayDiv.append(startBtn);
  startBtn.innerHTML = 'Start';

  // Add functionality on startBtn, create game mode
  // counter - this variable counts incorrect answers
  let counter = 0;
  let selectedImg;
  let playIndex = 0;
  let gameMode = false;
  let playImgArr = [...document.getElementsByTagName('img')];
  let arrAudio = [...document.querySelectorAll('.play-cards-wrapper__audio')];
  arrAudio.sort(() => Math.random() - 0.5);

  // clear field after end of the game
  function cleanPlayField() {
    playImgArr.forEach((el) => {
      el.classList.remove('inactive')
    })
    fieldForStars.innerHTML = '';
    playIndex = 0;
    arrAudio.sort(() => Math.random() - 0.5);
    startBtn.classList.remove('push');
    startBtn.innerHTML = 'Start';
  }

  // start the game
  startBtn.addEventListener('click', () => {
    if (!(startBtn.classList.contains('push'))) {
      gameMode = true;
      playAudio();
      startBtn.classList.add('push');
      startBtn.innerHTML = '';
      fieldForStars.innerHTML = '';
      counter = 0;

    }
    else setTimeout(() => arrAudio[playIndex].play(), 700);
  });

  // play audio
  function playAudio() {
    if (checkAnswer) {
      if (toggleActive) {
        setTimeout(() => arrAudio[playIndex].play(), 800);
      }
    }
  }


  // compare selected image with sound, add of the correct or incorrect stars
  function checkAnswer() {
    selectedImg = event.target.previousElementSibling;
    if (!toggleActive || !startBtn.classList.contains('push')) return;
    if (selectedImg === arrAudio[playIndex] && gameMode) {
      const answerStars = createElement('div','correct_answer');
      fieldForStars.append(answerStars);
      soundSuccess.play();
      event.target.classList.add('inactive');
      return true;
    } else {
      if (!(event.target.classList.contains('inactive'))) {
        const answerStarsWrong = createElement('div','wrong_answer');
        fieldForStars.append(answerStarsWrong);
        soundError.play();
        counter++;
        return false;
      }
    }
  }

  // create a page for result
  const resultWindow = createElement('div','result-window');
  container.append(resultWindow);

  const resultSound = createElement('audio','result-window__audio');
  resultWindow.append(resultSound);


  // play the next sound if the answer is correct
  playImage.forEach((el) => {
    el.addEventListener('click', (event) => {
      if (gameMode) {
        checkAnswer();
        if (playIndex < arrAudio.length - 1) {
          if (selectedImg === arrAudio[playIndex] && startBtn.classList.contains('push')) {
            playIndex++;
            playAudio();
          }
        }
        else {
          setTimeout(() => {
            resultWindow.classList.add('showPage')
            wrapperPlayDiv.classList.remove('showPage')
            if (counter === 0) {
              resultWindow.classList.add('success')
              resultSound.setAttribute('src', './audio/success.mp3')
              resultSound.play();
            } else {
              resultWindow.classList.add('falilure')
              resultSound.setAttribute('src', './audio/failure.mp3')
               setTimeout(() => {resultSound.play()}, 100);
              if (counter === 1) {
                resultWindow.innerHTML = counter + ' error'
              } else resultWindow.innerHTML = counter + ' errors'

            }
           }, 500);

           setTimeout(() => {
            resultWindow.classList.remove('showPage')
            wrapperDiv.classList.remove('hidePage')
            resultWindow.innerHTML = '';
            resultWindow.classList.remove('success')
            resultWindow.classList.remove('falilure')
            resultSound.removeAttribute('src', './audio/failure.mp3')
            resultSound.removeAttribute('src', './audio/success.mp3')
            counter = 0;

          },3000);

          cleanPlayField();

        }
      }
    })
  });


  // restart game, if choose another links
  links.forEach((el) => {
    el.addEventListener('click', () => {
      cleanPlayField();
    })
  })

}
createPlayPage();

