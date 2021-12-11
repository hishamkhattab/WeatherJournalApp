/* Global Variables */
let myData = {};
// api related variables
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = '524a9b4b2764750f03c78efa38d6d608';

// UI element
const zipCode = document.getElementById('zip');
const feelingText = document.getElementById('feelings');
const generateBtn = document.getElementById('generate');

// content to update
const content = document.getElementById('entryHolder');

// Create a new date instance dynamically with JS
let newDate = new Date();
let date = newDate.toLocaleString().split(',')[0];

/** add event listener to the generate btn */
generateBtn.addEventListener('click', e => {

    //get the values from UI
    const zip = zipCode.value.trim();
    const feeling = feelingText.value.trim();

    //calling getweather function
    getWeather(baseUrl, zip, apiKey)
        .then(tempreture => {
            myData = {
                tempreture,
                date,
                userInput: feeling
            };
            //removing error class 
            if ((zipCode.classList.contains('error'))) {
                zipCode.classList.remove('error');
            };
            // post request to the server
            postData('/addData', myData)
                .then(data => {
                    //calling updateUI function
                    updateUI('/getData');
                });
        })
        .catch(err => {
            catchError();
            console.log(err)
        });
});

/** fetch data from OpenWeatherMap API*/
const getWeather = async (url, zip, key) => {
    
    const base = `${url}?zip=${zip}&units=metric&appid=${key}`
    
    const response = await fetch(base);
    const data = await response.json();

    //return the tempreture in celesuis
    return data.main.temp;
};



/** post data to our server's endpoint */
const postData = async (url, data) => {
    
    const request = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });


    try {
        const data = await request.json();
        return data;
    } catch (err) {
        console.log('Error:', err);
    };
};


/** retrieve data from our server's endpoint and update UI */
const updateUI = async (url) => {
    
    const response = await fetch(url);

    try {

        const data = await response.json();
        
        const html =
            `
            <div id = "date">Date: ${data.date}</div>
            <div id = "temp">Temp: ${data.tempreture}&deg <span>C</span></div>
            <div id = "content">Feeling: ${data.userInput}</div>
            `;
        //updating UI
        content.innerHTML = html;
    } catch (err) {
        console.log('Error', err);
    };
};

const catchError = () => {
    if (!(zipCode.classList.contains('error'))) {
        zipCode.classList.add('error');
    } else {
        zipCode.classList.remove('error');
    }
};

