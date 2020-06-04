import { chooseRequestLanguage, chooseScaleOfTemperature } from './helpers';


export default function listenForecast() {
    const mainDescription = document.querySelector('.description').textContent;
    const averageTemp = document.querySelector('.average-temp').textContent;
    const wind = document.querySelector('.wind').textContent;
    const humidity = document.querySelector('.humidity').textContent;
    const cityName = document.querySelector('.city-name').textContent;
    const countryName = document.querySelector('.full-country-name').textContent;
    const temperature = document.querySelector('.temperature').textContent;
    const date = document.querySelector('.current-date').textContent;
    const secondDay = document.querySelector('.second-day').textContent;
    const thirdDay = document.querySelector('.third-day').textContent;
    const fourthDay = document.querySelector('.four-day').textContent;
    const secondDayTemperature = document.querySelector('.next1').textContent;
    const thirdDayTemperature = document.querySelector('.next2').textContent;
    const fourthDayTemperature = document.querySelector('.next3').textContent;
    const lang = chooseRequestLanguage();
    const scale = chooseScaleOfTemperature();
    let chosenScale;
    let chosenScaleEn;
    if (scale === 'M') {
        chosenScale = 'Цельсия';
        chosenScaleEn = 'C';
    }
    if (scale === 'I') {
        chosenScale = 'Фаренгейта';
        chosenScaleEn = 'F';
    }

    const synth = window.speechSynthesis;
    const speech = new SpeechSynthesisUtterance();
    speech.rate = 1.5;
    if (lang === 'ru') {
        speech.lang = 'ru-RU';
        speech.text = `Погода в ${cityName}, ${countryName}, в ${date}, составляет ${temperature} ° ${chosenScale}, ${mainDescription}, ${averageTemp} ${chosenScale}, ${wind}, ${humidity}; 
        Погода в ближайшие дни: ${secondDay} - ${secondDayTemperature} ${chosenScale}, ${thirdDay} - ${thirdDayTemperature} ${chosenScale}, ${fourthDay} - ${fourthDayTemperature} ${chosenScale}`;
    }
    if (lang === 'en') {
        speech.lang = 'en-EN';
        speech.text = `The weather in ${cityName}, ${countryName}, on ${date}, is ${temperature} ° ${chosenScaleEn}, ${mainDescription}, ${averageTemp} ${chosenScaleEn}, ${wind}, ${humidity};   
        Weather for the coming days: ${secondDay} - ${secondDayTemperature} ${chosenScaleEn}, ${thirdDay} - ${thirdDayTemperature} ${chosenScaleEn}, ${fourthDay} - ${fourthDayTemperature} ${chosenScaleEn};`;
    }
    if (lang === 'be') {
        speech.lang = 'be-BE';
        speech.text = `Надвор'е ў ${cityName}, ${countryName}, ў ${date}, складае ${temperature} ° ${chosenScale}, ${mainDescription}, ${averageTemp} ${chosenScale}, ${wind}, ${humidity};
        Надвор'е на бліжэйшыя дні: ${secondDay} - ${secondDayTemperature} ${chosenScale}, ${thirdDay} - ${thirdDayTemperature} ${chosenScale}, ${fourthDay} - ${fourthDayTemperature} ${chosenScale};`;
    }
    synth.speak(speech);
}
