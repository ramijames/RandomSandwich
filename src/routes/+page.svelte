<svelte:head>
  <link rel="stylesheet" href="/global.css">
</svelte:head>

<script>

  // Page background colors
  const colors = ['red', 'blue', 'green', 'yellow', 'pink', 'purple']; // replace with your preferred colors
  
  // Sandwich breads
  const breads = [
    {label: "White bread", image: "/images/bread/bread-white.svg"},
    {label: "Whole wheat", image: "/images/bread/bread-wheat.svg"},
    {label: "Brown rye", image: "/images/bread/bread-rye-brown.svg"},
    {label: "Sourdough bread", image: "/images/bread/bread-sourdough.svg"},
  ]
  
  const cheeses = [
    { label: "American cheese", image: "/images/cheese/cheese-american.svg"},
    { label: "Cheddar cheese", image: "/images/cheese/cheese-cheddar.svg"},
    { label: "Swiss cheese", image: "/images/cheese/cheese-swiss.svg"},
  ]
  
  const vegetables = [
    { label: "Tomato", image: "/images/vegetables/vegetable-tomato.svg" },
    { label: "Lettuce", image: "/images/vegetables/vegetable-lettuce.svg" },
  ]
  
  function getRandomColor() {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }
  
  function pickBread() {
    const randomIndex = Math.floor(Math.random() * breads.length);
    return breads[randomIndex];
  }
  
  function pickCheese() {
    const randomIndex = Math.floor(Math.random() * breads.length);
    return cheeses[randomIndex];
  }
  
  function pickVegetable() {
    const randomIndex = Math.floor(Math.random() * vegetables.length);
    return vegetables[randomIndex];
  }
  
  function buildSandwich() {
    let bread = null;
    let cheese = null;
    let vegetableObjects = [];

    // Randomly decide whether to add bread
    if (Math.random() < 0.5) {
      bread = pickBread();
    }

    // Randomly decide whether to add cheese
    if (Math.random() < 0.5) {
      cheese = pickCheese();
    }

    // Randomly decide whether to add vegetables
    if (Math.random() < 0.5) {
      // Generate a random number of vegetables (between 1 and the total number of vegetables)
      const numVegetables = Math.floor(Math.random() * vegetables.length) + 1;

      // Add a random vegetable to the sandwich for each vegetable
      for (let i = 0; i < numVegetables; i++) {
        const vegetable = pickVegetable();
        vegetableObjects.push(vegetable);
      }
    }

    // Return the sandwich object
    return {
      bread: bread,
      cheese: cheese,
      vegetables: vegetableObjects
    };
  }

  const sandwich = buildSandwich();
  
  if (typeof window !== 'undefined') {
    $: document.body.style.backgroundColor = getRandomColor();
  }
  
  </script>

<h1 class="sammitch-header center">Random Sandwich</h1>
<!-- {@html sandwich} -->

<div class="ingredient-list">
  {#each [sandwich.bread, ...sandwich.vegetables, sandwich.cheese, sandwich.bread] as ingredient (ingredient.label)}
    <p>{ingredient.label}</p>
  {/each}
</div>

<div class="sandwich sandwich-stack">
  <img src="{sandwich.bread.image}" alt="{sandwich.bread.label}" />
  {#each sandwich.vegetables as vegetable (vegetable.label)}
    <img src="{vegetable.image}" alt="{vegetable.label}" />
  {/each}
  <img src="{sandwich.cheese.image}" alt="{sandwich.cheese.label}" />
  <img src="{sandwich.bread.image}" alt="{sandwich.bread.label}" />
</div>