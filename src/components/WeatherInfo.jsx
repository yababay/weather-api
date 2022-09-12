import City from './City';
import Intro from './Intro';

function WeatherInfo({ city }) {
  const hash = city.length > 0 ? city.substring(1) : 'Intro';
  return <div>{(hash === 'Intro' && <Intro />) || <City id={hash} />}</div>;
}

export default WeatherInfo;
