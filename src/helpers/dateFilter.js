export default function dateFilter(date) {
    const options = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    };

    return new Date(date).toLocaleString('ru-RU', options);
}
