import { useEffect, useState } from "react";

import "./App.css";
import { coordinates } from "../../utils/constants";
import { APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import { defaultClothingItems } from "../../utils/constants";
import { Route, Routes } from "react-router-dom";
import { addItems, getItems, deleteItems } from "../../utils/api";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import * as auth from "../../utils/auth.js";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });

  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [temp, setTemp] = useState(0);
  const [currentCity, setCurrentCity] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleSelectedCard = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleCreateModal = () => {
    setActiveModal("create");
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  const openRegisterModal = (e) => {
    e.preventDefault();
    setActiveModal("register");
  };

  const openLoginModal = (e) => {
    e.preventDefault();
    setActiveModal("login");
  };

  const handleAddItemSubmit = (item) => {
    console.log(item);
    addItems(item)
      .then((newItem) => {
        setClothingItems((prevItems) => [newItem, ...prevItems]);
      })
      .then(() => {
        handleCloseModal();
      })
      .catch((error) => {
        console.error(`Failed to add item due to: ${error.status}`);
      })
      .finally(() => {
        console.log("added item");
      });
  };

  const handleDeleteItem = (_id) => {
    deleteItems(_id)
      .then(() => {
        setClothingItems((clothingItems) =>
          clothingItems.filter((clothingItem) => clothingItem._id !== _id)
        );
        handleCloseModal();
      })
      .catch((error) =>
        console.error(`Unable to delete item due to: ${error.status}`)
      );
  };

  const handleRegistration = (name, avatar, email, password) => {
    console.log("Registering");
    // register(name, avatar, email, password)
    //   .then(() => {
    //     handleLogin(email, password);
    //     handleCloseModal();
    //   })
    //   .catch(console.error);
  };

  const handleLogin = (email, password) => {
    console.log("Logging in");
    // if (!email || !password) {
    //   return;
    // }

    // login(email, password)
    //   .then((data) => {
    //     if (data.token && data.user) {
    //       setToken(data.token);
    //       setIsLoggedIn(true);
    //       console.log(data.user);
    //       setUserData(data.user);
    //       setIsLoggedInLoading(false);
    //     } else {
    //       console.error("No JWT token found.");
    //     }
    //     handleCloseModal();
    //   })
    //   .catch((err) => {
    //     console.err("Error logging user in:", err);
    //   })
    //   .finally(setIsLoggedInLoading(false));
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setTemp(filteredData);
        setCurrentCity(data.name);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header
            onCreateModal={handleCreateModal}
            city={currentCity}
            openRegisterModal={openRegisterModal}
            openLoginModal={openLoginModal}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherTemp={temp}
                  onSelectedCard={handleSelectedCard}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  onSelectedCard={handleSelectedCard}
                  onCreateModal={handleCreateModal}
                  clothingItems={clothingItems}
                />
              }
            />
          </Routes>

          <Footer />
        </div>
        <AddItemModal
          onClose={handleCloseModal}
          isOpen={activeModal === "create"}
          onAddItemModalSubmit={handleAddItemSubmit}
        />

        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          onClose={handleCloseModal}
          isOpen={activeModal === "preview"}
          deleteItem={handleDeleteItem}
        />

        <RegisterModal
          activeModal={activeModal}
          onClose={handleCloseModal}
          isOpen={activeModal === "register"}
          handleRegistration={handleRegistration}
          buttonText={isLoading ? "Saving..." : "Sign Up"}
          openSignInModal={openLoginModal}
        />
        <LoginModal
          activeModal={activeModal}
          onClose={handleCloseModal}
          isOpen={activeModal === "login"}
          handleLogin={handleLogin}
          buttonText={isLoading ? "Saving..." : "Log In"}
          openRegisterModal={openRegisterModal}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
