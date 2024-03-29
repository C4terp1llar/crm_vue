import info from "@/store/info";
import {getDatabase, push, ref} from "firebase/database";
import category from "@/store/category";

export default {
    namespaced: true,
    state: {
        entries: JSON.parse(sessionStorage.getItem('entries'))
    },
    actions: {
        async createEntry({dispatch, rootState}, {type, manipulateBill, description, categoryId, date}){
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

            }catch (e){
                throw e
            }
        }
    },
    mutations: {
        setEntries(state, data){
            state.categories = data;
            sessionStorage.setItem('entries', JSON.stringify(data));
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