from flask_openapi3 import Tag
from flask import jsonify, request

from app import app
from models import Session, Recipe

recipe_tag = Tag(name="Receita", description="Adição, visualização e remoção de receitas a base de dados.")

@app.get('/recipes', tags=[recipe_tag])
def get_recipes():
    session = Session()
    recipes = session.query(Recipe).all()
    output = []
    for recipe in recipes:
        recipe_data = {'id': recipe.id,
                       'title': recipe.title,
                       'ingredients': recipe.ingredients,
                       'instructions': recipe.instructions,
                       'image': recipe.image}
        output.append(recipe_data)
    return jsonify({'recipes': output})


@app.get('/recipes/<int:id>', tags=[recipe_tag])
def get_recipe():
    session = Session()
    recipe_id = request.view_args['id']
    recipe = session.query(Recipe).filter(Recipe.id == recipe_id).first()
    return jsonify({'title': recipe.title,
                    'ingredients': recipe.ingredients,
                    'instructions': recipe.instructions,
                    'image': recipe.image})


@app.post('/recipes', tags=[recipe_tag])
def create_recipe():
    data = request.json
    new_recipe = Recipe(title=data['title'],
                        ingredients=data['ingredients'],
                        instructions=data['instructions'])
    session = Session()
    session.add(new_recipe)
    session.commit()
    return jsonify({'message': 'Recipe created successfully'})


@app.put('/recipes/<int:id>', tags=[recipe_tag])
def update_recipe():
        recipe_id = request.view_args['id']
        session = Session()
        recipe = session.query(Recipe).filter(Recipe.id == recipe_id).first()
        data = request.json
        
        recipe.title = data.get('title') or recipe.title
        recipe.ingredients = data.get('ingredients') or recipe.ingredients
        recipe.instructions = data.get('instructions') or recipe.instructions
        
        session.commit()
        return jsonify({'message': 'Recipe updated successfully'})


@app.delete('/recipes/<int:id>', tags=[recipe_tag])
def delete_recipe():
    recipe_id = request.view_args['id']
    session = Session()
    recipe = session.query(Recipe).filter(Recipe.id == recipe_id).first()
    session.delete(recipe)
    session.commit()
    return jsonify({'message': 'Recipe deleted successfully'})
