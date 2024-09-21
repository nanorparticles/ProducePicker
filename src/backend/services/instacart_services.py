# src/backend/services/nutrition_service.py
import requests

app_id = 'b9674f60'
app_key = '68999e7d9286bcecc50095a46e625260'

def get_nutrition(ingredient):
    # Validate the ingredient input
    if not ingredient:
        raise ValueError("Ingredient must not be empty")

    api_url = f"https://api.nutritionix.com/v1_1/search/{ingredient}?appId={app_id}&appKey={app_key}"
    headers = {'Content-Type': 'application/json'}
    
    try:
        # Adding a timeout to avoid hanging requests
        response = requests.get(api_url, headers=headers, timeout=10)
        response.raise_for_status()  # This will raise an error for bad responses (4xx, 5xx)
        
        return response.json()
    
    except requests.exceptions.RequestException as e:
        # Handle any kind of request error (timeout, DNS issues, etc.)
        raise Exception(f"Error fetching data from Nutritionix API: {e}")

