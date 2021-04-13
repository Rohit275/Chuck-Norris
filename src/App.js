import React, {useState, useEffect} from 'react';
import './App.css';

function App() {

  //constant variable for API URLs
  const categoryURL = "https://api.chucknorris.io/jokes/categories";
  const jokeURL = "https://api.chucknorris.io/jokes/random?category=";

  //useState declarations
  const [ category, setCategory ] = useState([]);
  const [ quote, setQuote ] = useState();
  const [ activeCategory, setActiveCategory] = useState('food');
  
  //useEffect
  useEffect(() => {
    fetchCategory();
    getData();
  }, [activeCategory]);

  //Fetching the category array list from categoryURL
  const fetchCategory = async () => {
    try {
      let chuckCategory = await fetch(categoryURL);
      let data = await chuckCategory.json();
      await setCategory(data);
      console.log(category);
    } catch (error) {
      console.warn(`we have an error: ${error}`);
    }
  }

  //Fetching the quotes(jokes) from the jokeURL
  const getData = async () => {
    try {
      let chuckJokes = await fetch(jokeURL+activeCategory);
      let data = await chuckJokes.json();
      setQuote(data.value);
    } catch (error) {
      console.warn(`we have an error: ${error}`);
    }
  }

  //Category selector which will change the current category to selected
  const categoryChange = (value) => {
    console.log(value);
    setActiveCategory(value);
    getData();
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Chuck Norris Jokes</h1>
        <h3>Select the category</h3>
        <div className="button-container">
          {category.map((item) => (
            <button onClick={() => categoryChange(item)}>
                {item}
            </button>
          ))}
        </div>
        <p>Selected category: {activeCategory}</p>
        <div className="box">
          <p>{quote}</p>
          <button onClick={getData}>New one!</button>
        </div>
      </header>
    </div>
  );
}

export default App;
