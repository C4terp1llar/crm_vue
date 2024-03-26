export default function dateFilter(date) {
    const options = {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    };

    return new Date(date).toLocaleDateString('ru-RU', options);
}