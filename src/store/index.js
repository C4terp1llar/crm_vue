import { createStore } from 'vuex'
import auth from "@/store/auth";
import alert from "@/store/alert";
import info from "@/store/info";
import currency from "@/store/currency";
export default createStore({
  state: {
    currentUserId: null
  },
  getters: {
    getCurrentUserId(state){
      return state.currentUserId;
    }
  },
  mutations: {
    setUserId(state, id){
      state.currentUserId = id;
    },
    logout(state){
      state.auth.authToken = null;
      sessionStorage.removeItem('auth_token');

      state.info.userInfo = info;
      sessionStorage.removeItem('info');

      state.currentUserId = null;


    },
  },
  actions: {
    getUserId(state){
      return state.currentUserId;
    },
  },
  modules: {
    auth, info, alert, currency
  }
})
