import { useEffect, useState, useCallback } from "react";

import "./App.css";
import { coordinates } from "../../utils/constants";
import { APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import { defaultClothingItems } from "../../utils/constants";
import { Route, Routes } from "react-router-dom";
import { addItems, getItems, deleteItems } from "../../utils/api";
import * as auth from "../../utils/auth";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });

  const handleRegistration = ({ email, password, name, avatar }) => {
    return auth
      .signUp({ email, password, name, avatar })
      .then(() => {
        handleLogin({ email, password });
      })
      .catch(console.error);
  };

  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return;
    }

    return auth
      .signIn({ email, password })
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        checkToken();
        console.log(data);
      })
      .catch(console.error);
  };

  // const history = useHistory();
  const [currentUser, setCurrentUser] = useState({
    email: "",
    name: "",
    avatar: "",
    _id: "",
  });
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [temp, setTemp] = useState(0);
  const [currentCity, setCurrentCity] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  //For Create Modal
  const handleCreateModal = () => {
    setActiveModal("create");
  };

  //Universal using Modal Type
  const handleOpenModal = (modalType) => {
    setActiveModal(modalType);
    // history.push(url);
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  const handleAddItemSubmit = (item) => {
    addItems(item)
      .then((newItem) => {
        setClothingItems([newItem, ...clothingItems]);
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
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header
              onCreateModal={() => handleOpenModal("create")}
              openRegisterModal={() => handleOpenModal("register", "/signup")}
              openLoginModal={() => handleOpenModal("login", "/signin")}
              city={currentCity}
              isLoggedIn={isLoggedIn}
              currentUser={currentUser}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherTemp={temp}
                    onSelectedCard={handleSelectedCard}
                    clothingItems={clothingItems}
                    // onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/signin"
                element={
                  <>
                    <Main
                      weatherTemp={temp}
                      onSelectedCard={handleSelectedCard}
                      clothingItems={clothingItems}
                    />
                    <LoginModal>
                      {" "}
                      handleCloseModal={() => handleCloseModal("/")}
                      handleLogin={handleLogin}
                    </LoginModal>
                  </>
                }
              />
              <Route
                path="/signup"
                element={
                  <>
                    <Main
                      weatherTemp={temp}
                      onSelectedCard={handleSelectedCard}
                      clothingItems={clothingItems}
                    />
                    <RegisterModal>
                      handleRegistration={handleRegistration}
                      handleCloseModal={() => handleCloseModal("/")}
                    </RegisterModal>
                  </>
                }
              />

              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      onSelectedCard={handleSelectedCard}
                      onCreateModal={() => handleOpenModal("create")}
                      clothingItems={clothingItems}
                      // currentUser={currentUser}
                      // onCardLike={handleCardLike}
                      // handleLogOut={handleLogOut}
                      openEditModal={() =>
                        handleOpenModal("update", "/profile/edit")
                      }
                    />
                  </ProtectedRoute>
                }
              />

              {/* <Route
                path="/profile"
                element={
                  <Profile
                    onSelectedCard={handleSelectedCard}
                    onCreateModal={() => handleOpenModal("create")}
                    clothingItems={clothingItems}
                  />
                }
              /> */}

              {/* <Route path="/" exact={true}>
                <Main
                  weatherTemp={temp}
                  onSelectedCard={handleSelectedCard}
                  clothingItems={clothingItems}
                  // onCardLike={handleCardLike}
                />
              </Route> */}
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
            currentUser={currentUser}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
