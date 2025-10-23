import { ref } from "vue";
import { defineStore } from "pinia";

export const useStepFiveStore = defineStore('stepFive', () => {
    const payload = ref({
        // Order Sync Module (from StepFive.vue parent)
        orderSyncEnabled: true,

        // Additional Order Mappings (from OrderAdditionalMapping.vue)
        additionalMappings: [
            { id: 1, retailField: '', shopifyField: '' },
            { id: 2, retailField: '', shopifyField: '' }
        ],

        // Order Sync Behavior Settings (from OrderSyncBehaviourSettings.vue)
        trackingInfoSetting: 'yes_from_retail_express_shipment_tab',
        salesLocationSetting: 'use_location_from_shopify_order',
        fulfillmentLocationSetting: 'use_shopify',
        defaultSalesperson: '',
        updateCustomerData: 'yes',

        // Payment Methods Mapping (from PaymentMethodsMapping.vue)
        paymentMethodMappings: [
            { id: 1, retailPaymentMethod: '', shopifyPaymentMethod: '' },
            { id: 2, retailPaymentMethod: '', shopifyPaymentMethod: '' },
            { id: 3, retailPaymentMethod: '', shopifyPaymentMethod: '' },
            { id: 4, retailPaymentMethod: '', shopifyPaymentMethod: '' }
        ],

        // Shipping Methods Mapping (from ShippingMethodsMapping.vue)
        shippingMethodMappings: [
            { id: 1, retailShippingMethod: '', shopifyShippingMethod: '' },
            { id: 2, retailShippingMethod: '', shopifyShippingMethod: '' }
        ],

        // Click & Collect (from ClickAndCollect.vue)
        enableClickCollect: false,
        restrictAvailability: 'all_products',
        enableMinStock: false,
        minStockThreshold: '',
        searchRadius: '',
        customTag: '',

        savedAt: null
    });

    const isSaved = ref(false);

    async function saveInStorage(data) {
        payload.value = {
            ...data,
            savedAt: new Date().toISOString()
        };
        isSaved.value = true;

        console.log('Step 5 data saved to Pinia store:', payload.value);
    }

    function clearStorage() {
        payload.value = {
            orderSyncEnabled: true,
            additionalMappings: [
                { id: 1, retailField: '', shopifyField: '' },
                { id: 2, retailField: '', shopifyField: '' }
            ],
            trackingInfoSetting: 'yes_from_retail_express_shipment_tab',
            salesLocationSetting: 'use_location_from_shopify_order',
            fulfillmentLocationSetting: 'use_shopify',
            defaultSalesperson: '',
            updateCustomerData: 'yes',
            paymentMethodMappings: [
                { id: 1, retailPaymentMethod: '', shopifyPaymentMethod: '' },
                { id: 2, retailPaymentMethod: '', shopifyPaymentMethod: '' },
                { id: 3, retailPaymentMethod: '', shopifyPaymentMethod: '' },
                { id: 4, retailPaymentMethod: '', shopifyPaymentMethod: '' }
            ],
            shippingMethodMappings: [
                { id: 1, retailShippingMethod: '', shopifyShippingMethod: '' },
                { id: 2, retailShippingMethod: '', shopifyShippingMethod: '' }
            ],
            enableClickCollect: false,
            restrictAvailability: 'all_products',
            enableMinStock: false,
            minStockThreshold: '',
            searchRadius: '',
            customTag: '',
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
