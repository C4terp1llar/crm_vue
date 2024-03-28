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

                commit('setCategories', categoriesSnapshot.val());
            } catch (e) {
                throw e;
            }
        },
        async editCategory({rootState, dispatch}, {id, newLimit, newTitle}) {
            try {
                const db = getDatabase();

                if (newTitle){
                    await set(ref(db, `users/${rootState.currentUserId}/categories/${id}`), {
                        limit: newLimit,
                        title: newTitle
                    });
                }else{
                    await set(ref(db, `users/${rootState.currentUserId}/categories/${id}/limit`), newLimit);
                }

                await dispatch('getCategoriesFromDb');
            } catch (e) {
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