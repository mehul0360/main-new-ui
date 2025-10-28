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

const additionalMappingsData = ref({
    data: [
        { id: 1, retailField: '', shopifyField: '' },
        { id: 2, retailField: '', shopifyField: '' }
    ]
});

onMounted(() => {
    fetchStoredData();
});

const fetchStoredData = () => {
    if (isSaved.value && payload.value) {
        if (payload.value.additionalMappings && payload.value.additionalMappings.data) {
            additionalMappingsData.value.data = JSON.parse(
                JSON.stringify(payload.value.additionalMappings.data)
            );
        }
    }
};

const addMapping = () => {
    additionalMappingsData.value.data.push({
        id: Date.now(),
        retailField: '',
        shopifyField: ''
    });
};

const removeMapping = (id) => {
    if (additionalMappingsData.value.data.length > 1) {
        additionalMappingsData.value.data = additionalMappingsData.value.data.filter(m => m.id !== id);
    }
};

const getFormData = () => {
    return {
        data: JSON.parse(JSON.stringify(additionalMappingsData.value.data))
    };
};

watch(
    additionalMappingsData,
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
                        Additional Order Mappings
                    </h5>
                    <p class="text-muted mb-0"
                        style="font-size: 14px; font-family: 'Roboto', sans-serif; color: #4a5565; line-height: 20px;">
                        Add optional mappings to match additional order attributes.
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

            <div v-for="(mapping, index) in additionalMappingsData.data" :key="mapping.id"
                class="row g-4 align-items-center mb-3">
                <div class="col-4">
                    <div class="position-relative">
                        <select v-model="additionalMappingsData.data[index].retailField"
                            class="form-select custom-select"
                            style="font-size: 14px; height: 36px; font-family: 'Roboto', sans-serif;">
                            <option value="">Select field</option>
                            <option value="billing_address">Billing Address</option>
                            <option value="shipping_address">Shipping Address</option>
                            <option value="shipping_method">Shipping Method</option>
                            <option value="payment_method">Payment Method</option>
                            <option value="discount_code">Discount Code</option>
                            <option value="tax_amount">Tax Amount</option>
                            <option value="shipping_cost">Shipping Cost</option>
                            <option value="notes">Notes</option>
                            <option value="tags">Tags</option>
                            <option value="source_name">Source Name</option>
                            <option value="financial_status">Financial Status</option>
                            <option value="fulfillment_status">Fulfillment Status</option>
                            <option value="currency">Currency</option>
                            <option value="total_weight">Total Weight</option>
                            <option value="item_count">Item Count</option>
                            <option value="refund_status">Refund Status</option>
                        </select>
                    </div>
                </div>

                <div class="col-1 text-center">
                    <two-way-arrow />
                </div>

                <div class="col-4">
                    <div class="position-relative">
                        <select v-model="additionalMappingsData.data[index].shopifyField"
                            class="form-select custom-select"
                            style="font-size: 14px; height: 36px; font-family: 'Roboto', sans-serif;">
                            <option value="">Select field</option>
                            <option value="billing_address">Billing Address</option>
                            <option value="shipping_address">Shipping Address</option>
                            <option value="shipping_method">Shipping Method</option>
                            <option value="payment_method">Payment Method</option>
                            <option value="discount_code">Discount Code</option>
                            <option value="tax_amount">Tax Amount</option>
                            <option value="shipping_cost">Shipping Cost</option>
                            <option value="notes">Notes</option>
                            <option value="tags">Tags</option>
                            <option value="source_name">Source Name</option>
                            <option value="financial_status">Financial Status</option>
                            <option value="fulfillment_status">Fulfillment Status</option>
                            <option value="currency">Currency</option>
                            <option value="total_weight">Total Weight</option>
                            <option value="item_count">Item Count</option>
                            <option value="refund_status">Refund Status</option>
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
