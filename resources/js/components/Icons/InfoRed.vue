<script setup>
defineProps({
    title: String,
    tooltipPlacement: String,
    hasHtml: Boolean,
    isSmall: Boolean
});
</script>

<template>
    <button type="button" class="info-btn-red" :class="{ 'info-btn-sm': isSmall }" data-bs-toggle="tooltip"
        :title="title" :data-bs-html="hasHtml">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="info-icon-small">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 16v-4"></path>
            <path d="M12 8h.01"></path>
        </svg>
    </button>
</template>

<style scoped>
.info-btn-red {
    background-color: #F20F52;
    border: none;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    padding: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s;
    cursor: pointer;
    flex-shrink: 0;
}

.info-btn-sm {
    width: 16px;
    height: 16px;
}

.info-btn-red:hover {
    background-color: #d40d47;
}

.info-icon-small {
    width: 12px;
    height: 12px;
    stroke: white;
    stroke-width: 2;
}
</style>
