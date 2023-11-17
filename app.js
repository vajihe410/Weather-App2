const BASE_URL = "https://api.openweathermap.org/data/2.5"
const API_KEY = "b517342078011693494fa46cc3b8dec9"

const searchInput = document.querySelector("header input")
const searchButton = document.querySelector("header button")
const locatinIcon = document.getElementById("location")
const weatherContainer = document.getElementById("weather")

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

const renderCurrentWeather = (currentData) => {
    console.log(currentData)
  
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
        const currentData =await getCurrentWeatherByName(cityName)
        renderCurrentWeather(currentData)
    }
}
const positionCallBack =async (position) => {
    const {latitude, longitude} = position.coords
    console.log(latitude,longitude)
    const currentData = await getCurrentWeatherByIcon(latitude,longitude)
    renderCurrentWeather(currentData)
}
const errorCallBack = (error) => {
    console.log(error.message)
}
const locationHandler = () => {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(positionCallBack, errorCallBack)
    }
    else{
        alert("your browser does not support geolocation")
    }
}

searchButton.addEventListener("click", searchHandler)
locatinIcon.addEventListener("click",locationHandler)