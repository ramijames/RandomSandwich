<svelte:head>
  <link rel="stylesheet" href="/global.css">
</svelte:head>

<script>

  import Switch from '../components/Switch.svelte'
	
	// let switchValue;
	let hasCheese = false;
	// let multiValue;

  // Page background colors
  const colors = [
    { label: "Pickle", hex: "#3E9C13", image: "/images/backgrounds/bg-pickle.png" },
    { label: "Tomato", hex: "#DB6548", image: "/images/backgrounds/bg-tomato.png" },
    { label: "Carrot", hex: "#D1AC2A", image: "/images/backgrounds/bg-carrot.png" },
    { label: "Eggplant", hex: "#7844AA", image: "/images/backgrounds/bg-eggplant.png" },
    { label: "Mushroom", hex: "#BD9B8E", image: "/images/backgrounds/bg-mushroom.png" },
  ];
  
  // Sandwich breads
  const breads = [
    { label: "White bread", image: "/images/bread/bread-white.svg", icon: "/images/bread/bread-white-small.svg" },
    { label: "Whole wheat", image: "/images/bread/bread-wheat.svg", icon: "/images/bread/bread-wheat-small.svg" },
    { label: "Brown rye", image: "/images/bread/bread-rye-brown.svg", icon: "/images/bread/bread-rye-brown-small.svg" },
    { label: "Sourdough bread", image: "/images/bread/bread-sourdough.svg", icon: "/images/bread/bread-sourdough-small.svg" }
  ]
  
  const cheeses = [
    { label: "American cheese", image: "/images/cheese/cheese-american.svg", icon: "/images/cheese/cheese-american-small.svg" },
    { label: "Cheddar cheese", image: "/images/cheese/cheese-cheddar.svg", icon: "/images/cheese/cheese-cheddar-small.svg" },
    { label: "Swiss cheese", image: "/images/cheese/cheese-swiss.svg", icon: "/images/cheese/cheese-swiss-small.svg" }
  ]
  
  const vegetables = [
    { label: "Tomato", image: "/images/vegetables/vegetable-tomato.svg", icon: "/images/vegetables/vegetable-tomato-small.svg" },
    { label: "Lettuce", image: "/images/vegetables/vegetable-lettuce.svg", icon: "/images/vegetables/vegetable-lettuce-small.svg" },
    { label: "Red onions", image: "/images/vegetables/vegetable-red-onion.svg", icon: "/images/vegetables/vegetable-red-onion-small.svg" },
    { label: "White onions", image: "/images/vegetables/vegetable-white-onion.svg", icon: "/images/vegetables/vegetable-white-onion-small.svg" }
  ]

  const proteins = [
    { label: "Roast beef", image: "/images/proteins/protein-roastbeef.svg", icon: "/images/proteins/protein-roastbeef-small.svg" },
    { label: "Egg yolk", image: "/images/proteins/protein-eggyolk.svg", icon: "/images/proteins/protein-eggyolk-small.svg" },
    { label: "Bologna", image: "/images/proteins/protein-bologna.svg", icon: "/images/proteins/protein-bologna-small.svg" },
    { label: "Bacon", image: "/images/proteins/protein-bacon.svg", icon: "/images/proteins/protein-bacon-small.svg" },
  ]
  
  function getPageBackground() {
    // Pick a random color from the colors array
    // Also set the background image to the color
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }
  
  function pickBread() {
    const randomIndex = Math.floor(Math.random() * breads.length);
    return breads[randomIndex];
  }
  
  function pickCheese() {
    const randomIndex = Math.floor(Math.random() * cheeses.length);
    return cheeses[randomIndex];
  }

  function pickProtein() {
    const randomIndex = Math.floor(Math.random() * proteins.length);
    return proteins[randomIndex];
  }
  
  function pickVegetable() {
    const randomIndex = Math.floor(Math.random() * vegetables.length);
    return vegetables[randomIndex];
  }
  
  function validateSandwich(sandwich){
    // console.log('Validating sandwich:', sandwich);
    let sandwichValid = true;
    if (!sandwich.cheese && !sandwich.vegetables) {
      sandwichValid = false;
    }
    return sandwichValid;
  }

  function sandwichStack(sandwich){
    let stack = 0;
    if(sandwich.bread){
      stack = 2;
    }
    if(sandwich.cheese){
      stack++;
    }
    if(sandwich.vegetables){
      stack = stack + sandwich.vegetables.length;
    }
    return stack;
  }

  // For each ingredient type, I just want to return whether or not it should be included in the sandwich
  function randomIngredient(){
    return Math.random() < 0.5;
  }

  function buildSandwich() {
    // Each sandwich has a top and bottom bread, cheese, and vegetables
    let bread = null;
    let cheese = null;
    let protein = null;
    let vegetableObjects = [];

    let sandwichComposition = {
      cheese: false,
      vegetables: false,
      protein: false,
      // TODO Add more ingredients
    };

    // console.log('Sandwich composition start:', sandwichComposition);

    for (let ingredient in sandwichComposition) {
      sandwichComposition[ingredient] = Math.random() < 0.5;
    }

    // console.log('Sandwich composition randomized:', sandwichComposition);

    // Randomly pick a bread, we always have bread
    bread = pickBread();

    // Add cheese if the sandwich composition includes cheese
    let cheesy = validateSandwich(sandwichComposition);
    if(cheesy === false){
      console.log('No cheese, adding cheese');
      sandwichComposition.cheese = true;
    }

    if (sandwichComposition.protein) {
      protein = pickProtein();
    }

    if (sandwichComposition.cheese) {
      cheese = pickCheese();
    }

    // Add vegetables if the sandwich composition includes vegetables
    if (sandwichComposition.vegetables) {
      // Generate a random number of vegetables (between 1 and the total number of vegetables)
      const numVegetables = Math.floor(Math.random() * vegetables.length) + 1;

      // Add a random vegetable to the sandwich for each vegetable
      for (let i = 0; i < numVegetables; i++) {
        let vegetable = pickVegetable();

        // Check if the vegetable already exists in vegetableObjects
        while (vegetableObjects.some(obj => obj.label === vegetable.label)) {
          // If it does, pick a new vegetable
          vegetable = pickVegetable();
        }

        vegetableObjects.push(vegetable);
      }
    }

    return {
      topBread: bread,
      protein: protein,
      cheese: cheese,
      vegetables: vegetableObjects,
      bottomBread: bread
    };
  }

  const sandwich = buildSandwich();

  // console.log('Sandwich:', sandwich);

  const background = getPageBackground();
  
  if (typeof window !== 'undefined') {
    $: document.body.style.backgroundColor = background.hex;
    $: document.body.style.backgroundImage = `url(${background.image})`;
  }
  
</script>

<section class="container">

  <section class="links">
    <p>With ♥ by <a href="https://www.ramijames.com">Rami James</a></p>
    <p>Star on <a href="https://github.com/ramijames/RandomSandwich">Github</a></p>
  </section>

  <h1 class="sammitch-header center">Random Sandwich</h1>

  <section class="sandwich-builder">

    <section class="sandwich-selector">
      <h2>Includes</h2>
      <Switch bind:value={hasCheese} label="Cheese?" design="slider" /> 
    </section>

    <section class="sandwich-image loader">
      <div class="sandwich sandwich-stack">
        <img src="{sandwich.topBread.image}" alt="{sandwich.topBread.label}" />
        {#if sandwich.vegetables }
          {#each sandwich.vegetables as vegetable (vegetable.label)}
            <img src="{vegetable.image}" alt="{vegetable.label}" />
          {/each}
        {/if}
        {#if sandwich.cheese}
          <img src="{sandwich.cheese.image}" alt="{sandwich.cheese.label}" />
        {/if}
        {#if sandwich.protein}
          <img src="{sandwich.protein.image}" alt="{sandwich.protein.label}" />
        {/if}
        <img src="{sandwich.bottomBread.image}" alt="{sandwich.bottomBread.label}" />
      </div>
    </section>

    <div class="ingredient-list">
      <h2>Ingredients</h2>
      <section class="grid">
        {#each [sandwich.topBread, ...sandwich.vegetables, sandwich.cheese, sandwich.protein].filter(Boolean) as ingredient (ingredient.label)}
          <p>
            <img src="{ingredient.icon}" alt="{ingredient.label}" />
            {ingredient.label}
          </p>
        {/each}
    </section>
    </div>

  </section>

  <h1 class="latest-sammitches-header center">Latest Sandwiches</h1>

</section>
