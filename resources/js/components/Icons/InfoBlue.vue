<script setup>
defineProps({
    title: String,
    tooltipPlacement: String,
    isSmall: Boolean
});
</script>

<template>
    <button type="button" class="info-btn" :class="{ 'info-btn-sm': isSmall }" data-bs-toggle="tooltip"
        :data-bs-placement="tooltipPlacement" :title="title">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="info-icon">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 16v-4"></path>
            <path d="M12 8h.01"></path>
        </svg>
    </button>
</template>

<style scoped>
.info-btn {
    background-color: #155dfc;
    border: none;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    padding: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s;
}

.info-btn:hover {
    background-color: #1348d4;
}

.info-btn-sm {
    width: 16px;
    height: 16px;
}

.info-icon {
    width: 10px;
    height: 10px;
    stroke: white;
    stroke-width: 2;
}
</style>
