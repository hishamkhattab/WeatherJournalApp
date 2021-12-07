/* Global Variables */
let myData = {};
// api related variables
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = '524a9b4b2764750f03c78efa38d6d608';

// UI element
const zipCode = document.getElementById('zip');
const feelingText = document.getElementById('feeling');
const generateBtn = document.getElementById('generate');

// content to update
const content = document.getElementById('entryHolder');

// Create a new date instance dynamically with JS
let newDate = new Date();
let date = newDate.toLocaleString().split(',')[0];


/** fetch data from OpenWeatherMap API*/
const getWeather = async (url, zip, key) => {
    
    const base = `${url}?zip=${zip}&units=metric&appid=${key}`
    
    const response = await fetch(base);
    const data = await response.json();

    //return the tempreture in celesuis
    console.log(data);
    return data.main.temp;
};

getWeather(baseUrl,'14202', apiKey);