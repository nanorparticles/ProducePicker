from flask import Flask, jsonify, request
from ProducePicker.src.backend.services.instacart_services import get_nutrition
from flask_cors import CORS

app = Flask(__name__)


CORS(app)
# Sample data 
ingredients = [
    {"id": 1, "name": "Apple", "calories": 52, "location": "Nearby"},
    {"id": 2, "name": "Banana", "calories": 89, "location": "Nearby"}
]
# Default route
@app.route('/')
def home():
    return jsonify({"message": "Welcome to ProducePicker!"})

# API Endpoints
@app.route('/ingredients', methods=['GET'])
def get_ingredients():
    ingredient = request.args.get('ingredient')
    nutrition_info = get_nutrition(ingredient)
    return jsonify(nutrition_info)

@app.route('/ingredients', methods=['POST'])
def add_ingredient():
    new_ingredient = request.json
    ingredients.append(new_ingredient)
    return jsonify({"message": "Ingredient added successfully"}), 201

@app.route('/ingredients/<int:id>', methods=['DELETE'])
def delete_ingredient(id):
    global ingredients
    ingredients = [i for i in ingredients if i['id'] != id]
    return jsonify({"message": "Ingredient deleted"})

if __name__ == '__main__':
    app.run(debug=True)
