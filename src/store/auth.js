import {signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
import {auth} from "@/main";

const TOKEN_KEY = 'auth_token';

export default {
    namespaced: true,
    state:{
        currentUser: JSON.parse(sessionStorage.getItem('currentUser')) ,
        authToken: sessionStorage.getItem(TOKEN_KEY)
    },
    actions: {
        async login(context, payload) {
            try {
                const userCredential = await signInWithEmailAndPassword(auth, payload.email, payload.password);

                const user = userCredential.user; // Получение информации о пользователе при успехе
                context.commit('setUser', user);

                const token = await user.getIdToken(); // Получение токена пользователя при успехе
                context.commit('setAuthToken', token);
            }catch (e){
                throw e
            }
        },
        async register(context, payload){
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, payload.email, payload.password);
                await updateProfile(userCredential.user, { displayName: payload.name }); // Установка displayName для пользователя
            }catch (e){
                throw e

            }
        }
    },
    mutations: {
        logout(state){
            state.currentUser = null; // сброс о юзере при выходе с хома
            sessionStorage.removeItem('currentUser');
            state.authToken = null; // сброс токена при выходе с хома или при закрытии вкладки (автоматически)
            sessionStorage.removeItem(TOKEN_KEY);
        },
        setUser(state, user){
            state.currentUser = user;
            sessionStorage.setItem('currentUser', JSON.stringify(user));
        },
        setAuthToken(state, token) {
            state.authToken = token;
            sessionStorage.setItem(TOKEN_KEY, token);
        }
    },
    getters: {
        getUserName(state){
            return state.currentUser ? state.currentUser.displayName : null;
        },
        getToken(state) {
            return state.authToken;
        }
    }
}
