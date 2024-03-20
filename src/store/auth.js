import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import { auth } from "@/main";

const TOKEN_KEY = 'auth_token';

export default {
    namespaced: true,
    state:{
        currentUser: JSON.parse(sessionStorage.getItem('currentUser')) ,
        currentUserId: sessionStorage.getItem('uid'),
        authToken: sessionStorage.getItem(TOKEN_KEY)
    },
    actions: {
        async login(context, payload) {
            try {
                const userCredential = await signInWithEmailAndPassword(auth, payload.email, payload.password);

                const user = userCredential.user;

                context.commit('setUser', user);

                context.commit('setUserId', user.uid);

                const token = await user.getIdToken();
                context.commit('setAuthToken', token);

            } catch (error) {
                throw error;
            }
        },
        async register(context, payload){
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, payload.email, payload.password);
                await updateProfile(userCredential.user, { displayName: payload.name });

                context.commit('setUser', userCredential.user);
                context.commit('setUserId', userCredential.user.uid);
                context.commit('setAuthToken', await userCredential.user.getIdToken());

                await context.dispatch('setUserInfoToDb', payload.name);
            } catch (e) {
                throw e;
            }
        },
        async setUserInfoToDb(context, name) {
            try {
                const db = getDatabase();
                const userId = context.state.currentUserId;
                await set(ref(db, `users/${userId}/name`), name);
            } catch (e) {
                throw e;
            }
        }
    },
    mutations: {
        logout(state){
            state.currentUser = null;
            sessionStorage.removeItem('currentUser');

            state.authToken = null;
            sessionStorage.removeItem(TOKEN_KEY);

            state.currentUserId = null;
            sessionStorage.removeItem('uid');
        },
        setUser(state, user){
            state.currentUser = user;
            sessionStorage.setItem('currentUser', JSON.stringify(user));
        },
        setUserId(state, id){
            state.currentUserId = id;
            sessionStorage.setItem('uid', id);
        },
        setAuthToken(state, token) {
            state.authToken = token;
            sessionStorage.setItem(TOKEN_KEY, token);
        }
    },
    getters: {
        getUserInfo(state){
            return state.currentUser;
        },
        getUserId(state){
            return state.currentUserId;
        },
        getToken(state) {
            return state.authToken;
        }
    }
}
