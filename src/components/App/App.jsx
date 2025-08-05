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
import { CurrentUserContext } from "../../contexts/CurrentUserContext.jsx";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import { defaultClothingItems } from "../../utils/constants";
import { Route, Routes } from "react-router-dom";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";
import {
  addItems,
  getItems,
  deleteItem,
  addCardLike,
  removeCardLike,
} from "../../utils/api";
import {
  getCurrentUser,
  login,
  register,
  editProfileData,
} from "../../utils/auth.js";
import * as api from "../../utils/api.js";
import { jsx } from "react/jsx-runtime";

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggedInLoading, setIsLoggedInLoading] = useState(true);

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

  const openEditProfileModal = () => {
    setActiveModal("edit");
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

  const [currentUser, setUserData] = useState({
    name: "",
    email: "",
    avatar: "",
    _id: "",
  });

  const JWT_SECRET = "jwt";
  // with localStorage the key TOKEN_KEY.
  const setToken = (token) => localStorage.setItem(JWT_SECRET, token);
  // getToken retrieves and returns the value associated with TOKEN_KEY from localStorage.
  const getToken = () => {
    return localStorage.getItem(JWT_SECRET);
  };

  const removeToken = () => {
    return localStorage.removeItem(JWT_SECRET);
  };

  useEffect(() => {
    const jwt = getToken();
    if (!jwt) {
      console.error("No token found in local storage");
      return;
    }

    getCurrentUser(jwt)
      .then((data) => {
        setIsLoggedInLoading(false);
        setIsLoggedIn(true);
        setUserData(data);
      })
      .catch((error) => {
        console.error("Invalid token:", error);
        removeToken();
        setIsLoggedInLoading(false);
      });
  }, []);

  const handleAddItemSubmit = (item) => {
    console.log(item);
    const token = getToken();
    if (!token) {
      console.err("User not authorized");
      return;
    }
    setIsLoading(true);

    addItems(item, token)
      .then((newItem) => {
        setClothingItems((prevItems) => [newItem.data, ...prevItems]);
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

  function handleDeleteItem(id) {
    const token = getToken();
    if (!token) {
      console.error("Not authorized");
      return;
    }

    deleteItem(id, token)
      .then(() => {
        const updatedClothingItems = clothingItems.filter(
          (item) => item._id !== id
        );
        setClothingItems(updatedClothingItems);
        handleCloseModal();
      })
      .catch(console.error);
  }

  const handleRegistration = (email, password, name, avatar) => {
    console.log(email, password, name);
    register(email, password, name, avatar)
      .then(() => {
        //handleLogin(email, password);
        handleCloseModal();
      })
      .catch(console.error);
  };

  function getUserData(token) {
    // use the token from the local storage
    getCurrentUser(token)
      // fetch the data from the api
      .then((userData) => {
        // set the currentUser in this function, not on the login function
        setUserData({
          _id: userData._id,
          email: userData.email,
          name: userData.name,
          avatar: userData.avatar,
        });
        console.log(userData);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const handleLogin = (email, password) => {
    if (!email || !password) {
      console.log("incorrect info");
      return;
    }
    login(email, password)
      .then((data) => {
        if (data.token) {
          setToken(data.token);
          setIsLoggedIn(true);
          // setUserData(data.user);
          getUserData(data.token);
          // setIsLoggedInLoading(false);
        } else {
          console.error("No JWT token found.");
        }
        handleCloseModal();
      })
      .catch(console.error);
  };

  const handleEditProfile = (name, avatar) => {
    const token = getToken();

    if (!currentUser) {
      console.error("User not authorized to modify profile");
      return;
    }

    setIsLoading(true);
    editProfileData(name, avatar, token)
      .then((userData) => {
        setUserData({
          _id: currentUser._id,
          email: currentUser.email,
          name: userData.name,
          avatar: userData.avatar,
        });
        handleCloseModal();
      })
      .catch((err) => console.error("Error updating profile:", err));
  };

  const handleLogOut = () => {
    if (isLoggedIn) {
      removeToken();
      setIsLoggedIn(false);
      setUserData({});
      handleCloseModal();
    } else {
      console.err("Cannot be logged out");
    }
  };

  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        handleCloseModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  const handleCardLike = ({ id, isLiked }) => {
    const token = getToken();

    !isLiked
      ? // if so, send a request to add the user's id to the card's likes array

        // the first argument is the card's id
        addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
            getItems()
              .then((data) => {
                setClothingItems(data);
              })
              .catch(console.error);
          })
          .catch((err) => console.log(err))
      : // if not, send a request to remove the user's id from the card's likes array
        // the first argument is the card's id
        removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((card) => (card._id === id ? updatedCard : card))
            );
            getItems()
              .then((data) => {
                setClothingItems(data);
              })
              .catch(console.error);
          })
          .catch((err) => console.log(err));
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
                    onCardLike={handleCardLike}
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
                    openEditProfileModal={openEditProfileModal}
                    handleLogout={handleLogOut}
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
          <EditProfileModal
            activeModal={activeModal}
            onClose={handleCloseModal}
            isOpen={activeModal === "edit"}
            handleEditProfile={handleEditProfile}
            buttonText={isLoading ? "Saving..." : "Save changes"}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
