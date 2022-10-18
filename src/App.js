import './App.css';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';


const colors = [
  { bg: "#51E5FF", text: "#000000" },
  { bg: "#440381", text: "#FFFFFF" },
  { bg: "#EC368D", text: "#FFFFFF" },
  { bg: "#FFA5A5", text: "#FFFFFF" },
  { bg: "#FFD6C0", text: "#000000" },
  {bg: "#3D1308", text: "#FFFFFF"},
  {bg: "#D3F6DB", text: "#000000"}];

function App() {

  const [color, setColor] = useState(colors[0].bg);
  const [textColor, setTextColor] = useState(colors[0].text);

    

  const handleColor = () => {
    const index = Math.floor(Math.random() * colors.length);

    setColor(colors[index].bg);
    setTextColor(colors[index].text);

  };

  const [fetchedQuoteInfo, fetchQuoteInfo] = useState({});

  const [hover, setHover] = useState(false);

  const quoteBoxStyles = { color: color, borderRadius: '5px', backgroundColor: "white", padding: '15px'};
  const textStyles = { margin: "10px" , textShadow: (textColor === '#FFFFFF')? '' : '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'};
  const buttonStyles = { backgroundColor: color, color: textColor, opacity: hover ? '70%' : '100%' , borderRadius: '5px', fontSize: '0.7em'};


  useEffect(() => {
    getQuote();
  }, [])

  const getQuote = () => {
    fetch("https://api.quotable.io/random")
      .then((response => response.json()))
      .then((data) => fetchQuoteInfo({
        text: data.content,
        author: data.author
      }));
  }
  

  document.body.style.backgroundColor = color;

  return (
    <div className="App">
      <div id='quote-box' style={quoteBoxStyles}>
        <p id='text' style={textStyles}>{fetchedQuoteInfo.text}</p>
        <p id='author' style = {{textShadow: (textColor === '#FFFFFF')? '' : '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'}}>-{fetchedQuoteInfo.author}</p>
        <Button
          style={buttonStyles}
          id='new-quote'
          onClick={() => { getQuote(); handleColor(); }}
          onMouseOver={(e) => {
            e.preventDefault();
            setHover(true);
          }}
          onMouseLeave={(e) => {
            e.preventDefault();
            setHover(false);
          }}>
          New Quote
        </Button>
        <a id='tweet-quote'  href="https://twitter.com/intent/tweet">Tweet</a>
      </div>
    </div>
  );
}

export default App;
