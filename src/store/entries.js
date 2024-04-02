import info from "@/store/info";
import {get, getDatabase, push, ref} from "firebase/database";
import category from "@/store/category";

export default {
    namespaced: true,
    state: {
        entries: null
    },
    actions: {
        async createEntry({dispatch, rootState, commit}, {type, manipulateBill, description, categoryId, date}){
            try {
                const db = getDatabase();

                let data = {};

                if (type === 'income'){
                    data = {
                        type: type,
                        val: manipulateBill,
                        description: description,
                        date: date
                    }
                }else{
                    data = {
                        type: type,
                        categoryId: categoryId,
                        val: manipulateBill,
                        description: description,
                        date: date
                    }
                }

                await push(ref(db, `users/${rootState.currentUserId}/entries`), data);

                await dispatch('info/updateUserInfo', {type, manipulateBill});
                await dispatch('category/editCategory', {categoryId, manipulateBill});

                await dispatch('getEntriesFromDb');
            }catch (e){
                throw e
            }
        },
        async getEntriesFromDb({rootState, commit}){
            try {
                const db = getDatabase();

                const entriesSnapshot = await get(ref(db, `users/${rootState.currentUserId}/entries`));

                commit('setEntries', entriesSnapshot.val());
            }catch (e){
                throw e;
            }
        }
    },
    mutations: {
        setEntries(state, data){
            state.entries = data;
        }
    },
    getters: {
        getEntries(state){
            return state.entries;
        }
    },
    modules: {
        info, category
    }
}