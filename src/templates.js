import {
    createElement, renderTranslation, renderScaleOfTemperature,
} from './helpers';
import { weatherIcons } from './weatherIcons';

function getHtmlElementFieldForWeather(data) {
    const [mainDay, secondWeatherDay, thirdWeatherDay, fourthWeatherDay] = data.data;
    const mainWeatherIcon = weatherIcons[mainDay.weather.icon];
    const secondWeatherIcon = weatherIcons[secondWeatherDay.weather.icon];
    const thirdWeatherIcon = weatherIcons[thirdWeatherDay.weather.icon];
    const fourthWeatherIcon = weatherIcons[fourthWeatherDay.weather.icon];
    const selectedLanguage = renderTranslation();
    const scale = renderScaleOfTemperature();

    const template = `
                        <div class="forecast-column">
                        <div class="locality">
                            <div class="locality-city">
                                <span class="city"></span>
                                <span class="country"></span>
                            </div>
                            <div class="locality-date">
                                <span class="date"></span>
                                <span class="time"></span>
                            </div>
                        </div>
                    </div>
                    <div class="forecast-column">
                        <div class="temperature">${Math.round(mainDay.temp)}</div>
                        <div class="weather-description-wrapper">
                            <img class="weather-icon" src = "${mainWeatherIcon}" alt="#"></img>
                            <div class="detail-description">
                                <span class="description">${mainDay.weather.description}</span>
                                <span class="average-temp">${selectedLanguage.averageTemp}: ${Math.round(mainDay.app_min_temp)}°</span>
                                <span class="wind">${selectedLanguage.wind}: ${Math.round(mainDay.wind_spd)} ${scale}</span>
                                <span class="humidity">${selectedLanguage.humidity}: ${mainDay.rh}%</span>
                            </div>
                        </div>
                    </div>
                    <div class="forecast-column">
                    <div class="day-first">
                        <div class = "next-day1"></div>
                        <div class="next-weather">
                            <span class="next-temperature next1">${Math.round(secondWeatherDay.temp)}°</span>
                            <img class="weather-icon-add" src = "${secondWeatherIcon}" alt="#"></img>
                        </div>
                    </div>
                    <div class="day-second">
                        <div class = "next-day2"></div>
                        <div class="next-weather">
                            <span class="next-temperature next2">${Math.round(thirdWeatherDay.temp)}°</span>
                            <img class="weather-icon-add" src = "${thirdWeatherIcon}" alt="#"></img>
                        </div>
                    </div>
                    <div class="day-third">
                        <div class = "next-day3"></div>
                        <div class="next-weather">
                            <span class="next-temperature next3">${Math.round(fourthWeatherDay.temp)}°</span>
                            <img class="weather-icon-add" src = "${fourthWeatherIcon}" alt="#"></img>
                        </div>
                    </div>
                      `;
    const element = createElement('div', 'main__forecast');
    element.innerHTML = template;
    return element;
}

function getHtmlElementForLocation(data) {
    const selectedLanguage = renderTranslation();
    const template = `
            <span class = "latitude">${selectedLanguage.latitude}: ${data.lat.replace('.', '°')}'</span>
            <span class = "longitude">${selectedLanguage.longitude}: ${data.lon.replace('.', '°')}'</span>    
    `;
    const elementLocation = createElement('div', 'location');
    elementLocation.innerHTML = template;
    return elementLocation;
}

export { getHtmlElementFieldForWeather, getHtmlElementForLocation };
