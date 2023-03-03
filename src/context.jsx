import React from 'react';
import axios from 'axios';
import { useContext, createContext,useEffect,useState } from 'react';

const AppContext = createContext();

const allMealsUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';



const getFavoritesFromLocalStorage = () => {
    let favorites = localStorage.getItem('favorites');
    if (favorites) {
      favorites = JSON.parse(localStorage.getItem('favorites'))
    }
    else {
      favorites = []
    }
    return favorites
  }


const AppProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [meals, setMeals] = useState([]);
    const [searchTerm, setSearchTerm] = useState('a');

    const [showModal, setShowModal] = useState(false);
    const [selectedMeal, setSelectedMeal] = useState(null);
    const [favorites, setFavorites] = useState(getFavoritesFromLocalStorage());




    const addToFavorites = (idMeal) => {
        const meal = meals.find((meal) => meal.idMeal === idMeal);
        const alreadyFavorite = favorites.find((meal) => meal.idMeal === idMeal);
        if (alreadyFavorite) return
        const updatedFavorites = [...favorites, meal]
        setFavorites(updatedFavorites)
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites))
    }

      const removeFromFavorites = (idMeal) => {
        const updatedFavorites = favorites.filter((meal) => meal.idMeal !== idMeal);
          setFavorites(updatedFavorites)
          localStorage.setItem("favorites", JSON.stringify(updatedFavorites))
      }

    const fetchRandomMeal = async () => {
        fetchMeals(randomMealUrl);
    }

    const selectMeal = (idMeal, favoriteMeal) => {
        let meal;

        if (favoriteMeal) {
            meal = favorites.find((meal) => meal.idMeal === idMeal);
        }else {
            meal = meals.find((meal) => meal.idMeal === idMeal);
          }
        setSelectedMeal(meal);
        setShowModal(true);
    }

    const fetchMeals = async (url) => {
        setLoading(true);
        const response = await axios(url);
        if (response.data.meals)
            setMeals(response.data.meals);
        else setMeals([]);
        // console.log(response.data.meals)
        setLoading(false);
    }

    const closeModal = () => {
        setShowModal(false);
    }

    useEffect(() => {
        // console.log(searchTerm);
        fetchMeals(`${allMealsUrl}${searchTerm}`);
    }, []);

    useEffect(() => {
        // console.log(searchTerm);
        if(!searchTerm) return
        fetchMeals(`${allMealsUrl}${searchTerm}`);
    }, [searchTerm]);

    return (
        <AppContext.Provider value={{meals,loading,setSearchTerm,fetchRandomMeal,showModal,selectMeal,selectedMeal,closeModal,favorites,addToFavorites,removeFromFavorites}}>
             {children}
          </AppContext.Provider>
      )
}

const useGlobalContext = () => {
    return useContext(AppContext);
}

export { AppContext, AppProvider, useGlobalContext };
