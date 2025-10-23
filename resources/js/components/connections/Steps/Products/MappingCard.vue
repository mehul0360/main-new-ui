<script setup>
import { ref, computed, onMounted, defineExpose } from 'vue';
import { storeToRefs } from 'pinia';
import { useStepThreeStore } from '@/stores/connection-steps/stepthree';
import InfoBlue from '@/components/Icons/InfoBlue.vue';
import SingleArrow from '@/components/Icons/SingleArrow.vue';

const props = defineProps({
    primarySystem: {
        type: String,
        required: true,
        default: 'retail-express'
    }
});

const stepThreeStore = useStepThreeStore();
const { payload, isSaved } = storeToRefs(stepThreeStore);

const shortDescSync = ref('create_only');
const longDescSync = ref('create_only');

const titleField = ref('product_title');
const descriptionField = ref('product_description');
const skuField = ref('sku');
const productTypeField = ref('product_type');
const weightField = ref('weight');
const lengthField = ref('length');
const widthField = ref('width');
const heightField = ref('height');
const vendorField = ref('vendor');
const barcodeField = ref('barcode');

const productGroupingField = ref('Custom1');
const variantAttributes = ref([]);

const pricingMode = ref('fixed');
const fixedPriceSync = ref('create_only');
const fixedMSRPSync = ref('create_only');
const typCost = ref('cogs_excl_tax');
const syncCostPerOutlet = ref(false);
const selectedOutlet = ref('');

const retailExpressPrice = ref('rrp_incl_tax');
const retailExpressMSRP = ref('rrp_incl_tax');

const loadStoredData = () => {
    if (isSaved.value && payload.value) {
        shortDescSync.value = payload.value.shortDescSync || 'create_only';
        longDescSync.value = payload.value.longDescSync || 'create_only';
        titleField.value = payload.value.titleField || 'product_title';
        descriptionField.value = payload.value.descriptionField || 'product_description';
        skuField.value = payload.value.skuField || 'sku';
        productTypeField.value = payload.value.productTypeField || 'product_type';
        weightField.value = payload.value.weightField || 'weight';
        lengthField.value = payload.value.lengthField || 'length';
        widthField.value = payload.value.widthField || 'width';
        heightField.value = payload.value.heightField || 'height';
        vendorField.value = payload.value.vendorField || 'vendor';
        barcodeField.value = payload.value.barcodeField || 'barcode';
        productGroupingField.value = payload.value.productGroupingField || 'Custom1';
        variantAttributes.value = payload.value.variantAttributes || [];
        pricingMode.value = payload.value.pricingMode || 'fixed';
        fixedPriceSync.value = payload.value.fixedPriceSync || 'create_only';
        fixedMSRPSync.value = payload.value.fixedMSRPSync || 'create_only';
        typCost.value = payload.value.typCost || 'cogs_excl_tax';
        syncCostPerOutlet.value = payload.value.syncCostPerOutlet || false;
        selectedOutlet.value = payload.value.selectedOutlet || '';
        retailExpressPrice.value = payload.value.retailExpressPrice || 'rrp_incl_tax';
        retailExpressMSRP.value = payload.value.retailExpressMSRP || 'rrp_incl_tax';
    }
};

onMounted(() => {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    loadStoredData();
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

const removeVariant = (attr) => {
    const index = variantAttributes.value.indexOf(attr);
    variantAttributes.value.splice(index, 1);
}

const getFormData = () => {
    return {
        shortDescSync: shortDescSync.value,
        longDescSync: longDescSync.value,
        titleField: titleField.value,
        descriptionField: descriptionField.value,
        skuField: skuField.value,
        productTypeField: productTypeField.value,
        weightField: weightField.value,
        lengthField: lengthField.value,
        widthField: widthField.value,
        heightField: heightField.value,
        vendorField: vendorField.value,
        barcodeField: barcodeField.value,
        productGroupingField: productGroupingField.value,
        variantAttributes: variantAttributes.value,
        pricingMode: pricingMode.value,
        fixedPriceSync: pricingMode.value === 'fixed' ? fixedPriceSync.value : '',
        fixedMSRPSync: pricingMode.value === 'fixed' ? fixedMSRPSync.value : '',
        typCost: typCost.value,
        syncCostPerOutlet: syncCostPerOutlet.value,
        selectedOutlet: selectedOutlet.value,
        retailExpressPrice: retailExpressPrice.value,
        retailExpressMSRP: retailExpressMSRP.value
    };
};

defineExpose({
    getFormData
});
</script>

<template>
    <div class="card product-mapping-card position-relative overflow-hidden">
        <div class="card-body p-4">
            <div class="d-flex flex-column gap-2 mb-4">
                <h2 class="card-title mb-0">Product Mapping</h2>
                <p class="card-description mb-0">
                    Configure detailed field mappings between Retail Express and Shopify for product attributes.
                </p>
            </div>

            <div class="d-flex flex-column" style="gap: 2rem;">
                <div class="d-flex flex-column gap-3">
                    <div class="d-flex align-items-center gap-2">
                        <h3 class="section-heading mb-0">Master Product Data</h3>
                    </div>

                    <div class="d-flex flex-column" style="gap: 1.5rem;">
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
                                <single-arrow direction="right" color="red" />
                            </div>
                            <div class="col-4">
                                <div class="d-flex flex-column gap-2">
                                    <div class="field-label">{{ targetSystemLabel }} Title</div>
                                    <select v-model="titleField" class="form-select custom-select-sm">
                                        <option value="product_title">Product Title</option>
                                        <option value="handle">Handle</option>
                                        <option value="seo">SEO</option>
                                    </select>
                                </div>
                            </div>
                        </div>

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
                                <single-arrow direction="right" color="red" />
                            </div>
                            <div class="col-4">
                                <div class="d-flex flex-column gap-2">
                                    <div class="field-label">{{ targetSystemLabel }} Description</div>
                                    <select v-model="descriptionField" class="form-select custom-select-sm">
                                        <option value="product_description">Product Description</option>
                                        <option value="summary">Summary</option>
                                    </select>
                                </div>
                            </div>
                        </div>

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
                                <single-arrow direction="right" color="red" />
                            </div>
                            <div class="col-4">
                                <div class="d-flex flex-column gap-2">
                                    <div class="d-flex align-items-center gap-2">
                                        <div class="field-label">{{ targetSystemLabel }} SKU</div>
                                        <span class="badge-mandatory">Mandatory</span>
                                    </div>
                                    <select v-model="skuField" class="form-select custom-select-sm">
                                        <option value="sku">SKU</option>
                                        <option value="product_id">Product ID</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="row g-3 align-items-center mapping-row-gray">
                            <div class="col-4">
                                <div class="d-flex flex-column gap-2">
                                    <div class="field-label">{{ sourceSystemLabel }} Product Type</div>
                                    <div class="fixed-field-display">Category</div>
                                </div>
                            </div>
                            <div class="col-4 d-flex justify-content-center">
                                <single-arrow direction="right" color="red" />
                            </div>
                            <div class="col-4">
                                <div class="d-flex flex-column gap-2">
                                    <div class="field-label">{{ targetSystemLabel }} Product Type</div>
                                    <select v-model="productTypeField" class="form-select custom-select-sm">
                                        <option value="product_type">Product Type</option>
                                        <option value="category">Category</option>
                                        <option value="vendor">Vendor</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="row g-3 align-items-center mapping-row-gray">
                            <div class="col-4">
                                <div class="d-flex flex-column gap-2">
                                    <div class="field-label">{{ sourceSystemLabel }} Weight</div>
                                    <div class="fixed-field-display">Weight</div>
                                </div>
                            </div>
                            <div class="col-4 d-flex justify-content-center">
                                <single-arrow direction="right" color="red" />
                            </div>
                            <div class="col-4">
                                <div class="d-flex flex-column gap-2">
                                    <div class="field-label">{{ targetSystemLabel }} Weight</div>
                                    <select v-model="weightField" class="form-select custom-select-sm">
                                        <option value="weight">Weight</option>
                                        <option value="grams">Grams</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="row g-3 align-items-center mapping-row-gray">
                            <div class="col-4">
                                <div class="d-flex flex-column gap-2">
                                    <div class="field-label">{{ sourceSystemLabel }} Length</div>
                                    <div class="fixed-field-display">Length</div>
                                </div>
                            </div>
                            <div class="col-4 d-flex justify-content-center">
                                <single-arrow direction="right" color="red" />
                            </div>
                            <div class="col-4">
                                <div class="d-flex flex-column gap-2">
                                    <div class="field-label">{{ targetSystemLabel }} Length</div>
                                    <select v-model="lengthField" class="form-select custom-select-sm">
                                        <option value="length">Length</option>
                                        <option value="dimension_length">Dimension Length</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="row g-3 align-items-center mapping-row-gray">
                            <div class="col-4">
                                <div class="d-flex flex-column gap-2">
                                    <div class="field-label">{{ sourceSystemLabel }} Breadth</div>
                                    <div class="fixed-field-display">Breadth</div>
                                </div>
                            </div>
                            <div class="col-4 d-flex justify-content-center">
                                <single-arrow direction="right" color="red" />
                            </div>
                            <div class="col-4">
                                <div class="d-flex flex-column gap-2">
                                    <div class="field-label">{{ targetSystemLabel }} Width</div>
                                    <select v-model="widthField" class="form-select custom-select-sm">
                                        <option value="width">Width</option>
                                        <option value="dimension_width">Dimension Width</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="row g-3 align-items-center mapping-row-gray">
                            <div class="col-4">
                                <div class="d-flex flex-column gap-2">
                                    <div class="field-label">{{ sourceSystemLabel }} Depth</div>
                                    <div class="fixed-field-display">Depth</div>
                                </div>
                            </div>
                            <div class="col-4 d-flex justify-content-center">
                                <single-arrow direction="right" color="red" />
                            </div>
                            <div class="col-4">
                                <div class="d-flex flex-column gap-2">
                                    <div class="field-label">{{ targetSystemLabel }} Height</div>
                                    <select v-model="heightField" class="form-select custom-select-sm">
                                        <option value="height">Height</option>
                                        <option value="dimension_height">Dimension Height</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="row g-3 align-items-center mapping-row-gray">
                            <div class="col-4">
                                <div class="d-flex flex-column gap-2">
                                    <div class="field-label">{{ sourceSystemLabel }} Supplier</div>
                                    <div class="fixed-field-display">Supplier</div>
                                </div>
                            </div>
                            <div class="col-4 d-flex justify-content-center">
                                <single-arrow direction="right" color="red" />
                            </div>
                            <div class="col-4">
                                <div class="d-flex flex-column gap-2">
                                    <div class="field-label">{{ targetSystemLabel }} Vendor</div>
                                    <select v-model="vendorField" class="form-select custom-select-sm">
                                        <option value="vendor">Vendor</option>
                                        <option value="supplier">Supplier</option>
                                        <option value="manufacturer">Manufacturer</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="row g-3 align-items-center mapping-row-gray">
                            <div class="col-4">
                                <div class="d-flex flex-column gap-2">
                                    <div class="field-label">{{ sourceSystemLabel }} Supplier SKU 2</div>
                                    <div class="fixed-field-display">Supplier SKU 2</div>
                                </div>
                            </div>
                            <div class="col-4 d-flex justify-content-center">
                                <single-arrow direction="right" color="red" />
                            </div>
                            <div class="col-4">
                                <div class="d-flex flex-column gap-2">
                                    <div class="field-label">{{ targetSystemLabel }} Barcode</div>
                                    <select v-model="barcodeField" class="form-select custom-select-sm">
                                        <option value="barcode">Barcode</option>
                                        <option value="variant_barcode">Variant Barcode</option>
                                        <option value="sku">SKU</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="d-flex flex-column gap-3">
                    <div class="d-flex align-items-center gap-2">
                        <h3 class="section-heading mb-0">Variant & Grouping Fields</h3>
                    </div>

                    <div class="d-flex flex-column" style="gap: 1.5rem;">
                        <div class="mapping-row-gray" style="padding: 1rem;">
                            <div class="d-flex flex-column gap-2" style="max-width: 28rem;">
                                <div class="d-flex align-items-center gap-2">
                                    <div class="field-label">Product Grouping Field</div>
                                    <info-blue title="Select the field used to group related products" />
                                </div>
                                <select v-model="productGroupingField" class="form-select custom-select-sm">
                                    <option value="manufacturer_sku">Manufacturer SKU</option>
                                    <option value="Custom1">Custom1</option>
                                    <option value="Custom2">Custom2</option>
                                    <option value="Custom3">Custom3</option>
                                </select>
                            </div>
                        </div>

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
                                    <span :class="{
                                        'checkbox-label': variantAttributes.includes(attr) || !maxVariantsReached,
                                        'checkbox-label-disabled': !variantAttributes.includes(attr) && maxVariantsReached,
                                    }">
                                        {{ attr }}
                                    </span>
                                </label>
                            </div>

                            <div v-if="variantAttributes.length" class="mt-3">
                                <div style="font-size: 13px">
                                    Selected Attributes ({{ variantAttributes.length }}/3):
                                </div>

                                <div v-for="attr in variantAttributes"
                                    class="mt-2 d-inline-flex align-items-center px-1 bg-purple-light mx-1 gap-2 border rounded">
                                    <span class="ml-1 text-purple" style="font-size: 13px;">{{ attr }}</span>
                                    <span class="text-purple" style="font-size: 1.2rem; cursor: pointer;"
                                        @click="removeVariant(attr)">&times;</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="d-flex flex-column gap-3">
                    <div class="d-flex align-items-center gap-2">
                        <h3 class="section-heading mb-0">Pricing Fields</h3>
                    </div>

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
                        <div v-if="pricingMode === 'fixed'" class="row g-3 align-items-center mapping-row-green">
                            <div class="col-4">
                                <div class="d-flex flex-column gap-2">
                                    <div class="field-label">{{ sourceSystemLabel }} Price</div>
                                    <select v-model="retailExpressPrice" class="form-select custom-select-sm">
                                        <option value="rrp_incl_tax">RRP (Inc Tax)</option>
                                        <option value="pos_price">POS Price</option>
                                        <option value="web_price">Web Price</option>
                                        <option value="promo_price_incl_tax">Promo Price (Inc tax)</option>
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
                                <single-arrow direction="right" color="red" />
                            </div>
                            <div class="col-4">
                                <div class="field-label">{{ targetSystemLabel }} Price</div>
                            </div>
                        </div>

                        <div v-if="pricingMode === 'fixed'" class="row g-3 align-items-center mapping-row-gray">
                            <div class="col-4">
                                <div class="d-flex flex-column gap-2">
                                    <div class="field-label">{{ sourceSystemLabel }} MSRP</div>
                                    <select v-model="retailExpressMSRP" class="form-select custom-select-sm">
                                        <option value="rrp_incl_tax">RRP (Inc Tax)</option>
                                        <option value="msrp_field">MSRP Field</option>
                                        <option value="compare_at_price">Compare At Price</option>
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
                                <single-arrow direction="right" color="red" />
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

                        <div class="row g-3 align-items-start mapping-row-gray">
                            <div class="col-4">
                                <div class="d-flex flex-column gap-3">
                                    <div class="field-label">{{ sourceSystemLabel }} Cost</div>
                                    <select v-model="typCost" class="form-select custom-select-sm">
                                        <option value="cogs_excl_tax">Cost of Goods Sold (Ex Tax)</option>
                                        <option value="direct_cost">Direct Cost</option>
                                        <option value="avg_cost">Average Cost</option>
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
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="col-4 d-flex justify-content-center" style="margin-top: 0.5rem;">
                                <single-arrow direction="right" color="red" />
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
/* All styles remain the same - copying from original */
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

.checkbox-label-disabled {
    font-family: 'Roboto', sans-serif;
    font-size: 13px;
    color: #30343b;
    margin: 0;
    cursor: not-allowed;
    opacity: 0.6;
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

.bg-purple-light {
    background-color: #efe4fa;
}

.text-purple {
    color: #9333ea;
}

@media (max-width: 768px) {
    .col-4 {
        width: 100%;
    }

    .row.g-3 {
        row-gap: 1rem !important;
    }
}
</style>
