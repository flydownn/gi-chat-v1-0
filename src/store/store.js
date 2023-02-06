import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate"
export default createStore({
    state:{
        user: null,
        saltkey: 'groupchat!_*#9'
    },
    mutations:{
        setUser(state, user){
            state.user = user;
        }
    },
    getters:{
        _isAuthenticated : state => state.user != null,
        _getCurrentUser(state){
            const user = state.user;
            delete user?.password;
            return user;
        },
        _saltkey : state => state.saltkey
    },
    plugins: [createPersistedState()]
})