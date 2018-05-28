import ThingResource from '../../api/thing.service'

export default {
    state: {
        all: []
    },
    getters: {
        things: state => state.all
    },
    mutations: {
        setThings: (state, data) => {
            state.all = data
        },

        incrementThing: (state, data) => {
            state.all.push(data)
        },

        decrementThing: (state, id) => {
            state.all = state.all.filter(item => item._id !== id)
        }
    },
    actions: {
        getAllThings: ({ commit }) => {
            return ThingResource.show().then(response => {
                commit('setThings', response.data)
            })
            .catch(err => {
                throw err
            })
        },

        addThing: ({commit}, body) => {
            return ThingResource.create(body).then(response => {
                commit('incrementThing', response.data)
            })
            .catch(err => {
                throw err
            })       
        },

        removeThing: ({commit}, id) => {
            return ThingResource.delete(id).then(response => {
				commit('decrementThing', id)
			})
			.catch(err => {
				throw err
			})
        }
    }
}