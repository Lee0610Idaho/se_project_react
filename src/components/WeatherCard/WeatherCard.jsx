import "./WeatherCard.css";
import { weatherOptions } from "../../utils/constants";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

const WeatherCard = ({ day, type, weatherTemp = "" }) => {
  const imageSource = weatherOptions.filter((i) => {
    return i.day === day && i.type === type;
  });

  //const imageSourceUrl = imageSource[0].url;
  let imageSourceUrl;
  imageSourceUrl = imageSource[0];
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  return (
    <section className="weather-card" id="weather">
      <div className="weather-card__temp">
        {weatherTemp} °{currentTemperatureUnit}
      </div>
      {/* <img src={imageSourceUrl} className="weather-card__image" alt="weather" /> */}
      <img
        src={imageSourceUrl?.url}
        className="weather-card__image"
        alt="weather"
      />
    </section>
  );
};

export default WeatherCard;
