export default {
    namespaced: true,
    state: {
        isVisible: false,
        message: '',
        type: ''
    },
    mutations: {
        showAlert(state, payload){
            state.isVisible = true;
            state.message = payload.message;
            state.type = payload.type;
            setTimeout(() => {
                state.isVisible = false;
            }, 3000)
            setTimeout(() => {
                state.message = '';
                state.type = '';
            }, 3500)
        }
    },
}