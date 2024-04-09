import { defineStore } from 'pinia'

export const useSandwichStore = defineStore('sandwich', {
  state: () => {
    return { 
      hasCheese: true,
      hasMeat: true,
      hasVegetables: true,
      cheese: [],
      vegetables: [],
      protein: [],
      bread: []
     }
  },
  actions: {
    toggleCheese() {
      this.hasCheese = !this.hasCheese
    },
    toggleMeat() {
      this.hasMeat = !this.hasMeat
    },
    toggleVegetables() {
      this.hasVegetables = !this.hasVegetables
    },
  },
})