<script setup>
import { ref } from 'vue';

const enableClickCollect = ref(false);
const restrictAvailability = ref('all_products');
const enableMinStock = ref(false);
const minStockThreshold = ref('');
const searchRadius = ref('');
const customTag = ref('');
</script>

<template>
    <div class="card click-collect-card position-relative overflow-hidden">
        <div class="card-body p-4">
            <div class="d-flex align-items-center gap-3 mb-4">
                <h2 class="section-title mb-0">Click & Collect</h2>
                <button type="button" class="info-btn-red" data-bs-toggle="tooltip"
                    title="Configure Click & Collect settings for orders that customers collect from your store locations. Set up pickup notifications, inventory allocation, and store assignment rules.">
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
                    <h3 class="subsection-title mb-0">Enable Click & Collect</h3>

                    <div class="d-flex align-items-start gap-3">
                        <div class="d-flex align-items-start gap-3" style="padding-top: 0.25rem;">
                            <input type="checkbox" v-model="enableClickCollect" id="enable_click_collect"
                                class="form-check-input checkbox-custom mt-1">
                            <div class="d-flex flex-column gap-1 flex-fill">
                                <label for="enable_click_collect" class="checkbox-main-label cursor-pointer mb-0">
                                    Enable Click & Collect for this integration
                                </label>
                                <div class="checkbox-description">
                                    Allow customers to place orders online and collect from your store locations
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="d-flex flex-column gap-3">
                    <div class="d-flex align-items-center gap-2">
                        <h3 class="subsection-title mb-0">Restrict Click & Collect availability to:</h3>
                        <button type="button" class="info-btn-red info-btn-sm" data-bs-toggle="tooltip"
                            title="Filter which products are available for Click & Collect based on Shopify product tags or collections. By default, all products are available for pickup.">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="info-icon-tiny">
                                <circle cx="12" cy="12" r="10"></circle>
                                <path d="M12 16v-4"></path>
                                <path d="M12 8h.01"></path>
                            </svg>
                        </button>
                    </div>
                    <select v-model="restrictAvailability" class="form-select custom-select-md">
                        <option value="all_products">All Products</option>
                        <option value="based_on_collection_name">Based on Collection Name</option>
                        <option value="based_on_tag">Based on Tag</option>
                    </select>
                </div>

                <div class="d-flex flex-column gap-3">
                    <div class="d-flex align-items-center gap-2">
                        <h3 class="subsection-title mb-0">Set minimum stock level for Pick Up availability?</h3>
                        <button type="button" class="info-btn-red info-btn-sm" data-bs-toggle="tooltip"
                            title="Prevents customers from selecting pick-up if stock falls below this threshold at the location. Helps ensure product availability when customers arrive.">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="info-icon-tiny">
                                <circle cx="12" cy="12" r="10"></circle>
                                <path d="M12 16v-4"></path>
                                <path d="M12 8h.01"></path>
                            </svg>
                        </button>
                    </div>

                    <div class="d-flex align-items-start gap-3">
                        <div class="d-flex align-items-start gap-3" style="padding-top: 0.25rem;">
                            <input type="checkbox" v-model="enableMinStock" id="enable_min_stock"
                                class="form-check-input checkbox-custom mt-1">
                            <div class="d-flex flex-column gap-1 flex-fill">
                                <label for="enable_min_stock" class="checkbox-main-label cursor-pointer mb-0">
                                    Yes, set minimum stock threshold
                                </label>
                            </div>
                        </div>
                    </div>

                    <div class="d-flex flex-column gap-2">
                        <label class="field-label-md">Minimum stock threshold</label>
                        <input type="number" v-model="minStockThreshold" class="form-control custom-input-md"
                            placeholder="Enter minimum stock level" min="0">
                    </div>
                </div>

                <div class="d-flex flex-column gap-3">
                    <div class="d-flex align-items-center gap-2">
                        <h3 class="subsection-title mb-0">Customer location search radius (km)</h3>
                        <button type="button" class="info-btn-red info-btn-sm" data-bs-toggle="tooltip"
                            title="Defines the maximum distance from the customer's location to eligible Click & Collect stores. Customers will only see pickup locations within this radius.">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="info-icon-tiny">
                                <circle cx="12" cy="12" r="10"></circle>
                                <path d="M12 16v-4"></path>
                                <path d="M12 8h.01"></path>
                            </svg>
                        </button>
                    </div>
                    <input type="number" v-model="searchRadius" class="form-control custom-input-md"
                        placeholder="Enter radius in kilometers" min="1" step="0.1">
                </div>

                <div class="d-flex flex-column gap-3">
                    <div class="d-flex align-items-center gap-2">
                        <h3 class="subsection-title mb-0">Custom tag for Click & Collect orders</h3>
                        <button type="button" class="info-btn-red info-btn-sm" data-bs-toggle="tooltip"
                            title="This tag will be attached to Click & Collect orders in Shopify to differentiate from delivery orders. Useful for filtering and reporting.">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="info-icon-tiny">
                                <circle cx="12" cy="12" r="10"></circle>
                                <path d="M12 16v-4"></path>
                                <path d="M12 8h.01"></path>
                            </svg>
                        </button>
                    </div>
                    <input type="text" v-model="customTag" class="form-control custom-input-md"
                        placeholder="Enter custom tag (e.g., click-collect)">
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.click-collect-card {
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

.field-label-md {
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
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
    flex-shrink: 0;
}

.info-btn-sm {
    width: 16px;
    height: 16px;
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

.info-icon-tiny {
    width: 10px;
    height: 10px;
    stroke: white;
    stroke-width: 2;
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

    .custom-select-md,
    .custom-input-md {
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
