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
                .then(things => {
                    commit('SET_THINGS', things)
                })
                .catch(err => {
                    throw err
                })
        },
        addThing: ({commit}, payload) => {
            return ThingResource.create(payload)
                .then(thing => {
                    commit('ADD_THING', thing)
                })
                .catch(err => {
                    throw err
                })
        },
        editThing: ({commit}, payload) => {
            return ThingResource.update(payload._id, payload.content)
                .then(thing => {
                    commit('EDIT_THING', thing)
                })
                .catch(err => {
                    throw err
                })
        },
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