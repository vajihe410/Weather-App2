import getWeatherData from "./utils/httpRequest.js"
import { showModal, removeModal } from "./utils/modal.js"

const DAYS = [
    "Sunday",
    "Monday",
    "Tuseday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
]

const searchInput = document.querySelector("header input")
const searchButton = document.querySelector("header button")
const locatinIcon = document.getElementById("location")
const weatherContainer = document.getElementById("weather")
const forecastContainer = document.getElementById("forecast")
const modalButton = document.querySelector("#modal span")


const renderCurrentWeather = (currentData) => {
   
    const weatherJSX = `<div>
                            <h1>${currentData.name}, ${currentData.sys.country}</h1>
                            <div id="main">
                                <img src="https://openweathermap.org/img/w/${currentData.weather[0].icon}.png" alt="weather icon" />
                                <span>${currentData.weather[0].main}</span>
                                <span>${Math.round(currentData.main.temp)} °C</span>
                            </div>
                            <div id="info">
                                <p>Humidity:<span>${currentData.main.humidity}%</span></p>
                                <p>Wind Speed:<span>${currentData.wind.speed} m/s</span></p>
                            </div>
                        </div>`              
    weatherContainer.innerHTML = weatherJSX                    
}
   
const searchHandler =async () =>{
    const cityName = searchInput.value 
    if(!cityName){
        showModal("please enter city name")
        return
    }
    else{
        const currentData = await getWeatherData("current",cityName)
        renderCurrentWeather(currentData)
        const foreCastData = await getWeatherData("forecast",cityName)
        renderForecastWeather(foreCastData)
    }
}

const positionCallBack =async (position) => {
    const currentData = await getWeatherData("current", position.coords)
    renderCurrentWeather(currentData)
    const forecastData = await getWeatherData("forecast", position.coords)
    renderForecastWeather(forecastData)
}

const errorCallBack = (error) => {
    showModal(error.message)
}

const locationHandler = () => {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(positionCallBack, errorCallBack)
    }
    else{
        showModal("your browser does not support geolocation")
    }
}

const renderForecastWeather = (forecastDatas) => {
    forecastContainer.innerHTML=""
    forecastDatas = forecastDatas.list.filter((day) =>  day.dt_txt.endsWith("12:00:00"))
    forecastDatas.forEach(item => {
        const forecastJSX = `<div>
                                <img src="https://openweathermap.org/img/w/${item.weather[0].icon}.png" alt="weather icon" />
                                <h3>${DAYS[new Date(item.dt * 1000).getDay()]}</h3>
                                <p>${Math.round(item.main.temp)}°C</p>
                                <span>${item.weather[0].main}</span>
                            </div>`
                forecastContainer.innerHTML += forecastJSX            
    })
}

const initHandler =async () => {
    const currentData = await getWeatherData("current","tehran")
    renderCurrentWeather(currentData)
    const foreCastData = await getWeatherData("forecast","tehran")
    renderForecastWeather(foreCastData)
}
modalButton.addEventListener("click" ,removeModal)
searchButton.addEventListener("click", searchHandler)
locatinIcon.addEventListener("click",locationHandler)
document.addEventListener("DOMContentLoaded" ,initHandler)