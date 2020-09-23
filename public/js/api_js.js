//Access .env file
require("dotenv").config();

//Retrieve API key and user info
const key = process.env.US_KEY;

//Get quote
function getQuote() {
  const settings = {
    url: "https://quotes.rest/qod",
    method: "GET",
    timeout: 0
  };

  $.ajax(settings).done(response => {
    console.log(response);
  });
};

//Get image set//extract image
function getImage() {
  const settings = {
    url: `https://api.unsplash.com/collections/327760/photos?client_id=${key}`,
    method: "GET",
    timeout: 0
  };

  //Retrieves image collection
  $.ajax(settings).done(response => {
    //Selects image at random
    const imgId = Math.floor(Math.random() * response.length);

    //Retrieves image url
    const imgURL = response[imgId].urls.regular;

    return imgURL;
  });
  return imgURL;
}

//URL and quote should potentially be pared, for faster rendering and/or db retrieval depending on presentation
