<script>
import { ref, onMounted } from 'vue'
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
      ],
      sandwichHeight: '0px',
    }
  },
  setup () {

    const sandwich = useSandwichStore()

    const selectedColor = ref(null);

    onMounted(() => {
      const colors = [
        { label: "Pickle", hex: "#3E9C13", image: "/backgrounds/bg-pickle.png" },
        { label: "Tomato", hex: "#DB6548", image: "/backgrounds/bg-tomato.png" },
        { label: "Carrot", hex: "#D1AC2A", image: "/backgrounds/bg-carrot.png" },
        { label: "Eggplant", hex: "#7844AA", image: "/backgrounds/bg-eggplant.png" },
        { label: "Mushroom", hex: "#BD9B8E", image: "/backgrounds/bg-mushroom.png" },
      ];
      const randomIndex = Math.floor(Math.random() * colors.length);
      selectedColor.value = colors[randomIndex];
      document.getElementById('sandwichBackground').style.backgroundImage = `url(${selectedColor.value.image})`;
      document.getElementById('sandwichBackground').style.backgroundColor = selectedColor.value.hex;
    });

    return {
      selectedColor,
      sandwich
    }
  },
  components: {
    
  },
  mounted() {
    this.generateSandwich();

    this.$nextTick(() => {
      this.ingredientHeight = this.$refs.singleIngredient.offsetHeight / 2.75;
      this.numIngredients = this.$refs.sandwichStack.querySelectorAll('img').length;
      this.sandwichHeight = parseInt(this.ingredientHeight) * this.numIngredients + "px";
    });
  },
  methods: {
    generateSandwich() {
      console.log('Generating a new sandwich');
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
      }

      this.sandwichComposition.vegetables = [...new Set(this.sandwichComposition.vegetables)];

      this.$nextTick(() => {
        this.ingredientHeight = this.$refs.singleIngredient.offsetHeight / 2.75;
        this.numIngredients = this.$refs.sandwichStack.querySelectorAll('img').length;
        this.sandwichHeight = parseInt(this.ingredientHeight) * this.numIngredients + "px";
      });
      console.log(this.sandwichHeight);
    },
    pickBread() {
      const randomIndex = Math.floor(Math.random() * this.breads.length);
      return this.breads[randomIndex];
    },
    pickCheese() {
      const randomIndex = Math.floor(Math.random() * this.cheeses.length);
      return this.cheeses[randomIndex];
    },
    pickProtein() {
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
      <section class="types">
        <button @click="randomizeIngredients">Random</button>
        <div class="checkbox">
          <input type="checkbox" id="cheese" v-model="sandwich.hasCheese" />
          <label for="cheese">Cheese</label>
          <span class="checkmark"></span>
        </div>
        <div class="checkbox">
          <input type="checkbox" id="meat" v-model="sandwich.hasMeat" />
          <label for="meat">Meat</label>
          <span class="checkmark"></span>
        </div>
        <div class="checkbox">
          <input type="checkbox" id="vegetables" v-model="sandwich.hasVegetables" />
          <label for="vegetables">Vegetables</label>
          <span class="checkmark"></span>
        </div>
      </section>
      <section class="actions">
        <button @click="generateSandwich">Generate New</button>
      </section>
    </section>
    
    <section id="sandwichBackground" class="sandwich-image loader">
      <div ref="sandwichStack" class="sandwich sandwich-stack" :style="{ height: sandwichHeight }">
        <img ref="singleIngredient" :src="sandwich.bread.image" :alt="sandwich.bread.label" />
        <img v-if="sandwich.hasVegetables" v-for="vegetable in sandwich.vegetables" :src="vegetable.image" :alt="vegetable.label" />
        <img v-if="sandwich.hasCheese" :src="sandwich.cheese.image" :alt="sandwich.cheese.label" />
        <img v-if="sandwich.hasMeat" :src="sandwich.protein.image" :alt="sandwich.protein.label" />
        <img :src="sandwich.bread.image" :alt="sandwich.bread.label" />
      </div>
    </section>

    <div class="ingredient-list ">
      <section class="grid ingredients-container">
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

.sandwich-builder {
  display:flex;
  flex-direction: column;
}

/* ORDER */

.sandwich-selector {
  width:100%;
  max-width: 800px;
  margin:0 auto;
  display:flex;
  flex-direction: row;
  justify-content: space-between;
  text-align: left;
  color: #000000;
  gap:1rem;
  background-color: #ffffff;
  border-top:1px solid #00000016;
}

    .types {
      display:flex;
      flex-direction: row;
      gap:2rem;
      padding:1rem 0;
      justify-content: center;
    }

    .actions {
      display:flex;
      flex-direction: row;
      gap:1rem;
      padding:1rem 0;
    }

 /* Custom checkbox */
 .checkbox {
  display: block;
  position: relative;
  padding-left: 1.5rem;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  align-self: center;
}

/* Hide the browser's default checkbox */
.checkbox input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkmark */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 18px;
  width: 18px;
  background-color: #00000028;
  border-radius: 4px;
}

/* On mouse-over, add a grey background color */
.checkbox:hover input ~ .checkmark {
  background-color: #00000037;
}

/* When the checkbox is checked, add a blue background */
.checkbox input:checked ~ .checkmark {
  background-color: #000000c7;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.checkbox input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.checkbox .checkmark:after {
  left: 6px;
  top: 2px;
  width: 4px;
  height: 8px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
} 

.checkbox label {
  font-size:1rem;
}

/* BUILD */

#sandwichBackground {
  width:800px;
  height:800px;
  position: relative;
}

#sandwichBackground::after {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 800px;
  height: 800px;
  z-index: -1;
  background: linear-gradient(180deg, rgba(0, 0, 0, .40) 0%, rgba(0,0,0,0.2) 20%, rgba(0,0,0,0) 100%);
}

.sandwich {
  width: 600px;
  margin: 0 auto;
}

.sandwich-image {
  margin:0 auto;
  display:flex;
  flex-direction: column;
  justify-content: center;
}

.sandwich-stack {
  position: relative;
}

.sandwich-stack img {
  width:600px;
  height:158px;
  position: absolute;
  left: 0;
  filter: drop-shadow(0 10px 6px #00000016);
}

.sandwich-stack img:nth-child(1) {
  top: 0px;
  z-index: 100;
}

.sandwich-stack img:nth-child(2) {
  top: 40px;
  z-index: 99;
}

.sandwich-stack img:nth-child(3) {
  top: 80px;
  z-index: 98;
}

.sandwich-stack img:nth-child(4) {
  top: 120px;
  z-index: 97;
}

.sandwich-stack img:nth-child(5) {
  top: 160px;
  z-index: 96;
}

.sandwich-stack img:nth-child(6) {
  top: 220px;
  z-index: 95;
}

.sandwich-stack img:nth-child(7) {
  top: 260px;
  z-index: 94;
}

.sandwich-stack img:nth-child(8) {
  top: 320px;
  z-index: 93;
}

.sandwich-stack img:nth-child(9) {
  top: 400px;
  z-index: 92;
}

.sandwich-stack img:nth-child(10) {
  top: 440px;
  z-index: 91;
}

/* INGREDIENTS */

.ingredient-list {
  text-align: right;
  color: #000;
  padding:2rem;
}

.ingredients-container {
  max-width: 800px;
  margin:0 auto;
}

.ingredient-list h2 {
  text-shadow: 0 2px 2px rgba(0,0,0,.1), 0 4px 0 rgba(0,0,0,.1);
  text-align: center;
}

.ingredient-list .grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  column-gap: 2rem;
  row-gap: 0rem;
}

.ingredient-list p {
  text-align: center;
  font-size:1rem;
}

.ingredient-list img {
  width: 100%;
  margin:0 auto;
}

.ingredient {
  display:flex;
  flex-direction: column;
  justify-content: center;
  padding: .25rem .5rem;
}

.ingredient img {
  width: 70%;
  margin:0 auto;
}

</style>
