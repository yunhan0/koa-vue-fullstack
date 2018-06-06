import ThingResource from '../../api/thing.service'

export default {
  state: {
    all: []
  },
  getters: {
    things: state => state.all
  },
  mutations: {
    SET_THINGS: (state, things) => {
      state.all = things
    },
    ADD_THING: (state, thing) => {
      state.all.push(thing)
    },
    EDIT_THING: (state, thing) => {
      state.all.forEach(item => {
        if (item._id === thing._id) {
          item.name = thing.name
          item.info = thing.info
        }
      })
    },
    REMOVE_THING: (state, id) => {
      state.all = state.all.filter(item => item._id !== id)
    }
  },
  actions: {
    getAllThings: ({ commit }) => {
      return ThingResource.show()
        .then(response => {
          commit('SET_THINGS', response.data)
        })
        .catch(err => {
          throw err
        })
    },
    addThing: ({commit}, thing) => {
      return ThingResource.create(thing)
        .then(response => {
          commit('ADD_THING', response.data)
        })
        .catch(err => {
          throw err
        })
    },
    editThing: ({commit}, payload) => {
      return ThingResource.update(payload._id, payload.content)
        .then(response => {
          commit('EDIT_THING', response.data)
        })
        .catch(err => {
          throw err
        })
    },
    /*eslint no-unused-vars: [2, { "args": "none" }]*/
    removeThing: ({commit}, id) => {
      return ThingResource.delete(id)
        .then(response => {
          commit('REMOVE_THING', id)
        })
        .catch(err => {
          throw err
        })
    }
  }
}