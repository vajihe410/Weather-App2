import { showModal } from "./modal.js"

const BASE_URL = "https://api.openweathermap.org/data/2.5"
const API_KEY = "b517342078011693494fa46cc3b8dec9"

const getWeatherData = async (type,data) => {
    let url = null
    switch (type) {
        case "current":
            if(typeof data === "string"){
                url = `${BASE_URL}/weather?q=${data}&appid=${API_KEY}&units=metric`;
                
            }
            else{
                url = `${BASE_URL}/weather?lat=${data.latitude}&lon=${data.longitude}&appid=${API_KEY}&units=metric`;
            }
            break;
        case "forecast":
            if(typeof data === "string"){
                url = `${BASE_URL}/forecast?q=${data}&appid=${API_KEY}&units=metric`;
            }
            else{
                url = `${BASE_URL}/forecast?lat=${data.latitude}&lon=${data.longitude}&appid=${API_KEY}&units=metric`;
            }
        break;
    
        default:
            url = `${BASE_URL}/weather?q=tehran&appid=${API_KEY}&units=metric`;
            break;
    }
    try{
        const response = await fetch(url)
        const json = await response.json()
        if(+json.code === 200){
            return json
        }
    
    }
    catch(error){
        showModal("something wrong")
    }
}

export default getWeatherData;