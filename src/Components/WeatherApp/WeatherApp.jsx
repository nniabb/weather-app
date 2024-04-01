import React, { useState, useEffect } from "react";
import './WeatherApp.css'
import search_icon from '../Assets/search.png';
import clear_icon from '../Assets/clear.png';
import cloud_icon from '../Assets/cloud.png';
import drizzle_icon from '../Assets/drizzle.png';
import snow_icon from '../Assets/snow.png';
import rain_icon from '../Assets/rain.png';
import humidity_icon from '../Assets/humidity.png';
import wind_icon from '../Assets/wind.png'

const WeatherApp = () => {
    let api_key = "8c208162768efd17bff73e6231dbf24f";
    const [wicon, setWicon] = useState(cloud_icon);
    const [temperature, setTemperature] = useState("");
    const [location, setLocation] = useState("");
    const [humidity, setHumidity] = useState("");
    const [windSpeed, setWindSpeed] = useState("");

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${api_key}`;
            const response = await fetch(url);
            const data = await response.json();
            setTemperature(Math.floor(data.main.temp) + "°C");
            setLocation(data.name);
            setHumidity(data.main.humidity + "%");
            setWindSpeed(Math.floor(data.wind.speed) + " km/h");
            const weatherIcon = getWeatherIcon(data.weather[0].icon);
            setWicon(weatherIcon);
        });
    }, []);

    const getWeatherIcon = (iconCode) => {
        switch (iconCode) {
            case "01d":
            case "01n":
                return clear_icon;
            case "02d":
            case "02n":
                return cloud_icon;
            case "03d":
            case "03n":
            case "04d":
            case "04n":
                return drizzle_icon;
            case "09d":
            case "09n":
            case "10d":
            case "10n":
                return rain_icon;
            case "13d":
            case "13n":
                return snow_icon;
            default:
                return clear_icon;
        }
    };

    const search = async () => {
        const element = document.getElementsByClassName("cityName");
        if (element[0].value === "") {
            return 0;
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

        let response = await fetch(url);
        let data = await response.json();
        setHumidity(data.main.humidity + "%");
        setWindSpeed(Math.floor(data.wind.speed) + " km/h");
        setTemperature(Math.floor(data.main.temp) + "°C");
        setLocation(data.name);

        const weatherIcon = getWeatherIcon(data.weather[0].icon);
        setWicon(weatherIcon);
    };

    return (
        <div className="container">
            <div className="top-bar">
                <input type="text" className="cityName" placeholder="Search"></input>
                <div className="search-icon" onClick={() => { search() }}>
                    <img src={search_icon} alt="search"></img>
                </div>
            </div>
            <div className="weather-img">
                <img className="cl" src={wicon} alt="weather"></img>
            </div>
            <div className="weather-temp">{temperature}</div>
            <div className="weather-location">{location}</div>
            <div className="data-cont">
                <div className="element">
                    <img src={humidity_icon} className="icon" alt="humidity"></img>
                    <div className="data">
                        <div className="humidity-percent">{humidity}</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src={wind_icon} className="icon" alt="wind"></img>
                    <div className="data">
                        <div className="wind-inkm">{windSpeed}</div>
                        <div className="text">Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeatherApp;
