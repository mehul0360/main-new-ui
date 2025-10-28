import { ref } from "vue";
import { defineStore } from "pinia";

export const useStepFiveStore = defineStore('stepFive', () => {
    const payload = ref({
        orderSyncModule: {
            orderSyncEnabled: true
        },

        additionalMappings: {
            data: [
                { id: 1, retailField: '', shopifyField: '' },
                { id: 2, retailField: '', shopifyField: '' }
            ]
        },

        syncBehavior: {
            trackingInfoSetting: 'yes_from_retail_express_shipment_tab',
            salesLocationSetting: 'use_location_from_shopify_order',
            fulfillmentLocationSetting: 'use_shopify',
            defaultSalesperson: '',
            updateCustomerData: 'yes'
        },

        paymentMethods: {
            data: [
                { id: 1, retailPaymentMethod: '', shopifyPaymentMethod: '' },
                { id: 2, retailPaymentMethod: '', shopifyPaymentMethod: '' },
                { id: 3, retailPaymentMethod: '', shopifyPaymentMethod: '' },
                { id: 4, retailPaymentMethod: '', shopifyPaymentMethod: '' }
            ]
        },

        shippingMethods: {
            data: [
                { id: 1, retailShippingMethod: '', shopifyShippingMethod: '' },
                { id: 2, retailShippingMethod: '', shopifyShippingMethod: '' }
            ]
        },

        clickCollect: {
            enableClickCollect: false,
            restrictAvailability: 'all_products',
            enableMinStock: false,
            minStockThreshold: '',
            searchRadius: '',
            customTag: ''
        },

        savedAt: null
    });

    const isSaved = ref(false);

    async function saveInStorage(data) {
        payload.value = {
            ...data,
            savedAt: new Date().toISOString()
        };
        isSaved.value = true;
    }

    function clearStorage() {
        payload.value = {
            orderSyncModule: {
                orderSyncEnabled: true
            },
            additionalMappings: {
                data: [
                    { id: 1, retailField: '', shopifyField: '' },
                    { id: 2, retailField: '', shopifyField: '' }
                ]
            },
            syncBehavior: {
                trackingInfoSetting: 'yes_from_retail_express_shipment_tab',
                salesLocationSetting: 'use_location_from_shopify_order',
                fulfillmentLocationSetting: 'use_shopify',
                defaultSalesperson: '',
                updateCustomerData: 'yes'
            },
            paymentMethods: {
                data: [
                    { id: 1, retailPaymentMethod: '', shopifyPaymentMethod: '' },
                    { id: 2, retailPaymentMethod: '', shopifyPaymentMethod: '' },
                    { id: 3, retailPaymentMethod: '', shopifyPaymentMethod: '' },
                    { id: 4, retailPaymentMethod: '', shopifyPaymentMethod: '' }
                ]
            },
            shippingMethods: {
                mappings: [
                    { id: 1, retailShippingMethod: '', shopifyShippingMethod: '' },
                    { id: 2, retailShippingMethod: '', shopifyShippingMethod: '' }
                ]
            },
            clickCollect: {
                enableClickCollect: false,
                restrictAvailability: 'all_products',
                enableMinStock: false,
                minStockThreshold: '',
                searchRadius: '',
                customTag: ''
            },
            savedAt: null
        };
        isSaved.value = false;
    }

    function getPayload() {
        return payload.value;
    }

    return {
        payload,
        isSaved,
        saveInStorage,
        clearStorage,
        getPayload
    };
}, {
    persist: true
});
