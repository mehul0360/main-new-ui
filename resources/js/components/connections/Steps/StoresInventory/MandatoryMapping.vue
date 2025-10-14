<script setup>
import { ref } from 'vue';

const mappings = ref([
    { id: 1, retailStore: '', shopifyStore: '' },
    { id: 2, retailStore: '', shopifyStore: '' },
]);

const addMapping = () => {
    mappings.value.push({
        id: Date.now(),
        retailStore: '',
        shopifyStore: ''
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
            <div class="d-flex align-items-center mb-1">
                <h5 class="fw-semibold mt-1"
                    style="color: #101828; font-size: 20px; font-family: 'Poppins', sans-serif; line-height: 28px;">
                    Mandotory Order Mappings
                </h5>

                <button type="button" class="ms-3 info-btn-red" data-bs-toggle="tooltip"
                    title="At least one location mapping is required to begin inventory synchronization. Multiple Retail Express stores can be mapped to a single Shopify location.">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="info-icon-small">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M12 16v-4"></path>
                        <path d="M12 8h.01"></path>
                    </svg>
                </button>
            </div>
            <p class="text-muted mb-4"
                style="font-size: 14px; font-family: 'Roboto', sans-serif; color: #4a5565; line-height: 20px;">
                Map Retail Express store locations to Shopify locations for inventory sync. Multiple RE stores can
                map to one Shopify location.
            </p>

            <!-- Table Header -->
            <div class="row g-4 py-2 border-bottom mb-3" style="border-color: #e5e7eb;">
                <div class="col-4">
                    <strong
                        style="font-size: 14px; font-family: 'Roboto', sans-serif; color: #101828; font-weight: 500;">
                        Retail Express Store
                    </strong>
                </div>
                <div class="col-1 text-center"></div>
                <div class="col-4">
                    <strong
                        style="font-size: 14px; font-family: 'Roboto', sans-serif; color: #101828; font-weight: 500;">
                        Shopify Store
                    </strong>
                </div>
                <div class="col-1"></div>
            </div>

            <div v-for="mapping in mappings" :key="mapping.id" class="row g-4 align-items-center mb-3">
                <div class="col-4">
                    <div class="position-relative">
                        <select v-model="mapping.retailStore" class="form-select custom-select"
                            style="font-size: 14px; height: 36px; font-family: 'Roboto', sans-serif;">
                            <option value="">Select field</option>
                            <option value="retail_express_store_1">Retail Express Store 1</option>
                            <option value="retail_express_store_2">Retail Express Store 2</option>
                            <option value="retail_express_store_3">Retail Express Store 3</option>
                            <option value="retail_express_store_4">Retail Express Store 4</option>
                            <option value="retail_express_store_5">Retail Express Store 5</option>
                        </select>
                    </div>
                </div>

                <div class="col-1 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="#F20F52" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                    </svg>
                </div>

                <div class="col-4">
                    <div class="position-relative">
                        <select v-model="mapping.shopifyStore" class="form-select custom-select"
                            style="font-size: 14px; height: 36px; font-family: 'Roboto', sans-serif;">
                            <option value="">Select field</option>
                            <option value="shopify_store_1">Shopify Store 1</option>
                            <option value="shopify_store_2">Shopify Store 2</option>
                            <option value="shopify_store_3">Shopify Store 3</option>
                            <option value="shopify_store_4">Shopify Store 4</option>
                            <option value="shopify_store_5">Shopify Store 5</option>
                        </select>
                    </div>
                </div>

                <div class="col-1">
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
