<script setup>
import { computed, onMounted, ref } from 'vue';
import MappingCard from './Products/MappingCard.vue';
import InfoRed from '../../Icons/InfoRed.vue';
import InfoBlue from '../../Icons/InfoBlue.vue';
import SingleArrow from '../../Icons/SingleArrow.vue';
import MandatoryLogic from './Products/MandatoryLogic.vue';

const primarySystem = ref('retail-express');
const retailExpressField = ref('Product ID');
const shopifyField = ref('Barcode');

const createState = ref('draft_inactive');
const inactiveAction = ref('mark_as_draft');
const backOrders = ref('enable');
const weightUnit = ref('kilograms_kg');

onMounted(() => {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});

const sourceSystem = computed(() => {
    return primarySystem.value === 'retail-express' ? 'Retail Express' : 'Shopify';
});

const targetSystem = computed(() => {
    return primarySystem.value === 'retail-express' ? 'Shopify' : 'Retail Express';
});

const arrowDirection = computed(() => {
    return primarySystem.value === 'retail-express' ? 'right' : 'left';
});
</script>

<template>
    <div>
        <div class="card product-mapping-card position-relative overflow-hidden">
            <div class="card-body p-4">
                <div class="header-container position-relative">
                    <div class="d-flex flex-column align-items-center justify-content-start">
                        <h1 class="product-title text-center mb-0">Product Data Mapping</h1>
                    </div>

                    <div class="description-container mx-auto text-center mt-3">
                        <div class="description-text">
                            <p class="mb-0">Configure how product data syncs between Retail Express and Shopify.</p>
                            <p class="mb-3">Map inventory fields, pricing, and product attributes to ensure accurate
                                sync.
                            </p>

                            <div class="d-flex align-items-center justify-content-center gap-2">
                                <span class="info-text">Need more information?</span>
                                <info-red
                                    title="Learn more about product sync configuration, inventory management, and pricing strategies." />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="card source-card position-relative overflow-hidden mt-4">
            <div class="card-body p-4">
                <div class="d-flex flex-column gap-4">
                    <div class="d-flex align-items-center gap-2">
                        <h2 class="section-title mb-0">Source of Truth for Product Creation</h2>
                        <info-red
                            title="Select which system will be the primary source for product creation and data flow. This determines the direction of synchronization and field mapping below." />
                    </div>

                    <p class="section-description mb-0">
                        Configure which system serves as the primary source for product data and controls the
                        sync direction.
                    </p>

                    <div class="d-flex flex-column gap-3">
                        <label class="dropdown-label mb-0">Primary Source System</label>

                        <select v-model="primarySystem" class="form-select custom-select">
                            <option value="retail-express">Retail Express</option>
                            <option value="shopify">Shopify</option>
                        </select>

                        <div class="sync-flow-container">
                            <div class="row g-0 align-items-center">
                                <div class="col-4 text-center">
                                    <div class="system-label">{{ sourceSystem }}</div>
                                    <div class="system-sublabel">Source System</div>
                                </div>
                                <div class="col-4 d-flex justify-content-center">
                                    <single-arrow :direction="arrowDirection" />
                                </div>
                                <div class="col-4 text-center">
                                    <div class="system-label">{{ targetSystem }}</div>
                                    <div class="system-sublabel">Target System</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="card identification-card position-relative overflow-hidden mt-4">
            <div class="card-body p-4">
                <div class="d-flex flex-column gap-4">
                    <div class="d-flex align-items-center gap-2">
                        <h2 class="section-title mb-0">Product Identification</h2>
                        <info-red title="Configure how products are identified and matched between systems" />
                    </div>

                    <div>
                        <p class="section-description mb-0">
                            Configure how products are identified and matched between systems.
                        </p>
                    </div>

                    <div class="d-flex flex-column gap-3">
                        <div class="row g-3 align-items-center py-2 border-bottom">
                            <div class="col-4">
                                <div class="field-header">{{ sourceSystem }} Field</div>
                            </div>
                            <div class="col-4"></div>
                            <div class="col-4">
                                <div class="field-header">{{ targetSystem }} Field</div>
                            </div>
                        </div>

                        <div class="row g-3 align-items-center mapping-row">
                            <div class="col-4">
                                <select v-if="primarySystem === 'retail-express'" v-model="retailExpressField"
                                    class="form-select custom-select">
                                    <option value="Product ID" selected>Product ID</option>
                                    <option value="SKU">SKU</option>
                                    <option value="Suppier SKU">Supplier SKU</option>
                                </select>
                                <select v-else v-model="shopifyField" class="form-select custom-select">
                                    <option value="Barcode" selected>Barcode</option>
                                    <option value="SKU">SKU</option>
                                </select>
                            </div>

                            <div class="col-4 d-flex justify-content-center">
                                <single-arrow :direction="arrowDirection" color="red" />
                            </div>
                            <div class="col-4">
                                <select v-if="primarySystem === 'retail-express'" v-model="shopifyField"
                                    class="form-select custom-select">
                                    <option value="Barcode" selected>Barcode</option>
                                    <option value="SKU">SKU</option>
                                </select>
                                <select v-else v-model="retailExpressField" class="form-select custom-select">
                                    <option value="Product ID" selected>Product ID</option>
                                    <option value="SKU">SKU</option>
                                    <option value="Supplier SKU">Supplier SKU</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <mandatory-logic />

        <mapping-card :primary-system="primarySystem" />

        <div class="card sync-behavior-card position-relative overflow-hidden my-4">
            <div class="card-body p-4">
                <div class="d-flex align-items-center gap-2 mb-4">
                    <h2 class="section-title mb-0">Product Sync Behavior Settings</h2>
                    <info-red title="Configure how products sync between systems" placement="top" />
                </div>

                <div class="d-flex flex-column" style="gap: 1.5rem;">
                    <div class="d-flex flex-column gap-2">
                        <label class="field-label">Create State in Shopify</label>
                        <select v-model="createState" class="form-select custom-select-md">
                            <option value="draft_inactive">Draft/Inactive</option>
                            <option value="publish_active">Publish/Active</option>
                        </select>
                    </div>

                    <div class="d-flex flex-column gap-2">
                        <label class="field-label">Action for Inactive REX Products</label>
                        <select v-model="inactiveAction" class="form-select custom-select-md">
                            <option value="delete_product">Delete The Product</option>
                            <option value="mark_as_draft">Mark as draft</option>
                            <option value="do_not_update">Do not update</option>
                        </select>
                    </div>

                    <div class="d-flex flex-column gap-2">
                        <div class="d-flex align-items-center gap-2">
                            <label class="field-label mb-0">Back Orders/Continue Selling</label>
                            <info-blue is-small title="Enable to allow selling products even when out of stock"
                                placement="top" />
                        </div>
                        <select v-model="backOrders" class="form-select custom-select-md">
                            <option value="enable">Enable</option>
                            <option value="disable">Disable</option>
                        </select>
                    </div>

                    <div class="d-flex flex-column gap-2">
                        <label class="field-label">Product Weight Unit</label>
                        <select v-model="weightUnit" class="form-select custom-select-md">
                            <option value="kilograms_kg">Kilograms (kg)</option>
                            <option value="grams_g">Grams (g)</option>
                            <option value="pounds_lb">Pounds (lb)</option>
                            <option value="ounces_oz">Ounces (oz)</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* First Card Styles */
.product-mapping-card,
.sync-behavior-card {
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

.product-title {
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

/* Source of Truth Card Styles */
.source-card {
    background: #fff;
    border-radius: 14px;
    border: 1px solid #e5e7eb;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1), 0px 1px 2px -1px rgba(0, 0, 0, 0.1);
}

.section-title {
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    font-size: 20px;
    line-height: 28px;
    color: #101828;
}

.section-description {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #4a5565;
}

.dropdown-label {
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: #101828;
}

.custom-select {
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

.custom-select:focus {
    background-color: #f9fafb;
    border-color: #155dfc;
    box-shadow: 0 0 0 3px rgba(21, 93, 252, 0.1);
    outline: none;
}

/* Sync Flow Container with Gradient */
.sync-flow-container {
    width: 100%;
    padding: 1.5rem;
    background: linear-gradient(to right, #eff6ff, #f0fdf4);
    border: 1px solid #bfdbfe;
    border-radius: 8px;
}

.system-label {
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    font-size: 14px;
    color: #101828;
}

.system-sublabel {
    font-family: 'Roboto', sans-serif;
    font-size: 12px;
    color: #4a5565;
    margin-top: 0.25rem;
}

/* Product Identification Card Styles */
.identification-card {
    background: #fff;
    border-radius: 14px;
    border: 1px solid #e5e7eb;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1), 0px 1px 2px -1px rgba(0, 0, 0, 0.1);
}

.field-header {
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    font-size: 14px;
    color: #101828;
}

.border-bottom {
    border-bottom: 1px solid #e5e7eb !important;
}

.mapping-row {
    background-color: #f9fafb;
    border-radius: 8px;
    padding: 0.5rem 1rem;
}

.section-title {
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    font-size: 20px;
    line-height: 28px;
    color: #101828;
}

.field-label {
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
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

/* Responsive adjustments */
@media (max-width: 768px) {
    .product-title {
        font-size: 24px;
        line-height: 30px;
    }

    .description-text {
        font-size: 14px;
    }

    .description-text p {
        white-space: normal;
    }

    .description-container {
        max-width: 100%;
        padding: 0 1rem;
    }

    .custom-select {
        max-width: 100%;
    }

    .system-label {
        font-size: 12px;
    }

    .system-sublabel {
        font-size: 10px;
    }
}
</style>
