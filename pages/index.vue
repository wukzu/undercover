<template>
  <div style="background-color: grey; padding: 30px;">
    <div class="flex-img">
      <div class="img-left">
        <img class="left"
          src="https://play-lh.googleusercontent.com/ETLkdU4XIF6NX_K3KKMht3NG88EEs1pgvNV7wJySdc_PddnyMkWFnVyAADFnDcVMhD4b"
          alt="Paris">
      </div>
      <div class="img-right">
        <img class="right" src="https://m.media-amazon.com/images/I/51pC4mRBqOL._AC_UF894,1000_QL80_.jpg">
      </div>
    </div>

    <div v-if="isInGame">
      <InGame />
    </div>
    <div class="card" v-else>

      <div class="panel">
        <v-text-field v-model="peopleNumber" label="Nombre de personne total : " required></v-text-field>
        <v-text-field v-model="undercoverNumber" label="Nombre d'Undercover : " required></v-text-field>
        <v-text-field v-model="misterWhiteNumber" label="Nombre de mister white : " required></v-text-field>
      </div>
      <div class="players-panel">

        <p>Les joueurs : </p>
        <v-text-field solo v-model="player1" label="Joueur 1"></v-text-field>
        <v-text-field solo v-model="player2" label="Joueur 2"></v-text-field>
        <v-text-field solo v-model="player3" label="Joueur 3"></v-text-field>
        <v-text-field solo v-model="player4" label="Joueur 4"></v-text-field>
        <v-text-field solo v-model="player5" label="Joueur 5"></v-text-field>
        <v-text-field solo v-model="player6" label="Joueur 6"></v-text-field>
        <v-text-field solo v-model="player7" label="Joueur 7"></v-text-field>
        <v-text-field solo v-model="player8" label="Joueur 8"></v-text-field>

        <v-btn @click="startGame" variant="tonal">
          Commencer la game
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'IndexPage',
  components: {
    InGame: () => import('@/components/InGame.vue')
  },
  data: function () {
    return {
      peopleNumber: 5,
      undercoverNumber: 1,
      misterWhiteNumber: 1,
      player1: null,
      player2: null,
      player3: null,
      player4: null,
      player5: null,
      player6: null,
      player7: null,
      player8: null,
    }
  },

  computed: {
    civiliansNumber() {
      return this.peopleNumber - this.undercoverNumber - this.misterWhiteNumber
    },
    isInGame() {
      return this.$store.state.game.isInGame
    }
  },

  methods: {
    startGame() {
      const tab = [this.player1, this.player2, this.player3, this.player4, this.player5, this.player6, this.player7, this.player8]
      const values = tab.filter((valeur) => valeur !== null);
      console.log("[this.player1, this.player2, this.player3, this.player4, this.player5, this.player6, this.player7, this.player8] ", values)
      this.$store.commit('game/setGame', {
        isInGame: true,
        peopleNumber: this.peopleNumber,
        undercoverNumber: this.undercoverNumber,
        misterWhiteNumber: this.misterWhiteNumber,
        players: values
      })
    }
  }
}
</script>

<style>
.panel {
  background: white;
  padding: 2rem;
  margin-bottom: 3rem;
}

.players-panel {
  background: white;
  padding: 2rem;
}

.card {
  margin-left: 20px;
  margin-right: 20px;
  max-width: 800px;
  margin: auto;
}

img {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 5px;
  width: 150px;
}

.img-left {}

@media only screen and (min-width : 800px) {
  .img-right {
    float: right;
  }

  .img-left {
    float: left;
  }
}

@media only screen and (max-width : 801px) {
  .flex-img {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
}
</style>