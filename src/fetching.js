import axios from "axios";

const appID = 'cc7ea74c6101f3d5ba6ee2b6e186b5be';
const baseURL = 'https://api.openweathermap.org';
const API = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json'
    }
})

export const getCurrentFromCoordinates = (lat, long) => API.get(`/data/2.5/weather?lat=${lat}&lon=${long}&appid=${appID}&units=metric`).then(res => res.data);
export const getCities = (value) => API.get(`/geo/1.0/direct?q=${value}&limit=10&appid=${appID}`).then(res => res.data);
export const getForecastFromCoordinates = (lat, long) => API.get(`/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${appID}&units=metric`).then(res => res.data);

export const getForecast = (city) => API.get(`/data/2.5/forecast?q=${city}&appid=${appID}&units=metric`).then(res=>res.data);