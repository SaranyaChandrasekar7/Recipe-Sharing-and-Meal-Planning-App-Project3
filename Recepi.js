const recipeSearchInput = document.getElementById("recipe-search");
const searchButton = document.getElementById("searchbtn");
const recipesContainer = document.getElementById("recipes-container");
const mealPlanContainer = document.getElementById("meal-plan");
const shoppingListContainer = document.getElementById("shopping-list-items");
const apiKey = "70648861c3bb474cb0f2ee89341dc3d4";

const API_URL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}`;

async function fetchRecipes(query) {
  try {
    const response = await fetch(`${API_URL}&query=${query}`);
    const data = await response.json();
    displayRecipes(data.results);
  } catch (error) {
    console.log("Fetching the Recipes:", error);
  }
}

function displayRecipes(recipes) {
  recipesContainer.innerHTML = '';

  recipes.forEach(recipe => {
    const recipeCard = document.createElement("div");
    recipeCard.classList.add("recipe");

    const recipeImage = document.createElement("img");
    recipeImage.src = `https://spoonacular.com/recipeImages/${recipe.id}-312x231.jpg`;
    recipeImage.alt = recipe.title;

    const recipeTitle = document.createElement("h3");
    recipeTitle.textContent = recipe.title;

    const addToMealPlanButton = document.createElement('button');
    addToMealPlanButton.textContent = 'Add to Meal Plan';
    addToMealPlanButton.onclick = () => addToMealPlan(recipe);

    const addToShoppingListButton = document.createElement('button');
    addToShoppingListButton.textContent = 'Add to Shopping List';
    addToShoppingListButton.onclick = () => addToShoppingList(recipe);

    recipeCard.appendChild(recipeImage);
    recipeCard.appendChild(recipeTitle);
    recipeCard.appendChild(addToMealPlanButton);
    recipeCard.appendChild(addToShoppingListButton);

   
    recipesContainer.appendChild(recipeCard);
  });
}

function addToMealPlan(recipe) {
  const mealItem = document.createElement("div");
  mealItem.classList.add("meal-item");
  mealItem.setAttribute("data-id", recipe.id);

  const mealImage = document.createElement("img");
  mealImage.src = `https://spoonacular.com/recipeImages/${recipe.id}-312x231.jpg`;
  mealImage.alt = recipe.title;

  const mealTitle = document.createElement('h4');
  mealTitle.textContent = recipe.title;

  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  removeButton.onclick = () => removeFromMealPlan(mealItem); 
  mealItem.appendChild(mealImage);
  mealItem.appendChild(mealTitle);
  mealItem.appendChild(removeButton);
  mealPlanContainer.appendChild(mealItem);
}

function removeFromMealPlan(mealItem) {
  
  mealPlanContainer.removeChild(mealItem);
}

function addToShoppingList(recipe) {
  const shoppingItem = document.createElement('li');
  shoppingItem.textContent = recipe.title;
  shoppingItem.setAttribute("data-id", recipe.id);

  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  removeButton.onclick = () => removeFromShoppingList(shoppingItem); 

  shoppingItem.appendChild(removeButton);
  shoppingListContainer.appendChild(shoppingItem);
}

function removeFromShoppingList(shoppingItem) {
  
  shoppingListContainer.removeChild(shoppingItem);
}

searchButton.addEventListener("click", () => {
  const query = recipeSearchInput.value;

  if (query) {
    fetchRecipes(query);
  }
});





 
 var popupOverlay = document.querySelector(".popup-overlay");
 var popupBox = document.querySelector(".popup-box");
 var loginPopupButton = document.getElementById("login-popup-button");

 loginPopupButton.addEventListener("click", function () {
     popupOverlay.style.display = "block";
     popupBox.style.display = "block";
 });


 popupOverlay.addEventListener("click", function () {
     popupOverlay.style.display = "none";
     popupBox.style.display = "none";
 });

 
 document.getElementById("submitBtn").addEventListener("click", function () {
     const UserName = document.getElementById("UserName").value;
     const email = document.getElementById("email").value;
     const password = document.getElementById("password").value;

     if (UserName && email && password) {
         const loginData = JSON.parse(localStorage.getItem('loginData')) || [];
         loginData.push({ UserName, email, password });
         localStorage.setItem('loginData', JSON.stringify(loginData));

         
         document.getElementById("UserName").value = '';
         document.getElementById("email").value = '';
         document.getElementById('password').value = '';
         alert('Successfully Logged In');
    
         popupOverlay.style.display = "none";
         popupBox.style.display = "none";
     } else {
         alert("Please fill all fields");
     }
 });
