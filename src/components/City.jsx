import React, { useEffect, useState } from 'react';
import Fail from './Fail';

const API_KEY = '02aa797d46ba94205ffe0cae65811a3b';

function City({ id }) {
  const [city, setCity] = useState({});

  useEffect(() => {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${id}&appid=${API_KEY}&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        setCity(data);
      })
      .catch((err) => setCity('Fail'));
  }, [id]);

  return (
    <>
      {city === 'Fail' && <Fail />}
      {city !== 'Fail' && (
        <div className="card" style={{ width: '18rem' }}>
          <div className="card-body">
            <h5 className="card-title">{city.name}</h5>
            <h4>
              {/* Температура <span className="badge bg-secondary">{city.main.temp} °C</span> */}
            </h4>
            {/* <p className="card-text">Влажность{city.main.humidity}</p> */}
          </div>
        </div>
      )}
    </>
  );
}

export default City;
