class Recipe {
    constructor(name){
        this.name = name;
        this.isComplete = false;
    }
}

class RecipeService {
    static url = 'https://crudcrud.com/api/a7175be81deb40a997a54ff7382cb004'; 

    static createRecipe(recipe){
        return $.post(this.url, recipe);

    }

    static getAllRecipe(){
        return $.get(this.url);
    }

    static updateRecipe(recipe){
        return $.ajax(
            {
                url:`${this.url}/${recipe._id}`,
                dataType: 'json', 
                data: JSON.stringify(recipe), 
                contentType: 'application/json',
                type: 'PUT'
            }
        );
    }

    static deleteRecipe(id){
        return $.ajax (
            {
                url: `${this.url}/${id}`,
                type: 'DELETE' 
            }
        );
        
    }
}

class DOMManager{
    static recipes;

    static getAllRecipes(){
        RecipeService.getAllRecipes().then(recipes => this.render(recipes));
    }

    static createRecipe(name){
        RecipeService.createRecipe(new Recipe(name))
            .then(() => {
                return RecipeService.getAllRecipes();
            })
            .then(recipes => this.render(recipes));
    }

    static deleteRecipe(id){
        RecipeService.deleteRecipe(id)
            .then(() => {
                return RecipeService.getAllRecipes();
            })
            .then((this.recipes) => this.render(recipes)); 
    }

    static render(recipes){
        this.recipes = recipes;
        $('#app').empty(); 
        for(let recipe of recipes){
            $('#app').prepend(
                `
                    <div id="${recipe._id}" class="card">
                        <div class="card-header">
                            <h2>${recipe.name}</h2>
                            <button class="btn btn-danger" onclick="DOMManager.deleteRecipe('${recipe._id}')">Delete</button>
                        </div>
                    </div>
                `
            );
        }
    }
}

$('#create-new-recipe').click(() => {
    DOMManager.createRecipe($('#new-recipe-name').val());
    $('#new-recipe-name').val("");
}); 

DOMManager.getAllRecipes(); 







