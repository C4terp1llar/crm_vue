export default function currencyFilter(val, cur){
    return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: cur
    }).format(val)
}