import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import { useEffect, useState } from 'react';
function App() {
   const [cards, setCards] = useState([]);
   useEffect(() => {
      const API_KEY = "nJXfAbJKRU6yP8wDDe0WF0H85H1iPu9I"
      const url = `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=20`
      fetch(url)
         .then(res => res.json())
         .then(content => {
            setCards(content.data)
         })
         .catch(err => console.log(err))
   }, [])

   return (
      <div>
         <Header />
         <Main cards={cards} />
      </div>
   );
}

export default App;
