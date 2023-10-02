const searchForm = document.querySelector('form');

searchForm.addEventListener('submit',(e) => {
    e.preventDefault();
    getRecipe();
})

async function getRecipe() {
    var meal = document.getElementById('input').value.trim();
    console.log(meal);
    
    try {
        const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=55e9f5740c4245e7b1e5fdbe61168b29&query=${meal}`);
        const data = await response.json();
        console.log(data.results);
        
        displayRecipes(data.results); 
        
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayRecipes(recipes) {
    const recipeContainer = document.getElementById('recipe-container');

    recipeContainer.innerHTML = ''; // Clear previous results

    recipes.forEach(recipe => {
        const item = document.createElement('div');
        item.classList.add('card', 'mb-3', 'row','ms-5');
        item.style.maxWidth = '18rem';
        item.style.color = 'black';

        // Create a unique modal ID and data attribute
        const modalId = `exampleModal${recipe.id}`;
        const dataAttribute = `data-bs-target="#${modalId}"`;
        const buttonId = `button${recipe.id}`;
        const buttonAttribute = `id="${buttonId}"`;
        // Create the card structure using innerHTML
        item.innerHTML = `
            <div class="card-header">${recipe.title}</div>
            <img src="${recipe.image}" class="card-img-top" alt="${recipe.title}">
            <div class="card-body">
              <button type="button" class="btn btn-primary" data-bs-toggle="modal" ${dataAttribute} ${buttonAttribute}>Double Tap slowly to see the recipe</button>
            </div>
        `;
        console.log(`ModalID:${modalId} , Data:${dataAttribute} , ButtonID: ${buttonAttribute}`);
        // Add a click event listener to the "View Recipe" button
        const viewRecipeButton = item.querySelector('.btn-primary');
        viewRecipeButton.addEventListener('click', () => {
            // Fetch and display the detailed recipe information
            getRecipeDetails(recipe.id);
        });

        // Append the card to the recipe container
        recipeContainer.appendChild(item);
    });
}

//let modalCreated = false;

async function getRecipeDetails(recipeId) {
    try {
        const response = await fetch(`https://api.spoonacular.com/recipes/${recipeId}/summary?apiKey=55e9f5740c4245e7b1e5fdbe61168b29`);
        const data = await response.json();

        console.log(data);

        var title = data.title;
        var summary = data.summary;

        console.log(title);
        console.log(summary);

        displayModal(title,summary,recipeId);
        
        
        //modalCreated = true;

    } 
    catch (error) {
        console.error('Error fetching recipe details:', error);
      }
}

function displayModal(title,summary,recipeId){
  var modal = document.createElement('span');
        modal.innerHTML = `
        <div class="modal fade" id="exampleModal${recipeId}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
         <div class="modal-dialog">
           <div class="modal-content">
             <div class="modal-header">
               <h5 class="modal-title text-center text-dark" id="exampleModalLabel">${title}</h5>
               <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
             </div>
             <div class="modal-body">
               <p id="recipeDetails" class="text-dark">${summary}</p>
             </div>
             <div class="modal-footer">
               <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
             </div>
           </div>
         </div>
        </div>
        `;
      
      console.log("trying");
      document.body.append(modal);
}

