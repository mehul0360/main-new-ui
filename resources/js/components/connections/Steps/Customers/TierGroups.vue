<script setup>
import { ref } from 'vue';
import InfoRed from '../../../Icons/InfoRed.vue';
import TwoWayArrow from '../../../Icons/TwoWayArrow.vue';

const tierGroupSystem = ref('standard_shopify');
const mappings = ref([
    { id: 1, priceGroup: '', shopifyTier: '' },
    { id: 2, priceGroup: '', shopifyTier: '' },
    { id: 3, priceGroup: '', shopifyTier: '' }
]);

let nextId = 4;

const addMapping = () => {
    mappings.value.push({
        id: nextId++,
        priceGroup: '',
        shopifyTier: ''
    });
};

const removeMapping = (id) => {
    mappings.value = mappings.value.filter(m => m.id !== id);
};
</script>

<template>
    <div class="card tier-groups-card position-relative overflow-hidden">
        <div class="card-body p-4">
            <div class="d-flex flex-column gap-2 mb-4">
                <div class="d-flex align-items-center gap-2">
                    <h2 class="card-title mb-0">Tier Groups</h2>
                    <info-red
                        title="Choose between Standard Shopify's native customer tier group functionality or the BSS Commerce custom app for advanced tier management. The BSS Commerce option requires the app to be installed in your Shopify store." />
                </div>
                <p class="card-description mb-0">
                    Map price groups from Retail Express to customer tier groups in Shopify.
                </p>
            </div>

            <div class="d-flex flex-column gap-3">
                <div class="d-flex flex-column gap-3">
                    <div class="d-flex align-items-center gap-2">
                        <h3 class="subsection-title mb-0">Tier Group System</h3>
                        <info-red is-small
                            title="Standard Shopify:<br />Uses Shopify's native customer tier group feature for managing customer pricing levels and segmentation.<br /><br />BSS Commerce:<br />A third-party app that provides advanced tier management features. Requires installation from the Shopify App Store." />
                    </div>
                    <select v-model="tierGroupSystem" class="form-select custom-select-md">
                        <option value="standard_shopify" selected>Standard Shopify</option>
                        <option value="BSS Commerce">BSS Commerce</option>
                        <option value="Custom">Custom</option>
                    </select>
                </div>

                <div class="d-flex flex-column gap-3">
                    <h3 class="subsection-title mb-0">Price Group Mappings</h3>

                    <div class="row g-3 align-items-center py-2 border-bottom mapping-header">
                        <div class="col-4">
                            <div class="field-header">Retail Express Price Group</div>
                        </div>
                        <div class="col-1 mapping-arrow-col">
                            <!-- Empty for arrow column -->
                        </div>
                        <div class="col-4">
                            <div class="field-header">Shopify Tier</div>
                        </div>
                        <div class="col-1 mapping-delete-col">
                        </div>
                    </div>

                    <!-- Mapping Rows -->
                    <div class="d-flex flex-column gap-3">
                        <div v-for="mapping in mappings" :key="mapping.id" class="row g-3 align-items-center">
                            <div class="col-4">
                                <select v-model="mapping.priceGroup" class="form-select custom-select-sm">
                                    <option value="">Select price group</option>
                                    <option value="gold">Gold</option>
                                    <option value="silver">Silver</option>
                                    <option value="bronze">Bronze</option>
                                </select>
                            </div>
                            <div class="col-1 mapping-arrow-col d-flex justify-content-center">
                                <two-way-arrow />
                            </div>
                            <div class="col-4">
                                <select v-model="mapping.shopifyTier" class="form-select custom-select-sm">
                                    <option value="">Select tier</option>
                                    <option value="platinum">Platinum</option>
                                    <option value="diamond">Diamond</option>
                                    <option value="ruby">Ruby</option>
                                </select>
                            </div>
                            <div class="col-1 mapping-delete-col">
                                <button type="button" class="btn-delete" @click="removeMapping(mapping.id)">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" class="delete-icon">
                                        <path d="M18 6 6 18"></path>
                                        <path d="m6 6 12 12"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Add Button -->
                    <button type="button" class="btn btn-add-mapping" @click="addMapping">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="plus-icon">
                            <path d="M5 12h14"></path>
                            <path d="M12 5v14"></path>
                        </svg>
                        Add Price Group Mapping
                    </button>
                </div>

            </div>
        </div>
    </div>
</template>

<style scoped>
.tier-groups-card {
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

.subsection-title {
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
    color: #101828;
}

.field-header {
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    font-size: 14px;
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

.custom-select-sm {
    height: 36px;
    font-size: 14px;
    background-color: #f9fafb;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    padding: 0.5rem 0.75rem;
    transition: border-color 0.2s, box-shadow 0.2s;
    font-family: 'Roboto', sans-serif;
}

.custom-select-md:focus,
.custom-select-sm:focus {
    background-color: #f9fafb;
    border-color: #155dfc;
    box-shadow: 0 0 0 3px rgba(21, 93, 252, 0.1);
    outline: none;
}

.mapping-header {
    border-bottom: 1px solid #e5e7eb !important;
}

.btn-delete {
    width: 32px;
    height: 32px;
    padding: 0.5rem;
    border: none;
    background: transparent;
    border-radius: 6px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;
}

.btn-delete:hover {
    background-color: #fef2f2;
}

.btn-delete:hover .delete-icon {
    color: #dc2626;
}

.delete-icon {
    width: 16px;
    height: 16px;
    color: #6b7280;
}

.btn-add-mapping {
    margin-top: 1rem;
    width: 15rem;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    height: 36px;
    border: 1px solid #F20F52;
    background-color: transparent;
    color: #F20F52;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
}

.btn-add-mapping:hover {
    background-color: #F20F52;
    color: white;
}

.plus-icon {
    width: 16px;
    height: 16px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .card-title {
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

    .col {
        width: 100%;
    }

    .row.g-3 {
        row-gap: 0.5rem !important;
    }

    .mapping-arrow-col,
    .mapping-delete-col {
        width: auto;
    }
}
</style>
