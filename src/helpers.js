import { getHtmlElementFieldForWeather, getHtmlElementForLocation } from './templates';
import {
    getBackgroundImage, getTranslation, getTranslationForCountry,
} from './requests';
import { language } from './translations';
import { regexpEng, regexpRus } from './constants';

function showAndHideErrorField() {
    const errorField = document.querySelector('.error-field');
    errorField.classList.add('error-show');
    setTimeout(() => {
        errorField.classList.remove('error-show');
    }, 3000);
}

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.classList.add(className);
    return element;
};

function getCurrentTimeSearchingCity(currentOffSetTime) {
    const timeOffset = currentOffSetTime;
    const date = new Date();
    const utcOffset = date.getTimezoneOffset();
    date.setMinutes(date.getMinutes() + utcOffset);
    const time = date.setMinutes(date.getMinutes() + timeOffset);
    return time;
}

function update(currentOffSetTime) {
    const currentTime = getCurrentTimeSearchingCity(currentOffSetTime);
    const date = new Date(currentTime);
    let hours = date.getHours();
    if (hours < 10) hours = `0${hours}`;
    let minutes = date.getMinutes();
    if (minutes < 10) minutes = `0${minutes}`;
    let seconds = date.getSeconds();
    if (seconds < 10) seconds = `0${seconds}`;
    const time = `${hours}:${minutes}:${seconds}`;
    return time;
}

function renderClock(currentOffSetTime) {
    const currentTime = update(currentOffSetTime);
    const template = `<span class = "clock">${currentTime}</span>`;
    const element = document.querySelector('.time');
    element.innerHTML = template;
}

let start;
function clockStart(currentOffSetTime) {
    clearInterval(start);
    start = setInterval(() => { renderClock(currentOffSetTime); }, 1000);
}

function chooseRequestLanguage() {
    const mainLang = document.getElementById('lang');
    let lang;
    if (mainLang.innerHTML === 'ru') {
        lang = 'ru';
        localStorage.setItem('key', lang);
    }
    if (mainLang.innerHTML === 'en') {
        lang = 'en';
        localStorage.setItem('key', lang);
    }
    if (mainLang.innerHTML === 'be') {
        lang = 'be';
        localStorage.setItem('key', lang);
    }
    return lang;
}

function renderTranslation() {
    const lang = chooseRequestLanguage();
    let selectedLanguage;
    if (lang === 'ru') {
        selectedLanguage = language.ru;
    }
    if (lang === 'en') {
        selectedLanguage = language.en;
    }
    if (lang === 'be') {
        selectedLanguage = language.by;
    }
    return selectedLanguage;
}


function fillInSearchInputAndButton() {
    const selectedLanguage = renderTranslation();
    document.querySelector('.search-field').placeholder = selectedLanguage.placeholder;
    document.querySelector('.search-button').innerHTML = selectedLanguage.searchButton;
}

async function getCurrentDate(currentOffSetTime) {
    const dateOfSearchingCity = await getCurrentTimeSearchingCity(currentOffSetTime);
    const date = new Date(dateOfSearchingCity);
    const selectedLanguage = renderTranslation();
    const currentDate = `${selectedLanguage.days[date.getDay()]} ${date.getDate()} ${selectedLanguage.months[date.getMonth()]}`;
    const firstNextDay = selectedLanguage.fullDays[(date.getDay() + 1) % 7];
    const secondNextDay = selectedLanguage.fullDays[(date.getDay() + 2) % 7];
    const thirdNextDay = selectedLanguage.fullDays[(date.getDay() + 3) % 7];
    return [currentDate, firstNextDay, secondNextDay, thirdNextDay];
}

async function renderDateToHTML(currentOffSetTime) {
    const [date, secondDay, thirdDay, fourthDay] = await getCurrentDate(currentOffSetTime);
    const template = `<span class = "current-date">${date}</span>`;
    const element = document.querySelector('.date');
    element.innerHTML = template;
    const templateForDay2 = `<span class = "second-day">${secondDay}</span>`;
    const elementForDay2 = document.querySelector('.next-day1');
    elementForDay2.innerHTML = templateForDay2;
    const templateForDay3 = `<span class = "third-day">${thirdDay}</span>`;
    const elementForDay3 = document.querySelector('.next-day2');
    elementForDay3.innerHTML = templateForDay3;
    const templateForDay4 = `<span class = "four-day">${fourthDay}</span>`;
    const elementForDay4 = document.querySelector('.next-day3');
    elementForDay4.innerHTML = templateForDay4;
}

function chooseScaleOfTemperature() {
    const scaleFahr = document.querySelector('.measuring-scale_fahr');
    const scaleCelsius = document.querySelector('.measuring-scale_celsius');
    let scale = localStorage.getItem('keyScale') || 'M';
    if (scaleFahr.classList.contains('temp-chosen')) {
        scale = 'I';
    }
    if (scaleCelsius.classList.contains('temp-chosen')) {
        scale = 'M';
    }
    return scale;
}


function renderScaleOfTemperature() {
    const scale = chooseScaleOfTemperature();
    localStorage.setItem('keyScale', scale);
    let chosenScale;
    if (scale === 'M') {
        chosenScale = 'm/s';
    }
    if (scale === 'I') {
        chosenScale = 'mph';
    }
    return chosenScale;
}

function addClassToScaleAfterLoading() {
    const scale = chooseScaleOfTemperature();
    const scaleFahr = document.querySelector('.measuring-scale_fahr');
    const scaleCelsius = document.querySelector('.measuring-scale_celsius');
    if (scale === 'I') {
        scaleFahr.classList.add('temp-chosen');
    } else {
        scaleCelsius.classList.add('temp-chosen');
    }
}


async function renderWeatherAndLocation(data) {
    const fieldForWeather = document.querySelector('.forecast');
    const fieldForLocation = document.querySelector('.location-wrapper');
    fieldForWeather.innerHTML = '';
    fieldForLocation.innerHTML = '';
    const element = getHtmlElementFieldForWeather(data);
    fieldForWeather.append(element);
    const location = getHtmlElementForLocation(data);
    fieldForLocation.append(location);
}

async function renderNameOfCountry(latitude, longitude) {
    const fullCountryName = await getTranslationForCountry(latitude, longitude);
    const template = `<span class = "full-country-name">${fullCountryName}</span>`;
    const element = document.querySelector('.country');
    element.innerHTML = template;
}


async function renderNameOfCity(searchCity) {
    const nameOfCity = await getTranslation(searchCity);
    const template = `<span class = "city-name">${nameOfCity}</span>`;
    const element = document.querySelector('.city');
    element.innerHTML = template;
}


const spinner = document.querySelector('.spinner');
async function setBackgroundImage(latitude, longitude) {
    const backgroundImage = await getBackgroundImage(latitude, longitude);
    const img = document.createElement('img');
    const backgroundImageDefault = 'https://images.unsplash.com/photo-1506899686410-4670690fccef?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEwMzQzOX0';
    const src = backgroundImage || backgroundImageDefault;
    img.src = src;
    img.onload = () => {
        document.body.style.backgroundImage = `url(${src})`;
        if (spinner) {
            setTimeout(() => {
                spinner.classList.add('spinner-disappear');
                setTimeout(() => { spinner.remove(); }, 400);
            }, 400);
        }
    };
}


function seasonForSearching() {
    const date = new Date();
    const month = date.getMonth();
    let season;
    if (month > 1 && month < 5) {
        season = 'spring';
    } else if (month > 4 && month < 8) {
        season = 'summer';
    } else if (month > 7 && month < 11) {
        season = 'autumn';
    } else season = 'winter';
    return season;
}

function timeOfDayForSearching() {
    const date = new Date();
    const hours = date.getHours();
    let timeOfDay;
    if (hours >= 5 && hours < 12) {
        timeOfDay = 'morning';
    } else if (hours >= 12 && hours < 18) {
        timeOfDay = 'day';
    } else if (hours >= 18 && hours < 22) {
        timeOfDay = 'evening';
    } else timeOfDay = 'night';
    return timeOfDay;
}

function defineCurrentLanguage(searchCity) {
    let fromWhichTranslate;
    if (searchCity.match(regexpRus)) {
        fromWhichTranslate = 'ru';
    } else if (searchCity.match(regexpEng)) {
        fromWhichTranslate = 'en';
    } else fromWhichTranslate = 'be';
    return fromWhichTranslate;
}


function fillRunningString() {
    const mainDescription = document.querySelector('.description').textContent.toLowerCase();
    const averageTemp = document.querySelector('.average-temp').textContent.toLowerCase();
    const wind = document.querySelector('.wind').textContent.toLowerCase();
    const humidity = document.querySelector('.humidity').textContent.toLowerCase();
    const cityName = document.querySelector('.city-name').textContent;
    const countryName = document.querySelector('.full-country-name').textContent;
    const temperature = document.querySelector('.temperature').textContent;
    const secondDay = document.querySelector('.second-day').textContent.toLowerCase();
    const thirdDay = document.querySelector('.third-day').textContent.toLowerCase();
    const fourthDay = document.querySelector('.four-day').textContent.toLowerCase();
    const secondDayTemperature = document.querySelector('.next1').textContent;
    const thirdDayTemperature = document.querySelector('.next2').textContent;
    const fourthDayTemperature = document.querySelector('.next3').textContent;
    const stringField = document.getElementById('string');
    const lang = chooseRequestLanguage();
    const scale = chooseScaleOfTemperature();
    let chosenScaleEn;
    if (scale === 'M') {
        chosenScaleEn = 'C';
    }
    if (scale === 'I') {
        chosenScaleEn = 'F';
    }
    if (lang === 'ru') {
        stringField.innerHTML = `Погода в ${cityName}, ${countryName}, составляет ${temperature} °${chosenScaleEn}, ${mainDescription}, ${averageTemp}${chosenScaleEn}, ${wind}, ${humidity}.             Погода в ближайшие дни: ${secondDay} - ${secondDayTemperature}${chosenScaleEn}, ${thirdDay} - ${thirdDayTemperature}${chosenScaleEn}, ${fourthDay} - ${fourthDayTemperature}${chosenScaleEn}`;
    }
    if (lang === 'en') {
        stringField.innerHTML = `The weather in ${cityName}, ${countryName} is ${temperature} °${chosenScaleEn}, ${mainDescription}, ${averageTemp}${chosenScaleEn}, ${wind}, ${humidity}.            Weather for the coming days: ${secondDay} - ${secondDayTemperature}${chosenScaleEn}, ${thirdDay} - ${thirdDayTemperature}${chosenScaleEn}, ${fourthDay} - ${fourthDayTemperature}${chosenScaleEn}`;
    }
    if (lang === 'be') {
        stringField.innerHTML = `Надвор'е ў ${cityName}, ${countryName}, складае ${temperature} °${chosenScaleEn}, ${mainDescription}, ${averageTemp}${chosenScaleEn}, ${wind}, ${humidity}.            Надвор'е на бліжэйшыя дні: ${secondDay} - ${secondDayTemperature}${chosenScaleEn}, ${thirdDay} - ${thirdDayTemperature}${chosenScaleEn}, ${fourthDay} - ${fourthDayTemperature}${chosenScaleEn}`;
    }
}


export {
    showAndHideErrorField,
    createElement,
    clockStart,
    getCurrentDate,
    chooseRequestLanguage,
    renderWeatherAndLocation,
    renderNameOfCountry,
    chooseScaleOfTemperature,
    setBackgroundImage,
    seasonForSearching,
    timeOfDayForSearching,
    renderTranslation,
    fillInSearchInputAndButton,
    renderScaleOfTemperature,
    defineCurrentLanguage,
    renderNameOfCity,
    getCurrentTimeSearchingCity,
    renderDateToHTML,
    addClassToScaleAfterLoading,
    fillRunningString,
};
