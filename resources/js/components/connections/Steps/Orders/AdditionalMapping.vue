<script setup>
import { ref } from 'vue';

const mappings = ref([
    { id: 1, retailField: '', shopifyField: '' },
    { id: 2, retailField: '', shopifyField: '' },
]);

const addMapping = () => {
    mappings.value.push({
        id: Date.now(),
        retailField: '',
        shopifyField: ''
    });
};

const removeMapping = (id) => {
    if (mappings.value.length > 1) {
        mappings.value = mappings.value.filter(m => m.id !== id);
    }
};
</script>

<template>
    <div class="card shadow-sm my-4">
        <div class="card-body p-4">
            <div class="gap-2 mb-4">
                <h5 class="fw-semibold mb-2"
                    style="color: #101828; font-size: 20px; font-family: 'Poppins', sans-serif; line-height: 28px;">
                    Additional Order Mappings
                </h5>
                <p class="text-muted mb-0"
                    style="font-size: 14px; font-family: 'Roboto', sans-serif; color: #4a5565; line-height: 20px;">
                    Add optional mappings to match additional order attributes.
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
                        <select v-model="mapping.retailField" class="form-select custom-select"
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                        stroke="#F20F52" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        style="display: inline-block;">
                        <path d="M8 3 4 7l4 4"></path>
                        <path d="M4 7h16"></path>
                        <path d="m16 21 4-4-4-4"></path>
                        <path d="M20 17H4"></path>
                    </svg>
                </div>

                <div class="col-4">
                    <div class="position-relative">
                        <select v-model="mapping.shopifyField" class="form-select custom-select"
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
