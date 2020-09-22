//Access .env file
require('dotenv').config()

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

//Get image set
function getImages() {
  const settings = {
    url: `https://pixabay.com/api/?key=${key}&image_type=photo&category=nature&editors_choice=true`,
    method: "GET",
    timeout: 0,
    headers: {
      Cookie: cookie
    }
  };

  $.ajax(settings).done(response => {
    console.log(response);
  });
}

//Function here or elsewhere to get random image from set-math.random * set.length, essentially
//URL and quote should potentially be pared, for faster rendering and/or db retrieval depending on presentation
