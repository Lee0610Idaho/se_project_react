import "./WeatherCard.css";
import sunny from "../../assets/day/fog.svg";
import { weatherOptions } from "../../utils/constants";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

const WeatherCard = ({ day, type, weatherTemp = "" }) => {
  const imageSource = weatherOptions.filter((i) => {
    return i.day === day && i.type === type;
  });

  const imageSourceUrl = imageSource[0].url;
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  return (
    <section className="weather" id="weather">
      <div className="weather_info">
        {weatherTemp} °{currentTemperatureUnit}
      </div>
      <img src={imageSourceUrl} className="weather_image" alt="weather" />
    </section>
  );
};

export default WeatherCard;
