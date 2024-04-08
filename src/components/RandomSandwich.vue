<script>
import { ref } from 'vue'

import { useSandwichStore } from '../stores/sandwich'

export default {
  data () {
    return {
      
    }
  },
  setup () {

    const sandwich = useSandwichStore()

    let bread = null;
    let cheese = null;
    let protein = null;
    let vegetableObjects = [];

    let sandwichComposition = {
      cheese: sandwich.hasCheese,
      vegetables: sandwich.hasVegetables,
      protein: sandwich.hasMeat,
      bread: sandwich.bread,
      vegetables: vegetableObjects
    }

    // Sandwich breads
    const breads = [
      { label: "White bread", image: "/bread/bread-white.svg", icon: "/bread/bread-white-small.svg" },
      { label: "Whole wheat", image: "/bread/bread-wheat.svg", icon: "/bread/bread-wheat-small.svg" },
      { label: "Brown rye", image: "/bread/bread-rye-brown.svg", icon: "/bread/bread-rye-brown-small.svg" },
      { label: "Sourdough bread", image: "/bread/bread-sourdough.svg", icon: "/bread/bread-sourdough-small.svg" }
    ]
    
    const cheeses = [
      { label: "American cheese", image: "/cheese/cheese-american.svg", icon: "/cheese/cheese-american-small.svg" },
      { label: "Cheddar cheese", image: "/cheese/cheese-cheddar.svg", icon: "/cheese/cheese-cheddar-small.svg" },
      { label: "Swiss cheese", image: "/cheese/cheese-swiss.svg", icon: "/cheese/cheese-swiss-small.svg" }
    ]
    
    const vegetables = [
      { label: "Tomato", image: "/vegetables/vegetable-tomato.svg", icon: "/vegetables/vegetable-tomato-small.svg" },
      { label: "Lettuce", image: "/vegetables/vegetable-lettuce.svg", icon: "/vegetables/vegetable-lettuce-small.svg" },
      { label: "Red onions", image: "/vegetables/vegetable-red-onion.svg", icon: "/vegetables/vegetable-red-onion-small.svg" },
      { label: "White onions", image: "/vegetables/vegetable-white-onion.svg", icon: "/vegetables/vegetable-white-onion-small.svg" },
      { label: "Pickles", image: "/vegetables/vegetable-pickles.svg", icon: "/vegetables/vegetable-pickles-small.svg" }
    ]

    const proteins = [
      { label: "Roast beef", image: "/proteins/protein-roastbeef.svg", icon: "/proteins/protein-roastbeef-small.svg" },
      { label: "Egg yolk", image: "/proteins/protein-eggyolk.svg", icon: "/proteins/protein-eggyolk-small.svg" },
      { label: "Bologna", image: "/proteins/protein-bologna.svg", icon: "/proteins/protein-bologna-small.svg" },
      { label: "Bacon", image: "/proteins/protein-bacon.svg", icon: "/proteins/protein-bacon-small.svg" },
    ]

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

    for (let ingredient in sandwich) {
      sandwich[ingredient] = Math.random() < 0.5;
    }

    console.log('cheese: ' + sandwich.hasCheese);
    console.log('meat: ' + sandwich.hasMeat);
    console.log('vegetables: ' + sandwich.hasVegetables);

    // Randomly pick a bread, we always have bread
    sandwichComposition.bread = pickBread();
    sandwichComposition.cheese = pickCheese();
    sandwichComposition.protein = pickProtein();

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

    sandwichComposition.vegetableObjects = vegetableObjects;

    console.log(sandwichComposition)

    return {
      sandwichComposition,
      sandwich
    }
  },
  components: {
    
  }
}

</script>

<template>

  <section class="sandwich-builder">

    <section class="sandwich-selector">
      <h2>Order</h2>
      <!-- Checkboxes that filter the sandwich content -->
      <div class="checkbox">
        <input type="checkbox" id="cheese" v-model="sandwich.hasCheese" />
        <label for="cheese">Cheese</label>
      </div>
      <div class="checkbox">
        <input type="checkbox" id="meat" v-model="sandwich.hasMeat" />
        <label for="meat">Meat</label>
      </div>
      <div class="checkbox">
        <input type="checkbox" id="vegetables" v-model="sandwich.hasVegetables" />
        <label for="vegetables">Vegetables</label>
      </div>
      <!-- Button for generating a new sandwich -->
      <button @click="generateSandwich">Generate Sandwich</button>
    </section>
    
    <section class="sandwich-image loader">
      <div class="sandwich sandwich-stack">
        <img :src="sandwichComposition.bread.image" :alt="sandwichComposition.bread.label" />
        <img v-if="sandwich.hasVegetables" v-for="vegetable in sandwichComposition.vegetableObjects" :src="vegetable.image" :alt="vegetable.label" />
        <img v-if="sandwich.hasCheese" :src="sandwichComposition.cheese.image" :alt="sandwichComposition.cheese.label" />
        <img v-if="sandwich.hasMeat" :src="sandwichComposition.protein.image" :alt="sandwichComposition.protein.label" />
        <img :src="sandwichComposition.bread.image" :alt="sandwichComposition.bread.label" />
      </div>
    </section>

    <div class="ingredient-list">
      <h2>Ingredients</h2>
      <section class="grid">
        <!-- List all the ingredients here -->
        <div class="ingredient">
          <img :src="sandwichComposition.bread.icon" :alt="sandwichComposition.bread.label" />
          <p>{{ sandwichComposition.bread.label }}</p>
        </div>
        <div v-if="sandwich.hasVegetables" v-for="vegetable in sandwichComposition.vegetableObjects" class="ingredient">
          <img :src="vegetable.icon" :alt="vegetable.label" />
          <p>{{ vegetable.label }}</p>
        </div>
        <div v-if="sandwich.hasCheese" class="ingredient">
          <img :src="sandwichComposition.cheese.icon" :alt="sandwichComposition.cheese.label" />
          <p>{{ sandwichComposition.cheese.label }}</p>
        </div>
        <div v-if="sandwich.hasMeat" class="ingredient">
          <img :src="sandwichComposition.protein.icon" :alt="sandwichComposition.protein.label" />
          <p>{{ sandwichComposition.protein.label }}</p>
        </div>
      </section>
    </div>

  </section>

</template>

<style scoped>

</style>
