// src/services/apiService.js
export const fetchIngredientData = async (ingredient) => {
    const response = await fetch(`http://127.0.0.1:5000/ingredients?ingredient=${ingredient}`);
    const data = await response.json();
    return data;
  };
  