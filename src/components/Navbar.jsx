import React, { useEffect } from 'react';
import { useRef } from 'react';
import ReactDOM from 'react-dom/client';

function Navbar() {
  function setHash(e) {
    const id = e.target.value;
    window.location.hash = id;
  }

  useEffect(() => {
    // const hash = window.location.hash
    // console.log(citySelect)
    let select = ReactDOM.findDOMNode(citySelect.current);
    console.log(select)
  }, [])

  const citySelect = useRef(null);

  return (
    <>
      <nav className="navbar bg-light">
        <div className="container-fluid d-flex justify-content-center">
          <div style={{width: '11rem'}}>Пoгода по городам:</div> 
          <form className="d-flex" role="search">
            <select
              ref={citySelect}
              onChange={setHash}
              className="form-select"
              aria-label="Default select example"
            >
              <option value="Intro">Выберите город</option>
              <option value="Moscow,RU">Москва</option>
              <option value="Kursk,RU">Курск</option>
              <option value="Kazan,RU">Казань</option>
            </select>
          </form>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
