import { useEffect, useState } from "react";

import classes from "./AvailableMeals.module.css";
import MealItem from "./MealsItem/MealItem";
import Card from "../UI/Card";

import useHttp from "../../hooks/use-http";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);

  const {
    isLoading: mealsIsLoading,
    error: mealsError,
    sendRequest: fetchMeals,
  } = useHttp();

  const applyOnFetchedMeals = (data) => {
    const mealsFetched = [];
    for (let key in data) {
      const meal = {
        id: key,
        name: data[key].name,
        description: data[key].description,
        price: data[key].price,
      };
      mealsFetched.push(meal);
    }

    setMeals(mealsFetched);
  };

  useEffect(() => {
    fetchMeals(
      {
        url: "https://react-http-9445e-default-rtdb.firebaseio.com/meals.json",
      },
      applyOnFetchedMeals
    );
  }, [fetchMeals]);

  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      mealName={meal.name}
      description={meal.description}
      price={meal.price}
    ></MealItem>
  ));

  let cardContent;

  if (mealsError) {
    cardContent = (
      <span className={classes.mealsError}>
        <p>{mealsError}</p>
      </span>
    );
  } else if (mealsIsLoading) {
    cardContent = (
      <span className={classes.mealsIsLoading}>
        <p>Loading...</p>
      </span>
    );
  } else {
    cardContent = <ul>{mealsList}</ul>;
  }

  return (
    <section className={classes.meals}>
      <Card>{cardContent}</Card>
    </section>
  );
};

export default AvailableMeals;
