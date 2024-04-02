import {getDatabase, ref, push, get, set} from "firebase/database";
export default {
    namespaced: true,
    state: {
        categories: JSON.parse(sessionStorage.getItem('categories'))
    },
    mutations: {
        setCategories(state, data){
            state.categories = data;
            sessionStorage.setItem('categories', JSON.stringify(data));
        }
    },
    actions: {
        async createCategory({ dispatch, rootState }, {title, limit}) {
            try {
                const db = getDatabase();
                await push(ref(db, `users/${rootState.currentUserId}/categories`), {title, limit});

                await dispatch('getCategoriesFromDb');
            } catch (e) {
                throw e;
            }
        },
        async getCategoriesFromDb({ commit, rootState }) {
            try {
                const db = getDatabase();
                const categoriesSnapshot = await get(ref(db, `users/${rootState.currentUserId}/categories`));

                if (categoriesSnapshot.val()){
                    commit('setCategories', categoriesSnapshot.val());
                }
            } catch (e) {
                throw e;
            }
        },
        async editCategory({rootState, dispatch, getters}, payload) {
            try {
                const db = getDatabase();

                const id = payload.id ? payload.id : payload.categoryId;
                // const limit = payload.newLimit ? payload.newLimit : getters.getCategories[id].limit - payload.manipulateBill;

                if (payload.newTitle){
                    await set(ref(db, `users/${rootState.currentUserId}/categories/${id}`), {
                        limit: payload.newLimit,
                        title: payload.newTitle
                    });
                }else if (!payload.newTitle && payload.newLimit) {
                    await set(ref(db, `users/${rootState.currentUserId}/categories/${id}/limit`), payload.newLimit);
                }else if (!payload.newTitle && payload.manipulateBill && payload.categoryId){
                    await set(ref(db, `users/${rootState.currentUserId}/categories/${id}/limit`), getters.getCategories[id].limit - payload.manipulateBill);
                }

                await dispatch('getCategoriesFromDb');
            } catch (e) {
                console.log('error here')
                throw e;
            }
        },
    },
    getters: {
        getCategories(state){
            return state.categories
        }
    }
}