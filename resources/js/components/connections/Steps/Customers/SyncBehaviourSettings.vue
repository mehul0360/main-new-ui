<script setup>
import { ref } from 'vue';

const importExistingCustomers = ref(false);
const defaultCustomerType = ref('');
const defaultPaymentTerms = ref('');
const sendWelcomeEmail = ref(false);
</script>

<template>
    <div class="card sync-behavior-card position-relative overflow-hidden my-4">
        <div class="card-body p-4">
            <div class="d-flex align-items-center gap-3 mb-4">
                <h2 class="section-title mb-0">Sync Behavior Settings</h2>
                <button type="button" class="info-btn-red" data-bs-toggle="tooltip"
                    title="These settings control how customer data behaves during sync operations. Configure defaults for new customers, payment terms, and notification preferences based on your business requirements.">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="info-icon-small">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M12 16v-4"></path>
                        <path d="M12 8h.01"></path>
                    </svg>
                </button>
            </div>

            <div class="d-flex flex-column" style="gap: 2rem;">
                <div class="d-flex flex-column gap-3">
                    <h3 class="subsection-title mb-0">Existing Customer Handling</h3>

                    <div class="d-flex align-items-start gap-3">
                        <div class="d-flex align-items-start gap-3" style="padding-top: 0.25rem;">
                            <input type="checkbox" v-model="importExistingCustomers" id="import_existing_customers"
                                class="form-check-input checkbox-custom mt-1">
                            <div class="d-flex flex-column gap-1 flex-fill">
                                <label for="import_existing_customers" class="checkbox-main-label cursor-pointer mb-0">
                                    Import existing Shopify customers to Retail Express
                                </label>
                                <div class="checkbox-description">
                                    Import customers from Shopify that don't have a matching Primary ID in Retail
                                    Express
                                </div>
                            </div>
                            <button type="button" class="info-btn-red flex-shrink-0" style="margin-top: 0.125rem;"
                                data-bs-html="true" data-bs-toggle="tooltip"
                                title="Critical for integration success:<br /><br /> When enabled, existing Shopify customers without matching Primary IDs in Retail Express will be imported during the first sync. This ensures complete customer record parity between systems from day one.<br /><br /> Important: This can create a large number of new customer records in Retail Express. Review your Shopify customer data first and ensure your Retail Express system can handle the import volume.">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="info-icon-small">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <path d="M12 16v-4"></path>
                                    <path d="M12 8h.01"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div class="d-flex flex-column gap-3">
                    <h3 class="subsection-title mb-0">Defaults for New Customers</h3>

                    <div class="d-flex flex-column" style="gap: 1.5rem;">
                        <div class="d-flex flex-column gap-2">
                            <label class="field-label-lg">Default customer type</label>
                            <select v-model="defaultCustomerType" class="form-select custom-select-md">
                                <option value="">Select default customer type</option>
                                <option value="retail">Retail</option>
                                <option value="wholesale">Wholesale</option>
                                <option value="partner">Partner</option>
                            </select>
                        </div>

                        <div class="d-flex flex-column gap-2">
                            <label class="field-label-lg">Default payment terms</label>
                            <select v-model="defaultPaymentTerms" class="form-select custom-select-md">
                                <option value="">Select payment terms</option>
                                <option value="no_credit">No Credit</option>
                                <option value="30_days">30 Days</option>
                                <option value="60_days">60 Days</option>
                                <option value="90_days">90 Days</option>
                            </select>
                        </div>

                        <div class="d-flex align-items-center gap-3">
                            <input type="checkbox" v-model="sendWelcomeEmail" id="welcome_email"
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

/* Responsive adjustments */
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
