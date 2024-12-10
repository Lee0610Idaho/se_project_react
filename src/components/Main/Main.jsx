import WeatherCard from "../WeatherCard/WeatherCard";
import { defaultClothingItems } from "../../utils/constants";

function Main() {
  return (
    <main>
      <WeatherCard />
      <section className="cards">
        <p className="cards__text">
          Today is 75 &deg; F / You may want to wear:{" "}
        </p>
        {/* TODO - add the card */}
        <ul className="cards__list"></ul>
      </section>
    </main>
  );
}

export default Main;
