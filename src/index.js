import { setTimeout } from 'core-js';
import { showMap } from './map';
import {
    getDataAboutWeather,
    getCurrentUserCity,
    getCurrentUserLocation,
    getCurrentOffSetTime,
} from './requests';
import {
    showAndHideErrorField,
    clockStart,
    renderWeatherAndLocation,
    renderNameOfCountry,
    renderBackgroundImage,
    fillInSearchInputAndButton,
    renderNameOfCity,
    getCurrentTimeSearchingCity,
    renderDateToHTML,
    addClassToScaleAfterLoading,
    fillRunningString,
} from './helpers';
import sayItAloud from './speechRecognition';
import listenForecast from './speechSynthesis';

const langToggle = document.querySelector('.header__toggles_lang');
const langArrow = document.querySelector('.arrow');
const langRU = document.querySelector('.lang-ru');
const langEN = document.querySelector('.lang-en');
const langBY = document.querySelector('.lang-by');
const mainLang = document.getElementById('lang');
const temperatureWrapper = document.querySelector('.header__measuring-scale');
const temperatureScales = document.querySelectorAll('.scale');
const form = document.querySelector('form');
const searchField = document.querySelector('.search-field');
const errorField = document.querySelector('.error-field');
const stringField = document.getElementById('string');
let currentOffSetTime;

function hideListOfLang() {
    langArrow.classList.toggle('arrow-spin');
    setTimeout(() => {
        langRU.classList.toggle('lang-appear');
    }, 100);
    setTimeout(() => {
        langEN.classList.toggle('lang-appear');
    }, 200);
    setTimeout(() => {
        langBY.classList.toggle('lang-appear');
    }, 300);
}

function clearClassFromLangButtons() {
    const arrayOfLanguage = document.querySelectorAll('.language');
    arrayOfLanguage.forEach((el) => {
        el.classList.remove('lang-chosen');
    });
}

const arrOfInputCity = [];

async function fillFieldsWithAnotherLang() {
    stringField.innerHTML = '';
    fillInSearchInputAndButton();
    if (searchField.value === '' && arrOfInputCity.length === 0) {
        const searchCity = await getCurrentUserCity();
        const data = await getDataAboutWeather(searchCity);
        const [latitude, longitude] = await getCurrentUserLocation();
        renderWeatherAndLocation(data);
        await renderNameOfCountry(latitude, longitude);
        await renderNameOfCity(searchCity[0]);
        await renderDateToHTML(currentOffSetTime);
        fillRunningString();
    } else {
        const searchCity = searchField.value || arrOfInputCity[arrOfInputCity.length - 1];
        const data = await getDataAboutWeather(searchCity);
        if (data.length !== 0) {
            renderWeatherAndLocation(data);
            const latitude = data.lat;
            const longitude = data.lon;
            await renderNameOfCountry(latitude, longitude);
            await renderNameOfCity(searchCity);
            await renderDateToHTML(currentOffSetTime);
            fillRunningString();
        }
    }
}


function chooseLanguage() {
    langToggle.addEventListener('click', (event) => {
        hideListOfLang();
        if (event.target.classList.contains('lang-ru') && !event.target.classList.contains('lang-chosen')) {
            clearClassFromLangButtons();
            langRU.classList.add('lang-chosen');
            mainLang.innerHTML = langRU.innerHTML;
            fillFieldsWithAnotherLang();
        } if (event.target.classList.contains('lang-en') && !event.target.classList.contains('lang-chosen')) {
            clearClassFromLangButtons();
            langEN.classList.add('lang-chosen');
            mainLang.innerHTML = langEN.innerHTML;
            fillFieldsWithAnotherLang();
        } if (event.target.classList.contains('lang-by') && !event.target.classList.contains('lang-chosen')) {
            clearClassFromLangButtons();
            langBY.classList.add('lang-chosen');
            mainLang.innerHTML = langBY.innerHTML;
            fillFieldsWithAnotherLang();
        }
    });
}
chooseLanguage();


function chooseTemperatureScale() {
    temperatureWrapper.addEventListener('click', (event) => {
        if (!event.target.classList.contains('temp-chosen')) {
            temperatureScales.forEach((el) => el.classList.remove('temp-chosen'));
            event.target.classList.add('temp-chosen');
            fillFieldsWithAnotherLang();
        }
    });
}
chooseTemperatureScale();


const imageToggler = document.querySelector('.header__toggles_update');
const arrow = document.querySelector('.repeat');
imageToggler.addEventListener('click', async () => {
    arrow.classList.add('arrow-rotate');
    setTimeout(() => {
        arrow.classList.remove('arrow-rotate');
    }, 2000);
    if (searchField.value === '') {
        const [latitude, longitude] = await getCurrentUserLocation();
        renderBackgroundImage(latitude, longitude);
    } else {
        const searchCity = searchField.value;
        const data = await getDataAboutWeather(searchCity);
        const latitude = data.lat;
        const longitude = data.lon;
        renderBackgroundImage(latitude, longitude);
    }
});

const doRequest = async (e) => {
    if (e) {
        e.preventDefault();
    }
    if (searchField.value === '') {
        errorField.innerHTML = 'Please enter a valid request.';
        showAndHideErrorField();
    } else {
        stringField.innerHTML = '';
        const searchCity = searchField.value;
        const data = await getDataAboutWeather(searchCity);
        if (data.length !== 0) {
            arrOfInputCity.push(searchCity);
            renderWeatherAndLocation(data);
            const latitude = data.lat;
            const longitude = data.lon;
            showMap(longitude, latitude);
            await renderNameOfCountry(latitude, longitude);
            await renderNameOfCity(searchCity);
            renderBackgroundImage(latitude, longitude);
            fillInSearchInputAndButton();
            getCurrentTimeSearchingCity(latitude, longitude);
            currentOffSetTime = await getCurrentOffSetTime(latitude, longitude);
            clockStart(currentOffSetTime);
            await renderDateToHTML(currentOffSetTime);
            fillRunningString();
        }
    }
};

form.addEventListener('submit', doRequest);


document.addEventListener('DOMContentLoaded', async () => {
    addClassToScaleAfterLoading();
    mainLang.innerHTML = localStorage.getItem('key') || 'en';
    const searchCity = await getCurrentUserCity();
    const data = await getDataAboutWeather(searchCity);
    renderWeatherAndLocation(data);
    searchField.value = '';
    const [latitude, longitude] = await getCurrentUserLocation();
    showMap(longitude, latitude);
    await renderNameOfCountry(latitude, longitude);
    await renderNameOfCity(searchCity[0]);
    renderBackgroundImage(latitude, longitude);
    fillInSearchInputAndButton();
    currentOffSetTime = await getCurrentOffSetTime(latitude, longitude);
    clockStart(currentOffSetTime);
    await renderDateToHTML(currentOffSetTime);
    fillRunningString();
});

const voiceTrigger = document.querySelector('.microphone');
voiceTrigger.addEventListener('click', () => {
    let microphoneOn = false;
    if (!voiceTrigger.classList.contains('active')) {
        microphoneOn = true;
    }
    sayItAloud(microphoneOn);
});

const megaphone = document.querySelector('.header__megaphone');
megaphone.addEventListener('click', () => {
    listenForecast();
});


export { doRequest };
