// ======================= Constantes ===========================

const modal = document.querySelector('.modal-container')
const itemId = document.querySelector('#itemId')
const tbody = document.querySelector('tbody')
const sTitle = document.querySelector('#m-title')
const sIngredients = document.querySelector('#m-ingredients')
const sInstructions = document.querySelector('#m-instructions')
const btnSavae = document.querySelector('#btnSave')
const recipeListEl = document.getElementById("recipe-list");
const BASE_URL = 'http://localhost:5000'

// ======================= Logic =================================

function openModal(recipe = null) {
  modal.classList.add('active')

  modal.onclick = event => {
    if (event.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if(recipe) {
    itemId.value = recipe.id
    sTitle.value = recipe.title
    sIngredients.value = recipe.ingredients
    sInstructions.value = recipe.instructions
  }
}

function displayRecipes(recipes) {
  recipeListEl.innerHTML = "";
  recipes.forEach((recipe) => {
    const recipeItemEl = document.createElement("li");
    recipeItemEl.classList.add("recipe-item");
    
    // create image field
    recipeImageEl = document.createElement("img");
    recipeImageEl.alt = "recipe image";
    if(recipe.image) {
      recipeImageEl.src = `img/${recipe.image}`;  
    }

    // creates title field
    recipeTitleEl = document.createElement("h2");
    recipeTitleEl.innerText = recipe.title;
    // create description field
    recipeIngredientsEl = document.createElement("p");
    recipeIngredientsEl.innerHTML = `
        <strong>Ingredients:</strong> ${recipe.ingredients}
    `;

    recipeActionsEl = document.createElement("div")
    recipeActionsEl.innerHTML = `    
    <button onclick="editItem(${recipe.id})" class='btn btn-edit'>Editar</button>
    <button onclick="deleteItem(${recipe.id})" class='btn btn-delete'>Deletar</button>
    `

    recipeItemEl.appendChild(recipeImageEl);
    recipeItemEl.appendChild(recipeTitleEl);
    recipeItemEl.appendChild(recipeIngredientsEl);
    recipeItemEl.appendChild(recipeActionsEl);
    recipeListEl.appendChild(recipeItemEl);
  });
}

btnSave.onclick = async (event) => {
  if (sTitle.value == '' || sIngredients.value == '' || sInstructions.value == '') {
    return
  }
  event.preventDefault();

  let newRecipe = {
    'title': sTitle.value,
    'ingredients': sIngredients.value,
    'instructions': sInstructions.value
  }

  if(itemId.value) {
    newRecipe.id = itemId.value
    await editRecipe(newRecipe)
  } else {
    await createRecipe(newRecipe);
  }

  itemId.value = ''
  sTitle.value = ''
  sIngredients.value = ''
  sInstructions.value = ''

  modal.classList.remove('active')
  init()
}

async function deleteItem(recipeId) {
  const confirmed = confirm("Are you sure you want to delete this item?");
  if(confirmed) {
    await deleteRecipe(recipeId);
  }
  init();
}

async function editItem(recipeId) {
  let recipe = await getRecipe(recipeId)
  recipe.id = recipeId
  openModal(recipe);
}

// ================== Controllers ==========================

async function getRecipes() {
  let url = `${BASE_URL}/recipes`;
  const response = await fetch(url, {
    method: 'GET'
  });
  const data = await response.json();
  return data.recipes;
}

async function getRecipe(recipeId) {
  let url = `${BASE_URL}/recipes/${recipeId}`;
  const response = await fetch(url, {
    method: 'GET'
  });
  const data = await response.json();
  return data;
}

async function createRecipe(data) {
  let url = `${BASE_URL}/recipes`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  return response.json();
}

async function editRecipe(recipe) {
  let url = `${BASE_URL}/recipes/${recipe.id}`;
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(recipe)
  });

  return response.json();
}

async function deleteRecipe(recipeId) {
  let url = `${BASE_URL}/recipes/${recipeId}`;
  const response = await fetch(url, {
    method: 'DELETE'
  });

  return response.json();
}

async function init() {
  const recipes = await getRecipes();
  displayRecipes(recipes);
}

init();
