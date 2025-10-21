<script setup>
import { ref, onMounted } from 'vue';
import InfoRed from '../../../Icons/InfoRed.vue';

const trackingInfoSetting = ref('yes_from_retail_express_shipment_tab');
const salesLocationSetting = ref('use_location_from_shopify_order');
const fulfillmentLocationSetting = ref('use_shopify');
const defaultSalesperson = ref('');
const updateCustomerData = ref('yes');

onMounted(() => {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});
</script>

<template>
    <div class="card order-behavior-card position-relative overflow-hidden">
        <div class="card-body p-4">
            <div class="d-flex align-items-center gap-2 mb-4">
                <h2 class="section-title mb-0">Order Sync Behavior Settings</h2>
                <info-red
                    title="Configure how order data behaves during sync operations, including sync direction, frequency, and handling of existing orders." />
            </div>

            <div class="d-flex flex-column" style="gap: 2rem;">
                <div class="d-flex flex-column gap-3">
                    <div class="d-flex align-items-center gap-2">
                        <h3 class="subsection-title mb-0">Store tracking info in Shopify after fulfillment?</h3>
                        <info-red is-small
                            title="Choose where tracking information comes from when orders are fulfilled. This affects customer notifications and order status updates in Shopify." />
                    </div>
                    <select v-model="trackingInfoSetting" class="form-select custom-select-md">
                        <option value="yes_from_retail_express_shipment_tab">
                            Yes (from Retail Express shipment tab)
                        </option>
                        <option value="yes_from_custom_field">
                            Yes (read from custom field)
                        </option>
                        <option value="no">No</option>
                    </select>
                </div>

                <div class="d-flex flex-column gap-3">
                    <div class="d-flex align-items-center gap-2">
                        <h3 class="subsection-title mb-0">Assign sales location for online orders</h3>
                        <info-red is-small
                            title="Determines which store location gets credit for online sales. This affects reporting, commissions, and inventory allocation for delivery orders." />
                    </div>
                    <select v-model="salesLocationSetting" class="form-select custom-select-md">
                        <option value="use_location_from_shopify_order">Use location from Shopify order</option>
                        <option value="use_fixed_location">Use fixed location (set in Shipping Module)</option>
                    </select>
                </div>

                <div class="d-flex flex-column gap-3">
                    <div class="d-flex align-items-center gap-2">
                        <h3 class="subsection-title mb-0">Assign fulfillment location for online orders</h3>
                        <info-red is-small
                            title="Determines which location physically processes and ships the order. This affects inventory deduction and shipping workflows." />
                    </div>
                    <select v-model="fulfillmentLocationSetting" class="form-select custom-select-md">
                        <option value="use_shopify">Use Shopify fulfillment location</option>
                        <option value="use_fixed">Use fixed fulfillment location</option>
                    </select>
                </div>

                <div class="d-flex flex-column gap-3">
                    <div class="d-flex align-items-center gap-2">
                        <h3 class="subsection-title mb-0">Default Salesperson for synced orders</h3>
                        <info-red is-small
                            title="Assigns a default salesperson to online orders for commission tracking and reporting. Select from your Retail Express POS users." />
                    </div>
                    <input type="text" v-model="defaultSalesperson" class="form-control custom-input-md"
                        placeholder="Enter User Code (e.g., ONLINE001)">
                    <div class="input-helper-text">
                        Enter the User Code found in Retail Express → Users menu
                    </div>
                </div>

                <div class="d-flex flex-column gap-3">
                    <div class="d-flex align-items-center gap-2">
                        <h3 class="subsection-title mb-0">Update customer data with every order sync</h3>
                        <info-red is-small
                            title="When enabled, new billing information from orders will overwrite existing customer records in Retail Express. Disable if you prefer to maintain manually entered customer data." />
                    </div>
                    <select v-model="updateCustomerData" class="form-select custom-select-md">
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                    <div class="input-helper-text">
                        Controls whether new billing info from the order overwrites the customer record
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.order-behavior-card {
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

.custom-input-md {
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

.custom-input-md:focus {
    background-color: #f9fafb;
    border-color: #155dfc;
    box-shadow: 0 0 0 3px rgba(21, 93, 252, 0.1);
    outline: none;
}

.input-helper-text {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 13px;
    line-height: 18px;
    color: #4a5565;
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

    .custom-select-md,
    .custom-input-md {
        max-width: 100%;
    }

    .input-helper-text {
        font-size: 12px;
    }
}
</style>
