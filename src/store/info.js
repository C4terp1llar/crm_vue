import {getDatabase, ref, get, set} from "firebase/database";

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

                commit('setUserInfo', userInfoSnapshot.val());
            } catch (e) {
                throw e;
            }
        },
        async updateUserInfo({dispatch, rootState, getters}, {type, manipulateBill, name}){
            try {
                const db = getDatabase();

                if (type){
                    let actualBill = null;

                    if (type === 'income'){
                        actualBill = manipulateBill + getters.getUserInfo.bill
                    }else{
                        actualBill = getters.getUserInfo.bill - manipulateBill;
                    }

                    await set(ref(db, `users/${rootState.currentUserId}/info/bill`), actualBill);
                }else {
                    await set(ref(db, `users/${rootState.currentUserId}/info/name`),name);
                }

                await dispatch('getUserInfoFromDb');
            }catch (e){
                throw e
            }
        },
    },
    mutations: {
        setUserInfo(state, info) {
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
