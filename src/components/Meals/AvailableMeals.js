import React, { useEffect, useState } from "react";

import Card from '../UI/Card';
import MealItem from "./MealItem/MealItem";
import useFetch from '../../hooks/use-fetch';

import classes from './AvailableMeals.module.css';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [errMeal, isLoading, sendRequest] = useFetch();
  useEffect(() => {
    sendRequest({
      uri: 'https://learn-react-movies-905c4-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json' ,
      headers: {"Content-Type": "application/json"},
    },(rawData) => {
      let _temp = [];
      for(const mealId in rawData){
        _temp.push(<MealItem key={mealId} id={mealId} name={rawData[mealId].name} description={rawData[mealId].description} price={rawData[mealId].price}/>)
      };
      setMeals(_temp);
    });
  }, [sendRequest]);

  let ctx = meals;

  if(isLoading){
    ctx = <p>Is Loading...</p>
  };

  if(meals.length === 0){
    ctx = <p>Meal not found..</p>
  };

  if(errMeal){
    ctx = <p>{errMeal}</p>
  };  

  return <section className={classes.meals}>
      <Card>
          <ol>
              {ctx}
          </ol>
      </Card>
  </section>
};

export default AvailableMeals;