<template>
  <div v-if="!gameStarted">
    Il y aura : <br><br>
    {{ peopleNumber }} personnes, dont : <br>
    - {{ undercoverNumber }} Undercover(s) <br>
    - {{ misterWhiteNumber }} misterwhite(s) <br> <br>

    <div class="name-to-play" style="text-align: center;" v-if="numberPlayer <= peopleNumber">
      <b> {{ currentPlayerName }}</b>, <br>   à toi de jouer 😏
    </div>

    <!-- A CHAQUE TOUR : JOUEUR 1/2/3/4 vois sa carte  ! -->

    <v-btn variant="tonal" @click="startGame" v-if="numberPlayer <= peopleNumber" style="width: 100%; margin-top: 2rem;" elevation="2"
  x-large
>
      <b>Tirer une carte</b>
    </v-btn>
    <v-btn depressed
      color="error" @click="deleteGame" v-else style="width: 100%; margin-top: 2rem; background: red;" elevation="2"
  x-large
>
      <b>Recommencer</b>
    </v-btn>
      
    <ModalShowWord 
      :word="word"
      v-show="modalShowWord" 
      @close="closeModalWord" />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import ModalNewPlayer from './ModalNewPlayer.vue'
import ModalShowWord from './ModalShowWord.vue'

import words from "~/words.js"

export default {
  name: 'InGame',
  components: {
    ModalNewPlayer: ModalNewPlayer,
    ModalShowWord: ModalShowWord,
  },
  data: function () {
    return {
      peopleNumber: 0,
      undercoverNumber: 0,
      misterWhiteNumber: 0,
      playersName: [],
      // Will be set in mount fucntion

      gameStarted: false,

      modalName: false,
      numberPlayer: 1,

      modalShowWord: false,

      randomFaciess: null,

      orders: null,

      word: '',

      words: words,

      finalWordForPlayer: null,
      finalWordForUnder: null
    }
  },

  mounted() {
    const { game } = this.$store.state

    this.peopleNumber = game.peopleNumber
    this.undercoverNumber = game.undercoverNumber
    this.misterWhiteNumber = game.misterWhiteNumber
    this.playersName = game.playersName

    this.randomFaciess = this.getRandomFaciess()

    this.getFinalWords()
    console.log("words :", this.words)
  },

  computed: {
    currentPlayerName() {
      return this.$store.state.game.playersName[this.numberPlayer - 1] || null
    }
  },

  methods: {
    deleteGame() {
      console.log("dete gameeee")

      this.gameStarted= false

      this.modalName= false
      this.numberPlayer= 1

      this.modalShowWord= false

      this.randomFaciess= null

      this.orders= null

      this.word= ''

      this.words= words

      this.finalWordForPlayer= null
      this.finalWordForUnder= null
      
      this.randomFaciess = this.getRandomFaciess()

      this.getFinalWords()
    },
    getFinalWords() {
      console.log("wrs ", words.words.length, this.words)
      console.log("words length :", this.words.lenth)
      const firstChoice = this.getRandomInt(words.words.length)
      console.log("first choice int : ", firstChoice)
      console.log("first choice : ", words.words[firstChoice])

      const firstChoiceObj = words.words[firstChoice]

      // Pour l'instant, les civils ont un seul mot : 
      // c'est un string et non un tableau de string
      const finalPlayer = Array.isArray(firstChoiceObj.players) ? firstChoiceObj.players[0] : firstChoiceObj.players
      this.finalWordForPlayer = finalPlayer

      console.log("final players :", finalPlayer)

      const underChoice = this.getRandomInt(firstChoiceObj.under.length)
      const finalUnder = firstChoiceObj.under[underChoice]
      this.finalWordForUnder = finalUnder

      console.log("final under :", finalUnder)
    },

    getRandomFaciess() {
      let tableau = []
      for (let i = 1; i <= parseInt(this.peopleNumber); i++) {
        tableau.push(i);
      }

      console.log("tableau : ", tableau)

      const roles = this.repartirRoles(tableau)
      console.log("joueurs", roles)

      this.orders = roles
      return roles
    },

    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    },

    repartirRoles(joueurs) {

      // Mélanger les joueurs aléatoirement pour la distribution des rôles
      let gamers = this.shuffleArray(joueurs);

      console.log("joueur", gamers)

      // Définir le rôle du whiteHat et de l'"under"
      const whiteHat = gamers.pop();
      const under = gamers.pop();

      // Retourner la répartition des rôles
      return {
        whiteHat: whiteHat,
        under: under,
        players: gamers
      };
    },

    startGame() {
      //this.modalName = true
      console.log(this.numberPlayer)
      const category = this.findCategoryById(this.numberPlayer)
      console.log("category = ", category)
      this.word = this.getWord(category)  
      console.log("word = ", this.word)
      this.modalShowWord = true
    },

    closeModalWord() {
      this.modalShowWord = false
      this.numberPlayer = this.numberPlayer + 1

    },

    findCategoryById(id) {
      console.log("PLAYER NUMLBER :", this.numberPlayer)
      if (this.orders.players.includes(id)) {
        return "players";
      } else if (this.orders.under === id) {
        return "under";
      } else if (this.orders.whiteHat === id) {
        return "white";
      }
    },

    getRandomInt(max) {
      return Math.floor(Math.random() * max);
    },

    getWord(category) {
      if(category == 'white') {
        return ''
      }
      else if (category == 'under') {
        return this.finalWordForUnder
      }
      else {
        return this.finalWordForPlayer
      }
    }
  }
}
</script>

<style>
.name-to-play {
  font-size: 3em;
  color: rgb(0, 35, 125);
  font-family: "exo";
  text-transform: uppercase;
}
</style>
