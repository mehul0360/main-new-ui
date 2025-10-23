<script setup>
import { ref, onMounted } from 'vue';
import { useStepFiveStore } from '@/stores/connection-steps/stepfive';
import TwoWayArrow from '@/components/Icons/TwoWayArrow.vue';

const stepFiveStore = useStepFiveStore();

const mappings = ref([
    { id: 1, retailPaymentMethod: '', shopifyPaymentMethod: '' },
    { id: 2, retailPaymentMethod: '', shopifyPaymentMethod: '' },
    { id: 3, retailPaymentMethod: '', shopifyPaymentMethod: '' },
    { id: 4, retailPaymentMethod: '', shopifyPaymentMethod: '' }
]);

onMounted(() => {
    if (stepFiveStore.isSaved) {
        const savedData = stepFiveStore.getPayload();
        if (savedData.paymentMethodMappings && savedData.paymentMethodMappings.length > 0) {
            mappings.value = savedData.paymentMethodMappings;
        }
    }
});

const addMapping = () => {
    mappings.value.push({
        id: Date.now(),
        retailPaymentMethod: '',
        shopifyPaymentMethod: ''
    });
};

const removeMapping = (id) => {
    if (mappings.value.length > 1) {
        mappings.value = mappings.value.filter(m => m.id !== id);
    }
};

const getFormData = () => {
    return {
        paymentMethodMappings: mappings.value
    };
};

defineExpose({
    getFormData
});
</script>

<template>
    <div class="card shadow-sm my-4">
        <div class="card-body p-4">
            <div class="mb-4">
                <h5 class="fw-semibold mb-2"
                    style="color: #101828; font-size: 20px; font-family: 'Poppins', sans-serif; line-height: 28px;">
                    Payment Methods Mapping
                </h5>
                <p class="text-muted mb-0"
                    style="font-size: 14px; font-family: 'Roboto', sans-serif; color: #4a5565; line-height: 20px;">
                    Map payment methods between Retail Express and Shopify to ensure consistent payment processing
                    across platforms.
                </p>
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

            <div v-for="mapping in mappings" :key="mapping.id" class="row g-4 align-items-center mb-3">
                <div class="col-4">
                    <div class="position-relative">
                        <select v-model="mapping.retailPaymentMethod" class="form-select custom-select"
                            style="font-size: 14px; height: 36px; font-family: 'Roboto', sans-serif;">
                            <option value="">Select method</option>
                            <option value="after_pay">AfterPay</option>
                            <option value="credit_card">Credit Card</option>
                            <option value="master_card">Master Card</option>
                            <option value="visa">Shopify Payments</option>
                            <option value="alipay">AliPay</option>
                            <option value="zippay">ZipPay</option>
                        </select>
                    </div>
                </div>

                <div class="col-1 text-center">
                    <two-way-arrow />
                </div>

                <div class="col-4">
                    <div class="position-relative">
                        <input type="text" v-model="mapping.shopifyPaymentMethod" class="form-control custom-input-md"
                            placeholder="Enter Shopify Payment Method" />
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
