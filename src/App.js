/*
  Random Quote App
  Created by shlendahh (c) 2023
  https://github.com/shlendakh/
  License: MIT (feel free to use)

  Using Quotable API by lukePeavey (c) 2019
  https://github.com/lukePeavey/quotable
*/

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, brands } from '@fortawesome/fontawesome-svg-core/import.macro';
import React from 'react';

async function getQuote() {
  const response = await fetch("https://api.quotable.io/random?maxLength=140");

  const { statusCode, statusMessage, ...data } = await response.json();

  if (response.ok) {
      const obj = {
        quote: '',
        author: ''
      };

      obj.quote = data.content;
      obj.author = data.author;
      return obj;
    } else {
      return {
          quote: "An error occured",
          author: "An error occured"
      };
    }
}

class Share extends React.Component {

  openInNewTab = (url) => {
    window.open(url, "noopener,noreferrer");
  }

  textToURL = (str) => {
      return (
      ''.concat(str)
      .replace(/[\s]/g, '%20')
      .replace(/[.]/g, '%2E')
      .replace(/[,]/g, '%2C')
      .replace(/[^a-zA-Z0-9%-]/g, '')
      )
  }

  render() {

    const twitterLink = "https://twitter.com/intent/tweet?hashtags=fcc&text=" + this.textToURL(this.props.text) + " ~" + this.textToURL(this.props.author);

    return (
      <div id="share">
        <a id="tweet-quote" href={twitterLink} onClick={() => this.openInNewTab(twitterLink)}>
          <FontAwesomeIcon icon={brands('twitter-square')} className="share-ico" />
        </a>
        <a id="facebook-quote" href="#top" rel="noopener,noreferrer" >
          <FontAwesomeIcon icon={brands('facebook-square')} className="share-ico" />
        </a>
        <a id="li-quote" href="#top" rel="noopener,noreferrer" >
          <FontAwesomeIcon icon={brands('linkedin')} className="share-ico" />
        </a>
    </div>
    );
  }
}

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      quote: '',
      author: ''
    };
  }

  componentDidMount = () => {
    getQuote().then((obj) => {
      this.setState({
        quote: obj.quote,
        author: obj.author
      });
    });
  }

  updateQuote = () => {
    getQuote().then((obj) => {
      this.setState({
        quote: obj.quote,
        author: obj.author
      });
    });
  }

  render() {
    return(
      <div>
        <div id="quote-box">
          <div id="quote">
            <p id="text"><FontAwesomeIcon icon={solid('quote-left')} className="quote-ico" /> {this.state.quote}</p>
            <p id="author">— {this.state.author}</p>
          </div>
          <div id="nav">
            <Share text={this.state.quote} author={this.state.author} />
            <div id="button-div">
              <button id="new-quote" onClick={this.updateQuote}>random quote</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default App;