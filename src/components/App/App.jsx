import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import { apiKey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import Profile from "../Profile/Profile";
import {
  getItems,
  addItem,
  deleteCard,
  addCardLike,
  removeCardLike,
  updateUser,
} from "../../utils/api";

import DeleteModal from "../DeleteModal/DeleteModal";

//import new route

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute"; // New import
import * as auth from "../../utils/auth";
import { setToken, getToken } from "../../utils/token";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    isDay: true,
    condition: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by this browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        getWeather(coords, apiKey)
          .then((data) => {
            const filteredData = filterWeatherData(data);
            setWeatherData(filteredData);
          })
          .catch(console.error);
      },
      (error) => {
        console.error("Error getting geolocation:", error);
      },
    );
    getItems()
      .then((data) => {
        setClothingItems(data.reverse());
      })
      .catch(console.error);
  }, []);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };

  const onAddItem = (inputValues, resetForm) => {
    const newCardData = {
      name: inputValues.name,
      imageUrl: inputValues.imageUrl,
      weather: inputValues.weatherType,
    };

    const token = localStorage.getItem("jwt");
    addItem(newCardData, token)
      .then((data) => {
        setClothingItems([data, ...clothingItems]);
        closeModal();
        resetForm();
      })
      .catch(console.error);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeModal = () => {
    setActiveModal("");
  };

  const handleDeleteClick = () => {
    setActiveModal("delete");
  };

  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUserData({ name: "", avatar: "", _id: "" });
  };

  const handleRegisterClick = () => {
    setActiveModal("register");
  };

  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const handleUpdateUser = ({ name, avatar }, resetForm) => {
    console.log("handleUpdateUser received", { name, avatar });
    const token = localStorage.getItem("jwt");
    console.log("handleUpdateUser called", { name, avatar, hasToken: !!token });

    if (!token) {
      console.error("No jwt found in localStorage; cannot update profile");
      return;
    }

    updateUser({ name, avatar: avatar || "" }, token)
      .then((updatedUser) => {
        console.log("updateUser success", updatedUser);
        setCurrentUserData(updatedUser);
        closeModal();
        if (typeof resetForm === "function") resetForm();
      })
      .catch((err) => {
        console.error("updateUser failed", err);
      });
  };

  const onDelete = () => {
    const token = localStorage.getItem("jwt");
    deleteCard(selectedCard._id, token)
      .then(() => {
        setClothingItems((previousItems) => {
          return previousItems.filter((item) => {
            return item._id !== selectedCard._id;
          });
        });
        closeModal();
      })
      .catch(console.error);
  };

  // TODO Create a function to pass the necessary data to the /signin request. If a log-in attempt is successful, check that the server gave access in its response and add it to localStorage:

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUserData, setCurrentUserData] = useState({
    name: "",
    avatar: "",
    _id: "",
  });

  const handleLogin = (values, resetForm) => {
    const { email, password } = values;

    if (!email || !password) return;

    auth
      .signin(email, password)
      .then((data) => {
        console.log("signin response:", data);
        if (data.token) {
          setToken(data.token);
          setIsLoggedIn(true);
          auth.checkToken(data.token).then((user) => {
            setCurrentUserData(user);
          });
          closeModal();
          if (typeof resetForm === "function") resetForm();
        }
      })
      .catch(console.error);
  };

  const handleRegister = (values, resetForm) => {
    console.log("handleRegister fired", values);
    auth
      .signup(values)
      .then(() => {
        handleLogin(
          { email: values.email, password: values.password },
          resetForm,
        );
      })
      .catch(console.error);
  };

  useEffect(() => {
    const jwt = getToken();
    if (!jwt) {
      return;
    }
    // TODO - handle JWT
    auth
      .checkToken(jwt)
      .then((user) => {
        setIsLoggedIn(true);
        setCurrentUserData(user);
      })
      .catch(console.error);
  }, []);

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    // Check if this card is not currently liked

    if (!token) return;

    const request = !isLiked ? addCardLike : removeCardLike;
    // !isLiked
    //   ? // if so, send a request to add the user's id to the card's likes array
    //     api
    //       // the first argument is the card's id
    //       .addCardLike(id, token)
    //       .then((updatedCard) => {
    //         setClothingItems((cards) =>
    //           cards.map((item) => (item._id === id ? updatedCard : item)),
    //         );
    //       })
    //       .catch((err) => console.log(err))
    //   : // if not, send a request to remove the user's id from the card's likes array
    //     api
    //       // the first argument is the card's id
    //       .removeCardLike(id, token)
    //       .then((updatedCard) => {
    //         setClothingItems((cards) =>
    //           cards.map((item) => (item._id === id ? updatedCard : item)),
    //         );
    //       })

    request(id, token)
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((item) => (item._id === id ? updatedCard : item)),
        );
      })
      .catch((err) => console.log(err));
  };

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <CurrentUserContext.Provider value={currentUserData}>
        <div className="app">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
              onLoginClick={handleLoginClick}
              onRegisterClick={handleRegisterClick}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                    isLoggedIn={isLoggedIn}
                  />
                }
              />

              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      handleAddClick={handleAddClick}
                      handleCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      onEditProfile={handleEditProfileClick}
                      onLogout={handleLogoutClick}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />
          </div>
          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onClose={closeModal}
            onAddItem={onAddItem}
          />
          <ItemModal
            isOpen={activeModal === "preview"}
            card={selectedCard}
            onClose={closeModal}
            handleDeleteClick={handleDeleteClick}
          />
          <DeleteModal
            isOpen={activeModal === "delete"}
            onClose={closeModal}
            onDelete={onDelete}
          />
          <RegisterModal
            isOpen={activeModal === "register"}
            onClose={closeModal}
            onRegister={handleRegister}
          />
          <LoginModal
            isOpen={activeModal === "login"}
            onClose={closeModal}
            onLogin={handleLogin}
          />
          <EditProfileModal
            isOpen={activeModal === "edit-profile"}
            onClose={closeModal}
            onUpdateUser={handleUpdateUser}
          />
        </div>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
