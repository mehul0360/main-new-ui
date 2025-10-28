<script setup>
import { ref, onMounted, watch } from 'vue';
import { storeToRefs } from 'pinia';
import AutoSaveIndicator from '@/components/AutoSaveIndicator.vue';
import { useStepSixStore } from '@/stores/connection-steps/stepsix';
import InfoRed from '@/components/Icons/InfoRed.vue';

const props = defineProps({
    isSaving: { type: Boolean, default: false },
    lastSavedAt: { type: Date, default: null },
    saveError: { type: Error, default: null },
    displayDuration: { type: Number, default: 3000 }
});

const emit = defineEmits(['data-changed']);

const stepSixStore = useStepSixStore();
const { payload, isSaved } = storeToRefs(stepSixStore);

const bufferQuantityData = ref({
    data: [
        { id: 1, shopifyStore: '', product_type: '', brand: '', buffer_quantity: 0 },
        { id: 2, shopifyStore: '', product_type: '', brand: '', buffer_quantity: 0 },
    ]
});

const shopifyStores = ref([
    { id: 1, name: 'Main Store' },
    { id: 2, name: 'Warehouse Store' },
    { id: 3, name: 'Retail Store' },
    { id: 4, name: 'Online Store' },
]);

const productTypes = ref([
    { id: 1, name: 'Electronics' },
    { id: 2, name: 'Clothing' },
    { id: 3, name: 'Books' },
    { id: 4, name: 'Home & Garden' },
    { id: 5, name: 'Sports & Outdoors' },
    { id: 6, name: 'Beauty & Personal Care' },
]);

const brands = ref([
    { id: 1, name: 'Brand A' },
    { id: 2, name: 'Brand B' },
    { id: 3, name: 'Brand C' },
    { id: 4, name: 'Brand D' },
    { id: 5, name: 'Brand E' },
]);

onMounted(() => {
    fetchStoredData();
});

const fetchStoredData = () => {
    if (isSaved.value && payload.value) {
        if (payload.value.bufferQuantityMappings && payload.value.bufferQuantityMappings.data) {
            bufferQuantityData.value = JSON.parse(
                JSON.stringify(payload.value.bufferQuantityMappings)
            );
        }
    }
};

const addMapping = () => {
    bufferQuantityData.value.data.push({
        id: Date.now(),
        shopifyStore: '',
        product_type: '',
        brand: '',
        buffer_quantity: 0,
    });
};

const removeMapping = (id) => {
    if (bufferQuantityData.value.data.length > 1) {
        bufferQuantityData.value.data = bufferQuantityData.value.data.filter(m => m.id !== id);
    }
};

const getFormData = () => {
    return {
        data: JSON.parse(JSON.stringify(bufferQuantityData.value.data))
    };
};

watch(
    bufferQuantityData,
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
            <div class="d-flex justify-content-between mb-1">
                <div class="d-flex align-items-center gap-2">
                    <h5 class="fw-semibold mt-1"
                        style="color: #101828; font-size: 20px; font-family: 'Poppins', sans-serif; line-height: 28px;">
                        Buffer Quantity Configuration
                    </h5>

                    <info-red
                        title="Configure buffer quantities based on store, product type, and brand attributes. This helps maintain stock levels and prevents overselling." />
                </div>

                <AutoSaveIndicator :is-saving="isSaving" :last-saved-at="lastSavedAt" :save-error="saveError"
                    :display-duration="1500" />
            </div>
            <p class="text-muted mb-4"
                style="font-size: 14px; font-family: 'Roboto', sans-serif; color: #4a5565; line-height: 20px;">
                Set buffer quantities to maintain stock levels based on store location, product type, and brand
                combinations.
            </p>

            <div class="row g-4 py-2 border-bottom mb-3" style="border-color: #e5e7eb;">
                <div class="col-3">
                    <strong
                        style="font-size: 14px; font-family: 'Roboto', sans-serif; color: #101828; font-weight: 500;">
                        Shopify Store
                    </strong>
                </div>
                <div class="col-3">
                    <strong
                        style="font-size: 14px; font-family: 'Roboto', sans-serif; color: #101828; font-weight: 500;">
                        Product Type
                    </strong>
                </div>
                <div class="col-3">
                    <strong
                        style="font-size: 14px; font-family: 'Roboto', sans-serif; color: #101828; font-weight: 500;">
                        Brand
                    </strong>
                </div>
                <div class="col-2">
                    <strong
                        style="font-size: 14px; font-family: 'Roboto', sans-serif; color: #101828; font-weight: 500;">
                        Buffer Quantity
                    </strong>
                </div>
                <div class="col-1"></div>
            </div>

            <div v-for="(mapping, index) in bufferQuantityData.data" :key="mapping.id"
                class="row g-4 align-items-center mb-3">
                <div class="col-3">
                    <div class="position-relative">
                        <select v-model="mapping.shopifyStore" class="form-select custom-select"
                            style="font-size: 14px; height: 36px; font-family: 'Roboto', sans-serif;">
                            <option value="">Select field</option>
                            <option v-for="option in shopifyStores" :key="option.id" :value="option.id">
                                {{ option.name }}
                            </option>
                        </select>
                    </div>
                </div>

                <div class="col-3">
                    <div class="position-relative">
                        <select v-model="mapping.product_type" class="form-select custom-select"
                            style="font-size: 14px; height: 36px; font-family: 'Roboto', sans-serif;">
                            <option value="">Select field</option>
                            <option v-for="option in productTypes" :key="option.id" :value="option.id">
                                {{ option.name }}
                            </option>
                        </select>
                    </div>
                </div>

                <div class="col-3">
                    <div class="position-relative">
                        <select v-model="mapping.brand" class="form-select custom-select"
                            style="font-size: 14px; height: 36px; font-family: 'Roboto', sans-serif;">
                            <option value="">Select field</option>
                            <option v-for="option in brands" :key="option.id" :value="option.id">
                                {{ option.name }}
                            </option>
                        </select>
                    </div>
                </div>

                <div class="col-2">
                    <input type="number" v-model="mapping.buffer_quantity" class="form-control custom-input-md"
                        min="0" />
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

.custom-input-md {
    height: 36px;
    font-size: 14px;
    background-color: #f9fafb;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    padding: 0.5rem 0.75rem;
    transition: border-color 0.2s, box-shadow 0.2s;
    font-family: 'Roboto', sans-serif;
}

.custom-input-md:focus {
    background-color: #f9fafb;
    border-color: #155dfc;
    box-shadow: 0 0 0 3px rgba(21, 93, 252, 0.1);
    outline: none;
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
