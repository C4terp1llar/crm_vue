const API_KEY = 'ea9b473d971e7e388705bb18e8912eb6';
export default {
    namespaced: true,
    state: {
       currency: null
    },
    getters: {
        getCurrency(state){
            return state.currency;
        }
    },
    mutations: {
        setCurrency(state, data){
            state.currency = data;
        }
    },
    actions: {
        async uploadCurrency({commit}){
            try {
                const response = await fetch('https://v6.exchangerate-api.com/v6/b417460063c8f9e36403b645/latest/RUB')
                const data = await response.json();

                const info = {
                    'rates': {
                        'RUB': data.conversion_rates.RUB,
                        'USD': data.conversion_rates.USD,
                        'EUR': data.conversion_rates.EUR,
                    },
                    //'rates': data.conversion_rates, // это все курсы валют (мб потом выводить их все в список, но особого смысла пока нет, беру только основные валюты)
                    'date': data.time_last_update_utc,
                }

                commit('setCurrency', info);
            }catch (e){
                throw e;
            }
        }
    }
}