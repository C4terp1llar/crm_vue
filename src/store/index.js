import { createStore } from 'vuex'
import auth from "@/store/auth";
import alert from "@/store/alert";
import info from "@/store/info";
import currency from "@/store/currency";
import category from "@/store/category";
import entries from "@/store/entries";
export default createStore({
  state: {
    currentUserId: JSON.parse(sessionStorage.getItem('uuid'))
  },
  getters: {
    getCurrentUserId(state){
      return state.currentUserId;
    }
  },
  mutations: {
    setUserId(state, id){
      state.currentUserId = id;
      sessionStorage.setItem('uuid', JSON.stringify(id));
    },
    logout(state){
      state.auth.authToken = null;
      sessionStorage.removeItem('auth_token');

      state.info.userInfo = info;
      sessionStorage.removeItem('info');

      state.currentUserId = null;
      sessionStorage.removeItem('uuid');

      state.currency.currency = null;

      state.category.categories = null;
      sessionStorage.removeItem('categories');

      state.entries.entries = null;
    },
  },
  modules: {
    auth, info, alert, currency, category, entries
  }
})
