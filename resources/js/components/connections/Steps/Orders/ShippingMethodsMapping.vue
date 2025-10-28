<script setup>
import { ref, onMounted, watch } from 'vue';
import { storeToRefs } from 'pinia';
import AutoSaveIndicator from '@/components/AutoSaveIndicator.vue';
import { useStepFiveStore } from '@/stores/connection-steps/stepfive';
import TwoWayArrow from '@/components/Icons/TwoWayArrow.vue';

const props = defineProps({
    isSaving: { type: Boolean, default: false },
    lastSavedAt: { type: Date, default: null },
    saveError: { type: Error, default: null },
    displayDuration: { type: Number, default: 3000 }
});

const emit = defineEmits(['data-changed']);

const stepFiveStore = useStepFiveStore();
const { payload, isSaved } = storeToRefs(stepFiveStore);

const shippingMethodsData = ref({
    data: [
        { id: 1, retailShippingMethod: '', shopifyShippingMethod: '' },
        { id: 2, retailShippingMethod: '', shopifyShippingMethod: '' }
    ]
});

onMounted(() => {
    fetchStoredData();
});

const fetchStoredData = () => {
    if (isSaved.value && payload.value) {
        if (payload.value.shippingMethods && payload.value.shippingMethods.data) {
            shippingMethodsData.value = JSON.parse(
                JSON.stringify(payload.value.shippingMethods)
            );
        }
    }
};

const addMapping = () => {
    shippingMethodsData.value.data.push({
        id: Date.now(),
        retailShippingMethod: '',
        shopifyShippingMethod: ''
    });
};

const removeMapping = (id) => {
    if (shippingMethodsData.value.data.length > 1) {
        shippingMethodsData.value.data = shippingMethodsData.value.data.filter(m => m.id !== id);
    }
};

const getFormData = () => {
    return {
        data: JSON.parse(JSON.stringify(shippingMethodsData.value.data))
    };
};

watch(
    shippingMethodsData,
    () => {
        emit('data-changed', getFormData());
    },
    { deep: true }
);

defineExpose({
    getFormData
});
</script>

<template>
    <div class="card shadow-sm my-4">
        <div class="card-body p-4">
            <div class="d-flex justify-content-between mb-4">
                <div>
                    <h5 class="fw-semibold mb-2"
                        style="color: #101828; font-size: 20px; font-family: 'Poppins', sans-serif; line-height: 28px;">
                        Shipping Methods Mappings
                    </h5>
                    <p class="text-muted mb-0"
                        style="font-size: 14px; font-family: 'Roboto', sans-serif; color: #4a5565; line-height: 20px;">
                        Map shipping methods between Retail Express and Shopify to ensure consistent shipping options
                        across
                        platforms.
                    </p>
                </div>

                <AutoSaveIndicator :is-saving="isSaving" :last-saved-at="lastSavedAt" :save-error="saveError"
                    :display-duration="1500" />
            </div>

            <div class="row g-4 py-2 border-bottom mb-3" style="border-color: #e5e7eb;">
                <div class="col-4">
                    <strong
                        style="font-size: 14px; font-family: 'Roboto', sans-serif; color: #101828; font-weight: 500;">
                        Retail Express Field
                    </strong>
                </div>
                <div class="col-1 text-center"></div>
                <div class="col-4">
                    <strong
                        style="font-size: 14px; font-family: 'Roboto', sans-serif; color: #101828; font-weight: 500;">
                        Shopify Field
                    </strong>
                </div>
                <div class="col-1"></div>
            </div>

            <div v-for="(mapping, index) in shippingMethodsData.data" :key="mapping.id"
                class="row g-4 align-items-center mb-3">
                <div class="col-4">
                    <div class="position-relative">
                        <select v-model="shippingMethodsData.data[index].retailShippingMethod"
                            class="form-select custom-select"
                            style="font-size: 14px; height: 36px; font-family: 'Roboto', sans-serif;">
                            <option value="">Select field</option>
                            <option value="express_parcel_shipping">Express Parcel Shipping</option>
                            <option value="express_small_box_shipping">Express Small Box Shipping</option>
                            <option value="standard_shipping">Standard Shipping</option>
                            <option value="bulky_goods">Bulky Goods</option>
                        </select>
                    </div>
                </div>

                <div class="col-1 text-center">
                    <two-way-arrow />
                </div>

                <div class="col-4">
                    <div class="position-relative">
                        <select v-model="shippingMethodsData.data[index].shopifyShippingMethod"
                            class="form-select custom-select"
                            style="font-size: 14px; height: 36px; font-family: 'Roboto', sans-serif;">
                            <option value="">Select field</option>
                            <option value="express_local">Express Local</option>
                            <option value="0_to_1_kg_standard">0 to 1 kg Standard</option>
                            <option value="1_to_5_kg">1 to 5 kg</option>
                            <option value="0_to_1_kg_express">0 to 1 kg Express</option>
                            <option value="1_to_5_kg_express">1 to 5 kg Express</option>
                        </select>
                    </div>
                </div>

                <div class="col-1">
                    <button @click="removeMapping(mapping.id)" type="button" class="btn btn-sm btn-delete p-0"
                        style="width: 32px; height: 32px; border: none; border-radius: 6px; background-color: transparent;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                            stroke="#6c757d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="delete-icon">
                            <path d="M18 6 6 18"></path>
                            <path d="m6 6 12 12"></path>
                        </svg>
                    </button>
                </div>
            </div>

            <button @click="addMapping" type="button" class="btn btn-add-mapping mt-2 d-inline-flex align-items-center"
                style="border: 1px solid #F20F52; color: #F20F52; background-color: white; font-size: 14px; font-family: 'Roboto', sans-serif; font-weight: 500; height: 36px; padding: 8px 16px; gap: 8px; border-radius: 6px;">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M5 12h14"></path>
                    <path d="M12 5v14"></path>
                </svg>
                Add Mapping
            </button>
        </div>
    </div>
</template>

<style scoped>
.card {
    background: #fff;
    border-radius: 14px;
    border: 1px solid #e5e7eb;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1), 0px 1px 2px -1px rgba(0, 0, 0, 0.1);
}

.card-body {
    padding: 33px !important;
}

.custom-select {
    border: 1px solid #d1d5db;
    background-color: #ffffff;
    color: #101828;
    transition: all 0.15s ease;
}

.custom-select:focus {
    border-color: #F20F52;
    box-shadow: 0 0 0 3px rgba(242, 15, 82, 0.1);
    outline: none;
}

.custom-select:hover {
    background-color: #f9fafb;
}

.btn-delete {
    transition: all 0.15s ease;
}

.btn-delete:hover {
    background-color: #fef2f2 !important;
}

.btn-delete:hover .delete-icon {
    stroke: #dc2626 !important;
}

.btn-delete:focus {
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
    outline: none;
}

.btn-add-mapping {
    transition: all 0.15s ease;
}

.btn-add-mapping:hover {
    background-color: #F20F52 !important;
    color: white !important;
    border-color: #F20F52 !important;
}

.btn-add-mapping:focus {
    box-shadow: 0 0 0 3px rgba(242, 15, 82, 0.1);
    outline: none;
}

.btn-add-mapping:hover svg {
    stroke: white;
}

.border-bottom {
    border-color: #e5e7eb !important;
}
</style>
