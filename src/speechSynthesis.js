import { chooseRequestLanguage, chooseScaleOfTemperature, getTextFromElement } from './helpers';

export default function listenForecast() {
    const mainDescription = getTextFromElement('.description');
    const averageTemp = getTextFromElement('.average-temp');
    const wind = getTextFromElement('.wind');
    const humidity = getTextFromElement('.humidity');
    const cityName = getTextFromElement('.city-name');
    const countryName = getTextFromElement('.full-country-name');
    const temperature = getTextFromElement('.temperature');
    const date = getTextFromElement('.current-date');
    const secondDay = getTextFromElement('.second-day');
    const thirdDay = getTextFromElement('.third-day');
    const fourthDay = getTextFromElement('.four-day');
    const secondDayTemperature = getTextFromElement('.next1');
    const thirdDayTemperature = getTextFromElement('.next2');
    const fourthDayTemperature = getTextFromElement('.next3');
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
