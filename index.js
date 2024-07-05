var apiKey="4773758b5f464142af7f7c1e0ac99b35";
var mainEl=document.querySelector((".main"));

async function init(){
    var recipes=await getRecipes();
    console.log(recipes);
    displayRecipe(recipes);
}
async function getRecipes(){
    var response= await fetch(`https://api.spoonacular.com/recipes/random?number=10&apiKey=${apiKey}`)
    var data=await response.json();
    return data.recipes;
}

function displayRecipe(recipes){
    recipes.map(function(recipe) {
        
        var recipeEl=document.createElement("div");
        recipeEl.classList.add("recipes");

        var recipeImg=document.createElement("img");
        recipeImg.classList.add("img");
        recipeImg.src=recipe.image;
        recipeImg.alt=recipe.title;
        recipeImg.onerror="this.src='https://spoonacular.com/application/frontend/images/logo-simple-framed-green-gradient.svg'";

        var recipeTitle=document.createElement("h2");
        recipeTitle.textContent=recipe.title;
        recipeTitle.classList.add("h2");

        var recipeDesc=document.createElement("p");
        recipeDesc.classList.add("p");
        recipeDesc.innerHTML=`<strong>Ingredients: </strong>${recipe.extendedIngredients.map((ingredient)=>ingredient.original).join(" , ")}`;

        var recipeLink=document.createElement("a");
        recipeLink.classList.add("btn");
        recipeLink.href=recipe.spoonacularSourceUrl;        
        recipeLink.textContent="View Recipe";
        recipeLink.target="_blank";

        recipeEl.appendChild(recipeImg);
        recipeEl.appendChild(recipeTitle);
        recipeEl.appendChild(recipeDesc);
        recipeEl.appendChild(recipeLink);
        mainEl.appendChild(recipeEl);
    });
}



init();