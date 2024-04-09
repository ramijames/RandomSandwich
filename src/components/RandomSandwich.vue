<script>
import { useSandwichStore } from '../stores/sandwich'

export default {
  data () {
    return {
      breads: [
        { label: "White bread", image: "/bread/bread-white.svg", icon: "/bread/bread-white-small.svg" },
        { label: "Whole wheat", image: "/bread/bread-wheat.svg", icon: "/bread/bread-wheat-small.svg" },
        { label: "Brown rye", image: "/bread/bread-rye-brown.svg", icon: "/bread/bread-rye-brown-small.svg" },
        { label: "Sourdough bread", image: "/bread/bread-sourdough.svg", icon: "/bread/bread-sourdough-small.svg" }
      ],
      cheeses: [
        { label: "American cheese", image: "/cheese/cheese-american.svg", icon: "/cheese/cheese-american-small.svg" },
        { label: "Cheddar cheese", image: "/cheese/cheese-cheddar.svg", icon: "/cheese/cheese-cheddar-small.svg" },
        { label: "Swiss cheese", image: "/cheese/cheese-swiss.svg", icon: "/cheese/cheese-swiss-small.svg" }
      ],
      vegetables: [
        { label: "Tomato", image: "/vegetables/vegetable-tomato.svg", icon: "/vegetables/vegetable-tomato-small.svg" },
        { label: "Lettuce", image: "/vegetables/vegetable-lettuce.svg", icon: "/vegetables/vegetable-lettuce-small.svg" },
        { label: "Red onions", image: "/vegetables/vegetable-red-onion.svg", icon: "/vegetables/vegetable-red-onion-small.svg" },
        { label: "White onions", image: "/vegetables/vegetable-white-onion.svg", icon: "/vegetables/vegetable-white-onion-small.svg" },
        { label: "Pickles", image: "/vegetables/vegetable-pickles.svg", icon: "/vegetables/vegetable-pickles-small.svg" }
      ],
      proteins: [
        { label: "Roast beef", image: "/proteins/protein-roastbeef.svg", icon: "/proteins/protein-roastbeef-small.svg" },
        { label: "Egg yolk", image: "/proteins/protein-eggyolk.svg", icon: "/proteins/protein-eggyolk-small.svg" },
        { label: "Bologna", image: "/proteins/protein-bologna.svg", icon: "/proteins/protein-bologna-small.svg" },
        { label: "Bacon", image: "/proteins/protein-bacon.svg", icon: "/proteins/protein-bacon-small.svg" },
      ] 
    }
  },
  setup () {

    const sandwich = useSandwichStore()

    return {
      sandwich
    }
  },
  components: {
    
  },
  mounted() {
    this.generateSandwich();
  },
  methods: {
    generateSandwich() {
      // console.log('Generating a new sandwich');
      this.sandwichComposition = useSandwichStore()
      
      // Randomly pick a bread, we always have bread
      this.sandwichComposition.bread = this.pickBread();
      this.sandwichComposition.cheese = this.pickCheese();
      this.sandwichComposition.protein = this.pickProtein();

      // Generate a random number of vegetables (between 1 and the total number of vegetables)
      const numVegetables = Math.floor(Math.random() * this.vegetables.length) + 1;

      // Clear the vegetables array
      this.sandwichComposition.vegetables = [];

      // Add a random vegetable to the sandwich for each vegetable
      for (let i = 0; i < numVegetables; i++) {
        let vegetable = this.pickVegetable();
        this.sandwichComposition.vegetables.push(vegetable);
        // console.log("Adding vegetable", vegetable)
      }

      this.sandwichComposition.vegetables = [...new Set(this.sandwichComposition.vegetables)];
      // console.log(this.sandwichComposition.vegetables);
    },
    pickBread() {
      const randomIndex = Math.floor(Math.random() * this.breads.length);
      return this.breads[randomIndex];
    },
    pickCheese() {
      // console.log("Picking cheese");
      const randomIndex = Math.floor(Math.random() * this.cheeses.length);
      return this.cheeses[randomIndex];
    },
    pickProtein() {
      // console.log("Picking protein");
      const randomIndex = Math.floor(Math.random() * this.proteins.length);
      return this.proteins[randomIndex];
    },
    pickVegetable() {
      const randomIndex = Math.floor(Math.random() * this.vegetables.length);
      return this.vegetables[randomIndex];
    },
    randomizeIngredients() {
      // This should randomize the sandwich ingredients in the sandwich store
      const sandwich = useSandwichStore()

      for (let ingredient in sandwich) {
        sandwich[ingredient] = Math.random() < 0.5;
      }

      this.generateSandwich();
    }
  }
}

</script>

<template>

  <section class="sandwich-builder">

    <section class="sandwich-selector">
      <h2>Order</h2>
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
      <button @click="randomizeIngredients">Randomize Ingredients</button>
      <button @click="generateSandwich">Generate Sandwich</button>
    </section>
    
    <section class="sandwich-image loader">
      <div class="sandwich sandwich-stack">
        <img :src="sandwich.bread.image" :alt="sandwich.bread.label" />
        <img v-if="sandwich.hasVegetables" v-for="vegetable in sandwich.vegetables" :src="vegetable.image" :alt="vegetable.label" />
        <img v-if="sandwich.hasCheese" :src="sandwich.cheese.image" :alt="sandwich.cheese.label" />
        <img v-if="sandwich.hasMeat" :src="sandwich.protein.image" :alt="sandwich.protein.label" />
        <img :src="sandwich.bread.image" :alt="sandwich.bread.label" />
      </div>
    </section>

    <div class="ingredient-list">
      <h2>Ingredients</h2>
      <section class="grid">
        <div class="ingredient">
          <img :src="sandwich.bread.icon" :alt="sandwich.bread.label" />
          <p>{{ sandwich.bread.label }}</p>
        </div>
        <div v-if="sandwich.hasVegetables" v-for="vegetable in sandwich.vegetables" class="ingredient">
          <img :src="vegetable.icon" :alt="vegetable.label" />
          <p>{{ vegetable.label }}</p>
        </div>
        <div v-if="sandwich.hasCheese" class="ingredient">
          <img :src="sandwich.cheese.icon" :alt="sandwich.cheese.label" />
          <p>{{ sandwich.cheese.label }}</p>
        </div>
        <div v-if="sandwich.hasMeat" class="ingredient">
          <img :src="sandwich.protein.icon" :alt="sandwich.protein.label" />
          <p>{{ sandwich.protein.label }}</p>
        </div>
      </section>
    </div>

  </section>

</template>

<style scoped>

</style>
