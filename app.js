const BASE_URL = "https://api.openweathermap.org/data/2.5"
const API_KEY = "b517342078011693494fa46cc3b8dec9"

const searchInput = document.querySelector("header input")
const searchButton = document.querySelector("header button")
const locatinIcon = document.getElementById("locatin")

const getCurrentWather = async (cityName) => {
    const url = `${BASE_URL}/weather?q=${cityName}&appid=${API_KEY}&units=metric`
    const response = await fetch(url)
    const json = await response.json()
    return json
}

const searchHandler =async () =>{
    const cityName = searchInput.value 
    if(!cityName){
        alert("please enter city name")
    }
    else{
        const currentData =await getCurrentWather(cityName)
        console.log(currentData)
    }
    
}
searchButton.addEventListener("click", searchHandler)