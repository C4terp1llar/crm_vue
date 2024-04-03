import { ref, computed } from 'vue';


// по умолчанию кол-во айтемов на стр будет 5, если не передаать
export default function usePagination(data, options = { pageSize: 5 }) {
    const currentPage = ref(1);
    const totalPages = computed(() => Math.ceil(Object.entries(data.value).length / options.pageSize));

    const paginatedData = computed(() => {
        const start = (currentPage.value - 1) * options.pageSize;
        const end = start + options.pageSize;
        return Object.entries(data.value).slice(start, end);
    });

    function nextPage() {
        if (currentPage.value < totalPages.value) {
            currentPage.value++;
        }
    }

    function prevPage() {
        if (currentPage.value > 1) {
            currentPage.value--;
        }
    }

    return {
        currentPage,
        totalPages,
        paginatedData,
        nextPage,
        prevPage,
    };
}
