const BASE_URL = "https://api.openweathermap.org/data/2.5"
const API_KEY = "b517342078011693494fa46cc3b8dec9"
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

const getCurrentWeatherByName = async (cityName) => {
    const url = `${BASE_URL}/weather?q=${cityName}&appid=${API_KEY}&units=metric`
    const response = await fetch(url)
    const json = await response.json()
    return json
}
const getCurrentWeatherByIcon = async (lat,lon) => {
    const url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    const response = await fetch(url)
    const json = await response.json()
    return json
}
const getForecastWeather = async (cityName) => {
    const url = `${BASE_URL}/forecast?q=${cityName}&appid=${API_KEY}&units=metric`
    const response = await fetch(url)
    const json = await response.json()
    return json
}
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
        alert("please enter city name")
    }
    else{
        const currentData = await getCurrentWeatherByName(cityName)
        renderCurrentWeather(currentData)
        const foreCastData = await getForecastWeather(cityName)
        renderForecastWeather(foreCastData)
    }
}

const positionCallBack =async (position) => {
    const {latitude, longitude} = position.coords
    console.log(latitude,longitude)
    const currentData = await getCurrentWeatherByIcon(latitude,longitude)
    renderCurrentWeather(currentData)
}

const errorCallBack = (error) => {
    alert(error.message)
}

const locationHandler = () => {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(positionCallBack, errorCallBack)
    }
    else{
        alert("your browser does not support geolocation")
    }
}

const renderForecastWeather = (forecastDatas) => {
    console.log(forecastDatas)
    forecastDatas = forecastDatas.list.filter((day) =>  day.dt_txt.endsWith("12:00:00"))
    console.log(forecastDatas)
    forecastDatas.forEach(item => {
        const forecastJSX = `<div>
                                <img src="https://openweathermap.org/img/w/${item.weather[0].icon}.png" alt="weather icon" />
                                <h3>${DAYS[new Date(item * 1000).getDay()]}}</h3>
                                <p>${Math.round(item.main.temp)}°C</p>
                                <span>${item.weather[0].main}</span>
                            </div>`
                forecastContainer.innerHTML += forecastJSX            
    })
}

searchButton.addEventListener("click", searchHandler)
locatinIcon.addEventListener("click",locationHandler)