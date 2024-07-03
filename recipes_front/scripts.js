// ======================= Constantes ===========================

const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sTitle = document.querySelector('#m-title')
const sIngredients = document.querySelector('#m-ingredients')
const sInstructions = document.querySelector('#m-instructions')
const btnSavae = document.querySelector('#btnSave')
const recipeListEl = document.getElementById("recipe-list");
const BASE_URL = 'http://localhost:5000'

// ======================= Logic =================================

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  sTitle.value = ''
  sIngredients.value = ''
  sInstructions.value = ''
}

function displayRecipes(recipes) {
  recipeListEl.innerHTML = "";
  recipes.forEach((recipe) => {
    const recipeItemEl = document.createElement("li");
    recipeItemEl.classList.add("recipe-item");
    // create image field
    recipeImageEl = document.createElement("img");
    recipeImageEl.src = `img/${recipe.image}`;
    recipeImageEl.alt = "recipe image";
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
  await createRecipe(newRecipe);

  modal.classList.remove('active')
  init()
}

async function deleteItem(recipeId) {
  await deleteRecipe(recipeId);
  init();
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

async function createRecipe(data) {
  let url = `${BASE_URL}/recipes`;

  console.log(JSON.stringify(data))

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
