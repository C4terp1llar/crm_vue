import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import { auth } from "@/main";
import info from "@/store/info";

export default {
    namespaced: true,
    state:{
        authToken: sessionStorage.getItem('auth_token')
    },
    actions: {
        async login({ commit, rootState, dispatch}, payload) {
            try {
                const userCredential = await signInWithEmailAndPassword(auth, payload.email, payload.password);

                commit('setUserId', userCredential.user.uid, { root: true });

                const token = await userCredential.user.getIdToken();
                commit('setAuthToken', token);

                await dispatch('info/getUserInfoFromDb');
            } catch (error) {
                throw error;
            }
        },
        async register({ commit, dispatch, rootState }, payload){
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, payload.email, payload.password);
                await updateProfile(userCredential.user, { displayName: payload.name });

                commit('setUserId', userCredential.user.uid, { root: true });

                commit('setAuthToken', await userCredential.user.getIdToken());

                await dispatch('setUserInfoToDb', payload);
                await dispatch('info/getUserInfoFromDb');
            } catch (e) {
                throw e;
            }
        },
        async setUserInfoToDb({ rootState }, {name, email, bill}) {
            try {
                const db = getDatabase();

                await set(ref(db, `users/${rootState.currentUserId}/info/name`), name);
                await set(ref(db, `users/${rootState.currentUserId}/info/email`), email);
                await set(ref(db, `users/${rootState.currentUserId}/info/bill`), bill);
            } catch (e) {
                throw e;
            }
        }
    },
    mutations: {
        setAuthToken(state, token) {
            state.authToken = token;
            sessionStorage.setItem('auth_token', token);
        }
    },
    getters: {
        getToken(state) {
            return state.authToken;
        }
    },
    modules: {
        info
    }
}
