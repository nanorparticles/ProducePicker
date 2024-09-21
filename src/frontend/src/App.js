// src/App.js
import React, { useState } from 'react';
import SearchBox from './components/SearchBox';
import { fetchIngredientData } from './services/apiService';

const App = () => {
  const [ingredientData, setIngredientData] = useState(null);

  const handleSearch = async (ingredient) => {
    const data = await fetchIngredientData(ingredient);
    setIngredientData(data);
  };

  return (
    <div>
      <h1>Produce Picker</h1>
      <SearchBox onSearch={handleSearch} />
      {ingredientData && (
        <div>
          <h2>{ingredientData.ingredient}</h2>
          <p>Calories: {ingredientData.calories}</p>
          <p>Vitamins: {ingredientData.vitamins.join(', ')}</p>
        </div>
      )}
    </div>
  );
};

export default App;
