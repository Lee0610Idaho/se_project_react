import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
// import { defaultClothingItems } from "../../utils/constants";
import { useMemo, useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function Main({ weatherTemp, onSelectedCard, clothingItems }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const temp = weatherTemp?.temp?.[currentTemperatureUnit];
  const weatherType = useMemo(() => {
    if (temp === undefined) {
      return "OW!";
    }
    if (currentTemperatureUnit === "F") {
      if (temp >= 86) {
        return "hot";
      } else if (temp >= 66 && temp <= 85) {
        return "warm";
      } else if (temp <= 65) {
        return "cold";
      }
    } else if (currentTemperatureUnit === "C") {
      if (temp >= 30) {
        return "hot";
      } else if (temp >= 19 && temp <= 29) {
        return "warm";
      } else if (temp <= 18) {
        return "cold";
      }
    }
  }, [temp, currentTemperatureUnit]);

  const filteredCards = clothingItems.filter((clothingItem) => {
    return clothingItem.weather.toLowerCase() === weatherType;
  });

  return (
    <main>
      <WeatherCard
        day={false}
        type="sunny"
        weatherTemp={temp}
        currentTemperatureUnit={currentTemperatureUnit}
      />
      <section className="cards">
        <p className="cards__text">
          Today is {temp} °{currentTemperatureUnit} / You may want to wear:
        </p>
        <ul className="cards__list">
          {clothingItems
            .filter((item) => {
              return item.weather.toLowerCase() === weatherType;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onSelectedCard={onSelectedCard}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}
export default Main;
