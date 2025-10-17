<script setup>
defineProps({
    direction: String,
    color: String
});
</script>

<template>
    <span>
        <svg v-if="direction === 'right'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="arrow-icon" :class="{ 'arrow-icon-red': color === 'red' }">
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
        </svg>

        <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="arrow-icon"
            :class="{ 'arrow-icon-red': color === 'red' }">
            <path d="M19 12H5"></path>
            <path d="m12 19-7-7 7-7"></path>
        </svg>
    </span>
</template>

<style scoped>
.arrow-icon {
    width: 24px;
    height: 24px;
    color: #155dfc;
}

.arrow-icon-red {
    width: 20px;
    height: 20px;
    color: #F20F52;
}
</style>
