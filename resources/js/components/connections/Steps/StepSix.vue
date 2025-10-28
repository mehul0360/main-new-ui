<script setup>
import { computed, onMounted, ref } from 'vue';
import { useStepSixStore } from '@/stores/connection-steps/stepsix';
import { useAutoSave } from '@/composables/useAutoSave';
import MandatoryMapping from '@/components/connections/Steps/StoresInventory/MandatoryMapping.vue';
import BufferQuantityConfig from '@/components/connections/Steps/StoresInventory/BufferQuantityConfig.vue';
import InfoRed from '@/components/Icons/InfoRed.vue';

const stepSixStore = useStepSixStore();

const mandatoryMappingRef = ref(null);
const mandatoryMappingData = ref({});

const bufferQuantityRef = ref(null);
const bufferQuantityData = ref({});

const updateMandatoryMappings = (data) => {
    mandatoryMappingData.value = data;
};

const updateBufferQuantity = (data) => {
    bufferQuantityData.value = data;
};

const formData = computed(() => ({
    storeMappings: mandatoryMappingData.value,
    bufferQuantityMappings: bufferQuantityData.value,
}));

const { isSaving, lastSavedAt, saveError } = useAutoSave(
    formData,
    stepSixStore.saveInStorage,
    { debounceDelay: 800 }
);

onMounted(() => {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});

const validateForm = () => {
    return true
};

const getFormData = () => {
    const mandatoryData = mandatoryMappingRef.value?.getFormData() || { storeMappings: [] };
    const bufferQuantityData = bufferQuantityRef.value?.getFormData() || { bufferQuantityMappings: [] };

    return {
        ...mandatoryData,
        ...bufferQuantityData
    };
};

defineExpose({
    validateForm,
    getFormData
});
</script>

<template>
    <div>
        <div class="card store-inventory-mapping-card position-relative overflow-hidden">
            <div class="card-body p-4">
                <div class="header-container position-relative">
                    <div class="d-flex flex-column align-items-center justify-content-start">
                        <h1 class="order-title text-center mb-0">Stores and Inventory</h1>
                    </div>

                    <div class="description-container mx-auto text-center mt-3">
                        <div class="description-text">
                            <p class="mb-0">
                                Configure store location mapping and inventory sync settings between Retail Express and
                                Shopify.
                            </p>
                            <p class="mb-3">
                                At least one location mapping is required to start syncing inventory data between
                                systems.
                            </p>

                            <div class="d-flex align-items-center justify-content-center gap-2">
                                <span class="info-text">Need more information?</span>
                                <info-red
                                    title="Learn more about store mapping, inventory sync configuration, and buffer quantity management best practices." />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <mandatory-mapping ref="mandatoryMappingRef" :is-saving="isSaving" :last-saved-at="lastSavedAt"
            :save-error="saveError" :display-duration="1500" @data-changed="updateMandatoryMappings" />

        <buffer-quantity-config ref="bufferQuantityRef" :is-saving="isSaving" :last-saved-at="lastSavedAt"
            :save-error="saveError" :display-duration="1500" @data-changed="updateBufferQuantity" />
    </div>
</template>

<style scoped>
.store-inventory-mapping-card {
    background: #fff;
    border-radius: 14px;
    border: 1px solid #e5e7eb;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1), 0px 1px 2px -1px rgba(0, 0, 0, 0.1);
}

.card-body {
    padding: 33px !important;
}

.header-container {
    min-height: 120px;
}

.order-title {
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    font-size: 30px;
    line-height: 36px;
    color: #101828;
    white-space: nowrap;
}

.description-container {
    max-width: 672px;
    margin-top: 1rem;
}

.description-text {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 16px;
    line-height: 25px;
    color: #4a5565;
}

.description-text p {
    white-space: nowrap;
}

.info-text {
    font-size: 14px;
    color: #4a5565;
}
</style>
