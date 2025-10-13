<script setup>
import { onMounted, ref } from 'vue';
import AdditionalMappings from './Customers/AdditionalMapping.vue';
import SyncBehaviourSettings from './Customers/SyncBehaviourSettings.vue';
import TierGroups from './Customers/TierGroups.vue';

const primaryId = ref('email');

onMounted(() => {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});
</script>

<template>
    <div>
        <div class="card customer-mapping-card position-relative overflow-hidden">
            <div class="card-body p-4">
                <div class="header-container position-relative">
                    <div class="d-flex flex-column align-items-center justify-content-start">
                        <h1 class="customer-title text-center mb-0">Customer Data Mapping</h1>
                    </div>

                    <div class="description-container mx-auto text-center mt-3">
                        <div class="description-text">
                            <p class="mb-0">Configure how customer data syncs between Retail Express and Shopify.</p>
                            <p class="mb-3">
                                Set up field mappings and sync behaviors to ensure accurate customer records.
                            </p>

                            <div class="d-flex align-items-center justify-content-center gap-2">
                                <span class="info-text">Need more information?</span>
                                <button type="button" class="info-btn-red" data-bs-toggle="tooltip"
                                    title="Learn more about customer sync configuration, field mapping best practices, and troubleshooting common sync issues.">
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
                </div>
            </div>
        </div>

        <div class="card source-card position-relative overflow-hidden mt-4">
            <div class="card-body p-4">
                <div class="d-flex align-items-center">
                    <h2 class="section-title mb-0">Primary ID Field</h2>
                    <button type="button" class="info-btn-red" data-bs-toggle="tooltip"
                        title="Used to match customers between systems. Must match Shopify configuration.">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="info-icon-small">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M12 16v-4"></path>
                            <path d="M12 8h.01"></path>
                        </svg>
                    </button>
                </div>

                <select v-model="primaryId" class="form-select custom-select">
                    <option value="email">Email Address</option>
                    <option value="phone_number">Phone Number</option>
                </select>
            </div>
        </div>

        <div class="card mandatory-logic-card position-relative overflow-hidden my-4">
            <div class="card-body p-4">
                <!-- Header Section -->
                <div class="d-flex flex-column gap-2 mb-4">
                    <h2 class="card-title mb-0">Mandatory / Baked-in Logic</h2>
                    <p class="card-description mb-0">
                        These behaviors are built into the system and work automatically without user configuration.
                    </p>
                </div>

                <!-- Logic Items -->
                <div class="d-flex flex-column gap-3">

                    <!-- Contact Information Sync -->
                    <div class="logic-item logic-item-green">
                        <div class="d-flex align-items-start gap-3">
                            <div class="checkmark-circle checkmark-green">
                                <svg class="checkmark-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                            <div class="flex-fill">
                                <div class="d-flex align-items-center gap-2 mb-2">
                                    <div class="logic-item-title">Contact Information Sync</div>
                                    <button type="button" class="info-btn-blue" data-bs-toggle="tooltip"
                                        title="Essential customer contact details automatically sync between systems including first name, last name, email address (mandatory), phone number, and company information.">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round" class="info-icon-small">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <path d="M12 16v-4"></path>
                                            <path d="M12 8h.01"></path>
                                        </svg>
                                    </button>
                                </div>
                                <div class="logic-item-description">
                                    Customer contact details (name, email, phone, company) are automatically
                                    synchronized
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Address Information Sync -->
                    <div class="logic-item logic-item-purple">
                        <div class="d-flex align-items-start gap-3">
                            <div class="checkmark-circle checkmark-purple">
                                <svg class="checkmark-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                            <div class="flex-fill">
                                <div class="d-flex align-items-center gap-2 mb-2">
                                    <div class="logic-item-title">Address Information Sync</div>
                                    <button type="button" class="info-btn-blue" data-bs-toggle="tooltip"
                                        title="Complete address information syncs between systems including billing and shipping addresses with proper field mapping (suburb→city, state→province, postcode→zip).">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round" class="info-icon-small">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <path d="M12 16v-4"></path>
                                            <path d="M12 8h.01"></path>
                                        </svg>
                                    </button>
                                </div>
                                <div class="logic-item-description">
                                    Full address details mapped between Retail Express and Shopify address formats
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Marketing Consent Management -->
                    <div class="logic-item logic-item-orange">
                        <div class="d-flex align-items-start gap-3">
                            <div class="checkmark-circle checkmark-orange">
                                <svg class="checkmark-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                            <div class="flex-fill">
                                <div class="d-flex align-items-center gap-2 mb-2">
                                    <div class="logic-item-title">Marketing Consent Management</div>
                                    <button type="button" class="info-btn-blue" data-bs-toggle="tooltip"
                                        title="Customer marketing preferences (email and SMS subscriptions) are synchronized to maintain compliance and ensure consistent marketing consent across both platforms.">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round" class="info-icon-small">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <path d="M12 16v-4"></path>
                                            <path d="M12 8h.01"></path>
                                        </svg>
                                    </button>
                                </div>
                                <div class="logic-item-description">
                                    Email and SMS marketing preferences sync to maintain consent compliance
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Customer ID Cross-Reference -->
                    <div class="logic-item logic-item-gray">
                        <div class="d-flex align-items-start gap-3">
                            <div class="checkmark-circle checkmark-gray">
                                <svg class="checkmark-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                            <div class="flex-fill">
                                <div class="d-flex align-items-center gap-2 mb-2">
                                    <div class="logic-item-title">Customer ID Cross-Reference</div>
                                    <button type="button" class="info-btn-blue" data-bs-toggle="tooltip"
                                        title="Unique customer identifiers are automatically maintained and cross-referenced between systems to ensure data integrity and prevent duplicate customer records.">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round" class="info-icon-small">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <path d="M12 16v-4"></path>
                                            <path d="M12 8h.01"></path>
                                        </svg>
                                    </button>
                                </div>
                                <div class="logic-item-description">
                                    Unique customer identifiers maintained for accurate cross-platform tracking
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Export to Web Filter -->
                    <div class="logic-item logic-item-blue">
                        <div class="d-flex align-items-start gap-3">
                            <div class="checkmark-circle checkmark-blue">
                                <svg class="checkmark-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                            <div class="flex-fill">
                                <div class="d-flex align-items-center gap-2 mb-2">
                                    <div class="logic-item-title">✓ Export to Web Filter</div>
                                    <button type="button" class="info-btn-blue" data-bs-toggle="tooltip" title="Only customers marked as 'export to web' in Retail Express will be
                                        included in the sync process to Shopify.">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round" class="info-icon-small">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <path d="M12 16v-4"></path>
                                            <path d="M12 8h.01"></path>
                                        </svg>
                                    </button>
                                </div>
                                <div class="logic-item-description">
                                    Only customers marked "export to web" are synced
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <additional-mappings />

        <sync-behaviour-settings />

        <tier-groups />
    </div>
</template>

<style scoped>
/* First Card Styles */
.mapping-card {
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

.customer-title {
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

.info-btn-red {
    margin-left: .5rem;
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
    flex-shrink: 0;
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

.section-title {
    font-weight: 500;
    font-size: 20px;
    line-height: 28px;
    color: #101828;
}

.custom-select {
    margin-top: 1rem;
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

.mandatory-logic-card {
    background: #fff;
    border-radius: 14px;
    border: 1px solid #e5e7eb;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1), 0px 1px 2px -1px rgba(0, 0, 0, 0.1);
}

.card-body {
    padding: 33px !important;
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

.logic-item {
    width: 100%;
    padding: 1rem;
    border-radius: 8px;
    border: 1px solid;
}

.logic-item-green {
    background-color: #f0fdf4;
    border-color: #bbf7d0;
}

.logic-item-purple {
    background-color: #faf5ff;
    border-color: #e9d5ff;
}

.logic-item-orange {
    background-color: #fff7ed;
    border-color: #fed7aa;
}

.logic-item-gray {
    background-color: #f9fafb;
    border-color: #e5e7eb;
}

.logic-item-blue {
    background-color: #eff6ff;
    border-color: #bfdbfe;
}

.checkmark-circle {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-top: 2px;
}

.checkmark-green {
    background-color: #16a34a;
}

.checkmark-purple {
    background-color: #9333ea;
}

.checkmark-orange {
    background-color: #ea580c;
}

.checkmark-gray {
    background-color: #4b5563;
}

.checkmark-blue {
    background-color: #2563eb;
}

.checkmark-icon {
    width: 12px;
    height: 12px;
    color: white;
}

.logic-item-title {
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    font-size: 16px;
    color: #101828;
}

.logic-item-description {
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    color: #4a5565;
}

.info-btn-blue {
    background-color: #155dfc;
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
    flex-shrink: 0;
}

.info-btn-blue:hover {
    background-color: #1348d4;
}

.info-icon-small {
    width: 12px;
    height: 12px;
    stroke: white;
    stroke-width: 2;
}
</style>
