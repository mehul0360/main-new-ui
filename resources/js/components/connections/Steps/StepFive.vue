<script setup>
import { computed, onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useStepFiveStore } from '@/stores/connection-steps/stepfive';
import { useAutoSave } from '@/composables/useAutoSave';
import AutoSaveIndicator from '@/components/AutoSaveIndicator.vue';
import AdditionalMapping from '@/components/connections/Steps/Orders/OrderAdditionalMapping.vue';
import SyncBehaviourSettings from '@/components/connections/Steps/Orders/OrderSyncBehaviourSettings.vue';
import PaymentMethodsMapping from '@/components/connections/Steps/Orders/PaymentMethodsMapping.vue';
import ShippingMethodsMapping from '@/components/connections/Steps/Orders/ShippingMethodsMapping.vue';
import ClickAndCollect from '@/components/connections/Steps/Orders/ClickAndCollect.vue';
import InfoRed from '@/components/Icons/InfoRed.vue';
import SingleArrow from '@/components/Icons/SingleArrow.vue';

const stepFiveStore = useStepFiveStore();
const { payload, isSaved } = storeToRefs(stepFiveStore);

const orderSyncModule = ref({
    orderSyncEnabled: true
});

const additionalMappingRef = ref(null);
const syncBehaviourRef = ref(null);
const paymentMethodsRef = ref(null);
const shippingMethodsRef = ref(null);
const clickCollectRef = ref(null);

const additionalMappingsData = ref({});
const syncBehaviorData = ref({});
const paymentMethodsData = ref({});
const shippingMethodsData = ref({});
const clickCollectData = ref({});

const updateAdditionalMappings = (data) => {
    additionalMappingsData.value = data;
};

const updateSyncBehavior = (data) => {
    syncBehaviorData.value = data;
};

const updatePaymentMethods = (data) => {
    paymentMethodsData.value = data;
};

const updateShippingMethods = (data) => {
    shippingMethodsData.value = data;
};

const updateClickCollect = (data) => {
    clickCollectData.value = data;
};

const formData = computed(() => ({
    orderSyncModule: orderSyncModule.value,
    additionalMappings: additionalMappingsData.value,
    syncBehavior: syncBehaviorData.value,
    paymentMethods: paymentMethodsData.value,
    shippingMethods: shippingMethodsData.value,
    clickCollect: clickCollectData.value
}));

const { isSaving, lastSavedAt, saveError } = useAutoSave(
    formData,
    stepFiveStore.saveInStorage,
    { debounceDelay: 800 }
);

onMounted(() => {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    fetchStoredData();
});

const fetchStoredData = () => {
    if (isSaved.value && payload.value) {
        if (payload.value.orderSyncModule) {
            orderSyncModule.value = { ...payload.value.orderSyncModule };
        }
    }
};

const syncStatusText = computed(() => {
    return orderSyncModule.value.orderSyncEnabled ? 'Order sync is enabled' : 'Order sync is disabled';
});

const syncDescriptionText = computed(() => {
    return orderSyncModule.value.orderSyncEnabled
        ? 'Orders will sync automatically between Retail Express and Shopify.'
        : 'No orders will sync while this module is disabled.';
});

const mappings = [
    { rexField: 'Order Number', shopifyField: 'Order Number' },
    { rexField: 'Customer ID', shopifyField: 'Customer ID' },
    { rexField: 'Order Date', shopifyField: 'Order Date' },
    { rexField: 'Order Status', shopifyField: 'Order Status' },
    { rexField: 'Payment Status', shopifyField: 'Payment Status' },
    { rexField: 'Total Amount', shopifyField: 'Total Amount' }
];

const validateForm = () => {
    return true;
};

const getFormData = () => {
    const additionalMappingData = additionalMappingRef.value?.getFormData() || { additionalMappings: [] };
    const syncBehaviourData = syncBehaviourRef.value?.getFormData() || {};
    const paymentMethodsData = paymentMethodsRef.value?.getFormData() || { paymentMethodMappings: [] };
    const shippingMethodsData = shippingMethodsRef.value?.getFormData() || { shippingMethodMappings: [] };
    const clickCollectData = clickCollectRef.value?.getFormData() || {};

    return {
        orderSyncEnabled: orderSyncModule.value.orderSyncEnabled,
        ...additionalMappingData,
        ...syncBehaviourData,
        ...paymentMethodsData,
        ...shippingMethodsData,
        ...clickCollectData
    };
};

defineExpose({
    validateForm,
    getFormData
});
</script>

<template>
    <div>
        <div class="card order-mapping-card position-relative overflow-hidden">
            <div class="card-body p-4">
                <div class="header-container position-relative">
                    <div class="d-flex flex-column align-items-center justify-content-start">
                        <h1 class="order-title text-center mb-0">Order Data Mapping</h1>
                    </div>

                    <div class="description-container mx-auto text-center mt-3">
                        <div class="description-text">
                            <p class="mb-0">Configure how order data syncs between Retail Express and Shopify.</p>
                            <p class="mb-3">
                                Set up field mappings and sync behaviors to ensure accurate order records.
                            </p>

                            <div class="d-flex align-items-center justify-content-center gap-2">
                                <span class="info-text">Need more information?</span>
                                <info-red
                                    title="Learn more about order sync configuration, field mapping best practices, and troubleshooting common sync issues." />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="card order-sync-card position-relative overflow-hidden my-4">
            <div class="card-body p-4">
                <div class="d-flex flex-column gap-4">
                    <div class="d-flex align-items-center justify-content-between mb-3">
                        <div class="d-flex align-items-center gap-2">
                            <h2 class="section-title mb-0">Order Sync Module</h2>
                            <info-red
                                title="Control whether orders sync between Retail Express and Shopify. When disabled, no order data will be synchronized in either direction." />
                        </div>

                        <AutoSaveIndicator :is-saving="isSaving" :last-saved-at="lastSavedAt" :save-error="saveError"
                            :display-duration="1500" />
                    </div>

                    <div class="d-flex align-items-center justify-content-between gap-4 w-100">
                        <div class="d-flex flex-column gap-2 flex-fill">
                            <div class="d-flex align-items-center gap-3">
                                <label class="toggle-switch" for="order-sync-toggle">
                                    <input type="checkbox" id="order-sync-toggle"
                                        v-model="orderSyncModule.orderSyncEnabled" class="toggle-input" />
                                    <span class="toggle-slider"></span>
                                </label>
                                <label for="order-sync-toggle" class="toggle-label cursor-pointer mb-0">
                                    {{ syncStatusText }}
                                </label>
                            </div>
                            <div class="toggle-description">
                                {{ syncDescriptionText }}

                                <div v-if="!orderSyncModule.orderSyncEnabled" class="mt-4 alert-warning-box">
                                    <div class="alert-title">
                                        ⚠️ Important Notice
                                    </div>
                                    <div class="alert-message">
                                        You might disable order sync during emergency maintenance, system migrations, or
                                        when troubleshooting sync issues. Note that orders created while this module is
                                        disabled will <strong>not sync</strong> even after re-enabling the module.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="card mandatory-mappings-card position-relative overflow-hidden">
            <div class="card-body p-4">
                <div class="d-flex flex-column gap-2 mb-4">
                    <h2 class="card-title mb-0">Mandatory Order Mappings</h2>
                    <p class="card-description mb-0">
                        These core order fields are required for order sync to function properly.
                    </p>
                </div>

                <div class="d-flex flex-column gap-3">
                    <div class="row g-3 align-items-center py-2 border-bottom mapping-header">
                        <div class="col-4">
                            <div class="field-header">Retail Express Field</div>
                        </div>
                        <div class="col-4 text-center"></div>
                        <div class="col-4">
                            <div class="field-header">Shopify Field</div>
                        </div>
                    </div>

                    <div v-for="(mapping, index) in mappings" :key="index" class="row align-items-center mapping-row">
                        <div class="col-4">
                            <div class="field-value">{{ mapping.rexField }}</div>
                        </div>
                        <div class="col-4 d-flex justify-content-center">
                            <single-arrow direction="right" color="red" />
                        </div>
                        <div class="col-4">
                            <div class="field-value">{{ mapping.shopifyField }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <additional-mapping ref="additionalMappingRef" :is-saving="isSaving" :last-saved-at="lastSavedAt"
            :save-error="saveError" :display-duration="1500" @data-changed="updateAdditionalMappings" />

        <sync-behaviour-settings ref="syncBehaviourRef" :is-saving="isSaving" :last-saved-at="lastSavedAt"
            :save-error="saveError" :display-duration="1500" @data-changed="updateSyncBehavior" />

        <payment-methods-mapping ref="paymentMethodsRef" :is-saving="isSaving" :last-saved-at="lastSavedAt"
            :save-error="saveError" :display-duration="1500" @data-changed="updatePaymentMethods" />

        <shipping-methods-mapping ref="shippingMethodsRef" :is-saving="isSaving" :last-saved-at="lastSavedAt"
            :save-error="saveError" :display-duration="1500" @data-changed="updateShippingMethods" />

        <click-and-collect ref="clickCollectRef" :is-saving="isSaving" :last-saved-at="lastSavedAt"
            :save-error="saveError" :display-duration="1500" @data-changed="updateClickCollect" />
    </div>
</template>

<style scoped>
.order-mapping-card {
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

.order-sync-card {
    background: #fff;
    border-radius: 14px;
    border: 1px solid #e5e7eb;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1), 0px 1px 2px -1px rgba(0, 0, 0, 0.1);
}

.section-title {
    font-weight: 500;
    font-size: 20px;
    line-height: 28px;
    color: #101828;
}

.toggle-switch {
    position: relative;
    display: inline-block;
    width: 32px;
    height: 18.4px;
    margin: 0;
    flex-shrink: 0;
}

.toggle-input {
    opacity: 0;
    width: 0;
    height: 0;
}

.toggle-slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #d1d5db;
    transition: all 0.3s;
    border-radius: 34px;
    border: 1px solid transparent;
}

.toggle-slider:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 1px;
    background-color: white;
    transition: all 0.3s;
    border-radius: 50%;
}

.toggle-input:checked+.toggle-slider {
    background-color: #F20F52;
}

.toggle-input:checked+.toggle-slider:before {
    transform: translateX(14px);
}

.toggle-input:focus+.toggle-slider {
    box-shadow: 0 0 0 3px rgba(242, 15, 82, 0.1);
}

.toggle-label {
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: #101828;
}

.toggle-description {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #4a5565;
}

.cursor-pointer {
    cursor: pointer;
}

.alert-warning-box {
    padding: 1rem;
    background-color: #fef3c7;
    border: 1px solid #fbbf24;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.alert-title {
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: #92400e;
}

.alert-message {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 13px;
    line-height: 18px;
    color: #92400e;
}

.alert-message strong {
    font-weight: 600;
}

.mandatory-mappings-card {
    background: #fff;
    border-radius: 14px;
    border: 1px solid #e5e7eb;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1), 0px 1px 2px -1px rgba(0, 0, 0, 0.1);
}

.card-title {
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    font-size: 20px;
    line-height: 28px;
    color: #101828;
}

.card-description {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #4a5565;
}

.mapping-header {
    border-bottom: 1px solid #e5e7eb !important;
}

.field-header {
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    font-size: 14px;
    color: #101828;
}

.mapping-row {
    margin: 0.1rem 0;
    background-color: #f9fafb;
    border-radius: 8px;
    padding: 0.5rem 1rem;
}

.field-value {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 14px;
    color: #101828;
}
</style>
