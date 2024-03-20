import store from "@/store";

export function sendAlert(message, type) {
    store.commit('alert/showAlert', {message: message,type: type});
}
