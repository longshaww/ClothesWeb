
/**
* Class presenting a request to create a coffee
*/
class CoffeeMachine {
    /**
    * Create concrete element
    * @param {Array} handlers - handlers set to pass the request through
    */
    constructor(handlers, ingredientsToBeAdded) {
      const resultHandler = (coffee) => {
        // console.log('Final');
        console.log(`Result coffee: ${Object.keys(coffee).filter(item => item !== 'ingredientsToBeAdded').join(', ')}`);
      };
      this.handlers = [...Object.values(handlers), resultHandler].map((handler, index) => coffee => handler(coffee, this.handlers[index + 1]));
      this.coffeeCup = {
        ingredientsToBeAdded
      };
      console.log('Initial handlers are set');
    }
    
    /**
    * Set new ingredients to be added to coffee
    * @param { Array } ingredients - ingredients to be added
    * @return { self } this - instance of itself
    */
    setNewIngredients(ingredientsToBeAdded) {
      this.coffeeCup = {
        ingredientsToBeAdded
      };
      console.log(`Cup is replaced with a new ingredients: ${ingredientsToBeAdded.join(', ')}`);
      
      return this;
    }
    
    /**
    * Process coffee
    * @return { String } coffee - dedicated coffee description according to the corresponding handlers passed
    */
    processCoffee() {    
      this.handlers[0](this.coffeeCup)
    }
  }
  
  // ============================================================
  // USAGE
  // ============================================================
  
  // Set of handlers to process a coffee cup
  const coffeeHandlers = {
    addCoffee: (coffee, next) => {
      coffee.espresso = true;
      console.log('Espresso is added');
      next(coffee)
    },
    addMilk: (coffee, next) => {
      if (coffee.ingredientsToBeAdded.includes('milk')) {
        coffee.withMilk = true;
        console.log('Milk is added');
      }
  
      next(coffee)
    },
    addSugar: (coffee, next) => {
      if (coffee.ingredientsToBeAdded.includes('sugar')) {
        coffee.withSugar = true;
        console.log('Sugar is added');
      }
  
      next(coffee)
    },
    addCinnamon: (coffee, next) => {
      if (coffee.ingredientsToBeAdded.includes('cinnamon')) {
        coffee.withCinnamon = true;
        console.log('Cinnamon is added');
      }
  
      next(coffee)
    },
  }
  
  // Instantiate a concrete coffee machine (1)
  const coffeeMachine = 
        new CoffeeMachine(coffeeHandlers, ['sugar', 'milk', 'cinnamon']);
  // Process coffee for an initial ingredients set ^^^ (2)
  coffeeMachine
    .processCoffee();
  
  // Set new ingredients and process coffee with them (3)
  coffeeMachine
    .setNewIngredients(['sugar'])
    .processCoffee();
  
  // Set another new ingredients and process coffee with them (4)
  coffeeMachine
    .setNewIngredients(['milk', 'cinnamon'])
    .processCoffee();
  
  // RESULTS
  // (1)
  // "Initial handlers are set"
  
  // (2)
  // "Espresso is added"
  // "Milk is added"
  // "Sugar is added"
  // "Cinnamon is added"
  // "Result coffee description: espresso, withMilk, withSugar, withCinnamon"
  
  // (3)
  // "Cup is replaced with a new ingredients: sugar"
  // "Espresso is added"
  // "Sugar is added"
  // "Result coffee description: espresso, withSugar"
  
  // (4)
  // "Cup is replaced with a new ingredients: milk, cinnamon"
  // "Espresso is added"
  // "Milk is added"
  // "Cinnamon is added"
  // "Result coffee description: espresso, withMilk, withCinnamon"
