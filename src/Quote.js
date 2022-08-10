import './Quote.css';
import React from 'react';
const axios = require('axios')

function Quote() {
  const [quote, setQuote] = React.useState({
    quoteText: "",
    quoteAuthor: ""
  })
  const [newQuote, setnewQuote] = React.useState(false)


  React.useEffect(() => {
    const config = {
      method: 'get',
      url: 'https://goquotes-api.herokuapp.com/api/v1/random?count=1',
      headers: {}
    };
    function getRandomColor() {
      const colors = [
        "#009999",
        "#4C9900",
        "#FFA500",
        "006666",
        "#660066",
        "#660033",
        "#990099",
        "#990000"]
      const colorIndex = Math.floor(Math.random() * colors.length)
      return colors[colorIndex]
    }
    async function fetchQuote() {
      try {
        const response = await axios(config)
        setQuote({
          quoteText: response.data.quotes[0].text,
          quoteAuthor: response.data.quotes[0].author
        })
        const color = getRandomColor()
        //Styling the background
        document.body.style.backgroundColor = color
        //Adding the animations
        document.getElementById("quote-text").animate([{ opacity: 0 }, { opacity: 1 }], { duration: 1500 })
        document.getElementById("author-text").animate([{ opacity: 0 }, { opacity: 1 }], { duration: 1500 })
        //Styling the quote text and author
        document.getElementById("quote-text").style.color = color
        document.getElementById("author-text").style.color = color
        //Styling the buttons
        document.getElementById("tweet-button").style.backgroundColor = color
        document.getElementById("facebook-button").style.backgroundColor = color
        document.getElementById("new-quote-button").style.backgroundColor = color
      } catch (error) {
        console.log(error)
      }
    }
    fetchQuote()
  }, [newQuote])

  function getNewQuote() {
    setnewQuote(prev => !prev)
  }

  return (
    <div className="quote">
      <figure className="text-center">
        <blockquote className="blockquote" id="quote-text">
          <p><i className="bi bi-quote double-quotes"></i>{quote.quoteText}</p>
        </blockquote>
        <figcaption className="blockquote-footer text-end" id="author-text">
          <cite title="Source Title">{quote.quoteAuthor}</cite>
        </figcaption>
      </figure>
      <div className='buttons-container'>
        <a href={
          `https://twitter.com/intent/tweet?text=${encodeURIComponent('"' + quote.quoteText + '"-' + quote.quoteAuthor)}`
        } target="_blank" rel='noreferrer'>
          <button className='tweet-button background-class' id="tweet-button">
            <i className="bi bi-twitter"></i>
          </button>
        </a>
        <button className='facebook-button background-class' id='facebook-button'><i className="bi bi-facebook"></i></button>
        <button className='new-quote-button background-class' id="new-quote-button" onClick={getNewQuote}>New quote</button>
      </div>
    </div>
  );
}

export default Quote;
