<svelte:head>
  <link rel="stylesheet" href="/global.css">
</svelte:head>

<h1 class="sammitch-header center">Random Sandwich</h1>
{@html sandwich}

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
  const bread = pickBread();
  const cheese = pickCheese();

  // Generate a random number of vegetables (between 1 and the total number of vegetables)
  const numVegetables = Math.floor(Math.random() * vegetables.length) + 1;

  // Create an array to hold the vegetable images
  let vegetableImages = '';

  // Create an array to hold the names of the ingredients
  let ingredients = [];

  // Add the bread to the ingredients list
  ingredients.push(bread.label);

  // Add a random vegetable to the sandwich for each vegetable
  for (let i = 0; i < numVegetables; i++) {
    const vegetable = pickVegetable();
    ingredients.push(vegetable.label);
    vegetableImages += `<img src="${vegetable.image}" alt="${vegetable.label}" />`;
  }

  // Add the cheese to the ingredients list
  ingredients.push(cheese.label);

  // Build the list of ingredients
  let ingredientList = '';
  for (let ingredient of ingredients) {
    ingredientList += `<p>${ingredient}</p>`;
  }

  return `
    <div class="ingredient-list">
      ${ingredientList}
    </div>
    <div class="sandwich sandwich-stack">
      <img src="${bread.image}" alt="${bread.label}" />
      ${vegetableImages}
      <img src="${cheese.image}" alt="${cheese.label}" />
      <img src="${bread.image}" alt="${bread.label}" />
    </div>
  `;
}

$: sandwich = buildSandwich();

if (typeof window !== 'undefined') {
  $: document.body.style.backgroundColor = getRandomColor();
}

</script>