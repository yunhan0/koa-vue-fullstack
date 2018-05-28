import ThingResource from '../../api/thing.service'

export default {
    state: {
        all: []
    },
    getters: {
        things: state => state.all
    },
    mutations: {
        SET_THINGS: (state, data) => {
            state.all = data
        },
        ADD_THING: (state, data) => {
            state.all.push(data)
        },
        EDIT_THING: (state, data) => {
            state.all.forEach((item, index) => {
                if (item._id === data._id) {
                    state.all[index].name = data.name
                    state.all[index].info = data.info
                }
            })
        },
        REMOVE_THING: (state, id) => {
            state.all = state.all.filter(item => item._id !== id)
        }
    },
    actions: {
        getAllThings: ({ commit }) => {
            return ThingResource.show().then(response => {
                commit('SET_THINGS', response.data)
            })
            .catch(err => {
                throw err
            })
        },
        addThing: ({commit}, thing) => {
            return ThingResource.create(thing).then(response => {
                commit('ADD_THING', response.data)
            })
            .catch(err => {
                throw err
            })
        },
        editThing: ({commit}, thing) => {
            return ThingResource.update(thing._id, thing.content).then(response => {
                commit('EDIT_THING', response.data)
            })
            .catch(err => {
                throw err
            })       
        },
        removeThing: ({commit}, id) => {
            return ThingResource.delete(id).then(response => {
				commit('REMOVE_THING', id)
			})
			.catch(err => {
				throw err
			})
        }
    }
}