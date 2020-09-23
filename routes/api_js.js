//NPM Package dependencies
const cron = require("node-cron");
const axios = require("axios");
require("dotenv").config();

//Access quotes model
const db = require("../models");

//Retrieve API key and user info
const key = process.env.US_KEY;
const qKey = process.env.PB_KEY;

//Get quote
async function getQuote() {
  const config = {
    method: "get",
    url: `https://quotes.rest/qod?api_key=${qKey}`,
    headers: {}
  };

  const quoteData = await axios(config)
    .then(response => {
      //Gets relevant data from api response
      const quoteData = {
        quote: response.data.contents.quotes[0].quote,
        author: response.data.contents.quotes[0].author
      };
      return quoteData;
    })
    .catch(error => {
      console.log(error);
    });

  return quoteData;
}

//Get image set//extract image
async function getImage() {
  const config = {
    method: "get",
    url: `https://api.unsplash.com/collections/327760/photos?client_id=${key}`,
    headers: {}
  };

  //Gets image set
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

  return imgURL;
}

//Pair quote/image and send to database
async function mkQuoteItem() {
  //Get data from apis
  const { quote, author } = await getQuote();
  const imgURL = await getImage();

  //Create database entry
  const quoteItem = await db.Quote.create({
    quote_body: quote,
    quote_author: author,
    image_url: imgURL
  });

  return quoteItem;
}

//Get quote/image each day at midnight
cron.schedule("* 0 0 * * *", () => {
  mkQuoteItem();
});

//Gets initial quote/image on server launch
mkQuoteItem();
