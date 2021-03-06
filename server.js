// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
const cors = require('cors');
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3000;
app.listen(port, () => console.log(`Server is running at port: ${port}.`));


//get request route
app.get('/getData', (req, res) => {
    res.send(projectData);
});


//post request route
app.post('/addData', (req, res) => {
    const { tempreture, date, userInput } = req.body;

    //adding data to projectData endpoint
    projectData = {
        tempreture,
        date,
        userInput
    };

    console.log('ProjectData: ', projectData);
    res.send(projectData);
})