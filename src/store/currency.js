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
                const response = await fetch('https://api.apilayer.com/fixer/latest?base=RUB&symbols=RUB,EUR,USD', {
                    headers: {
                        'Content-Type': 'application/json',
                        'apikey': 'Uwqe9hhwlzt4Z8ZQ5BmUofpOpfofC9gW' // апи
                    }
                });

                const data = await response.json();

                const info = {
                    'rates': data.rates,
                    'date': data.date
                }

                commit('setCurrency', info);


            }catch (e){
                throw e;
            }
        }
    }
}