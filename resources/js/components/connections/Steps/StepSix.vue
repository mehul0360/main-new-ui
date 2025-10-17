<script setup>
import { onMounted } from 'vue';
import MandatoryMapping from './StoresInventory/MandatoryMapping.vue';
import BufferQuantityConfig from './StoresInventory/BufferQuantityConfig.vue';
import InfoRed from '../../Icons/InfoRed.vue';

onMounted(() => {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});
</script>

<template>
    <div>
        <div class="card store-inventory-mapping-card position-relative overflow-hidden">
            <div class="card-body p-4">
                <div class="header-container position-relative">
                    <div class="d-flex flex-column align-items-center justify-content-start">
                        <h1 class="order-title text-center mb-0">Stores and Inventory</h1>
                    </div>

                    <div class="description-container mx-auto text-center mt-3">
                        <div class="description-text">
                            <p class="mb-0">
                                Configure store location mapping and inventory sync settings between Retail Express and
                                Shopify.
                            </p>
                            <p class="mb-3">
                                At least one location mapping is required to start syncing inventory data between
                                systems.
                            </p>

                            <div class="d-flex align-items-center justify-content-center">
                                <span class="info-text">Need more information?</span>
                                <info-red
                                    title="Learn more about store mapping, inventory sync configuration, and buffer quantity management best practices." />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <mandatory-mapping />

        <buffer-quantity-config />
    </div>
</template>

<style scoped>
.store-inventory-mapping-card {
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

.order-title {
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
</style>
