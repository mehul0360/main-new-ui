<script setup>
import { computed, watch, ref } from 'vue';

const props = defineProps({
    isSaving: {
        type: Boolean,
        default: false
    },
    lastSavedAt: {
        type: Date,
        default: null
    },
    saveError: {
        type: Error,
        default: null
    },
    displayDuration: {
        type: Number,
        default: 3000
    }
});

const isVisible = ref(false);
const showSuccess = ref(false);
let hideTimer = null;

const statusText = computed(() => {
    if (props.isSaving) return 'Saving...';
    if (props.saveError && isVisible.value) return 'Save failed';
    if (showSuccess.value && isVisible.value) return 'Saved';
    return '';
});

const statusClass = computed(() => {
    if (props.isSaving) return 'text-primary';
    if (props.saveError) return 'text-danger';
    if (showSuccess.value) return 'text-success';
    return 'text-muted';
});

const hideIndicator = () => {
    isVisible.value = false;
    showSuccess.value = false;
};

watch(() => props.isSaving, (newVal, oldVal) => {
    if (newVal) {
        isVisible.value = true;
        showSuccess.value = false;

        if (hideTimer) {
            clearTimeout(hideTimer);
            hideTimer = null;
        }
    } else if (oldVal && !newVal) {
        if (!props.saveError) {
            showSuccess.value = true;
            isVisible.value = true;

            hideTimer = setTimeout(() => {
                hideIndicator();
            }, props.displayDuration);
        }
    }
});

watch(() => props.saveError, (newVal) => {
    if (newVal) {
        isVisible.value = true;
        showSuccess.value = false;

        if (hideTimer) {
            clearTimeout(hideTimer);
            hideTimer = null;
        }
    }
});
</script>

<template>
    <Transition name="fade">
        <div v-if="isVisible && statusText" class="auto-save-indicator">
            <div v-if="isSaving" class="spinner-border spinner-border-sm text-primary" role="status">
                <span class="visually-hidden">Saving...</span>
            </div>

            <svg v-else-if="showSuccess && !saveError" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" class="text-success">
                <path d="M20 6L9 17l-5-5"></path>
            </svg>

            <svg v-else-if="saveError" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="text-danger">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>

            <span class="ms-2" :class="statusClass" style="font-size: 12px;">
                {{ statusText }}
            </span>
        </div>
    </Transition>
</template>

<style scoped>
.auto-save-indicator {
    display: flex;
    align-items: center;
    padding: 4px 12px;
    border-radius: 6px;
    background-color: #f9fafb;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
