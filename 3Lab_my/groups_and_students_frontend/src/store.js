import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        groupId: '',
        groupName: ''
    },
    mutations: {
        changeGroupId(state, groupId) {
            state.groupId = groupId
        },
        changeGroupName(state, groupName) {
            state.groupName = groupName
        }
    },
    getters: {
        groupId: state => state.groupId,
        groupName: state => state.groupName
    }
});