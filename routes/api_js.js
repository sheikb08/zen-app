//Dependencies
const cron = require("node-cron");
const axios = require("axios");
require("dotenv").config();

//Retrieve API key and user info
const key = process.env.US_KEY;

//Get quote
function getQuote() {
  const config = {
    method: "get",
    url: "https://quotes.rest/qod",
    headers: {}
  };

  axios(config)
    .then(response => {
      console.log(JSON.stringify(response.data));
    })
    .catch(error => {
      console.log(error);
    });
}

//Get image set//extract image
async function getImage() {
  const config = {
    method: "get",
    url: `https://api.unsplash.com/collections/327760/photos?client_id=${key}`,
    headers: {}
  };

  //Sets const to wait for response, gets image set
  const imgURL = await axios(config)
    .then(response => {
      //Selects image at random
      const imgId = Math.floor(Math.random() * response.data.length);

      //Retrieves image url
      return response.data[imgId].urls.regular;
    })
    .catch(error => {
      console.log(error);
    });

  console.log(imgURL);
  return imgURL;
}

//Below can be uncommented for testing
//getQuote();
getImage();
