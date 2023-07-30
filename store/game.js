export const state = () => ({
  isInGame: false,
  peopleNumber: 5,
  undercoverNumber: 1,
  misterWhiteNumber: 1,
  misterWhiteNumber: 1,
  playersName: [],

  players: []
})

export const mutations = {
  setGame(state, game) {
    state.isInGame = game.isInGame,
    state.peopleNumber = game.peopleNumber,
    state.undercoverNumber = game.undercoverNumber,
    state.misterWhiteNumber = game.misterWhiteNumber
    state.playersName = game.players
  },

  setPlayers(state, players) {
    state.players = players
  },

  addPlayer(state, player) {
    state.players.push(player)
  }
}
