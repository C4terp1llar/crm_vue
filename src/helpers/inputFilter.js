export function filterNonDigits(event) {
    event.target.value = event.target.value.replace(/[^0-9]/g, '');
}