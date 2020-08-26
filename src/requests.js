import {
    weatherKey, geolocationKey, countryKey, imageKey, apiKeyTranslate,
} from './constants';
import {
    showAndHideErrorField, chooseRequestLanguage, chooseScaleOfTemperature,
    seasonForSearching, timeOfDayForSearching, defineCurrentLanguage,
} from './helpers';


const searchField = document.querySelector('.search-field');
const errorField = document.querySelector('.error-field');

async function getDataAboutWeather(searchCity) {
    try {
        const lang = chooseRequestLanguage();
        const scale = chooseScaleOfTemperature();
        const urlDataWeather = `https://api.weatherbit.io/v2.0/forecast/daily?city=${searchCity}&days=4&units=${scale}&lang=${lang}&key=${weatherKey}`;
        const response = await fetch(urlDataWeather);
        const data = await response.json();
        const errorMessage = data.error;
        if (errorMessage && searchField.value !== '') {
            throw new Error(errorMessage);
        }
        return data;
    } catch (errorMessage) {
        showAndHideErrorField();
        // eslint-disable-next-line eqeqeq
        if (errorMessage == 'SyntaxError: Unexpected end of JSON input') {
            errorField.innerHTML = 'Please enter a valid request';
        } else errorField.innerHTML = errorMessage;
        return [];
    }
}

async function getCurrentUserLocation() {
    const urlLocation = `https://ipinfo.io/json?token=${geolocationKey}`;
    const response = await fetch(urlLocation);
    const data = await response.json();
    return data.loc.split(',');
}

async function getCurrentUserCity() {
    const urlLocation = `https://ipinfo.io/json?token=${geolocationKey}`;
    const response = await fetch(urlLocation);
    const { city, country } = await response.json();
    return [city, country];
}

async function getFullNameOfCountry(latitude, longitude) {
    try {
        const urlCountry = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${countryKey}`;
        const response = await fetch(urlCountry);
        const data = await response.json();
        const errorMessage = data.error;
        if (errorMessage) {
            throw new Error(errorMessage);
        }
        return data.results[0].components.country;
    } catch (errorMessage) {
        errorField.innerHTML = errorMessage;
        return [];
    }
}

async function getTranslationForCountry(latitude, longitude) {
    const fullCountryName = await getFullNameOfCountry(latitude, longitude);
    const toWhichTranslate = chooseRequestLanguage();
    const urlTranslate = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${apiKeyTranslate}&text=${fullCountryName}&lang=ru-${toWhichTranslate}`;
    const response = await fetch(urlTranslate);
    const data = await response.json();
    return data.text.toString();
}

async function getCityForSearchBackgroundImage(latitude, longitude) {
    try {
        const urlCountry = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${countryKey}`;
        const response = await fetch(urlCountry);
        const data = await response.json();
        const errorMessage = data.error;
        if (errorMessage) {
            throw new Error(errorMessage);
        }
        let cityRus;
        if (data.results[0].components.city === undefined) {
            cityRus = data.results[0].components.state;
        } else cityRus = data.results[0].components.city;
        return cityRus;
    } catch (errorMessage) {
        errorField.innerHTML = errorMessage;
        return [];
    }
}

async function getCurrentOffSetTime(latitude, longitude) {
    try {
        const urlCountry = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${countryKey}`;
        const response = await fetch(urlCountry);
        const data = await response.json();
        const min = 60;
        const errorMessage = data.error;
        if (errorMessage) {
            throw new Error(errorMessage);
        }
        return data.results[0].annotations.timezone.offset_sec / min;
    } catch (errorMessage) {
        errorField.innerHTML = errorMessage;
        return [];
    }
}

async function getTranslationForBackgroundImageCity(cityRus) {
    const urlTranslate = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${apiKeyTranslate}&text=${cityRus}&lang=ru-en`;
    const response = await fetch(urlTranslate);
    const data = await response.json();
    return data.text.toString();
}

async function getBackgroundImage(latitude, longitude) {
  try {
        //const cityRus = await getCityForSearchBackgroundImage(latitude, longitude);
        // const city = await getTranslationForBackgroundImageCity(cityRus);
        const season = seasonForSearching();
        const dayTime = timeOfDayForSearching();
        const urlImage = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${imageKey}&tags=${season},nature&tag_mode=all&extras=url_h&format=json&nojsoncallback=1`;
        const response = await fetch(urlImage);
        const data = await response.json();
        const arrayOfPhoto = data.photos.photo.sort(() => Math.random() - 0.5);
        const currentPhoto = arrayOfPhoto[0].url_h;
        const errorMessage = data.error;
        if (errorMessage) {
          throw new Error(errorMessage);
        }
        return currentPhoto;
      } catch (errorMessage) {
        const currentPhoto = 'https://images.unsplash.com/photo-1506899686410-4670690fccef?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEwMzQzOX0';
        return currentPhoto;
    }
}

async function getTranslation(searchCity) {
    const toWhichTranslate = chooseRequestLanguage();
    const fromWhichTranslate = defineCurrentLanguage(searchCity);
    const urlTranslate = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${apiKeyTranslate}&text=${searchCity}&lang=${fromWhichTranslate}-${toWhichTranslate}`;
    const response = await fetch(urlTranslate);
    const data = await response.json();
    return data.text.toString();
}


export {
    getDataAboutWeather,
    getCurrentUserLocation,
    getCurrentUserCity,
    getFullNameOfCountry,
    getBackgroundImage,
    getTranslation,
    getTranslationForCountry,
    getCurrentOffSetTime,
};
