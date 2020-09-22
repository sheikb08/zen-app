//Access .env file
require("dotenv").config();

//Retrieve API key and user info
const key = process.env.PB_Key;
const cookie = process.env.PB_Cookie;

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
    url: `https://pixabay.com/api/?key=${key}&image_type=photo&category=nature&editors_choice=true`,
    method: "GET",
    timeout: 0,
    headers: {
      Cookie: cookie
    }
  };
  //Gets image set
  $.ajax(settings).done(response => {
    //Retrieving/returning an img url here let's us keep api info entirely in the backend
    //Picks an image at random from returned array
    const imgId = Math.floor(Math.random() * response.hits.length);
    //Retrieves image url
    const imgURL = response.hits[imgId].webformatURL;
    return imgURL;
  });
  return imgURL;
}

//URL and quote should potentially be pared, for faster rendering and/or db retrieval depending on presentation

//Exports
exports.getQuote = getQuote;
exports.getImage = getImage;
