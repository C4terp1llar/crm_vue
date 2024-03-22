import {getDatabase, ref, get} from "firebase/database";

export default {
    namespaced: true,
    state: {
        userInfo: JSON.parse(sessionStorage.getItem('info'))
    },
    actions: {
        async getUserInfoFromDb({commit, rootState}) {
            try {
                const db = getDatabase();
                const [nameSnapshot, emailSnapshot] = await Promise.all([
                    get(ref(db, `users/${rootState.currentUserId}/info/name`)),
                    get(ref(db, `users/${rootState.currentUserId}/info/email`)),
                ]);

                const userInfo = {
                    name: nameSnapshot.val(),
                    email: emailSnapshot.val(),
                };

                commit('updateUserInfo', userInfo);
            } catch (e) {
                throw e;
            }
        }
    },
    mutations: {
        updateUserInfo(state, info) {
            state.userInfo = info;
            sessionStorage.setItem('info', JSON.stringify(info));
        }
    },
    getters: {
        getUserInfo(state) {
            return state.userInfo;
        }
    }
}
