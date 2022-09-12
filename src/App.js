import React, { useState } from 'react';
import Navbar from './components/Navbar';
import WeatherInfo from './components/WeatherInfo';

function App(props) {
  const [city, setCity] = useState(0);

 let lastURL = document.URL;

 window.addEventListener('hashchange', function (event) {
   Object.defineProperty(event, 'oldURL', {
     enumerable: true,
     configurable: true,
     value: lastURL,
   });
   Object.defineProperty(event, 'newURL', {
     enumerable: true,
     configurable: true,
     value: document.URL,
   });
   lastURL = document.URL;
   console.log(window.location.hash);
   setCity(window.location.hash)
   // let link = /.*#([a-zA-Z0-9\-\/\._]+)$/.exec(document.URL);
   // let id = link[1];
   // fetch(
   //   `http://api.openweathermap.org/data/2.5/weather?q=${id}&appid=${API_KEY}&units=metric`
   // )
   //   .then((res) => res.json())
   //   .then((data) => {
   //     setCity(data);
   //     // window.location.hash = id
   //   });
 });

  return (
    <>
      <Navbar />
      <WeatherInfo city={city} />
    </>
  );
}

export default App;
