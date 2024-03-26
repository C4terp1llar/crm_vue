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

                const userInfoSnapshot = await get(ref(db, `users/${rootState.currentUserId}/info`));

                commit('updateUserInfo', userInfoSnapshot.val());
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
