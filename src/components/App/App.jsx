import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import { coordinates } from "../../utils/constants";
import { APIkey } from "../../utils/constants";
import {
  addItems,
  getItems,
  deleteItems,
  addCardLike,
  removeCardLike,
} from "../../utils/api";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import ModalWithConfirm from "../ModalWithConfirm/ModalWithConfirm";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import { defaultClothingItems } from "../../utils/constants";

import * as auth from "../../utils/auth";

import { setToken, getToken, removeToken } from "../../utils/token";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });

  const [currentUser, setCurrentUser] = useState({
    email: "",
    name: "",
    avatar: "",
    _id: "",
  });
  const [clothingItems, setClothingItems] = useState();
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [temp, setTemp] = useState(0);
  const [currentCity, setCurrentCity] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedInLoading, setIsLoggedInLoading] = useState(true);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleSelectedCard = (card) => {
    console.log("this is my card" + card);
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

  const handleOpenDelete = () => {
    setActiveModal("confirm");
  };

  const openRegisterModal = (e) => {
    e.preventDefault();
    setActiveModal("register");
  };

  const openLoginModal = (e) => {
    e.preventDefault();
    setActiveModal("login");
  };

  const openEditProfileModal = () => {
    setActiveModal("edit");
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
    const jwt = getToken();

    if (!jwt) {
      return;
    }

    checkToken(jwt)
      .then((data) => {
        setIsLoggedInLoading(false);
        setIsLoggedIn(true);
        setUserData(data.user);
      })
      .catch(console.error);
    removeToken();
    setIsLoggedInLoading(false);
  }, []);

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

  const handleRegistration = (name, avatar, email, password) => {
    register(name, avatar, email, password)
      .then(() => {
        handleLogin(email, password);
        handleCloseModal();
      })
      .catch(console.error);
  };

  const handleLogin = (email, password) => {
    if (!email || !password) {
      return;
    }

    login(email, password)
      .then((data) => {
        if (data.token && data.user) {
          setToken(data.token);
          setIsLoggedIn(true);
          console.log(data.user);
          setCurrentUser(data.user);
          setIsLoggedInLoading(false);
        } else {
          console.error("No JWT token found.");
        }
        handleCloseModal();
      })
      .catch((err) => {
        console.err("Error logging user in:", err);
      })
      .finally(setIsLoggedInLoading(false));
  };

  const handleLogOut = () => {
    if (isLoggedIn) {
      removeToken();
      setIsLoggedIn(false);
      setCurrentUser({});
      handleCloseModal();
    } else {
      console.err("Log out failed");
    }
  };

  function handleConfirmDelete() {
    return deleteItems(selectedCard._id)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== selectedCard._id)
        );
        handleCloseModal();
      })
      .catch(console.error);
  }

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
              // isLoggedIn={isLoggedIn}
              // currentUser={currentUser}
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
