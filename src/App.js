import './App.css';
import React from 'react';
import axios from 'axios';

function App() {

  const [data, setData] = React.useState({})
  const [location, setLocation] = React.useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=3c5fcefc3cbc02a45684c5afd104490e`

  const searchLocation = (event) => {
    if(event.key === 'Enter' && location) {
      setLocation('')
      axios.get(url).then(res => {
        setData(res.data)
      }).catch(err => alert('cannot find location'))
    }else {
      return
    }
  }

  return (
    <div className="app">
      <div className='search-location'>
        <input type='text' className='input' placeholder='search location...' onChange={(e) => setLocation(e.target.value)} value={location} onKeyUp={searchLocation} />
      </div>
      <main>
        <div className='top'>
          <span>{data.name}</span>
          {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null }
          {data.weather ? <div className='main'>{data.weather[0].main}</div> : null}
        </div>
        {data.name !== undefined &&
              <div className='bottom'>
                <div className='feels'>
                  {data.main ? <span className='bold'>{data.main.feels_like.toFixed()}°F</span> : null }
                  <h5>Feels Like</h5>
                </div>
                <div className='humidity'>
                  {data.main ? <span className='bold'>{data.main.humidity.toFixed()}%</span> : null }
                  <h5>Humidity</h5>
                </div>
                <div className='wind-speed'>
                  {data.wind ? <span className='bold'>{data.wind.speed.toFixed()} MPH</span> : null }
                  <h5>Wind Speed</h5>
                </div>
              </div> }
      </main>
    </div>
  );
}

export default App;
