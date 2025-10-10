<script setup>
import { ref, computed, onMounted } from 'vue';

// Receive primarySystem as a prop from parent
const props = defineProps({
    primarySystem: {
        type: String,
        required: true,
        default: 'retail-express'
    }
});

// Sync options for descriptions
const shortDescSync = ref('create_only');
const longDescSync = ref('create_only');

// Shopify field mappings
const shopifyTitleField = ref('Product Title');
const shopifyDescriptionField = ref('Product Description');
const shopifySKUField = ref('SKU');
const shopifyProductTypeField = ref('Product Type');
const shopifyWeightField = ref('Weight');
const shopifyLengthField = ref('Length');
const shopifyWidthField = ref('Width');
const shopifyHeightField = ref('Height');
const shopifyVendorField = ref('Vendor');
const shopifyBarcodeField = ref('Barcode');

// Variant and grouping
const productGroupingField = ref('Custom1');
const variantAttributes = ref([]);

// Pricing
const pricingMode = ref('fixed');
const fixedPriceSync = ref('create_only');
const fixedMSRPSync = ref('create_only');
const retailExpressCost = ref('Cost of Goods Sold (Ex Tax)');
const syncCostPerOutlet = ref(false);
const selectedOutlet = ref('');

const retailExpressPrice = ref('RRP (Inc Tax)');
const retailExpressMSRP = ref('RRP (Inc Tax)');

onMounted(() => {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});

const sourceSystemLabel = computed(() => {
    return props.primarySystem === 'retail-express' ? 'Retail Express' : 'Shopify';
});

const targetSystemLabel = computed(() => {
    return props.primarySystem === 'retail-express' ? 'Shopify' : 'Retail Express';
});

const maxVariantsReached = computed(() => variantAttributes.value.length >= 3);

const toggleVariantAttribute = (attr) => {
    const index = variantAttributes.value.indexOf(attr);
    if (index > -1) {
        variantAttributes.value.splice(index, 1);
    } else {
        if (variantAttributes.value.length < 3) {
            variantAttributes.value.push(attr);
        }
    }
};
</script>

<template>
    <div class="card product-mapping-card position-relative overflow-hidden">
        <div class="card-body p-4">
            <!-- Header Section -->
            <div class="d-flex flex-column gap-2 mb-4">
                <h2 class="card-title mb-0">Product Mapping</h2>
                <p class="card-description mb-0">
                    Configure detailed field mappings between Retail Express and Shopify for product attributes.
                </p>
            </div>

            <!-- Mapping Sections -->
            <div class="d-flex flex-column" style="gap: 2rem;">

                <!-- Master Product Data Section -->
                <div class="d-flex flex-column gap-3">
                    <div class="d-flex align-items-center gap-2">
                        <h3 class="section-heading mb-0">Master Product Data</h3>
                    </div>

                    <div class="d-flex flex-column" style="gap: 1.5rem;">
                        <!-- Short Description Mapping -->
                        <div class="row g-3 align-items-center mapping-row-gray">
                            <div class="col-4">
                                <div class="d-flex flex-column gap-2">
                                    <div class="field-label">{{ sourceSystemLabel }} Short Description</div>
                                    <div class="fixed-field-display">Short Description</div>
                                    <div class="d-flex gap-3">
                                        <label class="d-flex align-items-center gap-2">
                                            <input type="radio" v-model="shortDescSync" value="create_only"
                                                class="form-check-input radio-red">
                                            <span class="radio-label">Sync on create only</span>
                                        </label>
                                        <label class="d-flex align-items-center gap-2">
                                            <input type="radio" v-model="shortDescSync" value="always_update"
                                                class="form-check-input radio-red">
                                            <span class="radio-label">Always update</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="col-4 d-flex justify-content-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="arrow-icon-red">
                                    <path d="M5 12h14"></path>
                                    <path d="m12 5 7 7-7 7"></path>
                                </svg>
                            </div>
                            <div class="col-4">
                                <div class="d-flex flex-column gap-2">
                                    <div class="field-label">{{ targetSystemLabel }} Title</div>
                                    <select v-model="shopifyTitleField" class="form-select custom-select-sm">
                                        <option value="Product Title">Product Title</option>
                                        <option value="Product Name">Product Name</option>
                                        <option value="Display Name">Display Name</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <!-- Long Description Mapping -->
                        <div class="row g-3 align-items-center mapping-row-gray">
                            <div class="col-4">
                                <div class="d-flex flex-column gap-2">
                                    <div class="field-label">{{ sourceSystemLabel }} Long Description</div>
                                    <div class="fixed-field-display">Long Description</div>
                                    <div class="d-flex gap-3">
                                        <label class="d-flex align-items-center gap-2">
                                            <input type="radio" v-model="longDescSync" value="create_only"
                                                class="form-check-input radio-red">
                                            <span class="radio-label">Sync on create only</span>
                                        </label>
                                        <label class="d-flex align-items-center gap-2">
                                            <input type="radio" v-model="longDescSync" value="always_update"
                                                class="form-check-input radio-red">
                                            <span class="radio-label">Always update</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="col-4 d-flex justify-content-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="arrow-icon-red">
                                    <path d="M5 12h14"></path>
                                    <path d="m12 5 7 7-7 7"></path>
                                </svg>
                            </div>
                            <div class="col-4">
                                <div class="d-flex flex-column gap-2">
                                    <div class="field-label">{{ targetSystemLabel }} Description</div>
                                    <select v-model="shopifyDescriptionField" class="form-select custom-select-sm">
                                        <option value="Product Description">Product Description</option>
                                        <option value="Description">Description</option>
                                        <option value="Body HTML">Body HTML</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <!-- SKU Mapping (Mandatory) -->
                        <div class="row g-3 align-items-center mapping-row-blue">
                            <div class="col-4">
                                <div class="d-flex flex-column gap-2">
                                    <div class="d-flex align-items-center gap-2">
                                        <div class="field-label">{{ sourceSystemLabel }} SKU</div>
                                        <span class="badge-mandatory">Mandatory</span>
                                    </div>
                                    <div class="fixed-field-display">Product SKU</div>
                                </div>
                            </div>
                            <div class="col-4 d-flex justify-content-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="arrow-icon-red">
                                    <path d="M5 12h14"></path>
                                    <path d="m12 5 7 7-7 7"></path>
                                </svg>
                            </div>
                            <div class="col-4">
                                <div class="d-flex flex-column gap-2">
                                    <div class="d-flex align-items-center gap-2">
                                        <div class="field-label">{{ targetSystemLabel }} SKU</div>
                                        <span class="badge-mandatory">Mandatory</span>
                                    </div>
                                    <select v-model="shopifySKUField" class="form-select custom-select-sm">
                                        <option value="SKU">SKU</option>
                                        <option value="Product SKU">Product SKU</option>
                                        <option value="Variant SKU">Variant SKU</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <!-- Product Type Mapping -->
                        <div class="row g-3 align-items-center mapping-row-gray">
                            <div class="col-4">
                                <div class="d-flex flex-column gap-2">
                                    <div class="field-label">{{ sourceSystemLabel }} Product Type</div>
                                    <div class="fixed-field-display">Category</div>
                                </div>
                            </div>
                            <div class="col-4 d-flex justify-content-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="arrow-icon-red">
                                    <path d="M5 12h14"></path>
                                    <path d="m12 5 7 7-7 7"></path>
                                </svg>
                            </div>
                            <div class="col-4">
                                <div class="d-flex flex-column gap-2">
                                    <div class="field-label">{{ targetSystemLabel }} Product Type</div>
                                    <select v-model="shopifyProductTypeField" class="form-select custom-select-sm">
                                        <option value="Product Type">Product Type</option>
                                        <option value="Category">Category</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <!-- Weight Mapping -->
                        <div class="row g-3 align-items-center mapping-row-gray">
                            <div class="col-4">
                                <div class="d-flex flex-column gap-2">
                                    <div class="field-label">{{ sourceSystemLabel }} Weight</div>
                                    <div class="fixed-field-display">Weight</div>
                                </div>
                            </div>
                            <div class="col-4 d-flex justify-content-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="arrow-icon-red">
                                    <path d="M5 12h14"></path>
                                    <path d="m12 5 7 7-7 7"></path>
                                </svg>
                            </div>
                            <div class="col-4">
                                <div class="d-flex flex-column gap-2">
                                    <div class="field-label">{{ targetSystemLabel }} Weight</div>
                                    <select v-model="shopifyWeightField" class="form-select custom-select-sm">
                                        <option value="Weight">Weight</option>
                                        <option value="Product Weight">Product Weight</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <!-- Length Mapping -->
                        <div class="row g-3 align-items-center mapping-row-gray">
                            <div class="col-4">
                                <div class="d-flex flex-column gap-2">
                                    <div class="field-label">{{ sourceSystemLabel }} Length</div>
                                    <div class="fixed-field-display">Length</div>
                                </div>
                            </div>
                            <div class="col-4 d-flex justify-content-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="arrow-icon-red">
                                    <path d="M5 12h14"></path>
                                    <path d="m12 5 7 7-7 7"></path>
                                </svg>
                            </div>
                            <div class="col-4">
                                <div class="d-flex flex-column gap-2">
                                    <div class="field-label">{{ targetSystemLabel }} Length</div>
                                    <select v-model="shopifyLengthField" class="form-select custom-select-sm">
                                        <option value="Length">Length</option>
                                        <option value="Product Length">Product Length</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <!-- Breadth/Width Mapping -->
                        <div class="row g-3 align-items-center mapping-row-gray">
                            <div class="col-4">
                                <div class="d-flex flex-column gap-2">
                                    <div class="field-label">{{ sourceSystemLabel }} Breadth</div>
                                    <div class="fixed-field-display">Breadth</div>
                                </div>
                            </div>
                            <div class="col-4 d-flex justify-content-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="arrow-icon-red">
                                    <path d="M5 12h14"></path>
                                    <path d="m12 5 7 7-7 7"></path>
                                </svg>
                            </div>
                            <div class="col-4">
                                <div class="d-flex flex-column gap-2">
                                    <div class="field-label">{{ targetSystemLabel }} Width</div>
                                    <select v-model="shopifyWidthField" class="form-select custom-select-sm">
                                        <option value="Width">Width</option>
                                        <option value="Product Width">Product Width</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <!-- Depth/Height Mapping -->
                        <div class="row g-3 align-items-center mapping-row-gray">
                            <div class="col-4">
                                <div class="d-flex flex-column gap-2">
                                    <div class="field-label">{{ sourceSystemLabel }} Depth</div>
                                    <div class="fixed-field-display">Depth</div>
                                </div>
                            </div>
                            <div class="col-4 d-flex justify-content-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="arrow-icon-red">
                                    <path d="M5 12h14"></path>
                                    <path d="m12 5 7 7-7 7"></path>
                                </svg>
                            </div>
                            <div class="col-4">
                                <div class="d-flex flex-column gap-2">
                                    <div class="field-label">{{ targetSystemLabel }} Height</div>
                                    <select v-model="shopifyHeightField" class="form-select custom-select-sm">
                                        <option value="Height">Height</option>
                                        <option value="Product Height">Product Height</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <!-- Supplier/Vendor Mapping -->
                        <div class="row g-3 align-items-center mapping-row-gray">
                            <div class="col-4">
                                <div class="d-flex flex-column gap-2">
                                    <div class="field-label">{{ sourceSystemLabel }} Supplier</div>
                                    <div class="fixed-field-display">Supplier</div>
                                </div>
                            </div>
                            <div class="col-4 d-flex justify-content-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="arrow-icon-red">
                                    <path d="M5 12h14"></path>
                                    <path d="m12 5 7 7-7 7"></path>
                                </svg>
                            </div>
                            <div class="col-4">
                                <div class="d-flex flex-column gap-2">
                                    <div class="field-label">{{ targetSystemLabel }} Vendor</div>
                                    <select v-model="shopifyVendorField" class="form-select custom-select-sm">
                                        <option value="Vendor">Vendor</option>
                                        <option value="Supplier">Supplier</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <!-- Supplier SKU 2/Barcode Mapping -->
                        <div class="row g-3 align-items-center mapping-row-gray">
                            <div class="col-4">
                                <div class="d-flex flex-column gap-2">
                                    <div class="field-label">{{ sourceSystemLabel }} Supplier SKU 2</div>
                                    <div class="fixed-field-display">Supplier SKU 2</div>
                                </div>
                            </div>
                            <div class="col-4 d-flex justify-content-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="arrow-icon-red">
                                    <path d="M5 12h14"></path>
                                    <path d="m12 5 7 7-7 7"></path>
                                </svg>
                            </div>
                            <div class="col-4">
                                <div class="d-flex flex-column gap-2">
                                    <div class="field-label">{{ targetSystemLabel }} Barcode</div>
                                    <select v-model="shopifyBarcodeField" class="form-select custom-select-sm">
                                        <option value="Barcode">Barcode</option>
                                        <option value="Product Barcode">Product Barcode</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Variant & Grouping Fields Section -->
                <div class="d-flex flex-column gap-3">
                    <div class="d-flex align-items-center gap-2">
                        <h3 class="section-heading mb-0">Variant & Grouping Fields</h3>
                    </div>

                    <div class="d-flex flex-column" style="gap: 1.5rem;">
                        <!-- Product Grouping Field -->
                        <div class="mapping-row-gray" style="padding: 1rem;">
                            <div class="d-flex flex-column gap-2" style="max-width: 28rem;">
                                <div class="d-flex align-items-center gap-2">
                                    <div class="field-label">Product Grouping Field</div>
                                    <button type="button" class="info-btn-blue" data-bs-toggle="tooltip"
                                        title="Select the field used to group related products">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round" class="info-icon-tiny">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <path d="M12 16v-4"></path>
                                            <path d="M12 8h.01"></path>
                                        </svg>
                                    </button>
                                </div>
                                <select v-model="productGroupingField" class="form-select custom-select-sm">
                                    <option value="Custom1">Custom1</option>
                                    <option value="Custom2">Custom2</option>
                                    <option value="Custom3">Custom3</option>
                                    <option value="Category">Category</option>
                                </select>
                            </div>
                        </div>

                        <!-- Variant Attribute Mapping -->
                        <div class="variant-mapping-container">
                            <div class="d-flex align-items-center gap-2 mb-3">
                                <div class="field-label">Variant Attribute Mapping</div>
                                <span class="badge-purple">Select up to 3</span>
                            </div>
                            <div class="d-flex flex-wrap gap-3">
                                <label
                                    v-for="attr in ['Brand', 'Season', 'Size', 'Colour', 'Custom attribute 1', 'Custom attribute 2', 'Custom attribute 3', 'Custom attribute 4', 'Custom attribute 5', 'Custom attribute 6', 'Custom attribute 7', 'Custom attribute 8']"
                                    :key="attr" class="d-flex align-items-center gap-2">
                                    <input type="checkbox" :value="attr" :checked="variantAttributes.includes(attr)"
                                        @change="toggleVariantAttribute(attr)"
                                        :disabled="!variantAttributes.includes(attr) && maxVariantsReached"
                                        class="form-check-input checkbox-custom">
                                    <span class="checkbox-label">{{ attr }}</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Pricing Fields Section -->
                <div class="d-flex flex-column gap-3">
                    <div class="d-flex align-items-center gap-2">
                        <h3 class="section-heading mb-0">Pricing Fields</h3>
                    </div>

                    <!-- Pricing Configuration Toggle -->
                    <div class="d-flex flex-column gap-2 mb-2">
                        <div class="field-label">Pricing Configuration</div>
                        <div class="btn-group-toggle">
                            <button type="button" :class="['toggle-btn', { 'active': pricingMode === 'fixed' }]"
                                @click="pricingMode = 'fixed'">
                                Fixed Pricing
                            </button>
                            <button type="button" :class="['toggle-btn', { 'active': pricingMode === 'hierarchy' }]"
                                @click="pricingMode = 'hierarchy'">
                                Hierarchy Pricing
                            </button>
                        </div>
                    </div>

                    <div class="d-flex flex-column" style="gap: 1.5rem;">
                        <!-- Price Mapping (Green) -->
                        <div v-if="pricingMode === 'fixed'" class="row g-3 align-items-center mapping-row-green">
                            <div class="col-4">
                                <div class="d-flex flex-column gap-2">
                                    <div class="field-label">{{ sourceSystemLabel }} Price</div>
                                    <select v-model="retailExpressPrice" class="form-select custom-select-sm">
                                        <option value="RRP (Inc Tax)">RRP (Inc Tax)</option>
                                        <option value="RRP (Ex Tax)">RRP (Ex Tax)</option>
                                        <option value="Standard Price">Standard Price</option>
                                    </select>
                                    <div class="d-flex gap-3">
                                        <label class="d-flex align-items-center gap-2">
                                            <input type="radio" v-model="fixedPriceSync" value="create_only"
                                                class="form-check-input radio-red">
                                            <span class="radio-label">Sync on create only</span>
                                        </label>
                                        <label class="d-flex align-items-center gap-2">
                                            <input type="radio" v-model="fixedPriceSync" value="create_and_update"
                                                class="form-check-input radio-red">
                                            <span class="radio-label">Sync on create and update</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="col-4 d-flex justify-content-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="arrow-icon-red">
                                    <path d="M5 12h14"></path>
                                    <path d="m12 5 7 7-7 7"></path>
                                </svg>
                            </div>
                            <div class="col-4">
                                <div class="field-label">{{ targetSystemLabel }} Price</div>
                            </div>
                        </div>

                        <!-- MSRP / Compare At Price Mapping -->
                        <div v-if="pricingMode === 'fixed'" class="row g-3 align-items-center mapping-row-gray">
                            <div class="col-4">
                                <div class="d-flex flex-column gap-2">
                                    <div class="field-label">{{ sourceSystemLabel }} MSRP</div>
                                    <select v-model="retailExpressMSRP" class="form-select custom-select-sm">
                                        <option value="RRP (Inc Tax)">RRP (Inc Tax)</option>
                                        <option value="RRP (Ex Tax)">RRP (Ex Tax)</option>
                                        <option value="MSRP">MSRP</option>
                                    </select>
                                    <div class="d-flex gap-3">
                                        <label class="d-flex align-items-center gap-2">
                                            <input type="radio" v-model="fixedMSRPSync" value="create_only"
                                                class="form-check-input radio-red">
                                            <span class="radio-label">Sync on create only</span>
                                        </label>
                                        <label class="d-flex align-items-center gap-2">
                                            <input type="radio" v-model="fixedMSRPSync" value="create_and_update"
                                                class="form-check-input radio-red">
                                            <span class="radio-label">Sync on create and update</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="col-4 d-flex justify-content-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="arrow-icon-red">
                                    <path d="M5 12h14"></path>
                                    <path d="m12 5 7 7-7 7"></path>
                                </svg>
                            </div>
                            <div class="col-4">
                                <div class="field-label">{{ targetSystemLabel }} Compare At Price</div>
                            </div>
                        </div>

                        <div class="hierarchy-info-box" v-if="pricingMode === 'hierarchy'">
                            <div class="d-flex align-items-center gap-2 mb-3">
                                <div class="info-title">Hierarchy Pricing Logic</div>
                                <span class="badge-fixed-logic">Fixed Logic</span>
                            </div>
                            <div class="info-content">
                                <p class="info-paragraph">
                                    <span class="info-label">Sell Price Hierarchy:</span><br>
                                    1. Web price → 2. Outlet promotional price → 3. Master promotional price → 4. Outlet
                                    POS price → 5. Master POS price
                                </p>
                                <p class="info-paragraph">
                                    <span class="info-label">Compare At Price:</span><br>
                                    RRP syncs to Compare At Price always (unless Compare At ≤ Sell Price, then not
                                    synced)
                                </p>
                                <p class="info-paragraph info-highlight">
                                    This pricing configuration mirrors in-store pricing as accurately as possible and
                                    cannot be modified.
                                </p>
                            </div>
                        </div>

                        <!-- Cost Mapping -->
                        <div class="row g-3 align-items-start mapping-row-gray">
                            <div class="col-4">
                                <div class="d-flex flex-column gap-3">
                                    <div class="field-label">{{ sourceSystemLabel }} Cost</div>
                                    <select v-model="retailExpressCost" class="form-select custom-select-sm">
                                        <option value="Cost of Goods Sold (Ex Tax)">Cost of Goods Sold (Ex Tax)</option>
                                        <option value="Cost (Inc Tax)">Cost (Inc Tax)</option>
                                        <option value="Average Cost">Average Cost</option>
                                    </select>
                                    <div class="d-flex flex-column gap-2">
                                        <label class="d-flex align-items-center gap-2">
                                            <input type="checkbox" v-model="syncCostPerOutlet"
                                                class="form-check-input checkbox-custom">
                                            <span class="checkbox-label">Sync cost per outlet</span>
                                        </label>
                                        <select v-model="selectedOutlet" class="form-select custom-select-xs">
                                            <option value="">Select Outlet</option>
                                            <option value="outlet1">Outlet 1</option>
                                            <option value="outlet2">Outlet 2</option>
                                            <option value="outlet3">Outlet 3</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="col-4 d-flex justify-content-center" style="margin-top: 0.5rem;">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="arrow-icon-red">
                                    <path d="M5 12h14"></path>
                                    <path d="m12 5 7 7-7 7"></path>
                                </svg>
                            </div>
                            <div class="col-4">
                                <div class="field-label">{{ targetSystemLabel }} Cost Per Item</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<style scoped>
.product-mapping-card {
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

.section-heading {
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
    color: #101828;
    text-transform: capitalize;
    letter-spacing: normal;
}

.field-label {
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    font-size: 14px;
    color: #101828;
}

.mapping-row-gray {
    background-color: #f9fafb;
    border-radius: 8px;
    padding: 1rem;
}

.mapping-row-blue {
    background-color: #eff6ff;
    border: 1px solid #bfdbfe;
    border-radius: 8px;
    padding: 1rem;
}

.mapping-row-green {
    background-color: #f0fdf4;
    border: 1px solid #bbf7d0;
    border-radius: 8px;
    padding: 1rem;
}

.fixed-field-display {
    padding: 0.75rem;
    background-color: #e5e7eb;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    color: #101828;
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

.custom-select-xs {
    height: 32px;
    font-size: 14px;
    background-color: #f9fafb;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    padding: 0.375rem 0.75rem;
    transition: border-color 0.2s, box-shadow 0.2s;
    font-family: 'Roboto', sans-serif;
}

.custom-select-sm:focus,
.custom-select-xs:focus {
    background-color: #f9fafb;
    border-color: #155dfc;
    box-shadow: 0 0 0 3px rgba(21, 93, 252, 0.1);
    outline: none;
}

.arrow-icon-red {
    width: 20px;
    height: 20px;
    color: #F20F52;
}

.badge-mandatory {
    background-color: #2563eb;
    color: white;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 12px;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
}

.badge-purple {
    background-color: #9333ea;
    color: white;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 12px;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
}

.radio-red {
    accent-color: #F20F52;
    margin: 0;
}

.radio-label {
    font-family: 'Roboto', sans-serif;
    font-size: 13px;
    color: #101828;
    margin: 0;
}

.info-btn-blue {
    background-color: #155dfc;
    border: none;
    border-radius: 50%;
    width: 16px;
    height: 16px;
    padding: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s;
    cursor: pointer;
    flex-shrink: 0;
}

.info-btn-blue:hover {
    background-color: #1349d6;
}

.info-icon-tiny {
    width: 10px;
    height: 10px;
    stroke: white;
    stroke-width: 2;
}

.variant-mapping-container {
    padding: 1rem;
    background-color: #faf5ff;
    border: 1px solid #e9d5ff;
    border-radius: 8px;
}

.checkbox-custom {
    accent-color: #155dfc;
    width: 16px;
    height: 16px;
    margin: 0;
}

.checkbox-label {
    font-family: 'Roboto', sans-serif;
    font-size: 13px;
    color: #101828;
    margin: 0;
}

.btn-group-toggle {
    display: inline-flex;
    padding: 0.25rem;
    background-color: #e5e7eb;
    border-radius: 8px;
    width: fit-content;
}

.toggle-btn {
    padding: 0.5rem 1rem;
    border: none;
    background: transparent;
    border-radius: 6px;
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    font-weight: 500;
    color: #4a5565;
    cursor: pointer;
    transition: all 0.2s;
}

.toggle-btn:hover {
    color: #101828;
}

.toggle-btn.active {
    background: white;
    color: #101828;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* Hierarchy Info Box */
.hierarchy-info-box {
    width: 100%;
    padding: 1rem;
    background-color: #eff6ff;
    border: 1px solid #bfdbfe;
    border-radius: 8px;
}

.info-title {
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    font-size: 14px;
    color: #101828;
}

.badge-fixed-logic {
    background-color: #2563eb;
    color: white;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 12px;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
}

.info-content {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.info-paragraph {
    font-family: 'Roboto', sans-serif;
    font-size: 13px;
    color: #4a5565;
    line-height: 1.6;
    margin-bottom: 0;
}

.info-label {
    font-weight: 500;
    color: #101828;
}

.info-highlight {
    font-weight: 500;
    color: #1d4ed8;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .col-4 {
        width: 100%;
    }

    .row.g-3 {
        row-gap: 1rem !important;
    }
}
</style>
