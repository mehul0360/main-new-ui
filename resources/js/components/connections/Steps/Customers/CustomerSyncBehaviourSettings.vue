<script setup>
import { ref, onMounted, defineExpose, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useStepFourStore } from '@/stores/connection-steps/stepfour';
import AutoSaveIndicator from '@/components/AutoSaveIndicator.vue';
import InfoRed from '@/components/Icons/InfoRed.vue';

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

const emit = defineEmits(['data-changed']);

const stepFourStore = useStepFourStore();
const { payload, isSaved } = storeToRefs(stepFourStore);

const syncBehaviorData = ref({
    importExistingCustomers: false,
    defaultCustomerType: '',
    defaultPaymentTerms: '',
    sendWelcomeEmail: false
});

const fetchStoredData = () => {
    if (isSaved.value && payload.value && payload.value.syncBehavior) {
        syncBehaviorData.value = { ...payload.value.syncBehavior };
    }
};

onMounted(() => {
    fetchStoredData();
});

const getFormData = () => {
    return {
        importExistingCustomers: syncBehaviorData.value.importExistingCustomers,
        defaultCustomerType: syncBehaviorData.value.defaultCustomerType,
        defaultPaymentTerms: syncBehaviorData.value.defaultPaymentTerms,
        sendWelcomeEmail: syncBehaviorData.value.sendWelcomeEmail
    };
};

watch(
    syncBehaviorData,
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
    <div class="card sync-behavior-card position-relative overflow-hidden my-4">
        <div class="card-body p-4">
            <div class="d-flex align-items-center justify-content-between mb-4">
                <div class="d-flex align-items-center gap-2">
                    <h2 class="section-title mb-0">Sync Behavior Settings</h2>
                    <info-red
                        title="These settings control how customer data behaves during sync operations. Configure defaults for new customers, payment terms, and notification preferences based on your business requirements." />
                </div>

                <AutoSaveIndicator :is-saving="isSaving" :last-saved-at="lastSavedAt" :save-error="saveError"
                    :display-duration="1500" />
            </div>

            <div class="d-flex flex-column" style="gap: 2rem;">
                <div class="d-flex flex-column gap-3">
                    <h3 class="subsection-title mb-0">Existing Customer Handling</h3>

                    <div class="d-flex align-items-start gap-3">
                        <div class="d-flex align-items-start gap-3" style="padding-top: 0.25rem;">
                            <input type="checkbox" v-model="syncBehaviorData.importExistingCustomers"
                                id="import_existing_customers" class="form-check-input checkbox-custom mt-1">
                            <div class="d-flex flex-column gap-2 flex-fill">
                                <label for="import_existing_customers" class="checkbox-main-label cursor-pointer mb-0">
                                    Import existing Shopify customers to Retail Express

                                    <span class="ms-2">
                                        <info-red has-html
                                            title="Critical for integration success:<br /><br /> When enabled, existing Shopify customers without matching Primary IDs in Retail Express will be imported during the first sync. This ensures complete customer record parity between systems from day one.<br /><br /> Important: This can create a large number of new customer records in Retail Express. Review your Shopify customer data first and ensure your Retail Express system can handle the import volume." />
                                    </span>
                                </label>
                                <div class="checkbox-description">
                                    Import customers from Shopify that don't have a matching Primary ID in Retail
                                    Express
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="d-flex flex-column gap-3">
                    <h3 class="subsection-title mb-0">Defaults for New Customers</h3>

                    <div class="d-flex flex-column" style="gap: 1.5rem;">
                        <div class="d-flex flex-column gap-2">
                            <label class="field-label-lg">Default customer type</label>
                            <select v-model="syncBehaviorData.defaultCustomerType" class="form-select custom-select-md">
                                <option value="">Select default customer type</option>
                                <option value="retail">Retail</option>
                                <option value="wholesale">Wholesale</option>
                                <option value="partner">Partner</option>
                            </select>
                        </div>

                        <div class="d-flex flex-column gap-2">
                            <label class="field-label-lg">Default payment terms</label>
                            <select v-model="syncBehaviorData.defaultPaymentTerms" class="form-select custom-select-md">
                                <option value="">Select payment terms</option>
                                <option value="no_credit">No Credit</option>
                                <option value="30_days">30 Days</option>
                                <option value="60_days">60 Days</option>
                                <option value="90_days">90 Days</option>
                            </select>
                        </div>

                        <div class="d-flex align-items-center gap-3">
                            <input type="checkbox" v-model="syncBehaviorData.sendWelcomeEmail" id="welcome_email"
                                class="form-check-input checkbox-custom">
                            <label for="welcome_email" class="checkbox-main-label cursor-pointer mb-0">
                                Send welcome email when customer is created in Shopify
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.sync-behavior-card {
    background: #fff;
    border-radius: 14px;
    border: 1px solid #e5e7eb;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1), 0px 1px 2px -1px rgba(0, 0, 0, 0.1);
}

.card-body {
    padding: 33px !important;
}

.section-title {
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    font-size: 20px;
    line-height: 28px;
    color: #101828;
}

.subsection-title {
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
    color: #101828;
}

.field-label-lg {
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: #101828;
}

.checkbox-main-label {
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: #101828;
}

.checkbox-description {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #4a5565;
}

.custom-select-md {
    max-width: 448px;
    height: 36px;
    font-size: 14px;
    background-color: #f9fafb;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    padding: 0.5rem 0.75rem;
    transition: border-color 0.2s, box-shadow 0.2s;
    font-family: 'Roboto', sans-serif;
}

.custom-select-md:focus {
    background-color: #f9fafb;
    border-color: #155dfc;
    box-shadow: 0 0 0 3px rgba(21, 93, 252, 0.1);
    outline: none;
}

.checkbox-custom {
    accent-color: #155dfc;
    width: 16px;
    height: 16px;
    margin: 0;
    flex-shrink: 0;
}

.cursor-pointer {
    cursor: pointer;
}

@media (max-width: 768px) {
    .section-title {
        font-size: 18px;
        line-height: 24px;
    }

    .subsection-title {
        font-size: 16px;
        line-height: 22px;
    }

    .custom-select-md {
        max-width: 100%;
    }

    .checkbox-main-label {
        font-size: 15px;
    }

    .checkbox-description {
        font-size: 13px;
    }
}
</style>
