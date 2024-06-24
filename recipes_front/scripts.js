let recipesData = [
  {
    "title": "Pão de Queijo",
    "ingredients": "500g de polvilho doce, 250g de queijo minas padrão ralado, 2 ovos, 1 xícara de leite, 1/2 xícara de óleo, sal a gosto",
    "instructions": "Misture todos os ingredientes em uma tigela até obter uma massa homogênea. Modele os pãezinhos e leve ao forno preaquecido a 180°C por cerca de 25 minutos ou até dourar.",
    "image": "pao_de_queijo.jpg"
  },
  {
    "title": "Risoto de Funghi",
    "ingredients": "1 xícara de arroz arbóreo, 100g de cogumelos funghi secos, 1 cebola picada, 2 dentes de alho picados, 1/2 xícara de vinho branco seco, 1,5 litros de caldo de legumes, 2 colheres de sopa de manteiga, 1/2 xícara de queijo parmesão ralado, sal e pimenta a gosto",
    "instructions": "Hidrate os cogumelos em água morna por 30 minutos. Refogue a cebola e o alho na manteiga até dourarem. Adicione o arroz e refogue por mais alguns minutos. Acrescente o vinho branco e mexa até evaporar. Adicione os cogumelos escorridos e picados. Aos poucos, vá adicionando o caldo de legumes, mexendo sempre até que o arroz esteja al dente e cremoso. Finalize com o queijo parmesão, ajuste o sal e a pimenta e sirva.",
    "image": "risoto_de_funghi.jpg"
  },
  {
    "title": "Salada de Quinoa",
    "ingredients": "1 xícara de quinoa cozida, 1 pepino em cubos, 1 tomate em cubos, 1 pimentão vermelho em cubos, 1/2 cebola roxa picada, suco de 1 limão, 2 colheres de sopa de azeite de oliva, sal e pimenta-do-reino a gosto, folhas de hortelã a gosto",
    "instructions": "Em uma tigela, misture todos os ingredientes. Tempere com suco de limão, azeite, sal, pimenta e folhas de hortelã picadas. Sirva gelada.",
    "image": "salada_de_quinoa.jpg"
  }
]

// ======================= Constantes ===========================

const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sTitle = document.querySelector('#m-title')
const sIngredients = document.querySelector('#m-ingredients')
const sInstructions = document.querySelector('#m-instructions')
const btnSavae = document.querySelector('#btnSave')
const recipeListEl = document.getElementById("recipe-list");

// ======================= Logic =================================

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  // if (edit) {
  //   sTitle.value = itens[index].title
  //   sIngredients.value = itens[index].ingredients
  //   sInstructions.value = itens[index].instructions
  //   id = index
  // } else {
  //   sTitle.value = ''
  //   sIngredients.value = ''
  //   sInstructions.value = ''
  // }
  sTitle.value = ''
  sIngredients.value = ''
  sInstructions.value = ''
}

function displayRecipes(recipes) {
  recipeListEl.innerHTML = "";
  recipes.forEach((recipe, index) => {
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
    <button onclick="editItem(${index})" class='btn btn-edit'>Editar</button>
    <button onclick="deleteItem(${index})" class='btn btn-delete'>Deletar</button>
    `

    recipeItemEl.appendChild(recipeImageEl);
    recipeItemEl.appendChild(recipeTitleEl);
    recipeItemEl.appendChild(recipeIngredientsEl);
    recipeItemEl.appendChild(recipeActionsEl);
    recipeListEl.appendChild(recipeItemEl);
  });
}

btnSave.onclick = e => {
  if (sTitle.value == '' || sIngredients.value == '' || sInstructions.value == '') {
    return
  }

  e.preventDefault();

  // if (id !== undefined) {
  //   itens[id].title = sTitle.value
  //   itens[id].ingredients = sIngredients.value
  //   itens[id].instructions = sInstructions.value
  // } else {
  //   itens.push({
  //     'title': sTitle.value,
  //     'ingredients': sIngredients.value,
  //     'instructions': sInstructions.value
  //   })
  // }

  let newRecipe = {
    'title': sTitle.value,
    'ingredients': sIngredients.value,
    'instructions': sInstructions.value
  }

  createRecipe(newRecipe);

  modal.classList.remove('active')
  init()
  id = undefined
}

function deleteItem(index) {
  deleteRecipe(index)
  console.log(`deleteRecipe: ${recipesData}`)
  init()
  console.log(`init: ${recipesData}`)
}


// ================== Controllers ==========================

async function getRecipes() {
  // const response = await fetch(
  //   `http://localhost:5000/recipes`
  // );

  // const data = await response.json();

  // return data.recipes;
  return recipesData; // TODO: remove this and back to the backend call
}

function createRecipe(data) {
  // TODO: change to delete on backend

  recipesData.push(data);
}

function deleteRecipe(index) {
  // TODO: change to delete on backend
  
  console.log(index)

  recipesData.splice(index, 1);
}

async function init() {
  const recipes = await getRecipes();
  displayRecipes(recipes);
}

init();
